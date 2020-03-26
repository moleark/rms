import * as React from 'react';
import { observable } from 'mobx';
import { VPage, Page, FA, UiSelect, tv, UiIdItem, List, Edit, ItemSchema, UiSchema, StringSchema, UiInputItem, UiRadio, Context } from 'tonva';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { CProduct } from './CProduct';

const schema: ItemSchema[] = [
    { name: 'isspot', type: 'number', required: false },
    { name: 'storageRange', type: 'id', required: false },
    { name: 'expiry', type: 'string', required: false },
    { name: 'expiryUnit', type: 'string', required: false },
    { name: 'restrictMark', type: 'id', required: false },
    { name: 'refractiveIndex', type: 'string', required: false },
    { name: 'opticalRotation', type: 'string', required: false },
    { name: 'flashPoint', type: 'string', required: false },
    { name: 'meltingPoint', type: 'string', required: false },
    { name: 'boilingPoint', type: 'string', required: false },
    { name: 'character', type: 'string', required: false },
    { name: 'chroma', type: 'string', required: false },
    { name: 'waterContent', type: 'string', required: false },
    { name: 'useFor', type: 'string', required: false },
    { name: 'remark', type: 'string', required: false },
];


export class VProductPropertyDetail extends VPage<CProduct> {
    private property: any;
    private propertyData: any;

    async open(param: any) {
        this.property = undefined;
        this.property = param;
        this.openPage(this.page);
    }

    private uiSchema: UiSchema = {
        items: {
            isspot: { widget: 'radio', label: '是否现货', list: [{ value: 1, title: '现货' }, { value: 0, title: '定制' }] } as UiRadio,
            storageRange: {
                widget: 'id', label: '存储条件', placeholder: '存储条件',
                pickId: async (context: Context, name: string, value: number) => await this.controller.pickStorageRange(context, name, value),
                Templet: (item: any) => {
                    if (!item) return <small className="text-muted">请选择存储条件</small>;
                    return <>
                        {tv(item, v => <>{v.description}</>)}
                    </>;
                }
            } as UiIdItem,
            expiry: { widget: 'text', label: '保质期', placeholder: '保质期' } as UiInputItem,
            expiryUnit: { widget: 'select', label: '保质期单位', list: [{ value: '天', title: '天' }, { value: '周', title: '周' }, { value: '月', title: '月' }, { value: '年', title: '年' }] } as UiSelect,
            restrictMark: {
                widget: 'id', label: '限制性标记', placeholder: '限制性标记',
                pickId: async (context: Context, name: string, value: number) => await this.controller.pickRestrictMark(context, name, value),
                Templet: (item: any) => {
                    if (!item) return <small className="text-muted">请选择限制性标记</small>;
                    return <>
                        {tv(item, v => <>{v.description}</>)}
                    </>;
                }
            } as UiIdItem,
            refractiveIndex: { widget: 'text', label: '折射率', placeholder: '折射率' } as UiInputItem,
            opticalRotation: { widget: 'text', label: '旋光度', placeholder: '旋光度' } as UiInputItem,
            flashPoint: { widget: 'text', label: '闪点', placeholder: '闪点' } as UiInputItem,
            meltingPoint: { widget: 'text', label: '熔点', placeholder: '熔点' } as UiInputItem,
            boilingPoint: { widget: 'text', label: '沸点', placeholder: '沸点' } as UiInputItem,
            character: { widget: 'text', label: '性状', placeholder: '性状' } as UiInputItem,
            chroma: { widget: 'text', label: '色度', placeholder: '色度' } as UiInputItem,
            density: { widget: 'text', label: '密度', placeholder: '密度' } as UiInputItem,
            waterContent: { widget: 'text', label: '含水量', placeholder: '含水量' } as UiInputItem,
            useFor: { widget: 'textarea', label: '产品用途', placeholder: '产品用途', rows: 5 } as UiInputItem,
            remark: { widget: 'textarea', label: '产品备注', placeholder: '产品备注', rows: 5 } as UiInputItem,
        }
    }

    private onPropertyDataChanged = async (itemSchema: ItemSchema, newValue: any, preValue: any) => {
        let { name } = itemSchema;
        this.property[name] = newValue;
        await this.controller.updatProductPropertyData(this.property);
        let { product } = this.property;
        this.closePage();
        await this.controller.showProductPropertyDetail(product);
    }

    private page = () => {

        return <Page header="产品性质" headerClassName="py-1 bg-primary">
            <Edit schema={schema} uiSchema={this.uiSchema}
                data={this.property}
                onItemChanged={this.onPropertyDataChanged} />
        </Page >
    }
}
