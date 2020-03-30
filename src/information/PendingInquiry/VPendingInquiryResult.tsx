import * as React from 'react';
import { VPage, Page, UiSchema, UiInputItem, Form, Context, UiTextItem, UiRadio, tv, UiIdItem } from 'tonva';
import { Schema } from 'tonva';
import _ from 'lodash';
import { CPendingInquiry } from './CPendingInquiry';
import { tariffRateValidation } from 'tools/inputValidations';

const schema: Schema = [
    { name: 'id', type: 'id', required: false },
    { name: 'quantity', type: 'number', required: true },
    { name: 'radiox', type: 'number', required: true },
    { name: 'radioy', type: 'number', required: true },
    { name: 'unit', type: 'id', required: true },
    { name: 'purity', type: 'string', required: false },
    { name: 'listPrice', type: 'number', required: false },
    { name: 'price', type: 'number', required: true },
    { name: 'currency', type: 'id', required: true },
    { name: 'isTaxIn', type: 'number', required: true },
    { name: 'vatRate', type: 'id', required: false },
    { name: 'tariffRate', type: 'number', required: false },
    { name: 'isTransFeeIn', type: 'number', required: true },
    { name: 'transFee', type: 'number', required: false },
    { name: 'transFeecurrency', type: 'id', required: false },
    { name: 'packingFee', type: 'number', required: false },
    { name: 'packingcurrency', type: 'id', required: false },
    { name: 'otherFee', type: 'number', required: false },
    { name: 'otherFeecurrency', type: 'id', required: false },
    { name: 'customizeUpto', type: 'date', required: false },
    { name: 'validUpto', type: 'date', required: true },
    { name: 'minArriveDate', type: 'date', required: true },
    { name: 'maxArriveDate', type: 'date', required: true },
    { name: 'invoiceType', type: 'number', required: true },
    { name: 'packType', type: 'number', required: true },
    { name: 'remarks', type: 'string', required: false },
    { name: 'coaFilePath', type: 'string', required: false },
    { name: 'msdsFilePath', type: 'string', required: false },
    { name: 'quotationFilePath', type: 'string', required: false },
    { name: 'result', type: 'number', required: true },
    { name: 'submit', type: 'submit' }
];

export class VPendingInquiryResult extends VPage<CPendingInquiry> {

    private form: Form;
    private inquiryData: any;

    private uiSchema: UiSchema = {
        items: {
            id: { visible: false },
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
            msdsFilePath: { widget: 'text', label: 'MSOS文件路径', placeholder: 'MSOS文件路径' } as UiInputItem,
            quotationFilePath: { widget: 'text', label: '报价单文件路径', placeholder: '报价单文件路径' } as UiInputItem,
            result: { widget: 'radio', label: '询价结果', list: [{ value: "1", title: '正常询价有结果' }, { value: "2", title: '供应商无回复' }, { value: "3", title: '供应商有回复,但无价格' }] } as UiRadio,
            submit: { widget: 'button', label: '提交', className: "btn btn-primary mr-3 px-6" }
        }
    }

    async open(inquiryData: any) {
        this.inquiryData = inquiryData;
        this.openPage(this.page);
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        await this.controller.saveInquiryPackage(context.form.data, this.inquiryData);
    }

    private page = () => {
        let descriptionData = _.clone(this.inquiryData);

        return <Page header="录入询价结果" headerClassName="py-1 bg-primary">
            <div className="App-container container text-left">
                <Form ref={v => this.form = v} className="my-3"
                    schema={schema}
                    uiSchema={this.uiSchema}
                    formData={descriptionData}
                    onButtonClick={this.onFormButtonClick}
                    fieldLabelSize={3}
                />
            </div>
        </Page>
    }
}
