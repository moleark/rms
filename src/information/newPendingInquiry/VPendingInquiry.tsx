import * as React from 'react';
import { VPage, Page, FA, EasyDate, tv, LMR, List, Schema, UiSchema, UiInputItem, Form, Context, UiRadio } from 'tonva';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { CNewPendingInquiry } from './CNewPendingInquiry';

const schema: Schema = [
    { name: 'id', type: 'id', required: false },
    { name: 'way', type: 'number', required: true },
    { name: 'submit', type: 'submit' }
];

export class VPendingInquiry extends VPage<CNewPendingInquiry> {
    private form: Form;
    private supplier: any;
    private uiSchema: UiSchema = {
        items: {
            id: { visible: false },
            way: { widget: 'radio', label: '询价方式', list: [{ value: 1, title: 'Email询价' }, { value: 2, title: '电话询价' }, { value: 3, title: '传真询价' }] } as UiRadio,
            submit: { widget: 'button', label: '提交', className: "btn btn-primary mr-3 px-6" }
        }
    }

    async open(param: any) {
        this.supplier = param;
        this.openPage(this.page);
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        await this.controller.updatePendingInquiryState(context.form.data, this.supplier);
    }

    private page = () => {
        let suppplierData = _.clone(this.supplier);

        return <Page header="询价详情" headerClassName="bg-primary">
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