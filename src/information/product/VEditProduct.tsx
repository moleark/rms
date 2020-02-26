import * as React from 'react';
import { VPage, Page, UiSchema, UiInputItem, Form, Context, UiIdItem, tv, FA } from 'tonva';
import { Schema } from 'tonva';
import _ from 'lodash';
import { CProduct } from './CProduct';

const schema: Schema = [
    { name: 'id', type: 'id', required: false },
    { name: 'origin', type: 'string', required: false },
    { name: 'purity', type: 'string', required: false },
    { name: 'isTrue', type: 'boolean', required: true },
    { name: 'submit', type: 'submit' }
];

export class VEditProduct extends VPage<CProduct> {

    private form: Form;
    private productData: any;

    private uiSchema: UiSchema = {
        items: {
            id: { visible: false },
            origin: { widget: 'text', label: '供应商自编号', placeholder: '供应商自编号' } as UiInputItem,
            purity: { widget: 'text', label: '纯度', placeholder: '纯度' } as UiInputItem,
            isTrue: { widget: 'checkbox', label: '有效', defaultValue: true },
            submit: { widget: 'button', label: '提交', className: "btn btn-primary mr-3 px-6" }
        }
    }

    async open(productData: any) {
        this.productData = productData;
        this.openPage(this.page);
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        await this.controller.updateProductData(this.productData, context.form.data);
    }

    private showProductData = (product: any) => {

        let { supplier, brand, origin, description, descriptionC, createTime, chemical, CAS, purity, molecularFomula, molecularWeight } = product;
        let { name: suppliername } = supplier.obj;
        let brandno = brand === undefined ? undefined : brand.obj.no;

        return <div className="py-2 bg-white">
            <div className="cursor-pointer">
                &nbsp;<FA className="align-middle text-warning" name="credit-card" /><span className="h6 py-2 px-1 align-middle"><b>产品信息</b></span>
            </div>
            <div className="py-2 cat-root-sub small">
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

        return <Page header="修改产品" headerClassName="bg-primary">
            {this.showProductData(descriptionData)}
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
