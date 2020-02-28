import * as React from 'react';
import { FA, Page, VPage, tv } from "tonva";
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

        let contactAddress = address === undefined ? undefined : address.obj;

        let header = <header className="py-2 text-center text-white">
            <span className="h5 align-middle">供应商联系人详情</span>
        </header>;

        return <Page header={header} headerClassName="bg-primary">
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">编号:</div><div className="col-9">{no}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">名称:</div><div className="col-9">{name}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">姓氏:</div><div className="col-9">{lastName}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">名:</div><div className="col-9">{firstName}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">性别:</div><div className="col-9">{gender === "0" ? "女" : (gender === "1" ? "男" : "")}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">称谓:</div><div className="col-9">{salutation}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">部门名称:</div><div className="col-9">{departmentName}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">固定电话:</div><div className="col-9">{telephone}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">手机号:</div><div className="col-9">{mobile}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">微信号:</div><div className="col-9">{wechatId}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">Email:</div><div className="col-9">{email}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">传真:</div><div className="col-9">{fax}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">所在地区:</div><div className="col-9">{tv(address)}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">详细地址:</div><div className="col-9">{addressString}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">邮编:</div><div className="col-9">{zipCode}</div>
            </div>
        </Page >
    }
}