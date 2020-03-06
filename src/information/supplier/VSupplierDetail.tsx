import * as React from 'react';
import { VPage, Page, FA, Edit, EasyDate, tv, LMR, List, UiIdItem, UiTextItem, ItemSchema, UiSchema, UiInputItem, Form, Context, BoxId } from 'tonva';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { CSupplier } from "./CSupplier";
import { ParamItem } from "model/supplierItem";
import { TuidBoxDiv } from 'tonva/dist/uq/tuid/tuid';
import { addressDetailValidation } from 'tools/inputValidations';

export class VSupplierDetail extends VPage<CSupplier> {

    private supplier: any;
    private firstSupplierContact: any;
    private supplierContacts: any[] = [];
    private firstSupplierrBankAccount: any;
    private supplierBankAccounts: any[] = [];

    async open(param: ParamItem) {
        let { parent, item, child, item2, child2 } = param;
        this.supplier = parent;
        this.firstSupplierContact = item;
        this.supplierContacts = child;
        this.firstSupplierrBankAccount = item2;
        this.supplierBankAccounts = child2;
        this.openPage(this.page);
    }

    private getSupplierBankAccount = () => {
        let { showCreateSupplierContact } = this.controller.cApp.cSupplierContact;

        return <div>
            <div className="text-center py-2">
                <button className="btn btn-sm btn-primary" onClick={() => this.controller.onNewSupplierBankAccount(this.supplier)}>
                    <span className="px-2"><FA className="text-warning px-1" name="bank" /><b>银&nbsp;行</b></span>
                    <span className="px-2"><FA name="plus fa-1x" /></span>
                </button>
            </div>
            <div>
                {this.firstSupplierrBankAccount && <List items={this.supplierBankAccounts} item={{ render: this.renderBankAccount }} />}
            </div>
        </div >
    }

    private getSupplierContact = () => {
        let { showCreateSupplierContact } = this.controller.cApp.cSupplierContact;

        return <div>
            <div className=" d-flex px-3 py-2">
                <button className="btn btn-sm btn-primary" onClick={() => showCreateSupplierContact(this.supplier)}>
                    <span className="px-2"><FA className="text-warning px-1" name="user" /><b>联系人</b></span>
                    <span className="px-2"><FA name="plus fa-1x" /></span>
                </button>
                <div className="flex-grow-1"></div>
                <button className="btn btn-sm btn-primary" onClick={() => this.controller.pickChemical(this.supplier)} >
                    <span className="px-2"><FA className="text-warning px-1" name="filter" /><b>产&nbsp;品</b></span>
                    <span className="px-2"><FA name="plus fa-1x" /></span>
                </ button>
            </div>
            <div>
                {this.firstSupplierContact && <List items={this.supplierContacts} item={{ render: this.renderContact }} />}
            </div>
        </div >
    }

    private renderBankAccount = (item: any, index: number) => {
        let { onShowSupplierBankAccount } = this.controller;
        let { bankAddress, bankSWIFT, bankIBAN, bankRTN, bank, accountNo, accountName, usageType } = item;
        let left = <div className="px-2">
            <FA name="caret-right" className="px-2 text-primary"></FA>{accountName}
            <div className="small px-4 text-muted">{accountNo}</div>
            <div className="small px-4 text-muted">{bankAddress}</div>
        </div>
        let right =
            <div className="px-2 text-right text-muted">
                {usageType === 0 ? "开户行" : "中转行"}
            </div>;
        return <LMR left={left} right={right} className="p-1 d-flex cursor-pointer" onClick={() => onShowSupplierBankAccount(this.supplier, item)}>
        </LMR>;
    }

    private renderContact = (item: any, index: number) => {
        let { showSupplierContactDetail } = this.controller.cApp.cSupplierContact;
        let { no, name, id, gender, mobile, telephone, email } = item;
        let { defaultContact } = this.supplier;
        let fa_text = defaultContact === undefined ? "px-2" : (defaultContact.id === id ? "px-2 text-info " : "px-2 ");
        let fa_gender = gender === "0" ? <FA name="female" className="px-2 text-danger"></FA> : <FA name="male" className="px-2 text-primary"></FA>;
        let tele = (telephone === undefined) ? <span></span> :
            <div className="small text-muted">{telephone}</div>;
        let mob = (mobile === undefined) ? <span></span> :
            <div className="small text-muted">{mobile}</div>;

        let ema = (email === undefined) ? <span></span> :
            <div className="small px-4 text-muted">{email}</div>;

        let left = <div className={fa_text}>
            {fa_gender}{name}
            {ema}
        </div>
        let right =
            <div className="px-2 text-right">
                {tele}
                {mob}
            </div>;
        return <LMR left={left} right={right} className="p-1 d-flex cursor-pointer" onClick={() => showSupplierContactDetail(item, this.supplier)}>
        </LMR>;
    }

    private onSupplierDataChanged = async (itemSchema: ItemSchema, newValue: any, preValue: any) => {
        let { name } = itemSchema;
        this.supplier[name] = newValue;
        await this.controller.updateSupplierData(this.supplier);
    }

    private rowTop = (supplierData: any) => {
        let { name, no, abbreviation, webSite, address, addressString, productionAddress, profile, taxNo } = supplierData;


        return <div className="bg-white py-2">
            {no === undefined ? "" :
                <><div className="row no-gutters px-3 my-1">
                    <div className="col-3">编号:</div><div className="col-9 text-muted">{no}</div>
                </div></>}
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">名称:</div><div className="col-9"><b>{name}</b></div>
            </div>
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">网址:</div><div className="col-9 text-muted">{webSite === undefined ? "(无)" : webSite}</div>
            </div>
            {taxNo === undefined ? "" :
                <><div className="row no-gutters px-3 my-1">
                    <div className="col-3">税号:</div><div className="col-9 text-muted">{taxNo}</div>
                </div></>}
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">地址:</div><div className="col-9 text-muted">{tv(address)} {addressString}</div>
            </div>
            {productionAddress === undefined ? "" :
                <><div className="row no-gutters px-3 my-1">
                    <div className="col-3">厂址:</div><div className="col-9 text-muted">{productionAddress}</div>
                </div></>}
        </div>;
    }

    private page = () => {

        let supplierData = _.clone(this.supplier);
        return <Page header="供应商详情" headerClassName="py-1 bg-primary">
            {this.rowTop(supplierData)}
            {this.getSupplierBankAccount()}
            {this.getSupplierContact()}
        </Page>
    }
}

