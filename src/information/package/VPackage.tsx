import * as React from 'react';
import { VPage, Page, BoxId, Form, UiRadio, UiSchema, UiTextItem, UiInputItem, UiIdItem, Schema, Context, tv } from 'tonva';
import { observer } from 'mobx-react';
import { SupplierItem } from "model/supplierItem";
import { CPackage } from './CPackage';

export class VPackage extends VPage<CPackage> {
    private form: Form;
    private item: any;
    private parent: any;
    async open(param?: SupplierItem) {
        let { item, parent } = param;
        this.item = item;
        this.parent = parent;
        this.openPage(this.page);
    }

    private schema: Schema = [
        { name: 'quantity', type: 'number', required: true },
        { name: 'radiox', type: 'number', required: true },
        { name: 'radioy', type: 'number', required: true },
        { name: 'unit', type: 'string', required: true },
        { name: 'type', type: 'string', required: true },
        { name: 'price', type: 'number', required: true },
        { name: 'currency', type: 'id', required: true },
        { name: 'isTaxIn', type: 'number', required: true },
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
        { name: 'vatRate', type: 'id', required: false },
        { name: 'tariffRate', type: 'number', required: false },
        { name: 'submit', type: 'submit' }
    ];

    private uiSchema: UiSchema = {
        items: {
            quantity: { widget: 'text', label: '数量', placeholder: '必填', defaultValue: 1 } as UiInputItem,
            radiox: { widget: 'text', label: '套', placeholder: '必填', defaultValue: 1 } as UiInputItem,
            radioy: { widget: 'text', label: '包装规格', placeholder: '必填' } as UiInputItem,
            unit: { widget: 'text', label: '单位', placeholder: '必填' } as UiInputItem,
            type: { widget: 'radio', label: '类型', list: [{ value: 1, title: '目录包装' }, { value: 2, title: '非目录包装' }] } as UiRadio,
            price: { widget: 'text', label: '结算价', placeholder: '必填' } as UiInputItem,
            currency: {
                widget: 'id', label: '结算币种', placeholder: '结算币种',
                pickId: async (context: Context, name: string, value: number) => await this.controller.cApp.cPendingInquiry.pickCurrency(context, name, value),
                Templet: (item: any) => {
                    if (!item) return <small className="text-muted">请选择结算币种</small>;
                    return <>
                        {tv(item, v => <>{v.name}</>)}
                    </>;
                }
            } as UiIdItem,
            isTaxIn: { widget: 'radio', label: '含税费', list: [{ value: "0", title: '否' }, { value: "1", title: '是' }] } as UiRadio,
            isTransFeeIn: { widget: 'radio', label: '含运费', list: [{ value: "0", title: '否' }, { value: "1", title: '是' }] } as UiRadio,
            transFee: { widget: 'text', label: '运费', placeholder: '运费' } as UiInputItem,
            transFeecurrency: {
                widget: 'id', label: '运费币种', placeholder: '运费币种',
                pickId: async (context: Context, name: string, value: number) => await this.controller.cApp.cPendingInquiry.pickCurrency(context, name, value),
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
                pickId: async (context: Context, name: string, value: number) => await this.controller.cApp.cPendingInquiry.pickCurrency(context, name, value),
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
                pickId: async (context: Context, name: string, value: number) => await this.controller.cApp.cPendingInquiry.pickCurrency(context, name, value),
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
            invoiceType: { widget: 'radio', label: '发票类型', list: [{ value: "1", title: '增值税专用发票' }, { value: "2", title: '增值税普通发票' }, { value: "3", title: '形式发票' }] } as UiRadio,
            vatRate: {
                widget: 'id', label: '增值税率', placeholder: '增值税率',
                pickId: async (context: Context, name: string, value: number) => await this.controller.pickVatRate(context, name, value),
                Templet: (item: any) => {
                    if (!item) return <small className="text-muted">请选择增值税率</small>;
                    return <>
                        {tv(item, v => <>{v.description}</>)}
                    </>;
                }
            } as UiIdItem,
            tariffRate: { widget: 'text', label: '关税税率', placeholder: '关税税率' } as UiInputItem,
            submit: { widget: 'button', label: '提交', className: "btn btn-primary mr-3 px-6" }
        }
    };

    private onFormButtonClick = async (name: string, context: Context) => {
        let { savePackage } = this.controller;
        let id = this.item && this.item.id;
        await savePackage(id, context.form.data, this.parent);
        this.closePage();
    }

    private page = observer(() => {

        return <Page header="编辑包装" headerClassName="bg-primary">
            <div className="App-container container text-left">
                <Form ref={v => this.form = v} className="my-3"
                    formData={this.item}
                    schema={this.schema}
                    uiSchema={this.uiSchema}
                    onButtonClick={this.onFormButtonClick}
                    requiredFlag={true}
                />
            </div>
        </Page>;
    })
}

