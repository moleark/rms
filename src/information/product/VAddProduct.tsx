import * as React from 'react';
import { VPage, Page, UiSchema, UiInputItem, Form, Context, UiIdItem, tv, FA } from 'tonva';
import { Schema } from 'tonva';
import _ from 'lodash';
import { CProduct } from './CProduct';

const schema: Schema = [
    { name: 'id', type: 'id', required: false },
    { name: 'supplier', type: 'id', required: true },
    { name: 'brand', type: 'id', required: false },
    { name: 'origin', type: 'string', required: false },
    { name: 'purity', type: 'string', required: false },
    { name: 'submit', type: 'submit' }
];

export class VAddProduct extends VPage<CProduct> {

    private form: Form;
    private productData: any;
    private model: any = this.controller.supplier;

    private uiSchema: UiSchema = {
        items: {
            id: { visible: false },
            supplier: {
                widget: 'id', label: '供应商', placeholder: '请选择供应商', defaultValue: this.model,
                pickId: async (context: Context, name: string, value: number) => this.model !== undefined ? this.model : await this.controller.pickSupplier(context, name, value),
                Templet: (item: any) => {
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
            origin: { widget: 'text', label: '供应商自编号', placeholder: '供应商自编号' } as UiInputItem,
            purity: { widget: 'text', label: '纯度', placeholder: '纯度' } as UiInputItem,
            submit: { widget: 'button', label: '提交', className: "btn btn-primary mr-3 px-6" }
        }
    }


    async open(productData: any) {
        this.productData = productData;
        this.openPage(this.page);
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        await this.controller.saveProductData(context.form.data);
    }

    private showChemicalData = () => {

        let { chemical } = this.controller;
        let { no, CAS, description, descriptoinCN, molecularFomula, molecularWeight, mdlNumber } = chemical;

        return <div className="py-2 bg-white">
            <div className="cursor-pointer">
                &nbsp;<FA className="align-middle text-warning" name="credit-card" /><span className="h6 py-2 px-1 align-middle"><b>标准库信息</b></span>
            </div>
            <div className="py-2 cat-root-sub small">
                <div className="bg-white row no-gutters px-4 my-1">
                    <div className="col-3 text-muted">chemid:</div><div className="col-9">{no}</div>
                </div>
                <div className="bg-white row no-gutters px-4 my-1">
                    <div className="col-3 text-muted">CAS:</div><div className="col-9">{CAS}</div>
                </div>
                <div className="bg-white row no-gutters px-4 my-1">
                    <div className="col-3 text-muted">英文名称:</div><div className="col-9">{description}</div>
                </div>
                <div className="bg-white row no-gutters px-4 my-1">
                    <div className="col-3 text-muted">中文名称:</div><div className="col-9">{descriptoinCN}</div>
                </div>
                <div className="bg-white row no-gutters px-4 my-1">
                    <div className="col-3 text-muted">分子式:</div><div className="col-9">{molecularFomula}</div>
                </div>
                <div className="bg-white row no-gutters px-4 my-1">
                    <div className="col-3 text-muted">分子量:</div><div className="col-9">{molecularWeight}</div>
                </div>
            </div>
        </div>;
    }

    private page = () => {
        let descriptionData = _.clone(this.productData);

        return <Page header="添加产品" headerClassName="py-1 bg-primary">
            {this.showChemicalData()}
            <div className="App-container container text-left">
                <Form ref={v => this.form = v} className="my-3"
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
