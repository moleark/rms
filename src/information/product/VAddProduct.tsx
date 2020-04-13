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
    { name: 'description', type: 'string', required: true },
    { name: 'descriptionC', type: 'string', required: false },
    { name: 'purity', type: 'string', required: false },
    { name: 'chinaHSCode', type: 'string', required: false },
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
            description: { widget: 'text', label: '英文名称', placeholder: '英文名称', defaultValue: this.controller.chemical.description } as UiInputItem,
            descriptionC: { widget: 'text', label: '中文名称', placeholder: '中文名称', defaultValue: this.controller.chemical.descriptionC } as UiInputItem,
            purity: { widget: 'text', label: '纯度', placeholder: '纯度' } as UiInputItem,
            chinaHSCode: { widget: 'text', label: '中国海关编码', placeholder: '中国海关编码' } as UiInputItem,
            submit: { widget: 'button', label: '提交', className: "btn btn-primary mr-3 px-6" }
        }
    }


    async open(productData: any) {
        this.productData = productData;
        this.openPage(this.page);
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        let { origin } = this.productData;
        await this.controller.saveProductData(origin, context.form.data);
    }

    private showChemicalData = () => {
        let { chemical } = this.controller;
        let { no, CAS, description, descriptoinCN, molecularFomula, molecularWeight, mdlNumber } = chemical;

        return <div className="bg-white py-2">
            <div className="row no-gutters px-3 my-1">
                <div className="col-3">CAS:</div><div className="col-9 text-muted text-right">{CAS === undefined ? "(无)" : CAS}</div>
            </div>
            {molecularFomula === undefined ? "" : <>
                <div className="row no-gutters px-3 my-1">
                    <div className="col-3">分子式:</div><div className="col-9 text-muted text-right">{molecularFomula}</div>
                </div></>
            }
            {molecularWeight === undefined ? "" : <>
                <div className="row no-gutters px-3 my-1">
                    <div className="col-3">分子量:</div><div className="col-9 text-muted text-right">{molecularWeight}</div>
                </div></>
            }
        </div >;
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
