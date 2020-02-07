import * as React from 'react';
import { VPage, Page, UiSchema, UiInputItem, Form, Context } from 'tonva';
import { Schema } from 'tonva';
import _ from 'lodash';
import { CSupplier } from './CSupplier';

const schema: Schema = [
    { name: 'id', type: 'id', required: false },
    { name: 'no', type: 'string', required: true },
    { name: 'name', type: 'string', required: true },
    { name: 'abbreviation', type: 'string', required: false },
    { name: 'isValid', type: 'boolean', required: true },
];

export class VSupplier extends VPage<CSupplier> {

    private form: Form;
    private supplierData: any;

    private uiSchema: UiSchema = {
        items: {
            id: { visible: false },
            no: { widget: 'text', label: '供应商编号', placeholder: '必填' } as UiInputItem,
            name: { widget: 'text', label: '供应商名称', placeholder: '必填' } as UiInputItem,
            abbreviation: { widget: 'text', label: '供应商简称' } as UiInputItem,
            isValid: { widget: 'checkbox', label: '有效', defaultValue: true },
            submit: { widget: 'button', label: '提交' },
        }
    }

    async open(supplierData: any) {
        this.supplierData = supplierData;
        this.openPage(this.page);
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        await this.controller.saveSupplierData(context.form.data);
    }

    private onSavesupplierData = async () => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    private page = () => {
        let descriptionData = _.clone(this.supplierData);

        let footer: any;
        footer = <button type="button"
            className="btn btn-primary w-100"
            onClick={this.onSavesupplierData}>保存</button>;

        return <Page header="供应商" footer={footer}>
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
