import * as React from 'react';
import { VPage, Page, BoxId, EasyTime, EasyDate, FA } from 'tonva';
import { tv } from 'tonva';
import { List } from 'tonva';
import { CInquiry } from './CInquiry';
import { start } from 'repl';

export class VPackageDetail extends VPage<CInquiry> {

    async open(packitem: any) {
        this.openPage(this.page, packitem);
    }

    private page = (item: any) => {

        let { inquiryQuantity, inquiryRadiox, inquiryRadioy, inquiryUnit, itemuser, itemcreateDate, quantity, radiox, radioy, unit, listPrice, price
            , currency, isTaxIn, isTransFeeIn, transFee, transFeecurrency, packingFee, packingcurrency, otherFee, customized, customizeUpto, validUpto
            , minArriveDate, maxArriveDate, invoiceType, vatRate, tariffRate, packType, inquiryRemarks, coaFilePath, msdsFilePath, quotationFilePath } = item;
        let inquiryRadio = (inquiryRadiox !== 1) ? <>{inquiryRadiox} * {inquiryRadioy}{inquiryUnit}</> : <>{inquiryRadioy}{inquiryUnit}</>;
        let radio = (radiox !== 1) ? <>{radiox} * {radioy}{unit}</> : <>{radioy}{unit}</>;

        let header = <>询价包装详情: {inquiryQuantity} * {inquiryRadio}</>
        return <Page header={header} headerClassName="bg-primary">
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">报价包装:</div>
                <div className="col-9">{quantity} * {radio}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">创建人:</div>
                <div className="col-9">{itemuser.id}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">创建时间:</div>
                <div className="col-9"><EasyDate date={itemcreateDate} /></div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">目录价:</div>
                <div className="col-9">{listPrice}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">结算价:</div>
                <div className="col-9">{price}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">结算币种:</div>
                <div className="col-9">{tv(currency.obj, v => <>{v.name}</>)}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">含税费:</div>
                <div className="col-9">{isTaxIn === 1 ? "含" : "不含"}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">含运费:</div>
                <div className="col-9">{isTransFeeIn === 1 ? "含" : "不含"}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">运费:</div>
                <div className="col-9">{transFee}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">运费币种:</div>
                <div className="col-9">{tv(transFeecurrency.obj, v => <>{v.name}</>)}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">包装费:</div>
                <div className="col-9">{packingFee}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">包装费币种:</div>
                <div className="col-9">{tv(packingcurrency.obj, v => <>{v.name}</>)}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">其他费用:</div>
                <div className="col-9">{otherFee}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">是否定制:</div>
                <div className="col-9">{customized === 1 ? "是" : "否"}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">定制截止时间:</div>
                <div className="col-9"><EasyDate date={customizeUpto} /></div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">有效期:</div>
                <div className="col-9"><EasyDate date={validUpto} /></div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">最短货期:</div>
                <div className="col-9"><EasyDate date={minArriveDate} /></div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">最长货期:</div>
                <div className="col-9"><EasyDate date={maxArriveDate} /></div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">发票类型:</div>
                <div className="col-9">{invoiceType === 1 ? "增值税专用发票" : (invoiceType === 2 ? "增值税普通发票" : "形式发票")}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">增值税率:</div>
                <div className="col-9">{vatRate}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">关税税率:</div>
                <div className="col-9">{tariffRate}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">包装类型:</div>
                <div className="col-9">{packType === 1 ? "目录包装" : (packType === 2 ? "非目录包装" : "")}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">备注:</div>
                <div className="col-9">{inquiryRemarks}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">COA文件路径:</div>
                <div className="col-9">{coaFilePath}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">MSOS文件路径:</div>
                <div className="col-9">{msdsFilePath}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">报价单文件路径:</div>
                <div className="col-9">{quotationFilePath}</div>
            </div>
        </Page>
    }
}
