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
    { name: 'remarks', type: 'number', required: false },
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
            remarks: { widget: 'textarea', label: '备注', placeholder: '备注', rows: 5 } as UiInputItem,
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
        let { no,supplier, origin,brand, description, descriptionC, CAS, purity } = product;
        let { name } = supplier.obj;
        let brandname = brand === undefined ? undefined : brand.obj.name;

        return <div className="bg-white py-2">
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">产品编号:</div><div className="col-9 text-muted text-right">{no}</div>
            </div>
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">供应商:</div><div className="col-9 text-muted text-right">{name}</div>
            </div>
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">品牌:</div><div className="col-9 text-muted text-right">{brandname}</div>
            </div>
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">CAS:</div><div className="col-9 text-muted text-right">{CAS}</div>
            </div>
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">英文名称:</div><div className="col-9 text-muted text-right">{description}</div>
            </div>
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">中文名称:</div><div className="col-9 text-muted text-right">{descriptionC}</div>
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
