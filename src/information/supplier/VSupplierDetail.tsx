import * as React from 'react';
import { VPage, Page, FA, EasyDate, tv, LMR, List } from 'tonva';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { CSupplier } from "./CSupplier";
import { SupplierItem } from "model/supplierItem";
import { TuidBoxDiv } from 'tonva/dist/uq/tuid/tuid';

export class VSupplierDetail extends VPage<CSupplier> {

    private supplier: any;
    private firstSupplierContact: any;
    private supplierContacts: any[] = [];

    async open(param: SupplierItem) {
        let { parent, item, child } = param;
        this.supplier = parent;
        this.firstSupplierContact = item;
        this.supplierContacts = child;
        this.openPage(this.page);
    }

    private getSupplierContact = () => {
        let { showCreateSupplierContact } = this.controller.cApp.cSupplierContact;

        return <div>
            <div className=" d-flex px-3 py-2">
                <button className="btn btn-sm btn-success" onClick={() => showCreateSupplierContact(this.supplier)}>
                    <span className="px-2"><FA className="text-warning px-1" name="user" /><b>联系人</b></span>
                    <span className="px-2"><FA name="plus fa-1x" /></span>
                </button>
                <div className="flex-grow-1"></div>
                <button className="btn btn-sm btn-success" onClick={() => this.controller.pickChemical(this.supplier)} >
                    <span className="px-2"><FA className="text-warning px-1" name="filter" /><b>产&nbsp;&nbsp;品&nbsp;</b></span>
                    <span className="px-2"><FA name="plus fa-1x" /></span>
                </ button>
            </div>
            <div className="py-2">
                {this.firstSupplierContact && <List items={this.supplierContacts} item={{ render: this.renderContact }} />}
            </div>
        </div >
    }

    private renderContact = (item: any, index: number) => {
        let { showEditSupplierContact, showSupplierContactDetail } = this.controller.cApp.cSupplierContact;
        let { no, name, id, gender, mobile } = item;
        let { defaultContact } = this.supplier;
        let fa_text = defaultContact === undefined ? "px-2" : (defaultContact.id === id ? "px-2 text-info " : "px-2 ");
        let fa_gender = gender === "0" ? <FA name="female" className="px-2 text-danger"></FA> : <FA name="male" className="px-2 text-primary"></FA>;
        let left = <div className={fa_text} onClick={() => showSupplierContactDetail(item)}>
            {fa_gender}
            {name}&nbsp;&nbsp;{mobile === undefined ? "无" : mobile}</div>
        let right =
            <div className="px-2 text-right">
                <span onClick={() => showEditSupplierContact(this.supplier, item)}><FA className="align-middle p-2 cursor-pointer text-info" name="edit" /></span>
            </div>;
        return <LMR left={left} right={right} className="p-1 d-flex cursor-pointer">
        </LMR>;
    }

    private rowTop = (supplierData: any) => {

        let { name, no, abbreviation, webSite, address, addressString, productionAddress, profile, bankAddress, bankSWIFT, bankIBAN, bankRTN, bank, accountNo, taxNo } = supplierData;

        return <div className="bg-white py-2">
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">编号:</div><div className="col-9 text-right">{no}</div>
            </div>
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">名称:</div><div className="col-9 text-right">{name}</div>
            </div>
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">简称:</div><div className="col-9 text-right">{abbreviation}</div>
            </div>
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">网址:</div><div className="col-9 text-right">{webSite}</div>
            </div>
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">地址:</div><div className="col-9 text-right">{tv(address)}</div>
            </div>
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">生产厂址:</div><div className="col-9 text-right">{productionAddress}</div>
            </div>
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">企业简介:</div><div className="col-9 text-right">{profile}</div>
            </div>
        </div>;
    }

    private page = () => {

        let supplierData = _.clone(this.supplier);

        return <Page header="供应商详情" headerClassName="py-1 bg-primary">
            <div>
                {this.rowTop(supplierData)}
                {this.getSupplierContact()}
            </div>
        </Page>
    }
}

class VConfirmDeleteContact extends VPage<CSupplier> {
    async open(contact: any) {
        this.openPage(this.page, contact);
    }

    private onConfirm = async () => {
        await this.returnCall(true);
        this.closePage();
    }

    private onCancel = async () => {
        await this.returnCall(false);
        this.closePage();
    }

    private page = (contact: any) => {
        return <Page header="删除联系人" back="close">
            <div className="w-75 mx-auto border border-primary rounded my-3 p-3 bg-white">
                <div className="p-4 position-relative">
                    <i className="fa fa-question-circle position-absolute fa-2x text-warning" style={{ left: 0, top: 0 }} />
                    <b className="">是否删除该联系人？</b>
                </div>
                <div className="d-flex mt-3 justify-content-end">
                    <button className="btn btn-danger mr-3" onClick={this.onConfirm}>删除供联系人</button>
                    <button className="btn btn-outline-info mr-3" onClick={this.onCancel}>取消</button>
                </div>
            </div>
        </Page>;
    }
}