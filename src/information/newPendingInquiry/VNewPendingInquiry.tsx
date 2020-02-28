import * as React from 'react';
import { VPage, Page, UiSchema, UiInputItem, Form, Context, UiIdItem, tv, FA, UiTextItem } from 'tonva';
import { Schema } from 'tonva';
import _ from 'lodash';
import { CNewPendingInquiry } from './CNewPendingInquiry';

const schema: Schema = [
    { name: 'id', type: 'id', required: false },
    { name: 'quantity', type: 'number', required: true },
    { name: 'radiox', type: 'number', required: true },
    { name: 'radioy', type: 'number', required: true },
    { name: 'unit', type: 'string', required: true },
    { name: 'submit', type: 'submit' }
];

export class VNewPendingInquiry extends VPage<CNewPendingInquiry> {

    private form: Form;
    private pendingInquiryData: any;

    private uiSchema: UiSchema = {
        items: {
            id: { visible: false },
            quantity: { widget: 'text', label: '数量', placeholder: '必填', defaultValue: 1 } as UiInputItem,
            radiox: { widget: 'text', label: '套', placeholder: '必填', defaultValue: 1 } as UiInputItem,
            radioy: { widget: 'text', label: '包装规格', placeholder: '必填' } as UiInputItem,
            unit: { widget: 'text', label: '单位', placeholder: '必填' } as UiTextItem,
            submit: { widget: 'button', label: '提交', className: "btn btn-primary mr-3 px-6" }
        }
    }

    async open(pendingInquiryData: any) {
        this.pendingInquiryData = pendingInquiryData;
        this.openPage(this.page);
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        await this.controller.saveNewPendingInquiryData(context.form.data);
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
                <div className="bg-white row no-gutters px-4 my-1">
                    <div className="col-3 text-muted">供应商:</div><div className="col-9">{name}</div>
                </div>
                <div className="bg-white row no-gutters px-4 my-1">
                    <div className="col-3 text-muted">品牌:</div><div className="col-9">{brandname}</div>
                </div>
                <div className="bg-white row no-gutters px-4 my-1">
                    <div className="col-3 text-muted">CAS:</div><div className="col-9">{CAS}</div>
                </div>
                <div className="bg-white row no-gutters px-4 my-1">
                    <div className="col-3 text-muted">英文名称:</div><div className="col-9">{description}</div>
                </div>
                <div className="bg-white row no-gutters px-4 my-1">
                    <div className="col-3 text-muted">中文名称:</div><div className="col-9">{descriptionC}</div>
                </div>
            </div>
        </div>;
    }

    private page = () => {
        let descriptionData = _.clone(this.pendingInquiryData);

        let footer: any;

        return <Page header="待询出" headerClassName="py-1 bg-primary">
            {this.showProductlData()}
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
