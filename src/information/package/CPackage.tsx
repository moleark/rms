import * as React from 'react';
import { View, BoxId, Image, Query, PageItems, Context } from 'tonva';
import { CUqBase } from 'CBase';
import { nav } from 'tonva';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { VPackage } from "./VPackage";
import { VPackageDetail } from "./VPackageDetail";
import { VProductDetail } from "../product/VProductDetail";
import { SupplierItem } from "model/supplierItem";

class PagePackage extends PageItems<any> {
    private searchPackage: Query;
    constructor(searchQuery: Query) {
        super();
        this.firstSize = this.pageSize = 14;
        this.searchPackage = searchQuery;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchPackage.page(param, pageStart, pageSize);
        return ret;
    }
    protected setPageStart(item: any): any {
        this.pageStart = item === undefined ? 0 : item.id;
    }
}

export class CPackage extends CUqBase {

    @observable pagePackage: PagePackage;
    protected async internalStart() {
    }

    searchPackageByKey = async (parent: any, key: string) => {
        this.pagePackage = new PagePackage(await this.uqs.rms.GetPack.query({ _id: parent.id }));
        this.pagePackage.first({ key: key });
    }

    //添加联系人
    showCreatePackage = (model: any) => {
        let param: SupplierItem = {
            parent: model,
            item: undefined,
            child: undefined,
        }
        this.openVPage(VPackage, param);
    }

    showEditPackage = async (parent: any, model: any) => {
        let param: SupplierItem = {
            parent: parent,
            item: model,
            child: model,
        }
        this.openVPage(VPackage, param);
    }

    showPackageDetail = async (model: any) => {
        this.openVPage(VPackageDetail, model);
    }

    savePackage = async (id: number, param: any, parent: any) => {
        // await this.uqs.rms.Product.saveArr("Pack", parent.id, id, param);
        let { quantity, radiox, radioy, unit, price, currency, isTaxIn, isTransFeeIn, transFee, transFeecurrency, packingFee, packingcurrency, otherFee, customized, customizeUpto, validUpto, minArriveDate, maxArriveDate, invoiceType, vatRate, tariffRate, type } = param;
        let paramn = {
            product: parent,
            quantity: 1,
            radiox: radiox,
            radioy: radioy,
            unit: unit,
            price: price,
            currency: currency,
            isTaxIn: isTaxIn,
            isTransFeeIn: isTransFeeIn,
            transFee: transFee,
            transFeecurrency: transFeecurrency,
            packingFee: packingFee,
            packingcurrency: packingcurrency,
            otherFee: otherFee,
            customized: customized,
            customizeUpto: customizeUpto,
            validUpto: validUpto,
            minArriveDate: minArriveDate,
            maxArriveDate: maxArriveDate,
            invoiceType: invoiceType,
            vatRate: vatRate,
            tariffRate: tariffRate,
            type: type,
        };
        await this.uqs.rms.AddPackage.submit(paramn);
        this.closePage();
    }

    loadList = async (parent: any) => {
        await this.cApp.cSupplier.onSupplierSelected(parent);
    }

    //包装列表
    showPackage = async (model: any) => {
        let { id } = model;
        let item = await this.uqs.rms.GetPack.query({ _id: id });
        let child = item.ret.length > 0 ? item.ret : undefined;
        let param: SupplierItem = {
            parent: undefined,
            item: item.ret[0],
            child: child,
        }
        this.openVPage(VProductDetail, param);
    }
}