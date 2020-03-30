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

    protected async loadResults(param: any, pageStart: any, pageSize: number): Promise<{ [name: string]: any[]; }> {
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
        this.openVPage(VNewPendingInquiry, undefined);
    }

    /**
    * 打开修改界面
    */
    onEditPendingInquiry = async (model: any, inquiryPackage: any) => {
        this.product = model;
        if (model !== undefined) {
            inquiryPackage.obj.remarks = model.inquiryRemarks;
        }
        this.openVPage(VNewPendingInquiry, inquiryPackage.obj);
    }

    onPendingInquiry = async (model: any) => {
        this.openVPage(VPendingInquiry, model);
    }

    pickProduct = async (): Promise<any> => {
        let mode: any = await this.cApp.cPickProduct.call();
    }

    saveNewPendingInquiryData = async (model: any) => {
        if (this.product) {
            let { id, supplier } = this.product;
            let { id: supplierid } = supplier;
            let { quantity, radiox, radioy, unit, remarks, purity } = model;
            let param = {
                supplier: supplierid,
                product: id,
                quantity: quantity,
                radiox: radiox,
                radioy: radioy,
                unit: unit,
                purity: purity,
                remarks: remarks
            };
            if (model.id === undefined) {
                await this.uqs.rms.AddInquiryPending.submit(param);
                this.closePage();
                await this.loadList();
            } else {
                let { supplier, inquiryPending, user, createDate, jsonStr, product } = this.product;
                model.supplier = supplier.id;
                model.product = product.obj.id;
                await this.uqs.rms.InquiryPackage.save(model.id, model);
                await this.uqs.rms.InquiryPendingItem.add({ inquiryPending: inquiryPending, arr1: [{ inquiryPackage: model.id, user: user, createDate: createDate, remarks: remarks, jsonStr: jsonStr }] });
                this.closePage();
                await this.onShowNewPendingInquiryDetail(this.product);
            }
        }
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
        };
        await this.uqs.rms.UpdateInquiryPending.submit(param);
        this.closePage(2);
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