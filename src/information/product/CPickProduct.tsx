import * as React from 'react';
import { View, BoxId, Image, PageItems, Query } from 'tonva';
import { CUqBase } from 'CBase';
import { nav } from 'tonva';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import iconj from '../images/icon.jpg';
import { VPickProduct } from './VPickProduct';

class PageProduct extends PageItems<any> {

    private searchProduct: Query;
    constructor(searchQuery: Query) {
        super();
        this.firstSize = this.pageSize = 14;
        this.searchProduct = searchQuery;
    }

    protected async loadResults(param: any, pageStart: any, pageSize: number): Promise<{ [name: string]: any[]; }> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchProduct.page(param, pageStart, pageSize);
        return ret;
    }
    protected setPageStart(item: any): any {
        this.pageStart = item === undefined ? 0 : item.id;
    }
}

export class CPickProduct extends CUqBase {

    @observable products: PageProduct;

    async internalStart(param: any) {
        this.searchProductByKey(param);
        this.openVPage(VPickProduct);
    }

    searchProductByKey = async (key: string) => {
        this.products = new PageProduct(this.uqs.rms.SearchProduct);
        this.products.first({ key: key, pickType: undefined });
    }

}