import * as React from 'react';
import { View, BoxId, Image, PageItems, Query, Context } from 'tonva';
import { CUqBase } from 'CBase';
import { nav } from 'tonva';
import { observable } from 'mobx';
import { VSupplier } from './VSupplier';
import { VSupplierBankAccount } from './VSupplierBankAccount';
import { VSupplierBankAccountDetail } from './VSupplierBankAccountDetail';
import { VSupplierList } from './VSupplierList';
import { CEmployee } from '../employee/CEmployee';
import { VSupplierDetail } from './VSupplierDetail';
import { ParamItem, SupplierItem } from "model/supplierItem";
import { CAddress } from "../supplierContact/CAddress";

class PageSupplier extends PageItems<any> {

    private searchSupplier: Query;
    constructor(searchQuery: Query) {
        super();
        this.firstSize = this.pageSize = 14;
        this.searchSupplier = searchQuery;
    }

    protected async loadResults(param: any, pageStart: any, pageSize: number): Promise<{ [name: string]: any[]; }> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchSupplier.page(param, pageStart, pageSize);
        return ret;
    }
    protected setPageStart(item: any): any {
        this.pageStart = item === undefined ? 0 : item.id;
    }
}

export class CSupplier extends CUqBase {

    @observable suppliers: PageSupplier;

    async internalStart(param: any) {
        this.searchSupplierByKey(param);

    }

    searchSupplierByKey = async (key: string) => {
        this.suppliers = new PageSupplier(this.uqs.rms.SearchSupplier);
        this.suppliers.first({ key: key });
    }

    pickAddress = async (context: Context, name: string, value: number): Promise<number> => {
        let cAddress = this.newC(CAddress);
        return await cAddress.call<number>();
    }

    pickChemical = async (supplier: any): Promise<any> => {
        let mode: any = await this.cApp.cChemical.call(supplier);
    }

    pickEmployee = async (context: Context, name: string, value: number): Promise<number> => {
        let cEmployee = this.newC(CEmployee);
        return await cEmployee.call<number>();
    }

    renderRootList() {
        return this.renderView(VSupplierList);
    }

    saveSupplierData = async (supplier: any, model: any) => {

        let name = supplier.name;
        let { id } = supplier;
        if (id === undefined) {
            supplier.defaultContact = undefined;
            supplier.financeContact = undefined;
            supplier.inquiryContact = undefined;
            supplier.isValid = 1;
            id = await this.uqs.rms.Supplier.save(undefined, supplier);
        } else {
            supplier.isValid = 1;
            supplier.defaultContact = model.defaultContact;
            supplier.financeContact = model.financeContact;
            supplier.inquiryContact = model.inquiryContact;
            supplier.no = model.no;
            await this.uqs.rms.Supplier.save(id, supplier);
        }
        let { principal } = supplier;
        if (principal !== undefined) {
            let { principal: oldprincipal } = model;
            if (oldprincipal !== undefined) {
                await this.uqs.rms.SupplierHandler.del({ supplier: id, arr1: [{ principal: oldprincipal }] });
            }
            await this.uqs.rms.SupplierHandler.add({ supplier: id, arr1: [{ principal: principal }] });
        }
        this.closePage();
        await this.searchSupplierByKey(name);
    }

    saveSupplierBankData = async (param: any, supplier: any) => {

        if (supplier.id !== undefined) {
            let newBank = await this.uqs.rms.BankAccount.save(undefined, param);
            await this.uqs.rms.SupplierBankAccount.add({ supplier: supplier.id, arr1: [{ bankAccount: newBank.id }] });
        }
        this.cApp.cSupplier.onSupplierSelected(supplier);
        this.closePage();
    }


    /**
    * 打开新建界面
    */
    onNewSupplier = async () => {
        this.openVPage(VSupplier, { description: undefined });
    }

    /**
* 打开新建界面
*/
    onEditSupplier = async (supplier: any) => {
        this.openVPage(VSupplier, supplier);
    }

    /**
    * 打开编辑界面
    */
    updateSupplierData = async (supplier: any) => {
        supplier.isValid = 1;
        await this.uqs.rms.Supplier.save(supplier.id, supplier);
        this.closePage();
        await this.loadList();
    }

    /**
    * 打开新建界面
    */
    onNewSupplierBankAccount = async (supplier: any) => {
        this.openVPage(VSupplierBankAccount, supplier);
    }

    /**
    * 打开编辑界面
    */
    onShowSupplierBankAccount = async (supplier: any, supplierBankAccount: any) => {

        let param: SupplierItem = {
            parent: supplier,
            item: supplierBankAccount,
            child: undefined,
        }
        this.openVPage(VSupplierBankAccountDetail, param);
    }

    /**
    * 打开详情界面
    */
    onSupplierSelected = async (supplier: any) => {
        let { id } = supplier;
        supplier = await this.uqs.rms.Supplier.load(id);
        let principals = await this.uqs.rms.SupplierHandler.table({ supplier: id });
        supplier.principal = principals[0];
        let contact = await this.uqs.rms.SearchSupplierContact.query({ _id: id });
        let bankAccount = await this.uqs.rms.SearchSupplierBankAccount.query({ _id: id });
        let param: ParamItem = {
            parent: supplier,
            item: contact.ret[0],
            child: contact.ret,
            item2: bankAccount.ret[0],
            child2: bankAccount.ret,
        }
        this.openVPage(VSupplierDetail, param);
    }

    delSupplier = async (supplier: any) => {
        let { id } = supplier;
        supplier.isValid = 0;
        await this.uqs.rms.Supplier.save(id, supplier);
    }

    delSupplierBankAccount = async (bankAccount: any, supplier: any) => {
        let { id } = supplier;
        await this.uqs.rms.SupplierBankAccount.del({ supplier: id, arr1: [{ bankAccount: bankAccount.id }] });
    }

    updateBankAccountData = async (bankdata: any) => {
        let { id } = bankdata;
        await this.uqs.rms.BankAccount.save(id, bankdata);
    }



    loadList = async () => {
        await this.searchSupplierByKey("");
    }
}

