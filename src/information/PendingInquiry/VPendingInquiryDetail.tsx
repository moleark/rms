import * as React from 'react';
import { VPage, Page, FA, EasyDate, tv, LMR, List, Schema, UiSchema, UiRadio, Form, Context } from 'tonva';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { CPendingInquiry } from './CPendingInquiry';

export class VPendingInquiryDetail extends VPage<CPendingInquiry> {
    private pending: any;
    private firstPackage: any;
    private packages: any[] = [];
    private model: any;

    async open(param: any) {
        this.model = param;
        let { parent, item, child } = param;
        this.pending = parent;
        this.firstPackage = item;
        this.packages = child;
        this.openPage(this.page);
    }

    private getPackage = () => {
        return <div>
            {this.firstPackage && <List items={this.packages} item={{ render: this.renderPackage }} />}
        </div>
    }

    private renderPackage = (item: any, index: number) => {

        let { id, inquiryPackage, user, createDate, product, quantity, radiox, radioy, unit, CAS, purity, inquiryRemarks } = item;
        let { brand, description, descriptionC } = product.obj;
        let radio = (radiox !== 1) ? <>{radiox} * {radioy}{unit}</> : <>{radioy}{unit}</>;
        let brandname = brand === undefined ? undefined : brand.obj.name;

        let right =
            <div className="px-2 text-muted text-right">
                <span><FA className="align-middle p-2 cursor-pointer text-info" name="edit" /></span>
            </div>;
        return <LMR right={right} className="p-1 d-flex cursor-pointer" onClick={() => this.controller.openPendingInquiryResult(item)}>
            <div><FA name="caret-right" className="px-2 text-primary"></FA>{CAS}&nbsp;&nbsp;{quantity} * {radio}</div>
            <div className="px-4 text-muted">{description}</div>
            <div className="px-4 text-muted"><span className="text-muted small">{inquiryRemarks}</span></div>
        </LMR>;
    }

    private rowEnd = () => {
        return this.firstPackage && <div>
            <div className="text-center py-2">
                <button className="btn btn-sm btn-primary" onClick={() => this.onEndInquiry()}>
                    <span className="px-2"><FA className="text-warning px-1" name="user" /><b>完结询价</b></span>
                    <span className="px-2"><FA name="chevron-right fa-1x" /></span>
                </button>
            </div>
        </div >;
    }

    private onEndInquiry = async () => {
        if (await this.vCall(VConfirmEndInquiry, this.pending) === true) {
            await this.controller.saveInquiryData(this.pending, this.packages);
            await this.controller.loadList();
            this.closePage();
        };
    }

    private rowTop = (suppplierData: any) => {

        let { supplier, contactName, contactSalutation, contactDepartmentName, contactTelephone, contactMobile, contactEmail, contactfax, way, inquiryUser, inquiryDate, user, date, remarks } = suppplierData;
        let { id } = user;
        let { id: inid } = inquiryUser;


        return <div className="bg-white py-2">
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">供应商:</div><div className="col-9"><b>{tv(supplier, v => <>{v.name}</>)}</b></div>
            </div>
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">联系人:</div><div className="col-9">{contactName}&nbsp;{contactTelephone}&nbsp;{contactMobile}&nbsp;{contactEmail}</div>
            </div>
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">创建人:</div><div className="col-9">{id}&nbsp;<EasyDate date={date} /></div>
            </div>
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">询价人:</div><div className="col-9">{inid}&nbsp;{way === 1 ? "Email询价" : (way === 2 ? "电话询价" : "传真询价")} <EasyDate date={inquiryDate} /></div>
            </div>
        </div>;
    }

    private page = () => {
        let suppplierData = _.clone(this.pending);

        return <Page header="询价详情" headerClassName="py-1 bg-primary">
            {this.rowTop(suppplierData)}
            {this.rowEnd()}
            {this.getPackage()}
        </Page >
    }
}

class VConfirmEndInquiry extends VPage<CPendingInquiry> {
    async open(inquiry: any) {
        this.openPage(this.page, inquiry);
    }

    private onConfirm = async () => {
        await this.returnCall(true);
        this.closePage();
    }

    private onCancel = async () => {
        await this.returnCall(false);
        this.closePage();
    }

    private page = (inquiry: any) => {
        return <Page header="完结询单" back="close" headerClassName="bg-primary">
            <div className="w-75 mx-auto border border-primary rounded my-3 p-3 bg-white">
                <div className="p-4 position-relative">
                    <i className="fa fa-question-circle position-absolute fa-2x text-warning" style={{ left: 0, top: 0 }} />
                    <b className="">是否完结询单？</b>
                </div>
                <div className="d-flex mt-3 justify-content-end">
                    <button className="btn btn-danger mr-3" onClick={this.onConfirm}>完结</button>
                    <button className="btn btn-outline-info mr-3" onClick={this.onCancel}>取消</button>
                </div>
            </div>
        </Page>;
    }
}