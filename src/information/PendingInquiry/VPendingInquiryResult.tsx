import * as React from 'react';
import { VPage, Page, UiSchema, UiInputItem, Form, Context, UiTextItem, UiRadio, tv, UiIdItem, FA } from 'tonva';
import { Schema } from 'tonva';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { CPendingInquiry } from './CPendingInquiry';
import { tariffRateValidation } from 'tools/inputValidations';
import { CApp } from 'CApp';
import { parse } from 'url';

const schema: Schema = [
    { name: 'id', type: 'id', required: false },
    { name: 'notProvidedReason', type: 'id', required: false },
    { name: 'quantity', type: 'number', required: false },
    { name: 'radiox', type: 'number', required: false },
    { name: 'radioy', type: 'number', required: false },
    { name: 'unit', type: 'id', required: false },
    { name: 'purity', type: 'string', required: false },
    { name: 'listPrice', type: 'number', required: false },
    { name: 'price', type: 'number', required: false },
    { name: 'currency', type: 'id', required: false },
    { name: 'isTaxIn', type: 'number', required: false },
    { name: 'vatRate', type: 'id', required: false },
    { name: 'tariffRate', type: 'number', required: false },
    { name: 'isTransFeeIn', type: 'number', required: false },
    { name: 'transFee', type: 'number', required: false },
    { name: 'transFeecurrency', type: 'id', required: false },
    { name: 'packingFee', type: 'number', required: false },
    { name: 'packingcurrency', type: 'id', required: false },
    { name: 'otherFee', type: 'number', required: false },
    { name: 'otherFeecurrency', type: 'id', required: false },
    { name: 'customizeUpto', type: 'date', required: false },
    { name: 'validUpto', type: 'date', required: false },
    { name: 'minArriveDate', type: 'date', required: false },
    { name: 'maxArriveDate', type: 'date', required: false },
    { name: 'invoiceType', type: 'number', required: false },
    { name: 'packType', type: 'number', required: false },
    { name: 'remarks', type: 'string', required: false },
    { name: 'coaFilePath', type: 'string', required: false },
    { name: 'msdsFilePath', type: 'string', required: false },
    { name: 'quotationFilePath', type: 'string', required: false },
    { name: 'isUsed', type: 'number', required: false },
    { name: 'submit', type: 'submit' }
];

export class VPendingInquiryResult extends VPage<CPendingInquiry> {

    private form: Form;
    private inquiryData: any;
    @observable showTip: boolean = false;
    saveTip: string = "";

    async open(inquiryData: any) {
        this.inquiryData = inquiryData;
        let { result } = inquiryData;
        this.result = (result) || "0";
        this.openPage(this.page);
    }

