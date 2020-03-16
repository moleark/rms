import * as React from 'react';
import { observable } from 'mobx';
import { VPage, Page, FA, EasyDate, tv, LMR, List, Edit, ItemSchema, UiSchema, StringSchema, UiInputItem, UiRadio, BoxId } from 'tonva';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { SupplierItem } from "model/supplierItem";
import { CSupplier } from './CSupplier';

const schema: ItemSchema[] = [
    { name: 'accountName', type: 'string', required: true },
    { name: 'accountNo', type: 'string', required: true },
    { name: 'bank', type: 'string', required: true },
    { name: 'bankAddress', type: 'string', required: true },
    { name: 'usageType', type: 'number', required: true },
    { name: 'bankSWIFT', type: 'string', required: false },
    { name: 'bankIBAN', type: 'string', required: false },
    { name: 'bankRTN', type: 'string', required: false },
];


export class VSupplierBankAccountDetail extends VPage<CSupplier> {
    private supplier: any;
    private bankAccount: any;
    private bankData: any;

    async open(param: SupplierItem) {
        let { parent, item } = param;
        this.supplier = parent;
        await this.loadBank(item);
        this.openPage(this.page);
    }

    private loadBank = async (item: any) => {
        this.bankAccount = await this.controller.cApp.uqs.rms.BankAccount.load(item.id);
        let { bankAddress, bankSWIFT, bankIBAN, bankRTN, bank, accountNo, accountName, usageType } = this.bankAccount;
        this.bankData = {
            bankAddress: bankAddress,
            bankSWIFT: bankSWIFT,
            bankIBAN: bankIBAN,
            bankRTN: bankRTN,
            bank: bank,
            accountNo: accountNo,
            accountName: accountName,
            usageType: usageType
        };
    }

    private uiSchema: UiSchema = {
        items: {
            accountName: { widget: 'text', label: '受益人', placeholder: '受益人' } as UiInputItem,
            accountNo: { widget: 'text', label: '账号', placeholder: '开户银行帐号' } as UiInputItem,
            bank: { widget: 'text', label: '开户行', placeholder: '开户银行' } as UiInputItem,
            bankAddress: { widget: 'text', label: '银行地址', placeholder: '银行地址' } as UiInputItem,
            usageType: { widget: 'radio', label: '用途', list: [{ value: 0, title: '开户行' }, { value: 1, title: '中转行' }] } as UiRadio,
            bankSWIFT: { widget: 'text', label: 'SWIFT/BIC', placeholder: '开户行SWIFT/BIC' } as UiInputItem,
            bankIBAN: { widget: 'text', label: 'IBAN', placeholder: '开户行IBAN' } as UiInputItem,
            bankRTN: { widget: 'text', label: 'RTN ', placeholder: '开户行的RTN ' } as UiInputItem,
        }
    }

    private rowTop = () => {

        let { name } = this.supplier;
        return <div className="bg-white py-2">
            <div className="row no-gutters px-3 my-1">
                <div className="col-4">供应商:</div><div className="col-8 text-muted text-right"><b>{name}</b></div>
            </div>
        </div>;
    }

    private onBankDataChanged = async (itemSchema: ItemSchema, newValue: any, preValue: any) => {
        let { name } = itemSchema;
        this.bankAccount[name] = newValue;
        await this.controller.updateBankAccountData(this.bankAccount);
        this.closePage();
        this.controller.cApp.cSupplier.onShowSupplierBankAccount(this.supplier, this.bankAccount);
    }

    private onDelSupplierBankAccount = async () => {
        if (await this.vCall(VConfirmDeleteSupplierBankAccount, this.bankAccount) === true) {
            await this.controller.delSupplierBankAccount(this.bankAccount, this.supplier);
            this.closePage();
            this.controller.cApp.cSupplier.onSupplierSelected(this.supplier);
        };
    }

    private page = () => {
        let bankAccountData = _.clone(this.bankAccount);
        let buttonDel: any;
        if (bankAccountData.id !== undefined) {
            buttonDel = <div className="d-flex align-items-center">
                <div><span onClick={() => this.onDelSupplierBankAccount()} className="fa-stack">
                    <i className="fa fa-trash fa-stack-2x cursor-pointer my-1" style={{ fontSize: '1.5rem' }}></i>
                </span></div>
            </div>;
        }
        return <Page header="银行信息" right={buttonDel} headerClassName="py-1 bg-primary">
            {this.rowTop()}
            <Edit schema={schema} uiSchema={this.uiSchema}
                data={this.bankData}
                onItemChanged={this.onBankDataChanged} />
        </Page >
    }
}

class VConfirmDeleteSupplierBankAccount extends VPage<CSupplier> {
    async open(supplierBankAccount: any) {
        this.openPage(this.page, supplierBankAccount);
    }

    private onConfirm = async () => {
        await this.returnCall(true);
        this.closePage();
    }

    private onCancel = async () => {
        await this.returnCall(false);
        this.closePage();
    }

    private page = (supplierBankAccount: any) => {
        return <Page header="删除银行信息" back="close" headerClassName="bg-primary">
            <div className="w-75 mx-auto border border-primary rounded my-3 p-3 bg-white">
                <div className="p-4 position-relative">
                    <i className="fa fa-question-circle position-absolute fa-2x text-warning" style={{ left: 0, top: 0 }} />
                    <b className="">是否删除该银行信息？</b>
                </div>
                <div className="d-flex mt-3 justify-content-end">
                    <button className="btn btn-danger mr-3" onClick={this.onConfirm}>删除银行信息</button>
                    <button className="btn btn-outline-info mr-3" onClick={this.onCancel}>取消</button>
                </div>
            </div>
        </Page>;
    }
}

