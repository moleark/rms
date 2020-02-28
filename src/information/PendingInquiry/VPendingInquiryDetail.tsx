import * as React from 'react';
import { VPage, Page, FA, EasyDate, tv, LMR, List, Schema, UiSchema, UiRadio, Form, Context } from 'tonva';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { CPendingInquiry } from './CPendingInquiry';

const schema: Schema = [
    { name: 'result', type: 'number', required: true },
    { name: 'submit', type: 'submit' }
];

export class VPendingInquiryDetail extends VPage<CPendingInquiry> {
    private form: Form;
    private pending: any;
    private firstPackage: any;
    private packages: any[] = [];

    private uiSchema: UiSchema = {
        items: {
            result: { widget: 'radio', label: '询价结果', list: [{ value: 1, title: '有价格' }, { value: 2, title: '无价格' }] } as UiRadio,
            submit: { widget: 'button', label: '提交', className: "btn btn-primary mr-3 px-6" }
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

    private getPackage = () => {
        return <div className="bg-white px-2 ">
            {this.firstPackage && <List items={this.packages} item={{ render: this.renderPackage }} />}
        </div>
    }

    private renderPackage = (item: any, index: number) => {

        let { id, inquiryPackage, user, createDate, product, quantity, radiox, radioy, unit, CAS, purity } = item;
        let { brand, description, descriptionC } = product.obj;
        let radio = (radiox !== 1) ? <>{radiox} * {radioy}{unit}</> : <>{radioy}{unit}</>;
        let brandname = brand === undefined ? undefined : brand.obj.name;

        let right =
            <div className="px-2 text-muted text-right">
                <span onClick={() => this.controller.openPendingInquiryResult(item)}><FA className="align-middle p-2 cursor-pointer text-info" name="edit" /></span>
            </div>;
        return <LMR right={right} className="py-2 small">
            <div><FA name="circle" className="px-2 text-primary"></FA>CAS：{CAS}</div>
            <div className="px-4 text-muted small">名称：{description}</div>
            <div className="px-4 text-muted small">包装：{quantity} * {radio}</div>
        </LMR>;
    }

    private rowTop = (suppplierData: any) => {

        let { supplier, contactName, contactSalutation, contactDepartmentName, contactTelephone, contactMobile, contactEmail, contactfax, way, inquiryUser, inquiryDate, user, date, remarks } = suppplierData;
        let { id } = user;
        let { id: inid } = inquiryUser;

        return <div className="py-2 bg-white">
            <div className="cursor-pointer">
                &nbsp;<FA className="align-middle text-warning" name="credit-card" /><span className="h6 py-2 px-2 align-middle">供应商：<b>{tv(supplier, v => <>{v.name}</>)}</b></span>
            </div>
            <div className="py-2 cursor-pointer">
                &nbsp;<FA className="align-middle text-warning" name="user-circle-o" /><span className="h6 py-2 px-2 align-middle">联系人：<b>{contactName}</b>&nbsp;&nbsp;联系电话：<b>{contactMobile}</b></span>
            </div>
            <div className="py-2 cursor-pointer">
                &nbsp;<span className="h6 py-2 px-4 align-middle">创建人：<b>{id}</b>&nbsp;&nbsp;创建时间：<b><EasyDate date={date} /></b></span>
            </div>
            <div className="py-2 cursor-pointer">
                &nbsp;<FA className="align-middle text-warning" name="user-circle-o" /><span className="h6 py-2 px-2 align-middle">询价人：<b>{inid}</b>&nbsp;&nbsp;询价时间：<b><EasyDate date={inquiryDate} /></b></span>
            </div>
            <div className="py-2 cursor-pointer">
                &nbsp;<span className="h6 py-2 px-4 align-middle">询价方式：<b>{way === 1 ? "Email询价" : (way === 2 ? "电话询价" : "传真询价")}</b></span>
            </div>
        </div>;
    }

    private page = () => {
        let suppplierData = _.clone(this.pending);
        let header = <header className="py-2 text-center text-white">
            <span className="h5 align-middle">询价详情</span>
        </header>;

        return <Page header={header} headerClassName="bg-primary">
            {this.rowTop(suppplierData)}
            {this.getPackage()}
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