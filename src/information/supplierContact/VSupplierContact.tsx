import * as React from 'react';
import { VPage, Page, Form, UiSchema, UiInputItem, UiIdItem, Schema, Context, tv } from 'tonva';
import { observer } from 'mobx-react';
import { CSupplierContact } from './CSupplierContact';
import { SupplierItem } from "model/supplierItem";

export class VSupplierContact extends VPage<CSupplierContact> {
    private form: Form;
    private item: any;
    private parent: any;
    async open(param?: SupplierItem) {
        let { item, parent } = param;
        this.item = item;
        this.parent = parent;
        this.openPage(this.page);
    }

    private gradeContent = (boxId: any) => {
        return tv(boxId, (values) => {
            let { name } = values;
            return <>{name}</>;
        });
    }

    private schema: Schema = [
        { name: 'no', type: 'string', required: true },
        { name: 'name', type: 'string', required: true },
        { name: 'firstName', type: 'string', required: true },
        { name: 'lastName', type: 'string', required: true },
        { name: 'isDefault', type: 'boolean', required: true },
    ];

    private uiSchema: UiSchema = {
        items: {
            no: { widget: 'text', label: '编号', placeholder: '必填' } as UiInputItem,
            name: { widget: 'text', label: '姓名', placeholder: '必填' } as UiInputItem,
            firstName: { widget: 'text', label: '名', placeholder: '名' } as UiInputItem,
            lastName: { widget: 'text', label: '姓氏', placeholder: '姓氏' } as UiInputItem,
            isDefault: { widget: 'checkbox', label: '默认联系人', defaultValue: true },
            submit: { widget: 'button', label: '提交' }
        }
    };

    private onSaveSupplierContact = async () => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }
    private onFormButtonClick = async (name: string, context: Context) => {
        let { saveSupplierContact } = this.controller;
        let id = this.item && this.item.id;
        await saveSupplierContact(id, context.form.data, this.parent);
        this.closePage();
    }

    private page = observer(() => {

        let footer = <div className="d-flex">
            <div className="flex-grow-1 justify-content-end">
                <button type="button" className="btn btn-primary mr-3 px-6" onClick={this.onSaveSupplierContact} ><span className="px-4">保存</span></button>
            </div>
        </div>;

        return <Page header="添加联系人" footer={footer} >
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

