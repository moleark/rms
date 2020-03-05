import * as React from 'react';
import { VPage, Page, UiSchema, UiInputItem, Form, Context, BoxId, tv, UiIdItem, UiTextItem, UiRadio } from 'tonva';
import { Schema } from 'tonva';
import _ from 'lodash';
import { CSupplier } from './CSupplier';
import { addressDetailValidation } from 'tools/inputValidations';

const schema: Schema = [
    { name: 'id', type: 'id', required: false },
    { name: 'accountName', type: 'string', required: true },
    { name: 'accountNo', type: 'string', required: true },
    { name: 'bank', type: 'string', required: true },
    { name: 'bankAddress', type: 'string', required: true },
    { name: 'usageType', type: 'number', required: true },
    { name: 'bankSWIFT', type: 'string', required: false },
    { name: 'bankIBAN', type: 'string', required: false },
    { name: 'bankRTN', type: 'string', required: false },
    { name: 'submit', type: 'submit' }
];

export class VSupplierBankAccount extends VPage<CSupplier> {

    private form: Form;
    private supplierData: any;

    private uiSchema: UiSchema = {
        items: {
            id: { visible: false },
            accountName: { widget: 'text', label: '受益人', placeholder: '受益人' } as UiInputItem,
            accountNo: { widget: 'text', label: '账号', placeholder: '开户银行帐号' } as UiInputItem,
            bank: { widget: 'text', label: '开户行', placeholder: '开户行' } as UiInputItem,
            bankAddress: { widget: 'text', label: '银行地址', placeholder: '银行地址' } as UiInputItem,
            usageType: { widget: 'radio', label: '用途', list: [{ value: 0, title: '开户行' }, { value: 1, title: '中转行' }] } as UiRadio,
            bankSWIFT: { widget: 'text', label: 'SWIFT/BIC', placeholder: '开户行SWIFT/BIC' } as UiInputItem,
            bankIBAN: { widget: 'text', label: 'IBAN', placeholder: '开户行IBAN' } as UiInputItem,
            bankRTN: { widget: 'text', label: 'RTN ', placeholder: '开户行的RTN ' } as UiInputItem,
            submit: { widget: 'button', label: '提交', className: "btn btn-primary mr-3 px-6" }
        }
    }

    async open(supplierData: any) {
        this.supplierData = supplierData;
        this.openPage(this.page);
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        await this.controller.saveSupplierBankData(context.form.data, this.supplierData);
    }

    private page = () => {
        let descriptionData = _.clone(this.supplierData);

        return <Page header="编辑银行信息" headerClassName="bg-primary">
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
