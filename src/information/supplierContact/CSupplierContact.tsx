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

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
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

    showEditSupplierContact = async (parent: any, model: any) => {
        let param: SupplierItem = {
            parent: parent,
            item: model,
            child: model,
        }
        this.openVPage(VSupplierContact, param);
    }

    showSupplierContactDetail = async (model: any) => {
        this.openVPage(VSupplierContactDetail, model);
    }

    saveSupplierContact = async (id: number, param: any, parent: any) => {
        let { name, firstName, lastName, gender, salutation, departmentName, telephone, mobile, email, fax, zipCode, wechatId, addressString, address, isDefault } = param;
        let parrm = { name: name, firstName: firstName, lastName: lastName, gender: gender, salutation: salutation, departmentName: departmentName, telephone: telephone, mobile: mobile, email: email, fax: fax, zipCode: zipCode, wechatId: wechatId, addressString: addressString, address: address, supplier: parent.id, isValid: 1 };
        let result = await this.uqs.rms.SupplierContact.save(id, parrm);
        if (isDefault === true) {
            let sid = id;
            if (sid === undefined) {
                sid = result.id;
            }
            await this.uqs.rms.Supplier.save(parent.id, { no: parent.no, name: parent.name, abbreviation: parent.abbreviation, createTime: parent.createTime, isValid: 1, defaultContact: sid });
        }
        this.cApp.cHome.start();
    }

    loadList = async (parent: any) => {
        await this.cApp.cSupplier.onSupplierSelected(parent);
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