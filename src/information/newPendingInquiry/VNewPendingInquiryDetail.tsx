import * as React from 'react';
import { VPage, Page, FA, EasyDate, tv, LMR, List, Schema, UiSchema, UiInputItem, Form, Context, UiRadio } from 'tonva';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { CNewPendingInquiry } from './CNewPendingInquiry';

export class VNewPendingInquiryDetail extends VPage<CNewPendingInquiry> {
    private form: Form;
    private suppplier: any;
    private firstPackage: any;
    private packages: any[] = [];

    async open(param: any) {
        let { parent, item, child } = param;
        this.suppplier = parent;
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
        let { brand, description, descriptionC, origin } = product.obj;
        let name = unit === undefined ? undefined : unit.obj.name;
        let radio = (radiox !== 1) ? <>{radiox} * {radioy}{name}</> : <>{radioy}{name}</>;
        let brandname = brand === undefined ? undefined : brand.obj.name;

        let right =
            <div className="px-2 text-muted text-right">
                <span onClick={() => this.onDelInquiryPackage(item, inquiryPackage)}><FA className="align-middle p-2 cursor-pointer text-danger" name="trash" /></span>
            </div>;
        return <LMR right={right} className="p-1 d-flex cursor-pointer">
            <div onClick={() => this.controller.onEditPendingInquiry(item, inquiryPackage)}>
                <div><FA name="caret-right" className="px-2 text-primary"></FA>{origin} {CAS}&nbsp;&nbsp;{quantity} * {radio}&nbsp;&nbsp;{purity}</div>
                <div className="px-4 text-muted">{description}</div>
                <div className="px-4 text-muted"><span className="text-muted small">{inquiryRemarks}</span></div>
            </div>
        </LMR>;
    }

    private rowTop = (suppplierData: any) => {

        let { supplier, user, date } = suppplierData;
        let { id } = user;
        let { inquiryContact, defaultContact } = supplier.obj;
        let cont = inquiryContact === undefined ? defaultContact : inquiryContact;
        let contactName = cont === undefined ? undefined : cont.obj.name;
        let contactTelephone = cont === undefined ? undefined : cont.obj.telephone;
        let contactMobile = cont === undefined ? undefined : cont.obj.mobile;
        let contactEmail = cont === undefined ? undefined : cont.obj.email;


        return <div className="bg-white py-2">
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">供应商:</div><div className="col-9"><b>{tv(supplier, v => <>{v.name}</>)}</b></div>
            </div>
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">创建人:</div><div className="col-9 text-muted">{id}&nbsp;<EasyDate date={date} /></div>
            </div>
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">联系人:</div><div className="col-9"><span>{contactName}&nbsp;{contactTelephone} {contactMobile} {contactEmail}</span></div>
            </div>
        </div>;
    }

    private rowEnd = () => {
        let { onPendingInquiry } = this.controller;

        return this.firstPackage && <div>
            <div className="text-center py-2">
                <button className="btn btn-sm btn-primary" onClick={() => onPendingInquiry(this.suppplier)}>
                    <span className="px-2"><FA className="text-warning px-1" name="user" /><b>询&nbsp;出</b></span>
                    <span className="px-2"><FA name="chevron-right fa-1x" /></span>
                </button>
            </div>
        </div >;
    }

    private onDelInquiry = async () => {
        if (await this.vCall(VConfirmDeleteInquiry, this.suppplier) === true) {
            await this.controller.deletePendingInquiryData(this.suppplier);
            await this.controller.loadList();
            this.closePage();
        };
    }

    private onDelInquiryPackage = async (item: any, pack: any) => {
        if (await this.vCall(VConfirmDeleteInquiryPackage, pack) === true) {
            let { id: packid } = pack;
            let { id } = item;
            await this.controller.deletePendingInquiryPackage(id, packid);
            this.closePage();
            await this.controller.onShowNewPendingInquiryDetail(item);
        };
    }

    private page = () => {
        let suppplierData = _.clone(this.suppplier);

        let right =
            <div className="d-flex align-items-center">
                <div><span onClick={() => this.onDelInquiry()} className="fa-stack">
                    <i className="fa fa-trash fa-stack-2x cursor-pointer my-1" style={{ fontSize: '1.5rem' }}></i>
                </span></div>
            </div>;
        return <Page right={right} header="询价详情" headerClassName="py-1 bg-primary">
            {this.rowTop(suppplierData)}
            {this.rowEnd()}
            {this.getPackage()}
        </Page >
    }
}

class VConfirmDeleteInquiry extends VPage<CNewPendingInquiry> {
    async open(inquiryPending: any) {
        this.openPage(this.page, inquiryPending);
    }

    private onConfirm = async () => {
        await this.returnCall(true);
        this.closePage();
    }

    private onCancel = async () => {
        await this.returnCall(false);
        this.closePage();
    }

    private page = (inquiryPending: any) => {
        return <Page header="删除询价任务" back="close" headerClassName="bg-primary">
            <div className="w-75 mx-auto border border-primary rounded my-3 p-3 bg-white">
                <div className="p-4 position-relative">
                    <i className="fa fa-question-circle position-absolute fa-2x text-warning" style={{ left: 0, top: 0 }} />
                    <b className="">是否删除该询价任务？</b>
                </div>
                <div className="d-flex mt-3 justify-content-end">
                    <button className="btn btn-danger mr-3" onClick={this.onConfirm}>删除询价任务</button>
                    <button className="btn btn-outline-info mr-3" onClick={this.onCancel}>取消</button>
                </div>
            </div>
        </Page>;
    }
}

class VConfirmDeleteInquiryPackage extends VPage<CNewPendingInquiry> {
    async open(inquiryPackage: any) {
        this.openPage(this.page, inquiryPackage);
    }

    private onConfirm = async () => {
        await this.returnCall(true);
        this.closePage();
    }

    private onCancel = async () => {
        await this.returnCall(false);
        this.closePage();
    }

    private page = (inquiryPackage: any) => {
        return <Page header="删除询价包装" back="close" headerClassName="bg-primary">
            <div className="w-75 mx-auto border border-primary rounded my-3 p-3 bg-white">
                <div className="p-4 position-relative">
                    <i className="fa fa-question-circle position-absolute fa-2x text-warning" style={{ left: 0, top: 0 }} />
                    <b className="">是否删除该询价包装？</b>
                </div>
                <div className="d-flex mt-3 justify-content-end">
                    <button className="btn btn-danger mr-3" onClick={this.onConfirm}>删除询价包装</button>
                    <button className="btn btn-outline-info mr-3" onClick={this.onCancel}>取消</button>
                </div>
            </div>
        </Page>;
    }
}