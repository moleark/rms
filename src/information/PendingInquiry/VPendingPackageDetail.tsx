import * as React from 'react';
import { FA, Page, VPage, EasyDate, tv } from "tonva";
import _ from 'lodash';
import { CPendingInquiry } from './CPendingInquiry';

export class VPendingPackageDetail extends VPage<CPendingInquiry> {

    private package: any;

    async open(param: any) {
        this.package = param;
        this.openPage(this.page);
    }

    private page = () => {
        let packageData = _.clone(this.package);
        let { quantity, radiox, radioy, unit, packType, listPrice, price, currency, isTaxIn, isTransFeeIn, transFee
            , transFeecurrency, packingFee, packingcurrency, otherFee
            , otherFeecurrency, customizeUpto, validUpto, minArriveDate
            , maxArriveDate, invoiceType, vatRate, tariffRate, remarks, notProvidedReason, isUsed, coaFilePath, msdsFilePath, quotationFilePath } = packageData;
        let name = unit === undefined ? undefined : unit.name;
        let radio = (radiox !== 1) ? <>{radiox} * {radioy}{name}</> : <>{radioy}{name}</>;

        let header = <header>
            <span>询价结果: {quantity} * {radio}</span>
        </header>;

        return <Page header={header} headerClassName="py-1 bg-primary" >
            <div>
                <div className="border-top edit-sep-light-gray"></div>
                <div className="d-flex align-items-centerd-flex px-3 py-2 bg-white align-items-center cursor-pointer">
                    <div>包装类型:</div>
                    <div className="flex-fill d-flex justify-content-end">{packType === "1" ? "目录包装" : (packType === "2" ? "非目录包装" : "")}</div>
                </div>
                <div className="border-top edit-sep-light-gray"></div>
                <div className="d-flex align-items-centerd-flex px-3 py-2 bg-white align-items-center cursor-pointer">
                    <div>目录价:</div>
                    <div className="flex-fill d-flex justify-content-end">{listPrice}{currency === undefined ? "" : tv(currency, v => <>{v.name}</>)}</div>
                </div>
                <div className="border-top edit-sep-light-gray"></div>
                <div className="d-flex align-items-centerd-flex px-3 py-2 bg-white align-items-center cursor-pointer">
                    <div>结算价:</div>
                    <div className="flex-fill d-flex justify-content-end">{price}{currency === undefined ? "" : tv(currency, v => <>{v.name}</>)}</div>
                </div>
                <div className="border-top edit-sep-light-gray"></div>
                <div className="d-flex align-items-centerd-flex px-3 py-2 bg-white align-items-center cursor-pointer">
                    <div>含税费:</div>
                    <div className="flex-fill d-flex justify-content-end">{isTaxIn === "1" ? "含" : (isTaxIn === "0" ? "不含" : "")}</div>
                </div>
                <div className="border-top edit-sep-light-gray"></div>
                <div className="d-flex align-items-centerd-flex px-3 py-2 bg-white align-items-center cursor-pointer">
                    <div>含运费:</div>
                    <div className="flex-fill d-flex justify-content-end">{isTransFeeIn === "1" ? "含" : (isTransFeeIn === "0" ? "不含" : "")}</div>
                </div>
                <div className="border-top edit-sep-light-gray"></div>
                <div className="d-flex align-items-centerd-flex px-3 py-2 bg-white align-items-center cursor-pointer">
                    <div>运费:</div>
                    <div className="flex-fill d-flex justify-content-end">{transFee}{transFeecurrency === undefined ? "" : tv(transFeecurrency, v => <>{v.name}</>)}</div>
                </div>
                <div className="border-top edit-sep-light-gray"></div>
                <div className="d-flex align-items-centerd-flex px-3 py-2 bg-white align-items-center cursor-pointer">
                    <div>包装费:</div>
                    <div className="flex-fill d-flex justify-content-end">{packingFee}{packingcurrency === undefined ? "" : tv(packingcurrency, v => <>{v.name}</>)}</div>
                </div>
                <div className="border-top edit-sep-light-gray"></div>
                <div className="d-flex align-items-centerd-flex px-3 py-2 bg-white align-items-center cursor-pointer">
                    <div>其他费用:</div>
                    <div className="flex-fill d-flex justify-content-end">{otherFee}{otherFeecurrency === undefined ? "" : tv(otherFeecurrency, v => <>{v.name}</>)}</div>
                </div>
                <div className="border-top edit-sep-light-gray"></div>
                <div className="d-flex align-items-centerd-flex px-3 py-2 bg-white align-items-center cursor-pointer">
                    <div>定制时间至:</div>
                    <div className="flex-fill d-flex justify-content-end"><EasyDate date={customizeUpto} /></div>
                </div>
                <div className="border-top edit-sep-light-gray"></div>
                <div className="d-flex align-items-centerd-flex px-3 py-2 bg-white align-items-center cursor-pointer">
                    <div>有效期至:</div>
                    <div className="flex-fill d-flex justify-content-end"><EasyDate date={validUpto} /></div>
                </div>
                <div className="border-top edit-sep-light-gray"></div>
                <div className="d-flex align-items-centerd-flex px-3 py-2 bg-white align-items-center cursor-pointer">
                    <div>最短货期至:</div>
                    <div className="flex-fill d-flex justify-content-end"><EasyDate date={minArriveDate} /></div>
                </div>
                <div className="border-top edit-sep-light-gray"></div>
                <div className="d-flex align-items-centerd-flex px-3 py-2 bg-white align-items-center cursor-pointer">
                    <div>最长货期至:</div>
                    <div className="flex-fill d-flex justify-content-end"><EasyDate date={maxArriveDate} /></div>
                </div>
                <div className="border-top edit-sep-light-gray"></div>
                <div className="d-flex align-items-centerd-flex px-3 py-2 bg-white align-items-center cursor-pointer">
                    <div>发票类型:</div>
                    <div className="flex-fill d-flex justify-content-end">{invoiceType === undefined ? "" : (invoiceType.id === "1" ? "增值税专用发票" : (invoiceType.id === "2" ? "增值税普通发票" : (invoiceType === "3" ? "形式发票" : "无发票")))}</div>
                </div>
                <div className="border-top edit-sep-light-gray"></div>
                <div className="d-flex align-items-centerd-flex px-3 py-2 bg-white align-items-center cursor-pointer">
                    <div>增值税率:</div>
                    <div className="flex-fill d-flex justify-content-end">{vatRate === undefined ? "" : tv(vatRate, v => <>{v.description}</>)}</div>
                </div>
                <div className="border-top edit-sep-light-gray"></div>
                <div className="d-flex align-items-centerd-flex px-3 py-2 bg-white align-items-center cursor-pointer">
                    <div>关税税率:</div>
                    <div className="flex-fill d-flex justify-content-end">{tariffRate}</div>
                </div>
                <div className="border-top edit-sep-light-gray"></div>
                <div className="d-flex align-items-centerd-flex px-3 py-2 bg-white align-items-center cursor-pointer">
                    <div>报价备注:</div>
                    <div className="flex-fill d-flex justify-content-end">{remarks}</div>
                </div>
                <div className="border-top edit-sep-light-gray"></div>
                <div className="d-flex align-items-centerd-flex px-3 py-2 bg-white align-items-center cursor-pointer">
                    <div>COA文件路径:</div>
                    <div className="flex-fill d-flex justify-content-end">{coaFilePath}</div>
                </div>
                <div className="border-top edit-sep-light-gray"></div>
                <div className="d-flex align-items-centerd-flex px-3 py-2 bg-white align-items-center cursor-pointer">
                    <div>MSOS文件路径:</div>
                    <div className="flex-fill d-flex justify-content-end">{msdsFilePath}</div>
                </div>
                <div className="border-top edit-sep-light-gray"></div>
                <div className="d-flex align-items-centerd-flex px-3 py-2 bg-white align-items-center cursor-pointer">
                    <div>报价单文件路径:</div>
                    <div className="flex-fill d-flex justify-content-end">{quotationFilePath}</div>
                </div>
                <div className="border-top edit-sep-light-gray"></div>
                <div className="d-flex align-items-centerd-flex px-3 py-2 bg-white align-items-center cursor-pointer">
                    <div>价格是否被使用:</div>
                    <div className="flex-fill d-flex justify-content-end">{isUsed === "1" ? "是" : (isUsed === "0" ? "否" : "")}</div>
                </div>
            </div>
        </Page >
    }
}