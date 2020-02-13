import * as React from 'react';
import { View, BoxId, Image, PageItems, Query } from 'tonva';
import { CUqBase } from 'CBase';
import { nav } from 'tonva';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import iconj from '../images/icon.jpg';
import { SupplierItem } from "model/supplierItem";
import { VPickSupplier } from './VPickSupplier';

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

export class CPickSupplier extends CUqBase {

    @observable suppliers: PageSupplier;

    async internalStart(param: any) {
        this.searchSupplierByKey(param);
        this.openVPage(VPickSupplier);
    }

    searchSupplierByKey = async (key: string) => {
        this.suppliers = new PageSupplier(this.uqs.rms.SearchSupplier);
        this.suppliers.first({ key: key });
    }

    returnSupplier = (model: any) => {
        this.returnCall(model);
    }

}