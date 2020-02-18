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
        let { id, radiox, radioy, unit, type } = item;
        let { defaultContact } = this.product;
        let radio = (radiox !== 1) ? <>{radiox} * {radioy}{unit}</> : <>{radioy}{unit}</>;
        let left = <div className="px-2 small" onClick={() => showPackageDetail(item)}>
            <FA name="cube" className="px-2 text-primary"></FA>
            {radio} - {type === 1 ? "目录" : "非目录"}</div>
        let right =
            <div className="px-2 text-muted text-right samll">
                <span onClick={() => showEditPackage(this.product, item)}><FA className="align-middle p-2 cursor-pointer text-info" name="edit" /></span>
            </div>;
        return <LMR left={left} right={right} className="py-2">
        </LMR>;
    }

    private rowTop = () => {
        let productData = _.clone(this.product);

        let { supplier, brand, origin, description, descriptionC, createTime, chemical, CAS, purity, molecularFomula, molecularWeight } = this.product;
        let { name: suppliername } = supplier.obj;
        let brandno = brand === undefined ? undefined : brand.obj.name;

        return <div className="py-2 bg-white mb-3">
            <div className="cursor-pointer">
                &nbsp;<FA className="align-middle text-warning" name="credit-card" /><span className="h6 py-2 px-1 align-middle"><b>产品信息</b></span>
            </div>
            <div className="py-2 cat-root-sub small">
                <div><span className="px-4 align-middle ">&nbsp;&nbsp;&nbsp;供应商：</span><span>{suppliername}</span></div>
                <div><span className="px-4 align-middle ">&nbsp;&nbsp;&nbsp;&nbsp;品牌：</span><span>{brandno}</span></div>
                <div><span className="px-4 align-middle ">&nbsp;&nbsp;&nbsp;&nbsp; CAS：</span><span>{CAS}</span></div>
                <div><span className="px-4 align-middle ">&nbsp;&nbsp;英文名称：</span><span>{description}</span></div>
                <div><span className="px-4 align-middle ">&nbsp;&nbsp;中文名称：</span><span>{descriptionC}</span></div>
                <div><span className="px-4 align-middle ">供应商自编号：</span><span>{origin}</span></div>
                <div><span className="px-4 align-middle ">&nbsp;&nbsp;&nbsp;&nbsp;纯度：</span><span>{purity}</span></div>
                <div><span className="px-4 align-middle ">&nbsp;&nbsp;&nbsp;分子式：</span><span>{molecularFomula}</span></div>
                <div><span className="px-4 align-middle ">&nbsp;&nbsp;&nbsp;分子量：</span><span>{molecularWeight}</span></div>
            </div>
        </div>;
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