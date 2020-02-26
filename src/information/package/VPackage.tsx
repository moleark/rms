import * as React from 'react';
import { VPage, Page, BoxId, Form, UiRadio, UiSchema, UiTextItem, UiInputItem, UiIdItem, Schema, Context, tv } from 'tonva';
import { observer } from 'mobx-react';
import { SupplierItem } from "model/supplierItem";
import { CPackage } from './CPackage';

export class VPackage extends VPage<CPackage> {
    private form: Form;
    private item: any;
    private parent: any;
    async open(param?: SupplierItem) {
        let { item, parent } = param;
        this.item = item;
        this.parent = parent;
        this.openPage(this.page);
    }

    private schema: Schema = [
        { name: 'radiox', type: 'number', required: true },
        { name: 'radioy', type: 'number', required: true },
        { name: 'unit', type: 'string', required: true },
        { name: 'type', type: 'string', required: true },
        { name: 'isValid', type: 'boolean', required: true },
        { name: 'submit', type: 'submit' }
    ];

    private uiSchema: UiSchema = {
        items: {
            radiox: { widget: 'text', label: '套', placeholder: '必填', defaultValue: 1 } as UiInputItem,
            radioy: { widget: 'text', label: '包装规格', placeholder: '必填', defaultValue: 1 } as UiInputItem,
            unit: { widget: 'text', label: '单位', placeholder: '必填' } as UiInputItem,
            type: { widget: 'radio', label: '类型', list: [{ value: 1, title: '目录包装' }, { value: 2, title: '非目录包装' }] } as UiRadio,
            isValid: { widget: 'checkbox', label: '有效', defaultValue: true },
            submit: { widget: 'button', label: '提交', className: "btn btn-primary mr-3 px-6" }
        }
    };

    private onFormButtonClick = async (name: string, context: Context) => {
        let { savePackage } = this.controller;
        let id = this.item && this.item.id;
        await savePackage(id, context.form.data, this.parent);
        this.closePage();
    }

    private page = observer(() => {

        return <Page header="编辑包装" headerClassName="bg-primary">
            <Form ref={v => this.form = v} className="my-3 mx-3"
                formData={this.item}
                schema={this.schema}
                uiSchema={this.uiSchema}
                onButtonClick={this.onFormButtonClick}
                requiredFlag={true}
            />
        </Page>;
    })
}

