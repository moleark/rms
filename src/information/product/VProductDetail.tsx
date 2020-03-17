import * as React from 'react';
import { observable } from 'mobx';
import { VPage, Page, FA, EasyDate, tv, LMR, List, Edit, ItemSchema, UiSchema, StringSchema, UiInputItem } from 'tonva';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { CProduct } from './CProduct';
import { SupplierItem } from "model/supplierItem";

const schema: ItemSchema[] = [
    { name: 'description', type: 'string', required: true },
    { name: 'descriptionC', type: 'string', required: false },
    { name: 'purity', type: 'string', required: false },
];

export class VProductDetail extends VPage<CProduct> {
    private product: any;
    private firstPackage: any;
    private packages: any[] = [];
    private purityData: any;

    async open(param: SupplierItem) {
        let { parent, item, child } = param;
        await this.loadProduct(parent);
        this.firstPackage = item;
        this.packages = child;
        this.openPage(this.page);
    }

    private loadProduct = async (product: any) => {
        this.product = product;
        let { description, descriptionC, purity } = this.product;
        this.purityData = {
            description: description,
            descriptionC: descriptionC,
            purity: purity
        };
    }

    private uiSchema: UiSchema = {
        items: {
            description: { widget: 'text', label: '英文名称', placeholder: '英文名称' } as UiInputItem,
            descriptionC: { widget: 'text', label: '中文名称', placeholder: '中文名称' } as UiInputItem,
            purity: { widget: 'text', label: '纯度', placeholder: '纯度' } as UiInputItem,
        }
    }

    private getPackage = () => {
        let { showCreatePackage } = this.controller.cApp.cPackage;
        let { onNewPendingInquiry } = this.controller.cApp.cNewPendingInquiry;
        let { supplier, defaultContact } = this.product;
        let showd = defaultContact === undefined ?
            "" : <div className=" d-flex px-3 py-2">
                <button className="btn btn-sm btn-primary" onClick={() => showCreatePackage(this.product)}>
                    <span className="px-2"><FA className="text-warning px-1" name="cube" /><b>包&nbsp;装</b></span>
                    <span className="px-2"><FA name="plus fa-1x" /></span>
                </button>
                <div className="flex-grow-1"></div>
                <button className="btn btn-sm btn-primary" onClick={() => onNewPendingInquiry(this.product)} >
                    <span className="px-2"><FA className="text-warning px-1" name="filter" /><b>询&nbsp;价</b></span>
                    <span className="px-2"><FA name="plus fa-1x" /></span>
                </ button>
            </div>;
        return <div>
            {showd}
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
        let { id, radiox, radioy, unit, type, price, currency, validUpto, minArriveDate, maxArriveDate } = item;
        let { defaultContact } = this.product;
        let radio = (radiox !== 1) ? <>{radiox} * {radioy}{unit}</> : <>{radioy}{unit}</>;
        let valid = (validUpto < Date.now()) ? <span className="text-danger"><EasyDate date={validUpto} /></span> : <span><EasyDate date={validUpto} /></span>;

        let down =
            price === undefined ? <div></div> : <div className="px-4 text-muted small">
                <span>&nbsp;{price}{tv(currency, v => <>{v.name}</>)}&nbsp;</span>
                {valid}
            </div>;
        let mi = minArriveDate !== undefined ? <span><EasyDate date={minArriveDate} /></span> : "";
        let arriveDate = maxArriveDate !== undefined ? <span>~<EasyDate date={maxArriveDate} /></span> : "";
        let right =
            <div>
                <div className="px-2 cursor-pointer text-danger text-right" onClick={() => this.onDelPackage(item)}>
                    <FA name="trash" />
                    <div className="text-muted small">{mi}{arriveDate}</div>
                </div>
            </div>;
        let left = <div className="px-2" onClick={() => showPackageDetail(item)}>
            <FA name="cube" className="px-2 text-primary"></FA>
            {radio} <span className="small">{type === 1 ? "目录" : "非目录"}</span>
            {down}
        </div>;
        return <LMR left={left} right={right} className="py-2">
        </LMR>;
    }

    private rowTop = (productData: any) => {

        let { no, supplier, brand, origin, description, descriptionC, createTime, chemical, CAS, purity, molecularFomula, molecularWeight, defaultContact } = this.product;
        let { name: suppliername, no: supplierno, id } = supplier.obj;
        let brandno = brand === undefined ? undefined : brand.obj.name;

        return <div className="bg-white py-2">
            {no === undefined ? "" :
                <><div className="row no-gutters px-3 my-1">
                    <div className="col-4">产品编号:</div><div className="col-8 text-muted text-right">{no}</div>
                </div></>}
            <div className="row no-gutters px-3 my-1">
                <div className="col-4">供应商:</div><div className="col-8 text-muted text-right"><b>{suppliername}{supplierno}</b></div>
            </div>
            <div className="row no-gutters px-3 my-1">
                <div className="col-4">默认联系人:</div><div className="col-8 text-muted text-right">{defaultContact === undefined ? "[无]" : defaultContact.obj.name}</div>
            </div>
            {brandno === undefined ? "" :
                <><div className="row no-gutters px-3 my-1">
                    <div className="col-4">品牌:</div><div className="col-8 text-muted text-right">{brandno}</div>
                </div></>}
            <div className="row no-gutters px-3 my-1">
                <div className="col-4">CAS:</div><div className="col-8 text-muted text-right">{CAS}</div>
            </div>
            {origin === undefined ? "" :
                <><div className="row no-gutters px-3 my-1">
                    <div className="col-4">自编号:</div><div className="col-8 text-muted text-right">{origin}</div>
                </div></>}
            {molecularFomula === undefined ? "" :
                <><div className="row no-gutters px-3 my-1">
                    <div className="col-4">分子式:</div><div className="col-8 text-muted text-right">{molecularFomula}</div>
                </div></>}
            {molecularWeight === undefined ? "" :
                <><div className="row no-gutters px-3 my-1">
                    <div className="col-4">分子量:</div><div className="col-8 text-muted text-right">{molecularWeight}</div>
                </div></>}
        </div>;
    }

    private onPurityChanged = async (itemSchema: ItemSchema, newValue: any, preValue: any) => {
        let { name } = itemSchema;
        this.product[name] = newValue;
        await this.controller.updateProductData(this.product);
        this.closePage();
        this.controller.showProductDetail(this.product);
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

        let buttonDel: any;
        if (productData.id !== undefined) {
            buttonDel = <div className="d-flex align-items-center">
                <div><span onClick={() => this.onDelProduct()} className="fa-stack">
                    <i className="fa fa-trash fa-stack-2x cursor-pointer my-1" style={{ fontSize: '1.5rem' }}></i>
                </span></div>
            </div>;
        }
        return <Page header="产品详情" right={buttonDel} headerClassName="py-1 bg-primary">
            {this.rowTop(productData)}
            <Edit schema={schema} uiSchema={this.uiSchema}
                data={this.purityData}
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
        return <Page header="删除包装" back="close" headerClassName="bg-primary">
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
        return <Page header="删除产品" back="close" headerClassName="bg-primary">
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


