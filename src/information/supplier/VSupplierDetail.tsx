import * as React from 'react';
import { VPage, Page, FA, EasyDate, tv, LMR, List } from 'tonva';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { CSupplier } from "./CSupplier";
import { SupplierItem } from "model/supplierItem";

export class VSupplierDetail extends VPage<CSupplier> {

    private supplier: any;
    private firstSupplierContact: any;
    private supplierContacts: any[] = [];

    async open(param: SupplierItem) {
        let { parent, item, child } = param;
        this.supplier = parent;
        this.firstSupplierContact = item;
        this.supplierContacts = child;
        this.openPage(this.page);
    }

    private getSupplierContact = () => {
        let { showCreateSupplierContact } = this.controller.cApp.cSupplierContact;
        return <div className="bg-white mb-3">
            <div className="cursor-pointer">
                &nbsp;<FA className="align-middle text-warning" name="user-circle" /><span className="h6 py-2 px-1 align-middle"><b> 供应商联系人</b></span>
            </div>
            {this.firstSupplierContact && <List items={this.supplierContacts} item={{ render: this.renderContact }} />}
            <div className="text-primary text-center small bg-white py-2" onClick={() => showCreateSupplierContact(this.supplier)}>＋联系人</div>

        </div>
    }

    private renderContact = (item: any, index: number) => {
        let { no, name, firstname } = item;
        return <LMR className="py-2">
            <p >
                <FA name="location-arrow" className="px-2 text-primary"></FA>
                {no} - {name}
            </p>
        </LMR>;
    }

    private rowTop = () => {
        let supplierData = _.clone(this.supplier);
        let { name, no, abbreviation, createTime } = supplierData;

        return <div className="py-2 bg-white mb-3">
            <div className="cursor-pointer">
                &nbsp;<FA className="align-middle text-warning" name="credit-card" /><span className="h6 py-2 px-1 align-middle"><b> 供应商基本信息</b></span>
            </div>
            <div className="py-2 cat-root-sub">
                <div><span className="px-4 align-middle">编号：</span><span className="py-2 px-4">{no}</span></div>
                <div><span className="px-4 align-middle ">名称：</span><span className="py-2 px-4">{name}</span></div>
                <div><span className="px-4 align-middle ">简称：</span><span className="py-2 px-4">{abbreviation}</span></div>
                <div><p><span className="px-4 align-middle ">创建时间：</span><span className="py-3">{<EasyDate date={createTime} />}</span></p></div>
            </div>
        </div>;
    }

    private page = () => {

        let header = <header className="py-2 text-center text-white">
            <span className="h5 align-middle">供应商详情</span>
        </header>;

        return <Page header={header} headerClassName="bg-primary">
            {this.rowTop()}
            {this.getSupplierContact()}
        </Page>
    }
}