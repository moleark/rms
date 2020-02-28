import * as React from 'react';
import { VPage, Page, FA, EasyDate, tv, LMR, List, Schema, UiSchema, UiInputItem, Form, Context, UiRadio } from 'tonva';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { CNewPendingInquiry } from './CNewPendingInquiry';

const schema: Schema = [
    { name: 'id', type: 'id', required: false },
    { name: 'way', type: 'number', required: true },
    { name: 'remarks', type: 'number', required: false },
    { name: 'submit', type: 'submit' }
];

export class VNewPendingInquiryDetail extends VPage<CNewPendingInquiry> {
    private form: Form;
    private suppplier: any;
    private firstPackage: any;
    private packages: any[] = [];

    private uiSchema: UiSchema = {
        items: {
            id: { visible: false },
            way: { widget: 'radio', label: '询价方式', list: [{ value: 1, title: 'Email询价' }, { value: 2, title: '电话询价' }, { value: 3, title: '传真询价' }] } as UiRadio,
            remarks: { widget: 'text', label: '备注', placeholder: '备注', rows: 5 } as UiInputItem,
            submit: { widget: 'button', label: '提交', className: "btn btn-primary mr-3 px-6" }
        }
    }

    async open(param: any) {
        let { parent, item, child } = param;
        this.suppplier = parent;
        this.firstPackage = item;
        this.packages = child;
        this.openPage(this.page);
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        await this.controller.updatePendingInquiryState(context.form.data, this.suppplier);
    }

    private getPackage = () => {
        return <div className="bg-white px-2 ">
            {this.firstPackage && <List items={this.packages} item={{ render: this.renderPackage }} />}
        </div>
    }

    private renderPackage = (item: any, index: number) => {
        let { deletePendingInquiryPackage } = this.controller;
        let { id, inquiryPackage, user, createDate, product, quantity, radiox, radioy, unit, CAS, purity } = item;
        let { id: packid } = inquiryPackage;
        let { brand, description, descriptionC } = product.obj;
        let radio = (radiox !== 1) ? <>{radiox} * {radioy}{unit}</> : <>{radioy}{unit}</>;
        let brandname = brand === undefined ? undefined : brand.obj.name;

        let right =
            <div className="px-2 text-muted text-right">
                <span onClick={() => deletePendingInquiryPackage(id, packid)}><FA className="align-middle p-2 cursor-pointer text-danger" name="remove" /></span>
            </div>;
        return <LMR right={right} className="py-2 small">
            <div><FA name="circle" className="px-2 text-primary"></FA>CAS：{CAS}</div>
            <div className="px-4 text-muted small">名称：{description}</div>
            <div className="px-4 text-muted small">包装：{quantity} * {radio}</div>
        </LMR>;
    }

    private rowTop = (suppplierData: any) => {

        let { supplier, user, date, remarks } = suppplierData;
        let { id } = user;

        return <div className="py-2 bg-white">
            <div className="cursor-pointer">
                &nbsp;<FA className="align-middle text-warning" name="credit-card" /><span className="h6 py-2 px-2 align-middle">供应商：<b>{tv(supplier, v => <>{v.name}</>)}</b></span>
            </div>
            <div className="py-2 cursor-pointer">
                &nbsp;<FA className="align-middle text-warning" name="user-circle-o" /><span className="h6 py-2 px-2 align-middle">创建人：<b>{id}</b></span>
            </div>
            <div className="cursor-pointer">
                &nbsp;<span className="h6 py-2 px-4 align-middle">创建时间：<b><EasyDate date={date} /></b></span>
            </div>
        </div>;
    }


    private page = () => {
        let suppplierData = _.clone(this.suppplier);

        let { deletePendingInquiryData } = this.controller;
        let right = <div className="w-19c d-flex">
            <span onClick={() => deletePendingInquiryData(suppplierData)} className="fa-stack">
                <i className="fa fa-square fa-stack-2x text-primary"></i>
                <i className="fa fa-remove fa-stack-1x text-danger"></i>
            </span>
        </div>;
        return <Page right={right} header="询价详情" headerClassName="py-1 bg-primary">
            {this.rowTop(suppplierData)}
            <Form ref={v => this.form = v} className="m-3"
                schema={schema}
                uiSchema={this.uiSchema}
                formData={suppplierData}
                onButtonClick={this.onFormButtonClick}
                fieldLabelSize={3}
            />
            {this.getPackage()}
        </Page >
    }
}