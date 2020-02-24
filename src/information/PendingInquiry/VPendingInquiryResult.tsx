import * as React from 'react';
import { VPage, Page, UiSchema, UiInputItem, Form, Context, UiTextItem, UiRadio, tv, UiIdItem } from 'tonva';
import { Schema } from 'tonva';
import _ from 'lodash';
import { CPendingInquiry } from './CPendingInquiry';

const schema: Schema = [
    { name: 'id', type: 'id', required: false },
    { name: 'quantity', type: 'number', required: true },
    { name: 'radiox', type: 'number', required: true },
    { name: 'radioy', type: 'number', required: true },
    { name: 'unit', type: 'string', required: true },
    { name: 'listPrice', type: 'number', required: false },
    { name: 'price', type: 'number', required: true },
    { name: 'currency', type: 'id', required: true },
    { name: 'isTaxIn', type: 'number', required: true },
    { name: 'isTransFeeIn', type: 'number', required: true },
    { name: 'transFee', type: 'number', required: false },
    { name: 'transFeecurrency', type: 'id', required: false },
    { name: 'packingFee', type: 'number', required: false },
    { name: 'packingcurrency', type: 'id', required: false },
    { name: 'otherFee', type: 'number', required: false },
    { name: 'customized', type: 'number', required: true },
    { name: 'customizeUpto', type: 'date', required: true },
    { name: 'validUpto', type: 'date', required: true },
    { name: 'minArriveDate', type: 'date', required: true },
    { name: 'maxArriveDate', type: 'date', required: true },
    { name: 'invoiceType', type: 'number', required: true },
    { name: 'vatRate', type: 'number', required: false },
    { name: 'tariffRate', type: 'number', required: false },
    { name: 'packType', type: 'number', required: true },
    { name: 'remarks', type: 'string', required: false },
    { name: 'coaFilePath', type: 'string', required: false },
    { name: 'msdsFilePath', type: 'string', required: false },
    { name: 'quotationFilePath', type: 'string', required: false },
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
            unit: { widget: 'text', label: '单位', placeholder: '必填' } as UiTextItem,
            listPrice: { widget: 'text', label: '目录价', } as UiInputItem,
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
            isTaxIn: { widget: 'radio', label: '含税费', list: [{ value: 0, title: '否' }, { value: 1, title: '是' }] } as UiRadio,
            isTransFeeIn: { widget: 'radio', label: '含运费', list: [{ value: 0, title: '否' }, { value: 1, title: '是' }] } as UiRadio,
            transFee: { widget: 'text', label: '运费' } as UiInputItem,
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
            packingFee: { widget: 'text', label: '包装费', } as UiInputItem,
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
            otherFee: { widget: 'text', label: '其他费' } as UiInputItem,
            customized: { widget: 'radio', label: '定制', list: [{ value: 0, title: '否' }, { value: 1, title: '是' }] } as UiRadio,
            customizeUpto: { widget: 'date', label: '定制截止日期' } as UiInputItem,
            validUpto: { widget: 'date', label: '报价有效期', placeholder: '必填' } as UiInputItem,
            minArriveDate: { widget: 'date', label: '最短到货期', placeholder: '必填' } as UiInputItem,
            maxArriveDate: { widget: 'date', label: '最长到货期', placeholder: '必填' } as UiInputItem,
            invoiceType: { widget: 'radio', label: '发票类型', list: [{ value: 1, title: '增值税专用发票' }, { value: 2, title: '增值税普通发票' }, { value: 3, title: '形式发票' }] } as UiRadio,
            vatRate: { widget: 'text', label: '增值税率' } as UiInputItem,
            tariffRate: { widget: 'text', label: '关税税率' } as UiInputItem,
            packType: { widget: 'radio', label: '包装类型', list: [{ value: 1, title: '目录包装' }, { value: 2, title: '非目录包装' }] } as UiRadio,
            remarks: { widget: 'text', label: '备注', row: 10 } as UiInputItem,
            coaFilePath: { widget: 'text', label: 'COA文件路径', } as UiInputItem,
            msdsFilePath: { widget: 'text', label: 'MSOS文件路径' } as UiInputItem,
            quotationFilePath: { widget: 'text', label: '报价单文件路径' } as UiInputItem,
            submit: { widget: 'button', label: '提交' },
        }
    }

    async open(inquiryData: any) {
        this.inquiryData = inquiryData;
        this.openPage(this.page);
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        let { product } = this.inquiryData;
        await this.controller.saveInquiryData(context.form.data, product);
    }

    private onSaveInquiryData = async () => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    private page = () => {
        let descriptionData = _.clone(this.inquiryData);

        let footer: any;
        footer = <button type="button"
            className="btn btn-primary w-100"
            onClick={this.onSaveInquiryData}>保存</button>;

        return <Page header="录入询价结果" footer={footer} headerClassName="bg-primary">
            <div className="bg-white">
                <Form ref={v => this.form = v} className="m-3"
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
