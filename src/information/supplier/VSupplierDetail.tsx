import * as React from 'react';
import { VPage, Page, FA, Edit, EasyDate, tv, LMR, List, UiIdItem, UiTextItem, ItemSchema, UiSchema, UiInputItem, Form, Context, BoxId } from 'tonva';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { CSupplier } from "./CSupplier";
import { ParamItem } from "model/supplierItem";
import { TuidBoxDiv } from 'tonva/dist/uq/tuid/tuid';
import { addressDetailValidation } from 'tools/inputValidations';

const schema: ItemSchema[] = [
    { name: 'name', type: 'string', required: true },
    { name: 'abbreviation', type: 'string', required: false },
    { name: 'webSite', type: 'string', required: false },
    { name: 'address', type: 'id', required: true },
    { name: 'addressString', type: 'string', required: true },
    { name: 'productionAddress', type: 'string', required: false },
    { name: 'taxNo', type: 'string', required: false },
    { name: 'profile', type: 'string', required: false },
];

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

    private uiSchema: UiSchema = {
        items: {
            name: { widget: 'text', label: '供应商名称', placeholder: '必填' } as UiInputItem,
            abbreviation: { widget: 'text', label: '供应商简称', placeholder: '供应商简称' } as UiInputItem,
            webSite: { widget: 'text', label: '网址', placeholder: '网址' } as UiInputItem,
            address: {
                widget: 'id', label: '所在地区',
                pickId: async (context: Context, name: string, value: number) => await this.controller.pickAddress(context, name, value),
                Templet: (address: BoxId) => {
                    if (!address) return <small className="text-muted">(无)</small>;
                    return tv(address, (addressValue) => {
                        let { country, province, city, county } = addressValue;
                        return <>
                            {country !== undefined && country.id !== undefined && tv(country, v => <>{v.chineseName}</>)}
                            {province !== undefined && province.id !== undefined && tv(province, (v) => <>{v.chineseName}</>)}
                            {city !== undefined && city.id !== undefined && tv(city, (v) => <>{v.chineseName}</>)}
                            {county !== undefined && county.id !== undefined && tv(county, (v) => <>{v.chineseName}</>)}
                        </>;
                    }, () => {
                        return <small className="text-muted">请选择地区</small>;
                    })
                }
            } as UiIdItem,
            addressString: { widget: 'text', label: '详细地址', placeholder: '详细地址', rules: addressDetailValidation } as UiTextItem,
            productionAddress: { widget: 'text', label: '生产厂址', placeholder: '生产厂址', rules: addressDetailValidation } as UiTextItem,
            taxNo: { widget: 'text', label: '税号', placeholder: '税号' } as UiInputItem,
            profile: { widget: 'textarea', label: '企业简介', placeholder: '企业简介', rows: 10 } as UiInputItem,
        }
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

    private onDelSupplier = async () => {
        if (await this.vCall(VConfirmDeleteSupplier, this.supplier) === true) {
            await this.controller.delSupplier(this.supplier);
            await this.controller.loadList();
            this.closePage();
        };
    }

    private page = () => {

        let supplierData = _.clone(this.supplier);
        let { name, no, abbreviation, webSite, address, addressString, productionAddress, profile, taxNo } = supplierData;
        let supData = {
            name: name,
            abbreviation: abbreviation,
            webSite: webSite,
            address: address,
            addressString: addressString,
            productionAddress: productionAddress,
            profile: profile,
            taxNo: taxNo
        };

        let buttonDel: any;
        if (supplierData.id !== undefined) {
            buttonDel = <div className="d-flex align-items-center">
                <div><span onClick={() => this.onDelSupplier()} className="fa-stack">
                    <i className="fa fa-trash fa-stack-2x cursor-pointer my-1" style={{ fontSize: '1.5rem' }}></i>
                </span></div>
            </div>;
        }
        return <Page header="供应商详情" right={buttonDel} headerClassName="py-1 bg-primary">
            {no === undefined ? "" :
                <><div className="row no-gutters px-3 my-1">
                    <div className="col-3">编号:</div><div className="col-9 text-muted text-right">{no}</div>
                </div></>}
            <Edit schema={schema} uiSchema={this.uiSchema}
                data={supData}
                onItemChanged={this.onSupplierDataChanged} />
            {this.getSupplierBankAccount()}
            {this.getSupplierContact()}
        </Page>
    }
}


class VConfirmDeleteSupplier extends VPage<CSupplier> {
    async open(supplier: any) {
        this.openPage(this.page, supplier);
    }

    private onConfirm = async () => {
        await this.returnCall(true);
        this.closePage();
    }

    private onCancel = async () => {
        await this.returnCall(false);
        this.closePage();
    }

    private page = (supplier: any) => {
        return <Page header="删除供应商" back="close" headerClassName="bg-primary">
            <div className="w-75 mx-auto border border-primary rounded my-3 p-3 bg-white">
                <div className="p-4 position-relative">
                    <i className="fa fa-question-circle position-absolute fa-2x text-warning" style={{ left: 0, top: 0 }} />
                    <b className="">是否删除该供应商？</b>
                </div>
                <div className="d-flex mt-3 justify-content-end">
                    <button className="btn btn-danger mr-3" onClick={this.onConfirm}>删除供应商</button>
                    <button className="btn btn-outline-info mr-3" onClick={this.onCancel}>取消</button>
                </div>
            </div>
        </Page>;
    }
}