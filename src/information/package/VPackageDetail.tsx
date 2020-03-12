import * as React from 'react';
import { FA, Page, VPage, EasyDate, tv } from "tonva";
import _ from 'lodash';
import { CPackage } from './CPackage';

export class VPackageDetail extends VPage<CPackage> {

    private package: any;

    async open(param: any) {
        this.package = param;
        this.openPage(this.page);
    }

    private page = () => {
        let packageData = _.clone(this.package);
        let { radiox, radioy, unit, type, price, currency, isTaxIn, isTransFeeIn, transFee
            , transFeecurrency, packingFee, packingcurrency, otherFee
            , customized, customizeUpto, validUpto, minArriveDate
            , maxArriveDate, invoiceType, vatRate, tariffRate } = packageData;
        let radio = (radiox !== 1) ? <>{radiox} * {radioy}{unit}</> : <>{radioy}{unit}</>;

        let header = <header>
            <span>包装详情: {radio}</span>
        </header>;

        return <Page header={header} headerClassName="py-1 bg-primary" >
            <div>
                <div className="border-top edit-sep-light-gray"></div>
                <div className="d-flex align-items-centerd-flex px-3 py-2 bg-white align-items-center cursor-pointer">
                    <div>包装类型:</div>
                    <div className="flex-fill d-flex justify-content-end">{type === 1 ? "目录包装" : (type === 2 ? "非目录包装" : "")}</div>
                </div>
                <div className="border-top edit-sep-light-gray"></div>
                <div className="d-flex align-items-centerd-flex px-3 py-2 bg-white align-items-center cursor-pointer">
                    <div>结算价:</div>
                    <div className="flex-fill d-flex justify-content-end">{price}{currency === undefined ? "" : tv(currency, v => <>{v.name}</>)}</div>
                </div>
                <div className="border-top edit-sep-light-gray"></div>
                <div className="d-flex align-items-centerd-flex px-3 py-2 bg-white align-items-center cursor-pointer">
                    <div>含税费:</div>
                    <div className="flex-fill d-flex justify-content-end">{isTaxIn === 1 ? "含" : (isTaxIn === 0 ? "不含" : "")}</div>
                </div>
                <div className="border-top edit-sep-light-gray"></div>
                <div className="d-flex align-items-centerd-flex px-3 py-2 bg-white align-items-center cursor-pointer">
                    <div>含运费:</div>
                    <div className="flex-fill d-flex justify-content-end">{isTransFeeIn === 1 ? "含" : (isTransFeeIn === 0 ? "不含" : "")}</div>
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
                    <div className="flex-fill d-flex justify-content-end">{otherFee}</div>
                </div>
                <div className="border-top edit-sep-light-gray"></div>
                <div className="d-flex align-items-centerd-flex px-3 py-2 bg-white align-items-center cursor-pointer">
                    <div>是否定制:</div>
                    <div className="flex-fill d-flex justify-content-end">{customized === 1 ? "是" : (customized === 0 ? "否" : "")}</div>
                </div>
                <>{customized === 0 ? "" :
                    <div>
                        <div className="border-top edit-sep-light-gray"></div>
                        <div className="d-flex align-items-centerd-flex px-3 py-2 bg-white align-items-center cursor-pointer">
                            <div>定制时间至:</div>
                            <div className="flex-fill d-flex justify-content-end"><EasyDate date={customizeUpto} /></div>
                        </div>
                    </div>}</>
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
                    <div className="flex-fill d-flex justify-content-end">{invoiceType === undefined ? "" : (invoiceType.id === 1 ? "增值税专用发票" : (invoiceType.id === 2 ? "增值税普通发票" : "形式发票"))}</div>
                </div>
                <div className="border-top edit-sep-light-gray"></div>
                <div className="d-flex align-items-centerd-flex px-3 py-2 bg-white align-items-center cursor-pointer">
                    <div>增值税率:</div>
                    <div className="flex-fill d-flex justify-content-end">{vatRate}</div>
                </div>
                <div className="border-top edit-sep-light-gray"></div>
                <div className="d-flex align-items-centerd-flex px-3 py-2 bg-white align-items-center cursor-pointer">
                    <div>关税税率:</div>
                    <div className="flex-fill d-flex justify-content-end">{tariffRate}</div>
                </div>
            </div>
        </Page >
    }
}