import * as React from 'react';
import { View, BoxId, Image, PageItems, Query, Context } from 'tonva';
import { CUqBase } from 'CBase';
import { nav } from 'tonva';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import iconj from '../images/icon.jpg';
import { VSupplier } from './VSupplier';
import { VSupplierList } from './VSupplierList';
import { VHome } from '../VHome';
import { VSupplierDetail } from './VSupplierDetail';
import { SupplierItem } from "model/supplierItem";
import { CAddress } from "../supplierContact/CAddress";

class PageSupplier extends PageItems<any> {

    private searchSupplier: Query;
    constructor(searchQuery: Query) {
        super();
        this.firstSize = this.pageSize = 14;
        this.searchSupplier = searchQuery;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
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

    renderRootList() {
        return this.renderView(VSupplierList);
    }

    saveSupplierData = async (supplier: any) => {

        if (supplier.id === undefined) {
            supplier.defaultContact = undefined;
            supplier.isValid = 1;
            let newSupplier = await this.uqs.rms.Supplier.save(undefined, supplier);
            let newBank = await this.uqs.rms.BankAccount.save(undefined, supplier);
            await this.uqs.rms.SupplierBankAccount.add({ supplier: newSupplier.id, arr1: [{ bankAccount: newBank.id }] });
        } else {
            let { id } = supplier;
            let bankmap: any[] = [];
            supplier.isValid = 1;
            bankmap = await this.uqs.rms.SupplierBankAccount.table({ supplier: id });
            for (let bank of bankmap) {
                await this.uqs.rms.BankAccount.save(bank.bankAccount.id, supplier);
            }
            await this.uqs.rms.Supplier.save(id, supplier);
        }
        await this.cApp.cHome.start();
    }


    /**
    * 打开新建界面
    */
    onNewSupplier = async () => {
        this.openVPage(VSupplier, { description: undefined });
    }

    /**
    * 打开编辑界面
    */
    onEditSupplier = async (supplier: any) => {
        this.openVPage(VSupplier, supplier);
    }

    /**
    * 打开详情界面
    */
    onSupplierSelected = async (supplier: any) => {
        let { id } = supplier;
        let contact = await this.uqs.rms.SearchSupplierContact.query({ _id: id });
        let param: SupplierItem = {
            parent: supplier,
            item: contact.ret[0],
            child: contact.ret,
        }
        this.openVPage(VSupplierDetail, param);
    }

    delSupplier = async (supplier: any) => {
        let { id } = supplier;
        supplier.isValid = 0;
        await this.uqs.rms.Supplier.save(id, supplier);
    }

    loadList = async () => {
        await this.searchSupplierByKey("");
    }
}

