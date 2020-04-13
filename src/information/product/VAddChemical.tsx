import * as React from 'react';
import { VPage, Page, UiSchema, UiInputItem, Form, Context } from 'tonva';
import { Schema } from 'tonva';
import _ from 'lodash';
import { CChemical } from './CChemical';

const schema: Schema = [
    { name: 'id', type: 'id', required: false },
    { name: 'CAS', type: 'string', required: false },
    { name: 'description', type: 'string', required: false },
    { name: 'descriptoinCN', type: 'string', required: false },
    { name: 'molecularFomula', type: 'string', required: false },
    { name: 'molecularWeight', type: 'number', required: false },
    { name: 'submit', type: 'submit' }
];

export class VAddChemical extends VPage<CChemical> {

    private form: Form;
    private chemicalData: any;

    private uiSchema: UiSchema = {
        items: {
            id: { visible: false },
            CAS: { widget: 'text', label: 'CAS', placeholder: 'CAS' } as UiInputItem,
            description: { widget: 'text', label: '英文名称', placeholder: '英文名称' } as UiInputItem,
            descriptoinCN: { widget: 'text', label: '中文名称', placeholder: '中文名称' } as UiInputItem,
            molecularFomula: { widget: 'text', label: '分子式', placeholder: '分子式' } as UiInputItem,
            molecularWeight: { widget: 'text', label: '分子量', placeholder: '分子量' } as UiInputItem,
            submit: { widget: 'button', label: '提交', className: "btn btn-primary mr-3 px-6" }
        }
    }

    async open(chemicalData: any) {
        this.chemicalData = chemicalData;
        this.openPage(this.page);
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        await this.controller.saveChemicalData(context.form.data);
    }

    private page = () => {
        let descriptionData = _.clone(this.chemicalData);

        return <Page header="添加标准库" headerClassName="py-1 bg-primary">
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
