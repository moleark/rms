import * as React from 'react';
import { VPage, Page, FA, EasyDate, tv, LMR, List, Schema, UiSchema, UiInputItem, Form, Context, UiRadio } from 'tonva';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { CPendingInquiry } from './CPendingInquiry';

const schema: Schema = [
    { name: 'id', type: 'id', required: false },
    { name: 'result', type: 'number', required: true },
    { name: 'submit', type: 'submit' }
];

export class VPendingInquiry extends VPage<CPendingInquiry> {
    private form: Form;
    private pending: any;
    private firstPackage: any;
    private packages: any[] = [];

    private uiSchema: UiSchema = {
        items: {
            id: { visible: false },
            result: { widget: 'radio', label: '询价结果', list: [{ value: 1, title: '正常询价有结果' }, { value: 2, title: '供应商无回复' }, { value: 3, title: '供应商有回复,但无价格' }] } as UiRadio,
            submit: { widget: 'button', label: '完结', className: "btn btn-primary mr-3 px-6" }
        }
    }

    async open(param: any) {
        let { parent, item, child } = param;
        this.pending = parent;
        this.firstPackage = item;
        this.packages = child;
        this.openPage(this.page);
    }


    private onFormButtonClick = async (name: string, context: Context) => {
        await this.controller.saveInquiryData(context.form.data, this.pending, this.packages);
    }

    private page = () => {
        let suppplierData = _.clone(this.pending);

        return <Page header="完结询单" headerClassName="bg-primary">
            <div className="App-container container text-left">
                <Form ref={v => this.form = v} className="my-3"
                    schema={schema}
                    uiSchema={this.uiSchema}
                    formData={suppplierData}
                    onButtonClick={this.onFormButtonClick}
                    fieldLabelSize={3}
                />
            </div>
        </Page >
    }
}