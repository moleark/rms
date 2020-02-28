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

    private onDelPackage = async (item: any) => {
        if (await this.vCall(VConfirmDeletePakage, item) === true) {
            await this.controller.delPakage(item);
            await this.controller.loadList();
            this.closePage();
        };
    }

    private renderPackage = (item: any, index: number) => {
        let { showEditPackage, showPackageDetail } = this.controller.cApp.cPackage;
        let { id, radiox, radioy, unit, type, price, currency, validUpto } = item;
        let { defaultContact } = this.product;
        let radio = (radiox !== 1) ? <>{radiox} * {radioy}{unit}</> : <>{radioy}{unit}</>;
        let right =
            price === undefined ?
                <div className="px-2 cursor-pointer text-danger" onClick={() => this.onDelPackage(item)}>
                    <FA name="remove" />
                </div> : <div className="px-2 text-info small">
                    <span>{price}{tv(currency, v => <>{v.name}</>)} <EasyDate date={validUpto} /></span>
                </div>;
        let left = <div className="px-2" onClick={() => showPackageDetail(item)}>
            <FA name="cube" className="px-2 text-primary"></FA>
            {radio} <span className="small">{type === 1 ? "目录" : "非目录"}</span>
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

        let { onNewPendingInquiry } = this.controller.cApp.cNewPendingInquiry;
        let header = <header className="py-2 text-center text-white">
            <span className="h5 align-middle">产品详情</span>
        </header>;
        let right = <button className="btn btn-sm btn-success" onClick={() => onNewPendingInquiry(this.product)} >+询价</ button>;

        return <Page header={header} right={right} headerClassName="bg-primary">
            {this.rowTop()}
            {this.getPackage()}
        </Page >
    }
}

class VConfirmDeletePakage extends VPage<CProduct> {
    async open(pakage: any) {
        this.openPage(this.page, pakage);
    }

    private onConfirm = async () => {
        await this.returnCall(true);
        this.closePage();
    }

    private onCancel = async () => {
        await this.returnCall(false);
        this.closePage();
    }

    private page = (pakage: any) => {
        return <Page header="删除包装" back="close">
            <div className="w-75 mx-auto border border-primary rounded my-3 p-3 bg-white">
                <div className="p-4 position-relative">
                    <i className="fa fa-question-circle position-absolute fa-2x text-warning" style={{ left: 0, top: 0 }} />
                    <b className="">是否删除该包装？</b>
                </div>
                <div className="d-flex mt-3 justify-content-end">
                    <button className="btn btn-danger mr-3" onClick={this.onConfirm}>删除包装</button>
                    <button className="btn btn-outline-info mr-3" onClick={this.onCancel}>取消</button>
                </div>
            </div>
        </Page>;
    }
}