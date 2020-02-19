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


    private packsRow = (item: any, index: number) => {
        let { pack, quantity, price, currency } = item;

        return <div key={index} className="px-2 py-2 border-top">
            <div className="d-flex align-items-center">
                <div className="flex-grow-1"><b>{tv(pack)}</b></div>
                <div className="w-12c mr-4 text-right">
                    <span className="text-danger h5"><small>¥</small>{parseFloat((price * quantity).toFixed(2))}</span>
                    <small className="text-muted">(¥{parseFloat(price.toFixed(2))} × {quantity})</small>
                </div>
            </div>
        </div>;
    }

    private renderOrderItem = (inquiryItem: OrderItem) => {
        let { product, packs } = inquiryItem;
        let { controller, packsRow } = this;
        return <div>
            <div className="row p-1 my-1">
                <div className="col-lg-6 pb-3"></div>
                <div className="col-lg-6">{
                    // packs.map((p, index) => {
                    //     return packsRow(p, index);
                    // })
                }</div>
            </div>
        </div>;
    }

    private page = (inquiry: any) => {

        let { brief, data } = inquiry;
        let { id, no, state, description, date, user } = brief;
        let { supplier, contact, contactName, contactSalutation, contactDepartmentName, contactTelephone, contactMobile, contactEmail, contactfax, way, remarks, inquiryItems } = data;

        let header = <>询价单详情: {no}</>
        return <Page header={header}>
            <List items={inquiryItems} item={{ render: this.renderOrderItem }} />
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">供应商:</div>
                <div className="col-9">{tv(supplier)}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">联系人:</div>
                <div className="col-9">{tv(contact)}</div>
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
                <div className="col-9 text-right"><EasyDate date={date} /></div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">下单人:</div>
                <div className="col-9 text-right">{tv(user)}</div>
            </div>
        </Page>
    }
}
