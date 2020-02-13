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
];

export class VEditProduct extends VPage<CProduct> {

    private form: Form;
    private productData: any;

    private uiSchema: UiSchema = {
        items: {
            id: { visible: false },
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
        await this.controller.updateProductData(this.productData, context.form.data);
    }

    private onSaveProductData = async () => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    private showProductData = (product: any) => {

        let { supplier, brand, origin, description, descriptionC, createTime, chemical, CAS, purity, molecularFomula, molecularWeight } = product;
        let { name: suppliername } = supplier.obj;
        let brandno = brand === undefined ? undefined : brand.obj.no;

        return <div className="py-2 bg-white">
            <div className="cursor-pointer">
                &nbsp;<FA className="align-middle text-warning" name="credit-card" /><span className="h6 py-2 px-1 align-middle"><b>产品信息</b></span>
            </div>
            <div className="py-2 cat-root-sub">
                <div><span className="px-4 align-middle ">&nbsp;供应商：</span><span>{suppliername}</span></div>
                <div><span className="px-4 align-middle ">&nbsp;&nbsp;品牌：</span><span>{brandno}</span></div>
                <div><span className="px-4 align-middle ">&nbsp;&nbsp; CAS：</span><span>{CAS}</span></div>
                <div><span className="px-4 align-middle ">英文名称：</span><span>{description}</span></div>
                <div><span className="px-4 align-middle ">中文名称：</span><span>{descriptionC}</span></div>
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

        return <Page header="修改产品" footer={footer} headerClassName="bg-primary">
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
