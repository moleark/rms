import * as React from 'react';
import { FA, Page, VPage } from "tonva";
import _ from 'lodash';
import { CSupplierContact } from "./CSupplierContact";

export class VSupplierContactDetail extends VPage<CSupplierContact> {

    private supplierContact: any;

    async open(supplierContact: any) {
        this.supplierContact = supplierContact;
        this.openPage(this.page);
    }

    private page = () => {
        let supplierContactData = _.clone(this.supplierContact);
        let { no, name, firstName, lastName, gender, salutation, departmentName, telephone, mobile, email, fax, zipCode, wechatId, addressString, address } = supplierContactData;

        let header = <header className="py-2 text-center text-white">
            <span className="h5 align-middle">供应商联系人详情</span>
        </header>;

        return <Page header={header} headerClassName="bg-primary">
            <div className="py-2 bg-white mb-3">
                <div className="cursor-pointer">
                    &nbsp;<FA className="align-middle text-warning" name="credit-card" /><span className="h6 py-2 px-1 align-middle"><b> 供应商联系人基本信息</b></span>
                </div>
                <div className="py-2 cat-root-sub">
                    <div><span className="px-4 align-middle">&nbsp;&nbsp;编号：</span><span>{no}</span></div>
                    <div><span className="px-4 align-middle ">&nbsp;&nbsp;名称：</span><span>{name}</span></div>
                    <div><span className="px-4 align-middle ">&nbsp;&nbsp;姓氏：</span><span>{lastName}</span></div>
                    <div><span className="px-4 align-middle ">&nbsp;&nbsp;&nbsp;名：</span><span>{firstName}</span></div>
                    <div><span className="px-4 align-middle">&nbsp;&nbsp;性别：</span><span>{gender === "0" ? "女" : "男"}</span></div>
                    <div><span className="px-4 align-middle ">&nbsp;&nbsp;称谓：</span><span>{salutation}</span></div>
                    <div><span className="px-4 align-middle ">部门名称：</span><span>{departmentName}</span></div>
                    <div><span className="px-4 align-middle">固定电话：</span><span>{telephone}</span></div>
                    <div><span className="px-4 align-middle">&nbsp;手机号：</span><span>{mobile}</span></div>
                    <div><span className="px-4 align-middle ">&nbsp;微信号：</span><span>{wechatId}</span></div>
                    <div><span className="px-4 align-middle">&nbsp; Email：</span><span>{email}</span></div>
                    <div><span className="px-4 align-middle ">&nbsp;&nbsp;传真：</span><span>{fax}</span></div>
                    <div><span className="px-4 align-middle ">所在地区：</span><span>{address}</span></div>
                    <div><span className="px-4 align-middle">详细地址：</span><span>{addressString}</span></div>
                    <div><span className="px-4 align-middle ">&nbsp;&nbsp;邮编：</span><span>{zipCode}</span></div>
                </div>
            </div>
        </Page >
    }
}