    private uiSchema: UiSchema = {
        items: {
            id: { visible: false },
            notProvidedReason: {
                widget: 'id', label: '不可供原因', placeholder: '不可供原因',
                pickId: async (context: Context, name: string, value: number) => await this.controller.pickNotProvidedReason(context, name, value),
                Templet: (item: any) => {
                    if (!item) return <small className="text-muted">请选择不可供原因</small>;
                    return <>
                        {tv(item, v => <>{v.description}</>)}
                    </>;
                }
            } as UiIdItem,
            quantity: { widget: 'text', label: '数量', placeholder: '必填', defaultValue: 1 } as UiInputItem,
            radiox: { widget: 'text', label: '套', placeholder: '必填', defaultValue: 1 } as UiInputItem,
            radioy: { widget: 'text', label: '包装规格', placeholder: '必填' } as UiInputItem,
            unit: {
                widget: 'id', label: '包装单位', placeholder: '包装单位',
                pickId: async (context: Context, name: string, value: number) => await this.controller.cApp.cPackage.pickPackUnit(context, name, value),
                Templet: (item: any) => {
                    if (!item) return <small className="text-muted">请选择包装单位</small>;
                    return <>
                        {tv(item, v => <>{v.name}</>)}
                    </>;
                }
            } as UiIdItem,
            purity: { widget: 'text', label: '报价纯度', placeholder: '报价纯度' } as UiInputItem,
            listPrice: { widget: 'text', label: '目录价', placeholder: '目录价' } as UiInputItem,
            price: { widget: 'text', label: '结算价', placeholder: '必填' } as UiInputItem,
            currency: {
                widget: 'id', label: '结算币种', placeholder: '结算币种',
                pickId: async (context: Context, name: string, value: number) => await this.controller.pickCurrency(context, name, value),
                Templet: (item: any) => {
                    if (!item) return <small className="text-muted">请选择结算币种</small>;
                    return <>
                        {tv(item, v => <>{v.name}</>)}
                    </>;
                }
            } as UiIdItem,
            isTaxIn: { widget: 'radio', label: '含税费', list: [{ value: "0", title: '否' }, { value: "1", title: '是' }] } as UiRadio,
            vatRate: {
                widget: 'id', label: '增值税率', placeholder: '增值税率',
                pickId: async (context: Context, name: string, value: number) => await this.controller.cApp.cPackage.pickVatRate(context, name, value),
                Templet: (item: any) => {
                    if (!item) return <small className="text-muted">请选择增值税率</small>;
                    return <>
                        {tv(item, v => <>{v.description * 100}</>)}%
                </>;
                }
            } as UiIdItem,
            tariffRate: { widget: 'text', label: '关税税率', placeholder: '关税税率', rules: tariffRateValidation } as UiInputItem,
            isTransFeeIn: { widget: 'radio', label: '含运费', list: [{ value: "0", title: '否' }, { value: "1", title: '是' }] } as UiRadio,
            transFee: { widget: 'text', label: '运费', placeholder: '运费' } as UiInputItem,
            transFeecurrency: {
                widget: 'id', label: '运费币种', placeholder: '运费币种',
                pickId: async (context: Context, name: string, value: number) => await this.controller.pickCurrency(context, name, value),
                Templet: (item: any) => {
                    if (!item) return <small className="text-muted">请选择运费币种</small>;
                    return <>
                        {tv(item, v => <>{v.name}</>)}
                    </>;
                }
            } as UiIdItem,
            packingFee: { widget: 'text', label: '包装费', placeholder: '包装费' } as UiInputItem,
            packingcurrency: {
                widget: 'id', label: '包装费币种', placeholder: '包装费币种',
                pickId: async (context: Context, name: string, value: number) => await this.controller.pickCurrency(context, name, value),
                Templet: (item: any) => {
                    if (!item) return <small className="text-muted">请选择包装费币种</small>;
                    return <>
                        {tv(item, v => <>{v.name}</>)}
                    </>;
                }
            } as UiIdItem,
            otherFee: { widget: 'text', label: '其他费', placeholder: '其他费' } as UiInputItem,
            otherFeecurrency: {
                widget: 'id', label: '其他费币种', placeholder: '其他费币种',
                pickId: async (context: Context, name: string, value: number) => await this.controller.pickCurrency(context, name, value),
                Templet: (item: any) => {
                    if (!item) return <small className="text-muted">请选择其他费币种</small>;
                    return <>
                        {tv(item, v => <>{v.name}</>)}
                    </>;
                }
            } as UiIdItem,
            customizeUpto: { widget: 'date', label: '定制截止日期' } as UiInputItem,
            validUpto: { widget: 'date', label: '报价有效期', placeholder: '必填' } as UiInputItem,
            minArriveDate: { widget: 'date', label: '最短到货期', placeholder: '必填' } as UiInputItem,
            maxArriveDate: { widget: 'date', label: '最长到货期', placeholder: '必填' } as UiInputItem,
            invoiceType: { widget: 'radio', label: '发票类型', list: [{ value: "1", title: '增值税专用发票' }, { value: "2", title: '增值税普通发票' }, { value: "3", title: '形式发票' }, { value: "4", title: '无发票' }] } as UiRadio,
            packType: { widget: 'radio', label: '包装类型', list: [{ value: "1", title: '目录包装' }, { value: "2", title: '非目录包装' }] } as UiRadio,
            remarks: { widget: 'text', label: '备注', row: 10, placeholder: '备注' } as UiInputItem,
            coaFilePath: { widget: 'text', label: 'COA文件路径', placeholder: 'COA文件路径' } as UiInputItem,
            msdsFilePath: { widget: 'text', label: 'MSDS文件路径', placeholder: 'MSDS文件路径' } as UiInputItem,
            quotationFilePath: { widget: 'text', label: '报价单文件路径', placeholder: '报价单文件路径' } as UiInputItem,
            isUsed: { widget: 'radio', label: '更新包装价格', className: "text-danger", list: [{ value: "0", title: '否' }, { value: "1", title: '是' }] } as UiRadio,
            submit: { widget: 'button', label: '提交', className: "btn btn-primary mr-3 px-6" }
        }
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        let { form } = context;
        let { data } = form;
        data.result = this.result;
        try {
            if (data.isUsed === "1") {
                if (await this.vCall(VConfirmUpdatePackage) === true) {
                    await this.controller.saveInquiryPackage(data, this.inquiryData);
                }
            } else {
                await this.controller.saveInquiryPackage(data, this.inquiryData);
            }
            this.saveTip = "询价结果已经保存";
        } catch (error) {
            this.saveTip = "询价结果保存失败，请稍后再试";
        }
        this.showTip = true;
        setTimeout(() => { this.showTip = false; }, 2000);
    }

