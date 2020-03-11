import * as React from 'react';
import { View, BoxId, Image, PageItems, Query, Context } from 'tonva';
import { CUqBase } from 'CBase';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { VAddProduct } from './VAddProduct';
import { VProductDetail } from './VProductDetail';
import { VProductList } from './VProductList';
import { CPickSupplier } from 'information/supplier/CPickSupplier';
import { CChemical } from './CChemical';
import { CBrand } from './CBrand';
import { SupplierItem } from "model/supplierItem";

class PageProduct extends PageItems<any> {

    private searchProduct: Query;
    constructor(searchQuery: Query) {
        super();
        this.firstSize = this.pageSize = 10;
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
    chemical: any;
    supplier: any;

    async internalStart(param: any) {
        this.searchProductByKey(param);
        //this.openVPage(VProductList);
    }

    searchProductByKey = async (key: string) => {
        this.products = new PageProduct(this.uqs.rms.SearchProduct);
        this.products.first({ key: key });
    }

    pickSupplier = async (context: Context, name: string, value: number): Promise<number> => {
        let cPickSupplier = this.newC(CPickSupplier);
        return await cPickSupplier.call<number>();
    }

    pickBrand = async (context: Context, name: string, value: number): Promise<number> => {
        let cBrand = this.newC(CBrand);
        return await cBrand.call<number>();
    }

    pickChemical = async (): Promise<any> => {
        let mode: any = await this.cApp.cChemical.call();
    }

    saveProductData = async (product: any) => {

        if (product.id === undefined) {
            if (this.chemical) {
                let { id, CAS, description, descriptoinCN, molecularFomula, molecularWeight } = this.chemical;
                product.description = description;
                product.descriptionC = descriptoinCN;
                product.createTime = Date.now();
                product.isTrue = 1;
                product.defaultContact = undefined;
                let result = await this.uqs.rms.Product.save(undefined, product);
                await this.uqs.rms.RsProductChemical.add({ product: result.id, arr1: [{ chemical: id, CAS: CAS, molecularFomula: molecularFomula, molecularWeight: molecularWeight, purity: product.purity }] });
            }
        }
        this.closePage();
        await this.loadList();
    }

    updateProductData = async (productdata: any, purity: any) => {

        if (productdata) {
            productdata.isTrue = 1;
            let { chemical } = productdata;
            await this.uqs.rms.Product.save(productdata.id, productdata);
            await this.uqs.rms.RsProductChemical.add({ product: productdata.id, arr1: [{ chemical: chemical.id, CAS: productdata.CAS, molecularFomula: productdata.molecularFomula, molecularWeight: productdata.molecularWeight, purity: purity }] });
        }
        this.closePage();
        await this.loadList();
    }

    /**
    * 打开新建界面
    */
    onNewProduct = async (model: any, supplier?: any) => {
        this.chemical = model;
        this.supplier = supplier;
        this.openVPage(VAddProduct, { product: undefined });
    }

    /**
    * 打开详情界面
    */
    showProductDetail = async (model: any) => {
        let { id } = model;
        let pitem = await this.uqs.rms.GetPack.query({ _id: id });
        let param: SupplierItem = {
            parent: model,
            item: pitem.ret[0],
            child: pitem.ret,
        }
        this.openVPage(VProductDetail, param);
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

    delProduct = async (product: any) => {
        let { id } = product;
        product.isTrue = 0;
        await this.uqs.rms.Product.save(id, product);
    }

    delPakage = async (ppackage: any) => {
        let { id, product } = ppackage;
        let param = {
            radiox: ppackage.radiox,
            radioy: ppackage.radioy,
            unit: ppackage.unit,
            type: ppackage.type,
            isValid: 0,
        }
        let result = await this.uqs.rms.Product.saveArr("Pack", product.id, id, param);
    }
}
