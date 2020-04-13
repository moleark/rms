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
import { CStorageRange } from './CStorageRange';
import { CRestrictMark } from './CRestrictMark';
import { VProductProperty } from './VProductProperty';
import { VProductPropertyDetail } from './VProductPropertyDetail';

class PageProduct extends PageItems<any> {

    private searchProduct: Query;
    constructor(searchQuery: Query) {
        super();
        this.firstSize = this.pageSize = 10;
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

export class CProduct extends CUqBase {

    @observable products: PageProduct;
    chemical: any;
    supplier: any;

    async internalStart(param: any) {
        this.searchProductByKey("", param);
        // this.openVPage(VProductList);
    }

    searchProductByKey = async (pickType: string, key: string) => {
        this.products = new PageProduct(this.uqs.rms.SearchProduct);
        this.products.first({ key: key, pickType: pickType });
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

    pickStorageRange = async (context: Context, name: string, value: number): Promise<number> => {
        let cStorageRange = this.newC(CStorageRange);
        return await cStorageRange.call<number>();
    }

    pickRestrictMark = async (product: any, restrictMark: any[]): Promise<any> => {
        let cRestrictMark = this.newC(CRestrictMark);
        // return await cRestrictMark.call<number>();
        let param: SupplierItem = {
            parent: product,
            item: restrictMark === undefined ? undefined : restrictMark[0],
            child: restrictMark,
        }
        await cRestrictMark.call(param);
    }

    saveProductData = async (oldorigin: any, product: any) => {

        if (product.id === undefined) {
            if (this.chemical) {
                let { id, CAS, description, descriptoinCN, molecularFomula, molecularWeight } = this.chemical;
                product.createTime = Date.now();
                product.isTrue = 1;
                product.inquiryContact = undefined;
                let len = CAS.length;
                let newCAS = CAS;
                if (len > 4 && len <= 15) {
                    newCAS = CAS.trim();
                    newCAS = CAS.slice(0, len - 3) + '-' + CAS.slice(len - 3, len - 1) + '-' + CAS.slice(len - 1, len);
                }
                // 同一供应商同品牌不能存在相同的供应商自编号
                let origin = await this.uqs.rms.SearchProductByOrigin.query({ supplier: product.supplier, brand: product.brand, origin: product.origin });
                if (origin.ret.length === 0) {
                    let result = await this.uqs.rms.Product.save(undefined, product);
                    await this.uqs.rms.RsProductChemical.add({ product: result.id, arr1: [{ chemical: id, CAS: newCAS, molecularFomula: molecularFomula, molecularWeight: molecularWeight, purity: product.purity }] });
                }
            }
        }
        this.closePage(2);
        await this.loadList();
    }

    updateProductData = async (productdata: any, oldorigin: any) => {

        if (productdata) {
            productdata.isTrue = 1;
            let { chemical } = productdata;
            // 同一供应商同品牌不能存在相同的供应商自编号
            let origin = await this.uqs.rms.SearchProductByOrigin.query({ supplier: productdata.supplier, brand: productdata.brand, origin: productdata.origin });
            if (origin.ret.length > 0) {
                productdata.origin = oldorigin;
            }
            await this.uqs.rms.Product.save(productdata.id, productdata);
            await this.uqs.rms.RsProductChemical.add({ product: productdata.id, arr1: [{ chemical: chemical.id, CAS: productdata.CAS, molecularFomula: productdata.molecularFomula, molecularWeight: productdata.molecularWeight, purity: productdata.purity }] });
        }
    }

    saveProductProperty = async (property: any, product: any) => {

        if (property.id === undefined) {
            property.product = product;
            let result = await this.uqs.rms.ProductProperty.save(undefined, property);
        }
        this.closePage();
        await this.showProductPropertyDetail(product);
    }

    updatProductPropertyData = async (propertydata: any) => {

        if (propertydata) {
            await this.uqs.rms.ProductProperty.save(propertydata.id, propertydata);
        }
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
        let restrictMark: any[] = await this.uqs.rms.ProductRestrictMark.table({ product: id });
        if (restrictMark.length > 0) {
            let result: any[] = [];
            for (let item of restrictMark) {
                let res = await this.uqs.rms.RestrictMark.load(item.restrictMark.id);
                if (res !== undefined) {
                    result.push(res);
                }
            }
            model.restrictMark = result;
        }
        let param: SupplierItem = {
            parent: model,
            item: pitem.ret[0],
            child: pitem.ret,
        }
        this.openVPage(VProductDetail, param);
    }

    /**
    * 打开产品性质详情界面
    */
    showProductPropertyDetail = async (product: any) => {
        let { id } = product;
        let property = await this.uqs.rms.SearchProductProperty.query({ _id: id });
        if (property.ret.length === 0) {
            this.openVPage(VProductProperty, id);
        } else {
            this.openVPage(VProductPropertyDetail, property.ret[0]);
        }
    }

    loadList = async () => {
        await this.searchProductByKey("", "李");
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
