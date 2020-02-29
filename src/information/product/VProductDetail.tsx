import * as React from 'react';
import { observable } from 'mobx';
import { VPage, Page, FA, EasyDate, tv, LMR, List ,Edit,ItemSchema,UiSchema,StringSchema,UiInputItem} from 'tonva';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { CProduct } from './CProduct';
import { SupplierItem } from "model/supplierItem";

const schema:ItemSchema[] = [
    { name: 'purity', type: 'string', required: false },
];

export class VProductDetail extends VPage<CProduct> {
    private product: any;
    private firstPackage: any;
    private packages: any[] = [];
    @observable private purityData: any;

    async open(param: SupplierItem) {
        let { parent, item, child } = param;
        this.product = parent;
        this.firstPackage = item;
        this.packages = child;
        this.openPage(this.page);
    }

    private uiSchema: UiSchema = {
        items: {
            purity: { widget: 'text', label: '纯度', placeholder: '纯度'} as UiInputItem,
        }
    }

    private getPackage = () => {
        let { showCreatePackage } = this.controller.cApp.cPackage;
        let { onNewPendingInquiry } = this.controller.cApp.cNewPendingInquiry;

        return <div>
        <div className=" d-flex px-3 py-2">
            <button className="btn btn-sm btn-primary" onClick={() => showCreatePackage(this.product)}>
                <span className="px-2"><FA className="text-warning px-1" name="cube" /><b>包&nbsp;装</b></span>
                <span className="px-2"><FA name="plus fa-1x" /></span>
            </button>
            <div className="flex-grow-1"></div>
            <button className="btn btn-sm btn-primary" onClick={() => onNewPendingInquiry(this.product)} >
                <span className="px-2"><FA className="text-warning px-1" name="filter" /><b>询&nbsp;价</b></span>
                <span className="px-2"><FA name="plus fa-1x" /></span>
            </ button>
        </div>
        <div>
            {this.firstPackage && <List items={this.packages} item={{ render: this.renderPackage }} />}
        </div>
        </div >
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
                </div> : <div className="px-2 text-muted small">
                    <span>{price}{tv(currency, v => <>{v.name}</>)} <EasyDate date={validUpto} /></span>
                </div>;
        let left = <div className="px-2" onClick={() => showPackageDetail(item)}>
            <FA name="cube" className="px-2 text-primary"></FA>
            {radio} <span className="small">{type === 1 ? "目录" : "非目录"}</span>
        </div>;
        return <LMR left={left} right={right} className="py-2">
        </LMR>;
    }

    private rowTop = (productData:any) => {

        let { no, supplier, brand, origin, description, descriptionC, createTime, chemical, CAS, purity, molecularFomula, molecularWeight } = this.product;
        let { name: suppliername } = supplier.obj;
        let brandno = brand === undefined ? undefined : brand.obj.name;

        return <div className="bg-white py-2">
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">产品编号:</div><div className="col-9 text-muted text-right">{no}</div>
            </div>
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">供应商:</div><div className="col-9 text-muted text-right">{suppliername}</div>
            </div>
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">品牌:</div><div className="col-9 text-muted text-right">{brandno}</div>
            </div>
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">CAS:</div><div className="col-9 text-muted text-right">{CAS}</div>
            </div>
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">英文名称:</div><div className="col-9 text-muted text-right">{description}</div>
            </div>
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">中文名称:</div><div className="col-9 text-muted text-right">{descriptionC}</div>
            </div>
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">供应商自编号:</div><div className="col-9 text-muted text-right">{origin}</div>
            </div>
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">分子式:</div><div className="col-9 text-muted text-right">{molecularFomula}</div>
            </div>
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">分子量:</div><div className="col-9 text-muted text-right">{molecularWeight}</div>
            </div>
        </div>;
    }

    private onPurityChanged = async (itemSchema: ItemSchema, newValue: any, preValue: any) => {
        await this.controller.updateProductData(this.product, newValue);
    }

    private onDelProduct = async () => {
        if (await this.vCall(VConfirmDeleteProduct, this.product) === true) {
            await this.controller.delProduct(this.product);
            await this.controller.loadList();
            this.closePage();
        };
    }

    private page = () => {
        let productData = _.clone(this.product);
        let{ purity }=productData;
        let purityData={
            purity:purity
        };

        let buttonDel: any;
        if (productData.id !== undefined) {
            buttonDel= <div className="d-flex align-items-center">
            <div><span onClick={() => this.onDelProduct()} className="fa-stack">
                <i className="fa fa-times-circle fa-stack-2x cursor-pointer my-1" style={{ fontSize: '1.6rem' }}></i>
            </span></div>
        </div>;
        }
        return <Page header="产品详情" right={buttonDel} headerClassName="py-1 bg-primary">
            {this.rowTop(productData)}
            <Edit schema={schema} uiSchema={this.uiSchema}
                data={purityData}
                onItemChanged={this.onPurityChanged} />
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

class VConfirmDeleteProduct extends VPage<CProduct> {
    async open(product: any) {
        this.openPage(this.page, product);
    }

    private onConfirm = async () => {
        await this.returnCall(true);
        this.closePage();
    }

    private onCancel = async () => {
        await this.returnCall(false);
        this.closePage();
    }

    private page = (product: any) => {
        return <Page header="删除产品" back="close">
            <div className="w-75 mx-auto border border-primary rounded my-3 p-3 bg-white">
                <div className="p-4 position-relative">
                    <i className="fa fa-question-circle position-absolute fa-2x text-warning" style={{ left: 0, top: 0 }} />
                    <b className="">是否删除该产品？</b>
                </div>
                <div className="d-flex mt-3 justify-content-end">
                    <button className="btn btn-danger mr-3" onClick={this.onConfirm}>删除产品</button>
                    <button className="btn btn-outline-info mr-3" onClick={this.onCancel}>取消</button>
                </div>
            </div>
        </Page>;
    }
}


