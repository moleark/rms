import * as React from 'react';
import { VPage, Page, UiSchema, UiInputItem, Form, Context, UiIdItem, tv } from 'tonva';
import { Schema } from 'tonva';
import _ from 'lodash';
import { CProduct } from './CProduct';

const schema: Schema = [
    { name: 'id', type: 'id', required: false },
    { name: 'no', type: 'string', required: true },
    { name: 'supplier', type: 'id', required: true },
    { name: 'origin', type: 'string', required: false },
    { name: 'description', type: 'string', required: false },
    { name: 'descriptionC', type: 'string', required: false },
    { name: 'isTrue', type: 'boolean', required: true },
];

export class VProduct extends VPage<CProduct> {

    private form: Form;
    private productData: any;

    private uiSchema: UiSchema = {
        items: {
            id: { visible: false },
            no: { widget: 'text', label: '产品编号', placeholder: '必填' } as UiInputItem,
            supplier: {
                widget: 'id', label: '供应商', placeholder: '请选择供应商',
                pickId: async (context: Context, name: string, value: number) => await this.controller.pickSupplier(context, name, value),
                Templet: (item: any) => {
                    let { obj } = item;
                    if (!obj) return <small className="text-muted">请选择供应商</small>;
                    return <>
                        {tv(obj, v => <>{v.name}</>)}
                    </>;
                }
            } as UiIdItem,
            origin: { widget: 'text', label: '供应商自编号' } as UiInputItem,
            description: { widget: 'text', label: '英文名称' } as UiInputItem,
            descriptionC: { widget: 'text', label: '中文名称' } as UiInputItem,
            isTrue: { widget: 'checkbox', label: '有效', defaultValue: true },
            submit: { widget: 'button', label: '提交' },
        }
    }

    async open(productData: any) {
        this.productData = productData;
        this.openPage(this.page);
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        await this.controller.saveProductData(context.form.data);
    }

    private onSaveProductData = async () => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    private page = () => {
        let descriptionData = _.clone(this.productData);

        let footer: any;
        footer = <button type="button"
            className="btn btn-primary w-100"
            onClick={this.onSaveProductData}>保存</button>;

        return <Page header="产品" footer={footer}>
            <div className="p-3 bg-white">
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
