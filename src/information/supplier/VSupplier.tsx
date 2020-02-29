import * as React from 'react';
import { VPage, Page, UiSchema, UiInputItem, Form, Context, BoxId, tv, UiIdItem, UiTextItem } from 'tonva';
import { Schema } from 'tonva';
import _ from 'lodash';
import { CSupplier } from './CSupplier';
import { addressDetailValidation } from 'tools/inputValidations';

const schema: Schema = [
    { name: 'id', type: 'id', required: false },
    { name: 'name', type: 'string', required: true },
    { name: 'abbreviation', type: 'string', required: false },
    { name: 'webSite', type: 'string', required: false },
    { name: 'address', type: 'id', required: true },
    { name: 'addressString', type: 'string', required: true },
    { name: 'productionAddress', type: 'string', required: true },
    { name: 'bankAddress', type: 'string', required: true },
    { name: 'bankSWIFT', type: 'string', required: true },
    { name: 'bankIBAN', type: 'string', required: true },
    { name: 'bankRTN', type: 'string', required: true },
    { name: 'bank', type: 'string', required: true },
    { name: 'accountNo', type: 'string', required: true },
    { name: 'taxNo', type: 'string', required: true },
    { name: 'profile', type: 'string', required: false },
    { name: 'submit', type: 'submit' }
];

export class VSupplier extends VPage<CSupplier> {

    private form: Form;
    private supplierData: any;

    private uiSchema: UiSchema = {
        items: {
            id: { visible: false },
            name: { widget: 'text', label: '供应商名称', placeholder: '必填' } as UiInputItem,
            abbreviation: { widget: 'text', label: '供应商简称', placeholder: '供应商简称' } as UiInputItem,
            webSite: { widget: 'text', label: '网址', placeholder: '网址' } as UiInputItem,
            address: {
                widget: 'id', label: '所在地区',
                pickId: async (context: Context, name: string, value: number) => await this.controller.pickAddress(context, name, value),
                Templet: (address: BoxId) => {
                    if (!address) return <small className="text-muted">(无)</small>;
                    return tv(address, (addressValue) => {
                        let { country, province, city, county } = addressValue;
                        return <>
                            {country !== undefined && country.id !== undefined && tv(country, v => <>{v.chineseName}</>)}
                            {province !== undefined && province.id !== undefined && tv(province, (v) => <>{v.chineseName}</>)}
                            {city !== undefined && city.id !== undefined && tv(city, (v) => <>{v.chineseName}</>)}
                            {county !== undefined && county.id !== undefined && tv(county, (v) => <>{v.chineseName}</>)}
                        </>;
                    }, () => {
                        return <small className="text-muted">请选择地区</small>;
                    })
                }
            } as UiIdItem,
            addressString: { widget: 'text', label: '详细地址', placeholder: '详细地址', rules: addressDetailValidation } as UiTextItem,
            productionAddress: { widget: 'text', label: '生产厂址', placeholder: '生产厂址', rules: addressDetailValidation } as UiTextItem,

            bankAddress: { widget: 'text', label: '银行地址', placeholder: '银行地址' } as UiInputItem,
            bankSWIFT: { widget: 'text', label: '开户行SWIFT/BIC', placeholder: '开户行SWIFT/BIC' } as UiInputItem,
            bankIBAN: { widget: 'text', label: '开户行IBAN', placeholder: '开户行IBAN' } as UiInputItem,
            bankRTN: { widget: 'text', label: '开户行的RTN ', placeholder: '开户行的RTN ' } as UiInputItem,
            bank: { widget: 'text', label: '开户银行', placeholder: '开户银行' } as UiInputItem,
            accountNo: { widget: 'text', label: '开户银行帐号', placeholder: '开户银行帐号' } as UiInputItem,
            taxNo: { widget: 'text', label: '税号', placeholder: '税号' } as UiInputItem,
            profile: { widget: 'textarea', label: '企业简介', placeholder: '企业简介', rows: 10 } as UiInputItem,
            submit: { widget: 'button', label: '提交', className: "btn btn-primary mr-3 px-6" }
        }
    }

    async open(supplierData: any) {
        this.supplierData = supplierData;
        this.openPage(this.page);
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        await this.controller.saveSupplierData(context.form.data);
    }

    private onDelSupplier = async () => {
        if (await this.vCall(VConfirmDeleteSupplier, this.supplierData) === true) {
            await this.controller.delSupplier(this.supplierData);
            await this.controller.loadList();
            this.closePage();
        };
    }

    private page = () => {
        let descriptionData = _.clone(this.supplierData);
        let buttonDel: any;
        if (descriptionData.id !== undefined) {
            buttonDel= <div className="d-flex align-items-center">
            <div><span onClick={() => this.onDelSupplier()} className="fa-stack">
                <i className="fa fa-times-circle fa-stack-2x cursor-pointer my-1" style={{ fontSize: '1.6rem' }}></i>
            </span></div>
        </div>;
        }

        return <Page header="编辑供应商" right={buttonDel} headerClassName="bg-primary">
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

class VConfirmDeleteSupplier extends VPage<CSupplier> {
    async open(supplier: any) {
        this.openPage(this.page, supplier);
    }

    private onConfirm = async () => {
        await this.returnCall(true);
        this.closePage();
    }

    private onCancel = async () => {
        await this.returnCall(false);
        this.closePage();
    }

    private page = (supplier: any) => {
        return <Page header="删除供应商" back="close">
            <div className="w-75 mx-auto border border-primary rounded my-3 p-3 bg-white">
                <div className="p-4 position-relative">
                    <i className="fa fa-question-circle position-absolute fa-2x text-warning" style={{ left: 0, top: 0 }} />
                    <b className="">是否删除该供应商？</b>
                </div>
                <div className="d-flex mt-3 justify-content-end">
                    <button className="btn btn-danger mr-3" onClick={this.onConfirm}>删除供应商</button>
                    <button className="btn btn-outline-info mr-3" onClick={this.onCancel}>取消</button>
                </div>
            </div>
        </Page>;
    }
}