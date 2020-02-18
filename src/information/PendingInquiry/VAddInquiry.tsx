import * as React from 'react';
import { VPage, Page, UiSchema, UiInputItem, Form, Context, UiIdItem, tv, FA, UiRadio, List, LMR } from 'tonva';
import { Schema } from 'tonva';
import _ from 'lodash';
import { CPendingInquiry } from './CPendingInquiry';

const schema: Schema = [
    { name: 'id', type: 'id', required: false },
    { name: 'way', type: 'number', required: true },
    { name: 'remarks', type: 'number', required: false },
];

export class VAddInquiry extends VPage<CPendingInquiry> {

    private form: Form;
    private supplier: any;
    private firstPackage: any;
    private packages: any[] = [];

    private uiSchema: UiSchema = {
        items: {
            id: { visible: false },
            way: { widget: 'radio', label: '询价方式', list: [{ value: 1, title: 'Email询价' }, { value: 2, title: '电话询价' }, { value: 3, title: '传真询价' }] } as UiRadio,
            remarks: { widget: 'text', label: '备注', rows: 5 } as UiInputItem,
            submit: { widget: 'button', label: '提交' },
        }
    }

    async open(param: any) {
        let { parent, item, child } = param;
        this.supplier = parent;
        this.firstPackage = item;
        this.packages = child;
        this.openPage(this.page);
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        await this.controller.saveInquiryData(context.form.data, this.supplier.supplier.obj);
    }

    private onSaveInquiryData = async () => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    private getPackage = () => {
        return <div className="bg-white px-2 ">
            {this.firstPackage && <List items={this.packages} item={{ render: this.renderPackage }} />}
        </div>
    }

    private renderPackage = (item: any, index: number) => {

        let { id, user, product, quantity, radiox, radioy, unit, date, CAS, purity } = item;
        let { brand, description, descriptionC } = product.obj;
        let radio = (radiox !== 1) ? <>{radiox} * {radioy}{unit}</> : <>{radioy}{unit}</>;
        let brandname = brand === undefined ? undefined : brand.obj.name;

        return <LMR className="py-2 samll">
            <div><FA name="circle" className="px-2 text-primary"></FA>CAS：{CAS}&nbsp;&nbsp; 包装：{quantity} * {radio}</div>
            <div className="px-4 text-muted small">名称：{description}</div>
        </LMR>;
    }

    private rowTop = (supplier: any, defaultContact: any) => {

        let topdata = defaultContact === null ? <div className="py-2 cursor-pointer">
            &nbsp;<FA className="align-middle text-warning" name="user-circle-o" /><span className="h6 py-2 px-1 align-middle text-danger">请先设置供应商默认联系人!</span></div> : <div><div className="py-2 cursor-pointer">
                &nbsp;<FA className="align-middle text-warning" name="user-circle-o" /><span className="h6 py-2 px-1 align-middle"><b>{tv(defaultContact, v => <>{v.name}</>)}</b></span>
            </div>
                <div><span className="px-4 align-middle">{tv(defaultContact, v => <>{v.mobile}</>)} | {tv(defaultContact, v => <>{v.telephone}</>)} | {tv(defaultContact, v => <>{v.email}</>)}</span></div>
            </div>;
        return <div className="py-2 bg-white">
            <div className="cursor-pointer">
                &nbsp;<FA className="align-middle text-warning" name="credit-card" /><span className="h6 py-2 px-1 align-middle"><b>{tv(supplier, v => <>{v.name}</>)}</b></span>
            </div>
            {topdata}
        </div>;
    }

    private page = () => {
        let suppplierData = _.clone(this.supplier);
        let { supplier } = suppplierData;
        let { defaultContact } = supplier.obj;

        let footer: any;
        footer = defaultContact === null ? "" : <button type="button"
            className="btn btn-primary w-100"
            onClick={this.onSaveInquiryData}>保存</button>;
        let data = defaultContact === null ? <div></div> : <div className="bg-white">
            <Form ref={v => this.form = v} className="m-3"
                schema={schema}
                uiSchema={this.uiSchema}
                formData={suppplierData}
                onButtonClick={this.onFormButtonClick}
                fieldLabelSize={3}
            />
        </div>;

        return <Page header="生成询价单" footer={footer} headerClassName="bg-primary">
            {this.rowTop(supplier, defaultContact)}
            {data}
            {this.getPackage()}
        </Page>
    }
}
