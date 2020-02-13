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
                &nbsp;<FA className="align-middle text-warning" name="users" /><span className="h6 py-2 px-1 align-middle"><b> 供应商联系人</b></span>
            </div>
            {this.firstSupplierContact && <List items={this.supplierContacts} item={{ render: this.renderContact }} />}
            <div className="text-primary text-center small bg-white py-2" onClick={() => showCreateSupplierContact(this.supplier)}><FA name="plus" />联系人</div>

        </div>
    }

    private renderContact = (item: any, index: number) => {
        let { delSupplierContact, showEditSupplierContact, showSupplierContactDetail } = this.controller.cApp.cSupplierContact;
        let { no, name, id, gender, mobile } = item;
        let { defaultContact } = this.supplier;
        let fa_text = defaultContact === undefined ? "px-2 text-muted small" : (defaultContact.id === id ? "px-2 text-info small" : "px-2 text-muted small");
        let fa_gender = gender === "0" ? <FA name="female" className="px-2 text-danger"></FA> : <FA name="male" className="px-2 text-primary"></FA>;
        let left = <div className={fa_text} onClick={() => showSupplierContactDetail(item)}>
            {fa_gender}
            {name} - {mobile === undefined ? "无" : mobile}</div>
        let right =
            <div className="px-2 text-muted text-right samll">
                <span onClick={() => delSupplierContact(this.supplier, item)}><FA className="align-middle text-danger" name="remove" /></span>
                <span onClick={() => showEditSupplierContact(this.supplier, item)}><FA className="align-middle p-2 cursor-pointer text-info" name="edit" /></span>
            </div>;
        return <LMR left={left} right={right} className="py-2">
        </LMR>;
    }

    private rowTop = () => {
        let supplierData = _.clone(this.supplier);
        let { name, no, abbreviation, createTime } = supplierData;

        return <div className="py-2 bg-white mb-3">
            <div className="cursor-pointer">
                &nbsp;<FA className="align-middle text-warning" name="credit-card" /><span className="h6 py-2 px-1 align-middle"><b> 供应商基本信息</b></span>
            </div>
            <div className="py-2 cat-root-sub small">
                <div><span className="px-4 align-middle">&nbsp;&nbsp;编号：</span><span>{no}</span></div>
                <div><span className="px-4 align-middle ">&nbsp;&nbsp;名称：</span><span>{name}</span></div>
                <div><span className="px-4 align-middle ">&nbsp;&nbsp;简称：</span><span>{abbreviation}</span></div>
                <div><p><span className="px-4 align-middle ">创建时间：</span><span>{<EasyDate date={createTime} />}</span></p></div>
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