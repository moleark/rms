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
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">包装类型:</div>
                <div className="col-9">{type === 1 ? "目录包装" : (type === 2 ? "非目录包装" : "")}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">结算价:</div>
                <div className="col-9">{price}{currency === undefined ? "" : tv(currency, v => <>{v.name}</>)}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">含税费:</div>
                <div className="col-9">{isTaxIn === 1 ? "含" : (isTaxIn === 0 ? "不含" : "")}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">含运费:</div>
                <div className="col-9">{isTransFeeIn === 1 ? "含" : (isTransFeeIn === 0 ? "不含" : "")}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">运费:</div>
                <div className="col-9">{transFee}{transFeecurrency === undefined ? "" : tv(transFeecurrency, v => <>{v.name}</>)}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">包装费:</div>
                <div className="col-9">{packingFee}{packingcurrency === undefined ? "" : tv(packingcurrency, v => <>{v.name}</>)}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">其他费用:</div>
                <div className="col-9">{otherFee}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">是否定制:</div>
                <div className="col-9">{customized === 1 ? "是" : (customized === 0 ? "否" : "")}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">定制时间至:</div>
                <div className="col-9"><EasyDate date={customizeUpto} /></div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">有效期至:</div>
                <div className="col-9"><EasyDate date={validUpto} /></div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">最短货期至:</div>
                <div className="col-9"><EasyDate date={minArriveDate} /></div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">最长货期至:</div>
                <div className="col-9"><EasyDate date={maxArriveDate} /></div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">发票类型:</div>
                <div className="col-9">{invoiceType === undefined ? "" : (invoiceType === 1 ? "增值税专用发票" : (invoiceType === 2 ? "增值税普通发票" : "形式发票"))}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">增值税率:</div>
                <div className="col-9">{vatRate}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">关税税率:</div>
                <div className="col-9">{tariffRate}</div>
            </div>
        </Page >
    }
}