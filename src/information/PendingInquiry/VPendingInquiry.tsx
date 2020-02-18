import * as React from 'react';
import { VPage, Page, UiSchema, UiInputItem, Form, Context, UiIdItem, tv, FA, UiTextItem } from 'tonva';
import { Schema } from 'tonva';
import _ from 'lodash';
import { CPendingInquiry } from './CPendingInquiry';

const schema: Schema = [
    { name: 'id', type: 'id', required: false },
    { name: 'quantity', type: 'number', required: true },
    { name: 'radiox', type: 'number', required: true },
    { name: 'radioy', type: 'number', required: true },
    { name: 'unit', type: 'string', required: true },
];

export class VPendingInquiry extends VPage<CPendingInquiry> {

    private form: Form;
    private pendingInquiryData: any;

    private uiSchema: UiSchema = {
        items: {
            id: { visible: false },
            quantity: { widget: 'text', label: '数量', placeholder: '必填', defaultValue: 1 } as UiInputItem,
            radiox: { widget: 'text', label: '套', placeholder: '必填', defaultValue: 1 } as UiInputItem,
            radioy: { widget: 'text', label: '包装规格', placeholder: '必填' } as UiInputItem,
            unit: { widget: 'text', label: '单位', placeholder: '必填' } as UiTextItem,
            submit: { widget: 'button', label: '提交' },
        }
    }

    async open(pendingInquiryData: any) {
        this.pendingInquiryData = pendingInquiryData;
        this.openPage(this.page);
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        await this.controller.savePendingInquiryData(context.form.data);
    }

    private onSavePendingInquiryData = async () => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    private showProductlData = () => {

        let { product } = this.controller;
        let { supplier, brand, description, descriptionC, CAS, purity } = product;
        let { name } = supplier.obj;
        let brandname = brand === undefined ? undefined : brand.obj.name;

        return <div className="py-2 bg-white">
            <div className="cursor-pointer">
                &nbsp;<FA className="align-middle text-warning" name="credit-card" /><span className="h6 py-2 px-1 align-middle"><b>产品信息</b></span>
            </div>
            <div className="py-2 cat-root-sub small">
                <div><span className="px-4 align-middle">供应商:</span><span> {name}</span></div>
                <div><span className="px-4 align-middle ">品牌:</span><span> {brandname}</span></div>
                <div><span className="px-4 align-middle ">CAS：</span><span>{CAS}</span></div>
                <div><span className="px-4 align-middle ">英文名称：</span><span>{description}</span></div>
                <div><span className="px-4 align-middle ">中文名称：</span><span>{descriptionC}</span></div>
                <div><span className="px-4 align-middle ">纯度：</span><span>{purity}</span></div>
            </div>
        </div>;
    }

    private page = () => {
        let descriptionData = _.clone(this.pendingInquiryData);

        let footer: any;
        footer = <button type="button"
            className="btn btn-primary w-100"
            onClick={this.onSavePendingInquiryData}>保存</button>;

        return <Page header="待询单" footer={footer} headerClassName="bg-primary">
            {this.showProductlData()}
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
