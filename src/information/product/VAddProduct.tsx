import * as React from 'react';
import { VPage, Page, UiSchema, UiInputItem, Form, Context, UiIdItem, tv, FA } from 'tonva';
import { Schema } from 'tonva';
import _ from 'lodash';
import { CProduct } from './CProduct';

const schema: Schema = [
    { name: 'id', type: 'id', required: false },
    { name: 'supplier', type: 'id', required: true },
    { name: 'brand', type: 'id', required: true },
    { name: 'origin', type: 'string', required: false },
    { name: 'purity', type: 'string', required: false },
    { name: 'isTrue', type: 'boolean', required: true },
];

export class VAddProduct extends VPage<CProduct> {

    private form: Form;
    private productData: any;

    private uiSchema: UiSchema = {
        items: {
            id: { visible: false },
            supplier: {
                widget: 'id', label: '供应商', placeholder: '请选择供应商',
                pickId: async (context: Context, name: string, value: number) => await this.controller.pickSupplier(context, name, value),
                Templet: (item: any) => {
                    //let { obj } = item;
                    if (!item) return <small className="text-muted">请选择供应商</small>;
                    return <>
                        {tv(item, v => <>{v.name}</>)}
                    </>;
                }
            } as UiIdItem,
            brand: {
                widget: 'id', label: '品牌', placeholder: '请选择品牌',
                pickId: async (context: Context, name: string, value: number) => await this.controller.pickBrand(context, name, value),
                Templet: (item: any) => {
                    //let { obj } = item;
                    if (!item) return <small className="text-muted">请选择品牌</small>;
                    return <>
                        {tv(item, v => <>{v.no}</>)}
                    </>;
                }
            } as UiIdItem,
            origin: { widget: 'text', label: '供应商自编号' } as UiInputItem,
            purity: { widget: 'text', label: '纯度' } as UiInputItem,
            isTrue: { widget: 'checkbox', label: '有效', defaultValue: true },
            submit: { widget: 'button', label: '提交' },
        }
    }

    async open(productData: any) {
        this.productData = productData;
        this.openPage(this.page);
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        await this.controller.saveProductData(context.form.data);
    }

    private onSaveProductData = async () => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    private showChemicalData = () => {

        let { chemical } = this.controller;
        let { no, CAS, description, descriptoinCN, molecularFomula, molecularWeight, mdlNumber } = chemical;

        return <div className="py-2 bg-white">
            <div className="cursor-pointer">
                &nbsp;<FA className="align-middle text-warning" name="credit-card" /><span className="h6 py-2 px-1 align-middle"><b>产品信息</b></span>
            </div>
            <div className="py-2 cat-root-sub">
                <div><span className="px-4 align-middle">&nbsp;chemid:</span><span> {no}</span></div>
                <div><span className="px-4 align-middle ">&nbsp;&nbsp; CAS:</span><span> {CAS}</span></div>
                <div><span className="px-4 align-middle ">英文名称：</span><span>{description}</span></div>
                <div><span className="px-4 align-middle ">中文名称：</span><span>{descriptoinCN}</span></div>
                <div><span className="px-4 align-middle ">&nbsp;分子式：</span><span>{molecularFomula}</span></div>
                <div><span className="px-4 align-middle ">&nbsp;分子量：</span><span>{molecularWeight}</span></div>
            </div>
        </div>;
    }

    private page = () => {
        let descriptionData = _.clone(this.productData);

        let footer: any;
        footer = <button type="button"
            className="btn btn-primary w-100"
            onClick={this.onSaveProductData}>保存</button>;

        return <Page header="添加产品" footer={footer} headerClassName="bg-primary">
            {this.showChemicalData()}
            <div className="bg-white">
                <Form ref={v => this.form = v} className="m-3"
                    schema={schema}
                    uiSchema={this.uiSchema}
                    formData={descriptionData}
                    onButtonClick={this.onFormButtonClick}
                    fieldLabelSize={3}
                />
            </div>
        </Page>
    }
}
