import * as React from 'react';
import { VPage, Page, FA, EasyDate, tv, LMR, List } from 'tonva';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { CPendingInquiry } from './CPendingInquiry';

export class VPendingInquiryDetail extends VPage<CPendingInquiry> {
    private suppplier: any;
    private firstPackage: any;
    private packages: any[] = [];

    async open(param: any) {
        let { parent, item, child } = param;
        this.suppplier = parent;
        this.firstPackage = item;
        this.packages = child;
        this.openPage(this.page);
    }

    private getPackage = () => {
        return <div className="bg-white px-2 ">
            {this.firstPackage && <List items={this.packages} item={{ render: this.renderPackage }} />}
        </div>
    }

    private renderPackage = (item: any, index: number) => {
        let { deletePendingInquiryData } = this.controller;
        let { id, user, product, quantity, radiox, radioy, unit, date, CAS, purity } = item;
        let { brand, description, descriptionC } = product.obj;
        let radio = (radiox !== 1) ? <>{radiox} * {radioy}{unit}</> : <>{radioy}{unit}</>;
        let brandname = brand === undefined ? undefined : brand.obj.name;

        let right =
            <div className="px-2 text-muted text-right">
                <span onClick={() => deletePendingInquiryData(item)}><FA className="align-middle p-2 cursor-pointer text-danger" name="remove" /></span>
            </div>;
        return <LMR right={right} className="py-2 samll">
            <div><FA name="circle" className="px-2 text-primary"></FA>CAS：{CAS}</div>
            <div className="px-4 text-muted small">名称：{description}</div>
            <div className="px-4 text-muted small">包装：{quantity} * {radio}</div>
        </LMR>;
    }

    private rowTop = () => {
        let suppplierData = _.clone(this.suppplier);
        let { supplier } = suppplierData;

        return <div className="py-2 bg-white">
            <div className="cursor-pointer">
                &nbsp;<FA className="align-middle text-warning" name="credit-card" /><span className="h6 py-2 px-1 align-middle"><b>{tv(supplier, v => <>{v.name}</>)}</b></span>
            </div>
        </div>;
    }

    private page = () => {

        let header = <header className="py-2 text-center text-white">
            <span className="h5 align-middle">询价详情</span>
        </header>;

        return <Page header={header} headerClassName="bg-primary">
            {this.rowTop()}
            {this.getPackage()}
        </Page >
    }
}