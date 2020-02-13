import * as React from 'react';
import { View, BoxId, Image, PageItems, Query } from 'tonva';
import { CUqBase } from 'CBase';
import { nav } from 'tonva';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { VBrand } from './VBrand';
import { VPickBrand } from './VPickBrand';

class PageBrand extends PageItems<any> {

    private searchBrand: Query;
    constructor(searchQuery: Query) {
        super();
        this.firstSize = this.pageSize = 14;
        this.searchBrand = searchQuery;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchBrand.page(param, pageStart, pageSize);
        return ret;
    }
    protected setPageStart(item: any): any {
        this.pageStart = item === undefined ? 0 : item.id;
    }
}

export class CBrand extends CUqBase {

    @observable brands: PageBrand;

    async internalStart(param: any) {
        this.searchBrandByKey(param);
        this.openVPage(VPickBrand);
    }

    searchBrandByKey = async (key: string) => {
        this.brands = new PageBrand(this.uqs.rms.SearchBrand);
        this.brands.first({ key: key });
    }

    saveBrandData = async (brand: any) => {

        if (brand.id === undefined) {
            await this.uqs.rms.Brand.save(undefined, brand);
        } else {
            await this.uqs.rms.Brand.save(brand.id, brand);
        }
        this.closePage();
        await this.searchBrandByKey("");
    }

    /**
    * 打开新建界面
    */
    onNewBrand = async () => {
        this.openVPage(VBrand, { description: undefined });
    }

    /**
    * 打开编辑界面
    */
    onEditBrand = async (brand: any) => {
        this.openVPage(VBrand, brand);
    }

    returnBrand = (model: any) => {
        this.returnCall(model);
    }
}