import * as React from 'react';
import { View, BoxId, Image, PageItems, Query, Context } from 'tonva';
import { CUqBase } from 'CBase';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { VNewPendingInquiry } from './VNewPendingInquiry';
import { VPendingInquiry } from './VPendingInquiry';
import { VNewPendingInquiryList } from './VNewPendingInquiryList';
import { VNewPendingInquiryDetail } from './VNewPendingInquiryDetail';
import { SupplierItem } from "model/supplierItem";

class NewPagePendingInquiry extends PageItems<any> {

    private searchNewPendingInquiry: Query;
    constructor(searchQuery: Query) {
        super();
        this.firstSize = this.pageSize = 14;
        this.searchNewPendingInquiry = searchQuery;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchNewPendingInquiry.page(param, pageStart, pageSize);
        return ret;
    }
    protected setPageStart(item: any): any {
        this.pageStart = item === undefined ? 0 : item.id;
    }
}

export class CNewPendingInquiry extends CUqBase {

    @observable newpendingInquirys: NewPagePendingInquiry;
    @observable newpendingInquiryList: NewPagePendingInquiry;
    product: any;

    async internalStart(param: any) {
        this.searchNewPendingInquiryByKey(param);
    }

    searchNewPendingInquiryByKey = async (key: string) => {
        this.newpendingInquirys = new NewPagePendingInquiry(this.uqs.rms.SearchNewInquiryPending);
        this.newpendingInquirys.first({ key: key });
    }

    /**
    * 打开新建界面
    */
    onNewPendingInquiry = async (model: any) => {
        this.product = model;
        this.openVPage(VNewPendingInquiry, { pendingInquiry: undefined });
    }

    onPendingInquiry = async (model: any) => {
        this.openVPage(VPendingInquiry, model);
    }

    pickProduct = async (): Promise<any> => {
        let mode: any = await this.cApp.cPickProduct.call();
    }

    saveNewPendingInquiryData = async (model: any) => {

        if (model.id === undefined) {
            if (this.product) {
                let { id, supplier } = this.product;
                let { id: supplierid } = supplier;
                let note;
                let { quantity, radiox, radioy, unit } = model;
                let param = {
                    supplier: supplierid,
                    product: id,
                    quantity: quantity,
                    radiox: radiox,
                    radioy: radioy,
                    unit: unit,
                    remarks: note
                };
                await this.uqs.rms.AddInquiryPending.submit(param);
            }
        }
        this.closePage();
        await this.loadList();
    }

    deletePendingInquiryData = async (item: any) => {
        let { id } = item;
        let param = {
            id: id,
        };
        await this.uqs.rms.DeleteInquiryPending.submit(param);
    }

    deletePendingInquiryPackage = async (pendingid: number, packid: number) => {

        let param = {
            id: pendingid,
            pid: packid,
        };
        await this.uqs.rms.DeleteInquiryPackage.submit(param);
    }

    updatePendingInquiryState = async (model: any, item: any) => {
        let { id, supplier } = item;
        let param = {
            id: id,
            supplier: supplier,
            way: model.way,
            remarks: model.remarks,
        };
        await this.uqs.rms.UpdateInquiryPending.submit(param);
        this.closePage();
        await this.loadList();
    }

    /**
    * 打开详情界面
    */
    onShowNewPendingInquiryDetail = async (item: any) => {
        let { id } = item;
        let pitem = await this.uqs.rms.SearchInquiryPendingBySupplier.query({ _id: id });
        let param: SupplierItem = {
            parent: item,
            item: pitem.ret[0],
            child: pitem.ret,
        }
        this.openVPage(VNewPendingInquiryDetail, param);
    }

    loadList = async () => {
        await this.searchNewPendingInquiryByKey("");
    }

    render = observer(() => {
        return this.renderView(VNewPendingInquiryList);
    })

    tab = () => {
        return <this.render />;
    }
}