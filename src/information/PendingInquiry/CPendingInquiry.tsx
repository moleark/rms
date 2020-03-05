import * as React from 'react';
import { View, BoxId, Image, PageItems, Query, Context } from 'tonva';
import { CUqBase } from 'CBase';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { VPendingInquiryList } from './VPendingInquiryList';
import { VPendingInquiryDetail } from './VPendingInquiryDetail';
import { SupplierItem } from "model/supplierItem";
import { CCurrency } from '../PendingInquiry/CCurrency';
import { VPendingInquiryResult } from '../PendingInquiry/VPendingInquiryResult';

class PagePendingInquiry extends PageItems<any> {

    private searchPendingInquiry: Query;
    constructor(searchQuery: Query) {
        super();
        this.firstSize = this.pageSize = 14;
        this.searchPendingInquiry = searchQuery;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchPendingInquiry.page(param, pageStart, pageSize);
        return ret;
    }
    protected setPageStart(item: any): any {
        this.pageStart = item === undefined ? 0 : item.id;
    }
}

export class CPendingInquiry extends CUqBase {

    @observable pendingInquirys: PagePendingInquiry;
    @observable pendingInquiryList: PagePendingInquiry;
    product: any;

    async internalStart(param: any) {
        this.searchPendingInquiryByKey(param);
    }

    searchPendingInquiryByKey = async (key: string) => {
        this.pendingInquirys = new PagePendingInquiry(this.uqs.rms.SearchInquiryPending);
        this.pendingInquirys.first({ key: key });
    }

    savePendingInquiryData = async (model: any) => {

        if (model.id === undefined) {
            if (this.product) {
                let { id, supplier } = this.product;
                let { id: supplierid } = supplier;
                let { quantity, radiox, radioy, unit } = model;
                let param = {
                    supplier: supplierid,
                    product: id,
                    quantity: quantity,
                    radiox: radiox,
                    radioy: radioy,
                    unit: unit,
                };
                await this.uqs.rms.AddInquiryPending.submit(param);
            }
        }
        this.closePage();
        await this.loadList();
    }

    getDataForSave = (pending: any, items: any[]) => {

        let { contact, contactName, contactSalutation, contactDepartmentName, contactTelephone, contactMobile, contactEmail, contactfax, user, date, inquiryDate, inquiryUser, supplier, way } = pending;
        let inquiryItems: any[] = [];
        items.forEach(pk => {
            if (pk.jsonStr === undefined) { return; };
            let pack = JSON.parse(pk.jsonStr);
            inquiryItems.push({
                product: pk.product, inquiryQuantity: pk.quantity, inquiryRadiox: pk.radiox, inquiryRadioy: pk.radioy, inquiryUnit: pk.unit, itemuser: pk.user, itemcreateDate: pk.createDate
                , quantity: pack.quantity, radiox: pack.radiox, radioy: pack.radioy, unit: pack.unit, listPrice: pack.listPrice, price: pack.price, currency: pack.currency
                , isTaxIn: pack.isTaxIn, isTransFeeIn: pack.isTransFeeIn, transFee: pack.transFee, transFeecurrency: pack.transFeecurrency, packingFee: pack.packingFee
                , packingcurrency: pack.packingcurrency, otherFee: pack.otherFee, customized: pack.customized, customizeUpto: pack.customizeUpto, validUpto: pack.validUpto
                , minArriveDate: pack.minArriveDate, maxArriveDate: pack.maxArriveDate, invoiceType: pack.invoiceType, vatRate: pack.vatRate, tariffRate: pack.tariffRate
                , packType: pack.packType, coaFilePath: pack.coaFilePath, msdsFilePath: pack.msdsFilePath, quotationFilePath: pack.quotationFilePath
                , inquiryRemarks: pack.remarks, remarks: pk.inquiryRemarks, result: pack.result
            })
        });
        return {
            supplier: supplier,
            contact: contact,
            contactName: contactName,
            contactSalutation: contactSalutation,
            contactDepartmentName: contactDepartmentName,
            contactTelephone: contactTelephone,
            contactMobile: contactMobile,
            contactEmail: contactEmail,
            contactfax: contactfax,
            way: way,
            user: user,
            createDate: date,
            inquiryUser: inquiryUser,
            inquiryDate: inquiryDate,
            inquiryitems: inquiryItems,
        }
    }

