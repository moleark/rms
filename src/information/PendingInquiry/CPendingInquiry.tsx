import * as React from 'react';
import { View, BoxId, Image, PageItems, Query, Context } from 'tonva';
import { CUqBase } from 'CBase';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { VPendingInquiry } from './VPendingInquiry';
import { VPendingInquiryList } from './VPendingInquiryList';
import { VPendingInquiryDetail } from './VPendingInquiryDetail';
import { SupplierItem } from "model/supplierItem";

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

    pickProduct = async (): Promise<any> => {
        let mode: any = await this.cApp.cPickProduct.call();
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

    deletePendingInquiryData = async (id: number) => {

        let param = {
            id: id,
        };
        await this.uqs.rms.DeleteInquiryPending.submit(param);
        this.closePage();
        await this.loadList();
    }

    /**
    * 打开新建界面
    */
    onNewPendingInquiry = async (model: any) => {
        this.product = model;
        this.openVPage(VPendingInquiry, { pendingInquiry: undefined });
    }

    /**
    * 打开详情界面
    */
    onShowPendingInquiryDetail = async (supplier: any) => {
        let { id } = supplier;
        let pitem = await this.uqs.rms.SearchInquiryPendingBySupplier.query({ _id: id });
        let param: SupplierItem = {
            parent: supplier,
            item: pitem.ret[0],
            child: pitem.ret,
        }
        this.openVPage(VPendingInquiryDetail, param);
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
