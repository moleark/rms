import * as React from 'react';
import { VPage, Page, BoxId, Form, UiRadio, UiSchema, UiTextItem, UiInputItem, UiIdItem, Schema, Context, tv } from 'tonva';
import { observer } from 'mobx-react';
import { CSupplierContact } from './CSupplierContact';
import { SupplierItem } from "model/supplierItem";
import {
    faxValidation, emailValidation, mobileValidation, telephoneValidation,
    addressDetailValidation, zipCodeValidation, departmentNameValidation,
    salutationValidation, nameValidation
} from 'tools/inputValidations';

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

    private schema: Schema = [
        { name: 'name', type: 'string', required: true },
        { name: 'gender', type: 'string', required: true },
        { name: 'firstName', type: 'string', required: false },
        { name: 'lastName', type: 'string', required: false },
        { name: 'salutation', type: 'string', required: false },
        { name: 'departmentName', type: 'string', required: false },
        { name: 'telephone', type: 'string', required: false },
        { name: 'mobile', type: 'string', required: true },
        { name: 'wechatId', type: 'string', required: false },
        { name: 'email', type: 'string' },
        { name: 'fax', type: 'string', required: false },
        { name: 'address', type: 'id', required: true },
        { name: 'addressString', type: 'string', required: true },
        { name: 'zipCode', type: 'string', required: false },
        { name: 'isDefault', type: 'boolean', required: false },
        { name: 'submit', type: 'submit' }
    ];

    private uiSchema: UiSchema = {
        items: {
            name: { widget: 'text', label: '姓名', placeholder: '必填' } as UiInputItem,
            gender: { widget: 'radio', label: '性别', list: [{ value: '1', title: '男' }, { value: '0', title: '女' }] } as UiRadio,
            firstName: { widget: 'text', label: '名', placeholder: '名', rules: nameValidation } as UiInputItem,
            lastName: { widget: 'text', label: '姓氏', placeholder: '姓氏' } as UiInputItem,
            salutation: { widget: 'text', label: '称谓', placeholder: '称谓', rules: salutationValidation } as UiTextItem,
            departmentName: { widget: 'text', label: '部门名称', placeholder: '部门名称', rules: departmentNameValidation } as UiTextItem,
            telephone: { widget: 'text', label: '固定电话', placeholder: '固定电话', rules: telephoneValidation } as UiTextItem,
            mobile: { widget: 'text', label: '手机号', placeholder: '手机号', rules: mobileValidation } as UiTextItem,
            wechatId: { widget: 'text', label: '微信号', placeholder: '微信号' } as UiTextItem,
            email: { widget: 'text', label: 'Email', placeholder: 'Email', rules: emailValidation } as UiTextItem,
            fax: { widget: 'text', label: '传真', placeholder: '传真', rules: faxValidation } as UiTextItem,
            address: {
                widget: 'id', label: '所在地区',
                pickId: async (context: Context, name: string, value: number) => await this.controller.pickAddress(context, name, value),
                Templet: (address: BoxId) => {
                    if (!address) return <small className="text-muted">(无)</small>;
                    return tv(address, (addressValue) => {
                        let { country, province, city, county } = addressValue;
                        /* 下面这种在使用tv之前的一堆判断应该是tv或者什么的有bug, 应该让Henry改改 */
                        return <>
                            {country !== undefined && country.id !== undefined && tv(country, v => <>{v.chineseName}</>)}
                            {province !== undefined && province.id !== undefined && tv(province, (v) => <>{v.chineseName}</>)}
                            {city !== undefined && city.id !== undefined && tv(city, (v) => <>{v.chineseName}</>)}
                            {county !== undefined && county.id !== undefined && tv(county, (v) => <>{v.chineseName}</>)}
                        </>;
                    }, () => {
                        return <small className="text-muted">请选择地区</small>;
                    })
                }
            } as UiIdItem,
            addressString: { widget: 'text', label: '详细地址', placeholder: '详细地址', rules: addressDetailValidation } as UiTextItem,
            zipCode: { widget: 'text', label: '邮编', placeholder: '邮编', rules: zipCodeValidation } as UiTextItem,
            isDefault: { widget: 'checkbox', label: '默认联系人', defaultValue: false },
            submit: { widget: 'button', label: '提交', className: "btn btn-primary mr-3 px-6" }
        }
    };

    private onFormButtonClick = async (name: string, context: Context) => {
        let { saveSupplierContact } = this.controller;
        let id = this.item && this.item.id;
        await saveSupplierContact(id, context.form.data, this.parent);
        this.closePage();
    }

    private onDelSupplierContact = async () => {
        if (await this.vCall(VConfirmDeleteContact, this.item) === true) {
            await this.controller.delSupplierContact(this.item, this.parent);
            this.closePage();
        };
    }

    private page = observer(() => {

        let buttonDel: any;
        if (this.item !== undefined) {
            buttonDel= <div className="d-flex align-items-center">
            <div><span onClick={() => this.onDelSupplierContact()} className="fa-stack">
                <i className="fa fa-times-circle fa-stack-2x cursor-pointer my-1" style={{ fontSize: '1.6rem' }}></i>
            </span></div>
            </div>;
        }
        return <Page header="编辑联系人" right={buttonDel} headerClassName="bg-primary">
            <div className="App-container container text-left">
                <Form ref={v => this.form = v} className="my-3"
                    formData={this.item}
                    schema={this.schema}
                    uiSchema={this.uiSchema}
                    onButtonClick={this.onFormButtonClick}
                    requiredFlag={true}
                />
            </div>
        </Page>;
    })
}

class VConfirmDeleteContact extends VPage<CSupplierContact> {
    async open(contact: any) {
        this.openPage(this.page, contact);
    }

    private onConfirm = async () => {
        await this.returnCall(true);
        this.closePage();
    }

    private onCancel = async () => {
        await this.returnCall(false);
        this.closePage();
    }

    private page = (contact: any) => {
        return <Page header="删除联系人" back="close">
            <div className="w-75 mx-auto border border-primary rounded my-3 p-3 bg-white">
                <div className="p-4 position-relative">
                    <i className="fa fa-question-circle position-absolute fa-2x text-warning" style={{ left: 0, top: 0 }} />
                    <b className="">是否删除该联系人？</b>
                </div>
                <div className="d-flex mt-3 justify-content-end">
                    <button className="btn btn-danger mr-3" onClick={this.onConfirm}>删除供联系人</button>
                    <button className="btn btn-outline-info mr-3" onClick={this.onCancel}>取消</button>
                </div>
            </div>
        </Page>;
    }
}