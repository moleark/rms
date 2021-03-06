import * as React from 'react';
import { View, BoxId, Image, Query, PageItems, Context } from 'tonva';
import { CUqBase } from 'CBase';
import { nav } from 'tonva';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { VSupplierContact } from "./VSupplierContact";
import { VSupplierContactDetail } from "./VSupplierContactDetail";
import { VSupplierDetail } from "../supplier/VSupplierDetail";
import { SupplierItem } from "model/supplierItem";
import { CAddress } from "./CAddress";

class PageSupplierContact extends PageItems<any> {
    private searchSupplierContact: Query;
    constructor(searchQuery: Query) {
        super();
        this.firstSize = this.pageSize = 14;
        this.searchSupplierContact = searchQuery;
    }

    protected async loadResults(param: any, pageStart: any, pageSize: number): Promise<{ [name: string]: any[]; }> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchSupplierContact.page(param, pageStart, pageSize);
        return ret;
    }
    protected setPageStart(item: any): any {
        this.pageStart = item === undefined ? 0 : item.id;
    }
}

export class CSupplierContact extends CUqBase {

    @observable pageSupplierContact: PageSupplierContact;
    protected async internalStart() {

    }

    pickAddress = async (context: Context, name: string, value: number): Promise<number> => {
        let cAddress = this.newC(CAddress); // new CAddress(this.cApp, undefined);
        return await cAddress.call<number>();
    }

    //添加联系人
    showCreateSupplierContact = (model: any) => {
        let param: SupplierItem = {
            parent: model,
            item: undefined,
            child: undefined,
        }
        this.openVPage(VSupplierContact, param);
    }

    showEditSupplierContact = async (model: any, supplier: any) => {
        model.isDefault = model.defaultContact === 1 ? true : false;
        model.isFinance = model.financeContact === 1 ? true : false;
        model.isInquiry = model.inquiryContact === 1 ? true : false;
        let param: SupplierItem = {
            parent: supplier,
            item: model,
            child: model,
        }
        this.openVPage(VSupplierContact, param);
    }

    showSupplierContactDetail = async (model: any, supplier: any) => {
        let param: SupplierItem = {
            parent: supplier,
            item: model,
            child: model,
        }
        this.openVPage(VSupplierContactDetail, param);
    }

    saveSupplierContact = async (id: number, param: any, parent: any) => {
        let { name, firstName, lastName, gender, salutation, position, departmentName, telephone, mobile, email, fax, zipCode, wechatId, addressString, address, isDefault, isFinance, isInquiry } = param;
        let parrm = { name: name, firstName: firstName, lastName: lastName, gender: gender, salutation: salutation, departmentName: departmentName, telephone: telephone, mobile: mobile, email: email, fax: fax, zipCode: zipCode, wechatId: wechatId, addressString: addressString, address: address, supplier: parent.id, isValid: 1, position: position };
        let result = await this.uqs.rms.SupplierContact.save(id, parrm);
        if (id === undefined) {
            id = result.id;
        }
        if (isDefault === true) {
            parent.defaultContact = id;
        } else {
            if (parent.defaultContact !== undefined) {
                if (parent.defaultContact.id === id) {
                    parent.defaultContact = undefined;
                }
            }
        }
        if (isInquiry === true) {
            parent.inquiryContact = id;
        } else {
            if (parent.inquiryContact !== undefined) {
                if (parent.inquiryContact.id === id) {
                    parent.inquiryContact = undefined;
                }
            }
        }
        await this.uqs.rms.Supplier.save(parent.id, { no: parent.no, name: parent.name, abbreviation: parent.abbreviation, webSite: parent.webSite, address: parent.address, addressString: parent.addressString, productionAddress: parent.productionAddress, profile: parent.profile, taxNo: parent.taxNo, isValid: 1, defaultContact: parent.defaultContact, inquiryContact: parent.inquiryContact });
        await this.uqs.rms.SupplierFinanceContact.del({ supplier: parent.id, arr1: [{ financeContact: id }] });
        if (isFinance === true) {
            await this.uqs.rms.SupplierFinanceContact.add({ supplier: parent.id, arr1: [{ financeContact: id }] });
        }
        this.cApp.cSupplier.onSupplierSelected(parent);
        this.closePage();
    }

    updateContactData = async (param: any, parent: any) => {
        let { isDefault, isFinance, inquiryid } = param;
        await this.uqs.rms.SupplierContact.save(param.id, param);
        parent.defaultContact = (isDefault === 1 ? param : undefined);
        parent.inquiryContact = (inquiryid === 1 ? param : undefined);
        await this.uqs.rms.Supplier.save(parent.id, { no: parent.no, name: parent.name, abbreviation: parent.abbreviation, webSite: parent.webSite, address: parent.address, addressString: parent.addressString, productionAddress: parent.productionAddress, profile: parent.profile, taxNo: parent.taxNo, isValid: 1, defaultContact: parent.defaultContact, inquiryContact: parent.inquiryContact });
        await this.uqs.rms.SupplierFinanceContact.del({ supplier: parent.id, arr1: [{ financeContact: param.id }] });
        if (isFinance === 1) {
            await this.uqs.rms.SupplierFinanceContact.add({ supplier: parent.id, arr1: [{ financeContact: param.id }] });
        }
    }

    //联系人列表
    showSupplierContact = async (model: any) => {
        let { id } = model;
        let item = await this.uqs.rms.SearchSupplierContact.query({ _id: id });
        let child = item.ret.length > 0 ? item.ret : undefined;
        let param: SupplierItem = {
            parent: undefined,
            item: item.ret[0],
            child: child,
        }
        this.openVPage(VSupplierDetail, param);
    }

    delSupplierContact = async (supplierContact: any, supplier: any) => {
        let { id } = supplierContact;
        supplierContact.isValid = 0;
        await this.uqs.rms.SupplierContact.save(id, supplierContact);
    }
}