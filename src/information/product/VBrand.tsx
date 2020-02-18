import * as React from 'react';
import { VPage, Page, UiSchema, UiInputItem, Form, Context } from 'tonva';
import { Schema } from 'tonva';
import _ from 'lodash';
import { CBrand } from './CBrand';

const schema: Schema = [
    { name: 'id', type: 'id', required: false },
    { name: 'no', type: 'string', required: true },
    { name: 'name', type: 'string', required: true },
    { name: 'isValid', type: 'boolean', required: true },
];

export class VBrand extends VPage<CBrand> {

    private form: Form;
    private brandData: any;

    private uiSchema: UiSchema = {
        items: {
            id: { visible: false },
            no: { widget: 'text', label: '品牌编号', placeholder: '必填' } as UiInputItem,
            name: { widget: 'text', label: '品牌名称', placeholder: '必填' } as UiInputItem,
            isValid: { widget: 'checkbox', label: '有效', defaultValue: true },
            submit: { widget: 'button', label: '提交' },
        }
    }

    async open(brandData: any) {
        this.brandData = brandData;
        this.openPage(this.page);
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        await this.controller.saveBrandData(context.form.data);
    }

    private onSaveBrandData = async () => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    private page = () => {
        let descriptionData = _.clone(this.brandData);

        let footer: any;
        footer = <button type="button"
            className="btn btn-primary w-100"
            onClick={this.onSaveBrandData}>保存</button>;

        return <Page header="添加品牌" footer={footer} headerClassName="bg-primary">
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