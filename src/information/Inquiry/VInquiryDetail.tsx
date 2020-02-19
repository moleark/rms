import * as React from 'react';
import { VPage, Page, BoxId, EasyTime, EasyDate } from 'tonva';
import { tv } from 'tonva';
import { List } from 'tonva';
import { OrderItem } from './CInquiry';
import { CInquiry } from './CInquiry';

export class VInquiryDetail extends VPage<CInquiry> {

    async open(inquiry: any) {
        this.openPage(this.page, inquiry);
    }

    private renderOrderItem = (item: any, index: number) => {
        let { product, quantity, radiox, radioy, unit } = item;
        let radio = (radiox !== 1) ? <>{radiox} * {radioy}{unit}</> : <>{radioy}{unit}</>;
        let { id } = product;
        return <div>
            <div className="row p-1 my-1">
                <div className="col-lg-6">{
                    <div key={index} className="px-2 py-2 border-top">
                        <div className="d-flex align-items-center">
                            <div className="flex-grow-1 small"><b>{this.controller.renderProduct(id)}  {radio}</b></div>
                        </div>
                    </div>
                }</div>
            </div>
        </div>;
    }

    private page = (inquiry: any) => {

        let { brief, data } = inquiry;
        let { id, no, state, description, date, user } = brief;
        let { supplier, contactName, contactSalutation, contactDepartmentName, contactTelephone, contactMobile, contactEmail, contactfax, way, remarks, inquiryitems } = data;

        let header = <>询价单详情: {no}</>
        return <Page header={header} headerClassName="bg-primary">
            <List items={inquiryitems} item={{ render: this.renderOrderItem }} />
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">供应商:</div>
                <div className="col-9">{tv(supplier, v => <>{v.name}</>)}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">联系人姓名:</div>
                <div className="col-9">{contactName}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">联系人称谓:</div>
                <div className="col-9">{contactSalutation}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">联系人部门:</div>
                <div className="col-9">{contactDepartmentName}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">联系人电话:</div>
                <div className="col-9">{contactTelephone}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">联系人手机:</div>
                <div className="col-9">{contactMobile}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">联系人邮箱:</div>
                <div className="col-9">{contactEmail}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">联系人传真:</div>
                <div className="col-9">{contactfax}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">询价方式:</div>
                <div className="col-9">{way === 1 ? "Email询价" : (way === 2 ? "电话询价" : "传真询价")}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">备注:</div>
                <div className="col-9">{remarks}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">下单时间:</div>
                <div className="col-9"><EasyDate date={date} /></div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">询价人:</div>
                <div className="col-9">{user}</div>
            </div>
        </Page>
    }
}