    saveInquiryData = async (pending: any, packageList: any[]) => {

        let { id } = pending;
        //保存sheet和保存history
        let result: any = await this.uqs.rms.InquirySheet.save("InquirySheet", this.getDataForSave(pending, packageList));
        // await this.uqs.rms.InquirySheet.action(result.id, result.flow, result.state, "submit");
        if (result) {
            //删除pending及其明细
            let param = {
                id: id,
            };
            await this.uqs.rms.DeleteInquiryPending.submit(param);
        }

        this.closePage();
        await this.loadList();
    }

    saveInquiryPackage = async (model: any, inquiry: any) => {

        if (inquiry) {
            //更新包装结果
            let { id, inquiryPackage, user, createDate, inquiryRemarks, jsonStr } = inquiry;
            let { product } = inquiryPackage.obj;
            await this.uqs.rms.InquiryPendingItem.add({ inquiryPending: id, arr1: [{ inquiryPackage: inquiryPackage.id, user: user.id, createDate: createDate, remarks: inquiryRemarks, jsonStr: JSON.stringify(model) }] });

            //更新包装价格
            let { quantity, radiox, radioy, unit, listPrice, price, currency, isTaxIn, isTransFeeIn, transFee, transFeecurrency, packingFee, packingcurrency, otherFee, customized, customizeUpto, validUpto, minArriveDate, maxArriveDate, invoiceType, vatRate, tariffRate, packType, remarks: rremarks, coaFilePath, msdsFilePath, quotationFilePath, result } = model;
            let param = {
                product: product,
                quantity: quantity,
                radiox: radiox,
                radioy: radioy,
                unit: unit,
                listPrice: listPrice,
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
                packType: packType,
                remarks: rremarks,
                coaFilePath: coaFilePath,
                msdsFilePath: msdsFilePath,
                quotationFilePath: quotationFilePath,
            };
            await this.uqs.rms.AddPackagePrice.submit(param);
        }
        this.closePage();
        await this.loadList();
    }

    /**
    * 打开详情界面
    */
    onShowPendingInquiryDetail = async (item: any) => {
        let { id } = item;
        let pitem = await this.uqs.rms.SearchInquiryPendingBySupplier.query({ _id: id });
        let param: SupplierItem = {
            parent: item,
            item: pitem.ret[0],
            child: pitem.ret,
        }
        this.openVPage(VPendingInquiryDetail, param);
    }

    pickCurrency = async (context: Context, name: string, value: number): Promise<number> => {
        let cCurrency = this.newC(CCurrency);
        return await cCurrency.call<number>();
    }

    openPendingInquiryResult = async (item: any) => {
        let { id, inquiryPackage } = item;
        let packages = await this.uqs.rms.InquiryPendingItem.table({ inquiryPending: id, inquiryPackage: inquiryPackage.id });
        let { inquiryPending: newinquiryPending, inquiryPackage: newinquiryPackage, user, createDate, jsonStr: newjsonStr } = packages[0];
        let model;
        if (newjsonStr === undefined) {
            model = item;
        } else {
            model = JSON.parse(newjsonStr);
            model.inquiryPending = newinquiryPending;
            model.inquiryPackage = newinquiryPackage;
            model.user = user;
            model.createDate = createDate;
        }
        this.openVPage(VPendingInquiryResult, model);
    }

    loadList = async () => {
        await this.searchPendingInquiryByKey("");
    }

    render = observer(() => {
        return this.renderView(VPendingInquiryList);
    })

    tab = () => {
        return <this.render />;
    }
}
