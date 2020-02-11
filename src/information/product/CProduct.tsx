import * as React from 'react';
import { View, BoxId, Image, PageItems, Query, Context } from 'tonva';
import { CUqBase } from 'CBase';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { VProduct } from './VProduct';
import { VProductList } from './VProductList';
import { CSupplier } from 'information/supplier/CSupplier';

class PageProduct extends PageItems<any> {

    private searchProduct: Query;
    constructor(searchQuery: Query) {
        super();
        this.firstSize = this.pageSize = 14;
        this.searchProduct = searchQuery;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchProduct.page(param, pageStart, pageSize);
        return ret;
    }
    protected setPageStart(item: any): any {
        this.pageStart = item === undefined ? 0 : item.id;
    }
}

export class CProduct extends CUqBase {

    @observable products: PageProduct;

    async internalStart(param: any) {
        this.searchProductByKey(param);
        this.openVPage(VProductList);
    }

    searchProductByKey = async (key: string) => {
        this.products = new PageProduct(this.uqs.rms.SearchProduct);
        this.products.first({ key: key });
    }

    pickSupplier = async (context: Context, name: string, value: number): Promise<number> => {
        let cSupplier = this.newC(CSupplier);
        return await cSupplier.call<number>();
    }

    saveProductData = async (product: any) => {

        if (product.id === undefined) {
            product.createTime = Date.now();
            product.defaultContact = undefined;
            await this.uqs.rms.Product.save(undefined, product);
        } else {
            await this.uqs.rms.Product.save(product.id, product);
        }
        await this.searchProductByKey("");
    }

    /**
    * 打开新建界面
    */
    onNewProduct = async () => {
        this.openVPage(VProduct, { description: undefined });
    }

    /**
    * 打开编辑界面
    */
    onEditProduct = async (product: any) => {
        this.openVPage(VProduct, product);
    }

    loadList = async () => {
        await this.searchProductByKey("");
    }

    render = observer(() => {
        return this.renderView(VProductList);
    })

    tab = () => {
        return <this.render />;
    }
}