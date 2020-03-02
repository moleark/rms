import * as React from 'react';
import { VPage, Page, BoxId, EasyTime, EasyDate, FA,LMR } from 'tonva';
import { tv } from 'tonva';
import { List } from 'tonva';
import { CInquiry } from './CInquiry';
import { start } from 'repl';

export class VInquiryDetail extends VPage<CInquiry> {

    async open(inquiry: any) {
        this.openPage(this.page, inquiry);
    }

    private renderPackageItem = (item: any, index: number) => {
        let { pack, inquiryQuantity } = item;

        return <LMR key={index} className="d-flex cursor-pointer" onClick={() => this.controller.openPackageDetail(item)}>
            <div><FA name="chevron-right" className="px-2 text-primary"></FA>包装：{inquiryQuantity} * {pack}</div>
        </LMR>;
    }

    private renderProductItem = (item: any, index: number) => {
        let { product,packs} = item;
        let { id } = product;

        return <LMR key={index} className="d-flex px-3 cursor-pointer">
            <div>产品：{this.controller.renderProduct(id)}</div>
            <List items={packs} item={{ render: this.renderPackageItem }} />
        </LMR>;
    }

    private page = (inquiry: any) => {

        let { brief, data } = inquiry;
        let { id, no, state, description, date, user } = brief;
        let { supplier, contactName, contactSalutation, contactDepartmentName, contactTelephone, contactMobile, contactEmail, contactfax, way, remarks, result,InquiryItems } = data;

        let header = <>询价单详情: {no}</>
        return <Page header={header} headerClassName="py-1 bg-primary">
            <div>
                <div className="bg-white py-2">
                    <div className="row no-gutters px-3 my-1">
                        <div className="col-4">供应商:</div><div className="col-8 text-muted text-right">{tv(supplier, v => <>{v.name}</>)}</div>
                    </div>
                    <div className="row no-gutters px-3 my-1">
                        <div className="col-4">联系人姓名:</div><div className="col-8 text-muted text-right">{contactName}</div>
                    </div>
                    <div className="row no-gutters px-3 my-1">
                        <div className="col-4">联系人称谓:</div><div className="col-8 text-muted text-right">{contactSalutation}</div>
                    </div>
                    <div className="row no-gutters px-3 my-1">
                        <div className="col-4">联系人部门:</div><div className="col-8 text-muted text-right">{contactDepartmentName}</div>
                    </div>
                    <div className="row no-gutters px-3 my-1">
                        <div className="col-4">联系人电话:</div><div className="col-8 text-muted text-right">{contactTelephone}</div>
                    </div>
                    <div className="row no-gutters px-3 my-1">
                        <div className="col-4">联系人手机:</div><div className="col-8 text-muted text-right">{contactMobile}</div>
                    </div>
                    <div className="row no-gutters px-3 my-1">
                        <div className="col-4">联系人邮箱:</div><div className="col-8 text-muted text-right">{contactEmail}</div>
                    </div>
                    <div className="row no-gutters px-3 my-1">
                        <div className="col-4">联系人传真:</div><div className="col-8 text-muted text-right">{contactfax}</div>
                    </div>
                    <div className="row no-gutters px-3 my-1">
                        <div className="col-4">询价方式:</div><div className="col-8 text-muted text-right">{way === 1 ? "Email询价" : (way === 2 ? "电话询价" : "传真询价")}</div>
                    </div>
                    <div className="row no-gutters px-3 my-1">
                        <div className="col-4">询价结果:</div><div className="col-8 text-muted text-right">{result === 1 ? "有价格" : (way === 2 ? "有价格" : "无")}</div>
                    </div>
                    <div className="row no-gutters px-3 my-1">
                        <div className="col-4">备注:</div><div className="col-8 text-muted text-right">{remarks}</div>
                    </div>
                    <div className="row no-gutters px-3 my-1">
                        <div className="col-4 ">询出时间:</div><div className="col-8 text-muted text-right"><EasyDate date={date} /></div>
                    </div>
                    <div className="row no-gutters px-3 my-1">
                        <div className="col-4">询价人:</div><div className="col-8 text-muted text-right">{user}</div>
                    </div>
                </div>
            </div>
            <div className="py-2">
                <List items={InquiryItems} item={{ render: this.renderProductItem }} />
            </div>
        </Page>
    }
}
