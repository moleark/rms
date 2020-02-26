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
        let ad;
        if (contactAddress === undefined) {
            ad = "";
        } else {
            let { country, province, city, county } = contactAddress;
            ad = <>{country !== undefined && country.id !== undefined && tv(country, v => <>{v.chineseName}</>)}
                {province !== undefined && province.id !== undefined && tv(province, (v) => <>{v.chineseName}</>)}
                {city !== undefined && city.id !== undefined && tv(city, (v) => <>{v.chineseName}</>)}
                {county !== undefined && county.id !== undefined && tv(county, (v) => <>{v.chineseName}</>)}</>
        };

        let header = <header className="py-2 text-center text-white">
            <span className="h5 align-middle">供应商联系人详情</span>
        </header>;

        return <Page header={header} headerClassName="bg-primary">
            <div className="py-2 bg-white mb-3">
                <div className="cursor-pointer">
                    &nbsp;<FA className="align-middle text-warning" name="credit-card" /><span className="h6 py-2 px-1 align-middle"><b> 供应商联系人基本信息</b></span>
                </div>
                <div className="py-2 cat-root-sub">
                    <div className="bg-white row no-gutters px-4 my-1">
                        <div className="col-3 text-muted">编号:</div><div className="col-9">{no}</div>
                    </div>
                    <div className="bg-white row no-gutters px-4 my-1">
                        <div className="col-3 text-muted">名称:</div><div className="col-9">{name}</div>
                    </div>
                    <div className="bg-white row no-gutters px-4 my-1">
                        <div className="col-3 text-muted">姓氏:</div><div className="col-9">{lastName}</div>
                    </div>
                    <div className="bg-white row no-gutters px-4 my-1">
                        <div className="col-3 text-muted">名:</div><div className="col-9">{firstName}</div>
                    </div>
                    <div className="bg-white row no-gutters px-4 my-1">:
                        <div className="col-3 text-muted">性别:</div><div className="col-9">{gender === "0" ? "女" : (gender === "1" ? "男" : "")}</div>
                    </div>
                    <div className="bg-white row no-gutters px-4 my-1">
                        <div className="col-3 text-muted">称谓:</div><div className="col-9">{salutation}</div>
                    </div>
                    <div className="bg-white row no-gutters px-4 my-1">
                        <div className="col-3 text-muted">部门名称:</div><div className="col-9">{departmentName}</div>
                    </div>
                    <div className="bg-white row no-gutters px-4 my-1">
                        <div className="col-3 text-muted">固定电话:</div><div className="col-9">{telephone}</div>
                    </div>
                    <div className="bg-white row no-gutters px-4 my-1">
                        <div className="col-3 text-muted">手机号:</div><div className="col-9">{mobile}</div>
                    </div>
                    <div className="bg-white row no-gutters px-4 my-1">
                        <div className="col-3 text-muted">微信号:</div><div className="col-9">{wechatId}</div>
                    </div>
                    <div className="bg-white row no-gutters px-4 my-1">
                        <div className="col-3 text-muted">Email:</div><div className="col-9">{email}</div>
                    </div>
                    <div className="bg-white row no-gutters px-4 my-1">
                        <div className="col-3 text-muted">传真:</div><div className="col-9">{fax}</div>
                    </div>
                    <div className="bg-white row no-gutters px-4 my-1">
                        <div className="col-3 text-muted">所在地区:</div><div className="col-9">{ad}</div>
                    </div>
                    <div className="bg-white row no-gutters px-4 my-1">
                        <div className="col-3 text-muted">详细地址:</div><div className="col-9">{addressString}</div>
                    </div>
                    <div className="bg-white row no-gutters px-4 my-1">
                        <div className="col-3 text-muted">邮编:</div><div className="col-9">{zipCode}</div>
                    </div>
                </div>
            </div>
        </Page >
    }
}