    private getResult = (result: string) => {
        let { notProvidedReason, quantity, radiox, radioy, unit, purity, listPrice, price, currency, isTaxIn, vatRate, tariffRate, isTransFeeIn, transFee, transFeecurrency, packingFee, packingcurrency, otherFee, otherFeecurrency, customizeUpto, validUpto, minArriveDate, maxArriveDate, invoiceType, packType, remarks, coaFilePath, msdsFilePath, quotationFilePath, isUsed } = this.uiSchema.items;
        if (result === "0") {
            notProvidedReason.visible = true;
            quantity.visible = false;
            radiox.visible = false;
            radioy.visible = false;
            unit.visible = false;
            purity.visible = false;
            listPrice.visible = false;
            price.visible = false;
            currency.visible = false;
            isTaxIn.visible = false;
            vatRate.visible = false;
            tariffRate.visible = false;
            isTransFeeIn.visible = false;
            transFee.visible = false;
            transFeecurrency.visible = false;
            packingFee.visible = false;
            packingcurrency.visible = false;
            otherFee.visible = false;
            otherFeecurrency.visible = false;
            customizeUpto.visible = false;
            validUpto.visible = false;
            minArriveDate.visible = false;
            maxArriveDate.visible = false;
            invoiceType.visible = false;
            packType.visible = false;
            remarks.visible = false;
            coaFilePath.visible = false;
            msdsFilePath.visible = false;
            quotationFilePath.visible = false;
            isUsed.visible = false;
        } else {
            notProvidedReason.visible = false;
            quantity.visible = true;
            radiox.visible = true;
            radioy.visible = true;
            unit.visible = true;
            purity.visible = true;
            listPrice.visible = true;
            price.visible = true;
            currency.visible = true;
            isTaxIn.visible = true;
            vatRate.visible = true;
            tariffRate.visible = true;
            isTransFeeIn.visible = true;
            transFee.visible = true;
            transFeecurrency.visible = true;
            packingFee.visible = true;
            packingcurrency.visible = true;
            otherFee.visible = true;
            otherFeecurrency.visible = true;
            customizeUpto.visible = true;
            validUpto.visible = true;
            minArriveDate.visible = true;
            maxArriveDate.visible = true;
            invoiceType.visible = true;
            packType.visible = true;
            remarks.visible = true;
            coaFilePath.visible = true;
            msdsFilePath.visible = true;
            quotationFilePath.visible = true;
            isUsed.visible = true;
        }

        schema.forEach(e => {
            if (this.result === "0") {
                if (e.name === "notProvidedReason") {
                    e.required = true;
                }
            } else {
                if (e.name === "quantity" || e.name === "radiox" || e.name === "radioy" || e.name === "unit" || e.name === "price" || e.name === "currency" || e.name === "isTaxIn" || e.name === "isTransFeeIn" || e.name === "validUpto" || e.name === "minArriveDate" || e.name === "maxArriveDate" || e.name === "invoiceType" || e.name === "packType" || e.name === "isUsed") {
                    e.required = true;
                }
                if (e.name === "notProvidedReason") {
                    e.required = false;
                }
            }
        });
    }

    @observable result: string;

    private onResultClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.result = event.currentTarget.value;
        this.getResult(this.result);
    }

    private page = observer(() => {
        this.getResult(this.result);
        let tipUI = this.showTip ? (<div className="alert alert-primary" role="alert">
            <FA name="exclamation-circle" className="text-warning float-left mr-3" size="2x"></FA>
            {this.saveTip}
        </div>) : null;
        return <Page header="录入询价结果" headerClassName="py-1 bg-primary">
            <div className="px-3">
                <div className="form-group row py-3 mb-1 bg-white">
                    <div className="col-12 col-sm-3 pb-2 text-muted">询价结果:</div>
                    <div className="col-12 col-sm-9">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="invoiceType" id="common" value="0"
                                onChange={(event) => this.onResultClick(event)} checked={this.result === "0"}></input>
                            <label className="form-check-label" htmlFor="common">无法提供</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="invoiceType" id="valueAdded" value="1"
                                onChange={(event) => this.onResultClick(event)} checked={this.result === "1"}></input>
                            <label className="form-check-label" htmlFor="valueAdded">可提供</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-3 bg-white">
                <Form ref={v => this.form = v} className="my-3"
                    schema={schema}
                    uiSchema={this.uiSchema}
                    formData={this.inquiryData}
                    onButtonClick={this.onFormButtonClick}
                    fieldLabelSize={3} />
                {tipUI}
            </div>
        </Page>
    });
}

class VConfirmUpdatePackage extends VPage<CPendingInquiry> {
    async open(item?: any) {
        this.openPage(this.page, item);
    }

    private onConfirm = async () => {
        await this.returnCall(true);
        this.closePage();
    }

    private onCancel = async () => {
        await this.returnCall(false);
        this.closePage();
    }

    private page = (product: any) => {
        return <Page header="更新包装价格" back="close" headerClassName="bg-primary">
            <div className="w-75 mx-auto border border-primary rounded my-3 p-3 bg-white">
                <div className="p-4 position-relative">
                    <i className="fa fa-question-circle position-absolute fa-2x text-warning" style={{ left: 0, top: 0 }} />
                    <b className="">是否更新包装价格？</b>
                </div>
                <div className="d-flex mt-3 justify-content-end">
                    <button className="btn btn-danger mr-3" onClick={this.onConfirm}>更新</button>
                    <button className="btn btn-outline-info mr-3" onClick={this.onCancel}>取消</button>
                </div>
            </div>
        </Page>;
    }
}

