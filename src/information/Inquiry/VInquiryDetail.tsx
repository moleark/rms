import * as React from 'react';
import { VPage, Page, BoxId, EasyTime, EasyDate, FA, LMR } from 'tonva';
import { tv } from 'tonva';
import { List } from 'tonva';
import { CInquiry } from './CInquiry';
import { start } from 'repl';

export class VInquiryDetail extends VPage<CInquiry> {

    async open(inquiry: any) {
        this.openPage(this.page, inquiry);
    }

    private renderPackageItem = (item: any, index: number) => {
        let { pack, inquiryQuantity, no } = item;

        return <LMR key={index} className="d-flex cursor-pointer py-1" onClick={() => this.controller.openPackageDetail(item)}>
            <div><FA name="chevron-right" className="px-2 text-primary"></FA>{inquiryQuantity} * {pack} {no}</div>
        </LMR>;
    }

    private renderProductItem = (item: any, index: number) => {
        let { product, packs } = item;
        let { id } = product;

        return <LMR key={index} className="d-flex px-3 cursor-pointer">
            <div>{this.controller.renderProduct(id)}</div>
            <div className="py-1">
                <List items={packs} item={{ render: this.renderPackageItem }} />
            </div>
        </LMR>;
    }

    private page = (inquiry: any) => {

        let { brief, data } = inquiry;
        let { id, no, state, description, date, user } = brief;
        let { supplier, contactName, contactSalutation, contactDepartmentName, contactTelephone, contactMobile, contactEmail, contactfax, way, remarks, InquiryItems } = data;

        let header = <>询价单: {no}</>
        return <Page header={header} headerClassName="py-1 bg-primary">
            <div>
                <div className="bg-white py-2">
                    <div className="row no-gutters px-3 my-1">
                        <div className="col-3">供应商:</div><div className="col-9"><b>{tv(supplier, v => <>{v.name}</>)}</b></div>
                    </div>
                    <div className="row no-gutters px-3 my-1">
                        <div className="col-3">联系人:</div><div className="col-9 text-muted">{contactName}&nbsp;{contactSalutation}&nbsp;{contactDepartmentName}</div>
                    </div>
                    <div className="row no-gutters px-3 my-1">
                        <div className="col-3">联系方式:</div><div className="col-9 text-muted">{contactTelephone}&nbsp;{contactMobile}&nbsp;{contactEmail}&nbsp;{contactfax}</div>
                    </div>
                    <div className="row no-gutters px-3 my-1">
                        <div className="col-3">询价人:</div><div className="col-9 text-muted">{way === 1 ? "Email询价" : (way === 2 ? "电话询价" : "传真询价")}&nbsp;{user}&nbsp;<EasyDate date={date} /></div>
                    </div>
                    {remarks === undefined ? "" : <>
                        <div className="row no-gutters px-3 my-1">
                            <div className="col-3">备注:</div><div className="col-9 text-muted">{remarks}</div>
                        </div></>}
                </div>
            </div>
            <div className="py-2">
                <List items={InquiryItems} item={{ render: this.renderProductItem }} />
            </div>
        </Page>
    }
}
