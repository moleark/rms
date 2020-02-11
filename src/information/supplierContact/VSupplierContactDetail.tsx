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
                    <div><span className="px-4 align-middle">编号：</span><span className="py-2 px-4">{no}</span></div>
                    <div><span className="px-4 align-middle ">名称：</span><span className="py-2 px-4">{name}</span></div>
                    <div><span className="px-4 align-middle ">姓氏：</span><span className="py-2 px-4">{lastName}</span></div>
                    <div><span className="px-4 align-middle ">&nbsp;&nbsp;&nbsp;名：</span><span className="py-2 px-4">{firstName}</span></div>
                    <div><span className="px-4 align-middle">性别：</span><span className="py-2 px-4">{gender === "0" ? "女" : "男"}</span></div>
                    <div><span className="px-4 align-middle ">称谓：</span><span className="py-2 px-4">{salutation}</span></div>
                    <div><span className="px-4 align-middle ">部门名称：</span><span className="py-2">{departmentName}</span></div>
                    <div><span className="px-4 align-middle">固定电话：</span><span className="py-2 px-2">{telephone}</span></div>
                    <div><span className="px-4 align-middle">手机号：</span><span className="py-2 px-4">{mobile}</span></div>
                    <div><span className="px-4 align-middle ">微信号：</span><span className="py-2 px-4">{wechatId}</span></div>
                    <div><span className="px-4 align-middle">Email：</span><span className="py-2 px-4">{email}</span></div>
                    <div><span className="px-4 align-middle ">传真：</span><span className="py-2 px-4">{fax}</span></div>
                    <div><span className="px-4 align-middle ">所在地区：</span><span className="py-2 px-2">{address}</span></div>
                    <div><span className="px-4 align-middle">详细地址：</span><span className="py-2 px-2">{addressString}</span></div>
                    <div><span className="px-4 align-middle ">邮编：</span><span className="py-2 px-4">{zipCode}</span></div>
                </div>
            </div>
        </Page >
    }
}