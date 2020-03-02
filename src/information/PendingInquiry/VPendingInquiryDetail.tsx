import * as React from 'react';
import { VPage, Page, FA, EasyDate, tv, LMR, List, Schema, UiSchema, UiRadio, Form, Context } from 'tonva';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { CPendingInquiry } from './CPendingInquiry';

export class VPendingInquiryDetail extends VPage<CPendingInquiry> {
    private pending: any;
    private firstPackage: any;
    private packages: any[] = [];
    private model:any;

    async open(param: any) {
        this.model=param;
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

        let { id, inquiryPackage, user, createDate, product, quantity, radiox, radioy, unit, CAS, purity ,inquiryRemarks} = item;
        let { brand, description, descriptionC } = product.obj;
        let radio = (radiox !== 1) ? <>{radiox} * {radioy}{unit}</> : <>{radioy}{unit}</>;
        let brandname = brand === undefined ? undefined : brand.obj.name;

        let right =
            <div className="px-2 text-muted text-right">
                <span onClick={() => this.controller.openPendingInquiryResult(item)}><FA className="align-middle p-2 cursor-pointer text-info" name="edit" /></span>
            </div>;
        return <LMR right={right} className="p-1 d-flex cursor-pointer">
        <div><FA name="circle" className="px-2 text-primary"></FA>CAS：{CAS}</div>
        <div className="px-4 text-muted">名称：{description}</div>
        <div className="px-4 text-muted">包装：{quantity} * {radio}</div>
        <div className="px-4 text-muted">备注：<span className="text-muted small">{inquiryRemarks}</span></div>
    </LMR>;
    }

    private rowEnd = () => {
        let { onPendingInquiry } = this.controller;

        return this.firstPackage && <div>
        <div className="text-center py-2">
            <button className="btn btn-sm btn-primary" onClick={() => onPendingInquiry(this.model)}>
                <span className="px-2"><FA className="text-warning px-1" name="user" /><b>完结询价</b></span>
                <span className="px-2"><FA name="chevron-right fa-1x" /></span>
            </button>
        </div>
    </div >; 
    }

    private rowTop = (suppplierData: any) => {

        let { supplier, contactName, contactSalutation, contactDepartmentName, contactTelephone, contactMobile, contactEmail, contactfax, way, inquiryUser, inquiryDate, user, date, remarks } = suppplierData;
        let { id } = user;
        let { id: inid } = inquiryUser;


        return <div className="bg-white py-2">
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">供应商:</div><div className="col-9 text-muted text-right">{tv(supplier, v => <>{v.name}</>)}</div>
            </div>
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">联系人:</div><div className="col-9 text-muted text-right">{contactName}</div>
            </div>
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">联系电话:</div><div className="col-9 text-muted text-right">{contactTelephone}</div>
            </div>
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">联系手机:</div><div className="col-9 text-muted text-right">{contactMobile}</div>
            </div>
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">联系邮箱:</div><div className="col-9 text-muted text-right">{contactEmail}</div>
            </div>
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">创建人:</div><div className="col-9 text-muted text-right">{id}</div>
            </div>
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">创建时间:</div><div className="col-9 text-muted text-right"><EasyDate date={date} /></div>
            </div>
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">询价人:</div><div className="col-9 text-muted text-right">{inid}</div>
            </div>
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">询价时间:</div><div className="col-9 text-muted text-right"><EasyDate date={inquiryDate} /></div>
            </div>
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">询价方式:</div><div className="col-9 text-muted text-right">{way === 1 ? "Email询价" : (way === 2 ? "电话询价" : "传真询价")}</div>
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