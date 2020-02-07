import * as React from 'react';
import { View, BoxId, Image, Query, PageItems } from 'tonva';
import { CUqBase } from 'CBase';
import { nav } from 'tonva';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { VSupplierContact } from "./VSupplierContact";
import { VSupplierDetail } from "../supplier/VSupplierDetail";
import { SupplierItem } from "model/supplierItem";

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

    searchSupplierContactByKey = async (key: string) => {
        this.pageSupplierContact = new PageSupplierContact(await this.uqs.rms.SupplierContact.search("", 0, 100));
        this.pageSupplierContact.first({ key: key });
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

    showEiditSupplierContact = async (model: any) => {
        this.openVPage(VSupplierContact, model);
    }

    saveSupplierContact = async (id: number, param: any, parent: any) => {
        let { no, name, firstName, lastName, isDefault } = param;
        let parrm = { no: no, name: name, firstName: firstName, lastName: lastName, supplier: parent.id, isDefault: isDefault, isValid: 1 };
        let result = await this.uqs.rms.SupplierContact.save(id, parrm);
        await this.loadList();
    }

    delSupplierContact = async (model: any) => {
        let { id, no, name, firstName, lastName, supplier } = model;
        await this.uqs.rms.SupplierContact.save(id, { no: no, name: name, firstName: firstName, lastName: lastName, supplier: supplier });
    }

    loadList = async () => {
        await this.searchSupplierContactByKey("");
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
}