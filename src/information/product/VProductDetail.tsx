import * as React from 'react';
import { VPage, Page, FA, EasyDate, tv, LMR, List } from 'tonva';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { CProduct } from './CProduct';
import { SupplierItem } from "model/supplierItem";

export class VProductDetail extends VPage<CProduct> {
    private product: any;
    private firstPackage: any;
    private packages: any[] = [];

    async open(param: SupplierItem) {
        let { parent, item, child } = param;
        this.product = parent;
        this.firstPackage = item;
        this.packages = child;
        this.openPage(this.page);
    }

    private getPackage = () => {
        let { showCreatePackage } = this.controller.cApp.cPackage;

        return <div className="bg-white mb-3">
            <div className="cursor-pointer">
                &nbsp;<FA className="align-middle text-warning" name="cubes" /><span className="h6 py-2 px-1 align-middle"><b> 产品包装</b></span>
            </div>
            {this.firstPackage && <List items={this.packages} item={{ render: this.renderPackage }} />}
            <div className="text-primary text-center small bg-white py-2" onClick={() => showCreatePackage(this.product)}><FA name="plus" />包装</div>

        </div>
    }

    private renderPackage = (item: any, index: number) => {
        let { showEditPackage, showPackageDetail } = this.controller.cApp.cPackage;
        let { id, radiox, radioy, unit, type, price, currency, validUpto } = item;
        let { defaultContact } = this.product;
        let radio = (radiox !== 1) ? <>{radiox} * {radioy}{unit}</> : <>{radioy}{unit}</>;
        let left = <div className="px-2 small" onClick={() => showPackageDetail(item)}>
            <FA name="cube" className="px-2 text-primary"></FA>
            {radio} <div className="text-muted small px-4">{type === 1 ? "目录包装" : "非目录包装"}</div></div>

        let right =
            price === undefined ?
                <div className="px-2 text-muted text-right small">
                    <span onClick={() => showEditPackage(this.product, item)}><FA className="align-middle p-2 cursor-pointer text-info" name="edit" /></span>
                </div> : <div className="px-2 text-info text-right small">
                    <span>{price}{tv(currency, v => <>{v.name}</>)}</span>
                    <div className="small"><EasyDate date={validUpto} /></div>
                </div>;
        return <LMR left={left} right={right} className="py-2">
        </LMR>;
    }

    private rowTop = () => {
        let productData = _.clone(this.product);

        let { no, supplier, brand, origin, description, descriptionC, createTime, chemical, CAS, purity, molecularFomula, molecularWeight } = this.product;
        let { name: suppliername } = supplier.obj;
        let brandno = brand === undefined ? undefined : brand.obj.name;

        return <div className="py-2 bg-white mb-3">
            <div className="cursor-pointer">
                &nbsp;<FA className="align-middle text-warning" name="credit-card" /><span className="h6 py-2 px-1 align-middle"><b>产品信息</b></span>
            </div>
            <div className="py-2 cat-root-sub small">
                <div className="bg-white row no-gutters px-4 my-1">
                    <div className="col-3 text-muted">编号:</div><div className="col-9">{no}</div>
                </div>
                <div className="bg-white row no-gutters px-4 my-1">
                    <div className="col-3 text-muted">供应商:</div><div className="col-9">{suppliername}</div>
                </div>
                <div className="bg-white row no-gutters px-4 my-1">
                    <div className="col-3 text-muted">品牌:</div><div className="col-9">{brandno}</div>
                </div>
                <div className="bg-white row no-gutters px-4 my-1">
                    <div className="col-3 text-muted">CAS:</div><div className="col-9">{CAS}</div>
                </div>
                <div className="bg-white row no-gutters px-4 my-1">
                    <div className="col-3 text-muted">英文名称:</div><div className="col-9">{description}</div>
                </div>
                <div className="bg-white row no-gutters px-4 my-1">
                    <div className="col-3 text-muted">中文名称:</div><div className="col-9">{descriptionC}</div>
                </div>
                <div className="bg-white row no-gutters px-4 my-1">
                    <div className="col-3 text-muted">供应商自编号:</div><div className="col-9">{origin}</div>
                </div>
                <div className="bg-white row no-gutters px-4 my-1">
                    <div className="col-3 text-muted">纯度:</div><div className="col-9">{purity}</div>
                </div>
                <div className="bg-white row no-gutters px-4 my-1">
                    <div className="col-3 text-muted">分子式:</div><div className="col-9">{molecularFomula}</div>
                </div>
                <div className="bg-white row no-gutters px-4 my-1">
                    <div className="col-3 text-muted">分子量:</div><div className="col-9">{molecularWeight}</div>
                </div>
            </div>
        </div >;
    }

    private page = () => {

        let header = <header className="py-2 text-center text-white">
            <span className="h5 align-middle">产品详情</span>
        </header>;

        return <Page header={header} headerClassName="bg-primary">
            {this.rowTop()}
            {this.getPackage()}
        </Page >
    }
}