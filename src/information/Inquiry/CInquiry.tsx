import * as React from 'react';
import { View, BoxId, Image, PageItems, Query, Context } from 'tonva';
import { CUqBase } from 'CBase';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { VInquiryList } from './VInquiryList';
import { VInquiryDetail } from './VInquiryDetail';
import { VPackageDetail } from './VPackageDetail';

class PageInquiry extends PageItems<any> {

    private searchInquiry: Query;
    constructor(searchQuery: Query) {
        super();
        this.firstSize = this.pageSize = 14;
        this.searchInquiry = searchQuery;
    }

    protected async loadResults(param: any, pageStart: any, pageSize: number): Promise<{ [name: string]: any[]; }> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchInquiry.page(param, pageStart, pageSize);
        return ret;
    }
    protected setPageStart(item: any): any {
        this.pageStart = item === undefined ? 0 : item.id;
    }
}

export class CInquiry extends CUqBase {

    @observable inquirys: PageInquiry;
    @observable productdata: any;

    async internalStart(param: any) {
        this.searchInquiryByKey(param);
    }

    searchInquiryByKey = async (key: string) => {
        this.inquirys = new PageInquiry(this.uqs.rms.GetInquirySheet);
        this.inquirys.first({ key: key });
    }

    openInquiryDetail = async (id: number) => {

        let inquiry = await this.uqs.rms.InquirySheet.getSheet(id);
        let { data } = inquiry;
        let { inquiryitems } = data;
        let inquiryItemssGrouped = groupByPack(inquiryitems);
        data.InquiryItems = inquiryItemssGrouped;
        this.openVPage(VInquiryDetail, inquiry);
    }

    openPackageDetail = async (item: any) => {
        this.openVPage(VPackageDetail, item);
    }

    renderProduct = (id: BoxId) => {
        return this.renderView(VProductView, id);
    }

    getProduct = async (pid: number) => {
        let product = await this.uqs.rms.SearchProductById.query({ _id: pid });
        this.productdata = product.ret[0];
        return product.ret[0];
    }

    loadList = async () => {
        await this.searchInquiryByKey("");
    }

    render = observer(() => {
        return this.renderView(VInquiryList);
    })

    tab = () => {
        return <this.render />;
    }
}

export class VProductView extends View<CInquiry> {

    render(param: any): JSX.Element {
        let { controller } = this;
        controller.getProduct(param);
        return <this.contentagency pid={param} />
    }
    protected contentagency = observer((param: any) => {
        let LocationUI;
        let pro = this.controller.productdata;
        if (pro !== undefined) {
            let { description, CAS, purity } = pro;
            LocationUI = <span className="text-muted small">{description}&nbsp;&nbsp;{CAS}&nbsp;&nbsp;{purity}</span>;
        }
        return LocationUI;
    });
}

export function groupByPack(packItems: any[]) {
    let iresult: any[] = [];
    for (let packItem of packItems) {
        let { product, inquiryQuantity, inquiryRadiox, inquiryRadioy, inquiryUnit, inquirypurity, itemuser, itemcreateDate, quantity, radiox, radioy, unit, purity, listPrice, price
            , currency, isTaxIn, isTransFeeIn, transFee, transFeecurrency, packingFee, packingcurrency, otherFee, otherFeecurrency, customizeUpto, validUpto
            , minArriveDate, maxArriveDate, invoiceType, vatRate, tariffRate, packType, inquiryRemarks, remarks, coaFilePath, msdsFilePath, quotationFilePath, notProvidedReason, isUsed, result } = packItem;
        let packRow: any = {
            inquiryQuantity: inquiryQuantity,
            pack: (inquiryRadiox !== 1) ? <>{inquiryRadiox} * {inquiryRadioy}</> : <>{inquiryRadioy}</>,
            inquiryUnit: inquiryUnit,
            inquirypurity: inquirypurity,
            quantity: quantity,
            radio: (radiox !== 1) ? <>{radiox} * {radioy}</> : <>{radioy}</>,
            unit: unit,
            purity: purity,
            itemuser: itemuser,
            itemcreateDate: itemcreateDate,
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
            otherFeecurrency: otherFeecurrency,
            customizeUpto: customizeUpto,
            validUpto: validUpto,
            minArriveDate: minArriveDate,
            maxArriveDate: maxArriveDate,
            invoiceType: invoiceType,
            vatRate: vatRate,
            tariffRate: tariffRate,
            packType: packType,
            inquiryRemarks: inquiryRemarks,
            coaFilePath: coaFilePath,
            msdsFilePath: msdsFilePath,
            quotationFilePath: quotationFilePath,
            notProvidedReason: notProvidedReason,
            isUsed: isUsed,
            result: result,
            remarks: remarks
        }
        let cpi = iresult.find(e => e.product.id === product.id);
        if (cpi === undefined) {
            cpi = { product: product, packs: [] };
            iresult.push(cpi);
        }
        cpi.packs.push(packRow);
    }
    return iresult;
}