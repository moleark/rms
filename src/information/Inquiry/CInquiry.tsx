import * as React from 'react';
import { View, BoxId, Image, PageItems, Query, Context } from 'tonva';
import { CUqBase } from 'CBase';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { VInquiryList } from './VInquiryList';
import { VInquiryDetail } from './VInquiryDetail';
import { VInquiry } from './VInquiry';
import { CCurrency } from './CCurrency';

class PageInquiry extends PageItems<any> {

    private searchInquiry: Query;
    constructor(searchQuery: Query) {
        super();
        this.firstSize = this.pageSize = 14;
        this.searchInquiry = searchQuery;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchInquiry.page(param, pageStart, pageSize);
        return ret;
    }
    protected setPageStart(item: any): any {
        this.pageStart = item === undefined ? 0 : item.id;
    }
}

export class CInquiry extends CUqBase {

    @observable inquirys: any;
    @observable productdata: any;

    async internalStart(param: any) {
        this.searchInquiryByKey(param);
    }

    searchInquiryByKey = async (key: string) => {
        this.inquirys = await this.uqs.rms.GetInquirySheet.table(undefined);;
    }

    openInquiryDetail = async (id: number) => {

        let inquiry = await this.uqs.rms.InquirySheet.getSheet(id);
        let { data } = inquiry;
        let { inquiryitems } = data;
        let inquiryItemssGrouped = groupByPack(inquiryitems);
        data.InquiryItems = inquiryItemssGrouped;
        this.openVPage(VInquiryDetail, inquiry);
    }

    openInquiry = async (item: any) => {
        this.openVPage(VInquiry, item);
    }

    pickCurrency = async (context: Context, name: string, value: number): Promise<number> => {
        let cCurrency = this.newC(CCurrency);
        return await cCurrency.call<number>();
    }

    renderProduct = (id: BoxId) => {
        return this.renderView(VProductView, id);
    }

    getProduct = async (pid: number) => {
        let product = await this.uqs.rms.SearchProductById.query({ _id: pid });
        this.productdata = product.ret[0];
        return product.ret[0];
    }

    saveInquiryData = async (model: any, product: any) => {
        let { quantity, radiox, radioy, unit, listPrice, price, currency, isTaxIn, isTransFeeIn, transFee, transFeecurrency, packingFee, packingcurrency, otherFee, customized, customizeUpto, validUpto, minArriveDate, maxArriveDate, invoiceType, vatRate, tariffRate, packType, remarks, coaFilePath, msdsFilePath, quotationFilePath } = model;
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
            remarks: remarks,
            coaFilePath: coaFilePath,
            msdsFilePath: msdsFilePath,
            quotationFilePath: quotationFilePath,
        };
        await this.uqs.rms.AddInquiryResultHistory.submit(param);
        this.closePage();
        await this.loadList();
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
            let { description, CAS } = pro;
            LocationUI = <span className="text-muted small">{description}&nbsp;{CAS}</span>;
        }
        return LocationUI;
    });
}

export function groupByPack(packItems: any[]) {
    let result: any[] = [];
    for (let packItem of packItems) {
        let { product, pack, quantity, radiox, radioy, unit } = packItem;
        let packRow: any = {
            pack: pack,
            quantity: quantity,
            radio: (radiox !== 1) ? <>{radiox} * {radioy}{unit}</> : <>{radioy}{unit}</>
        }
        let cpi = result.find(e => e.product.id === product.id);
        if (cpi === undefined) {
            cpi = { product: product, packs: [] };
            result.push(cpi);
        }
        cpi.packs.push(packRow);
    }
    return result;
}