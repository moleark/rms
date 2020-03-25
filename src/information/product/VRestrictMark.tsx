import * as React from 'react';
import { VPage, Page } from 'tonva';
import { FA } from 'tonva';
import { CRestrictMark } from './CRestrictMark';

export class VRestrictMark extends VPage<CRestrictMark> {

    async open(param: any) {
        this.openPage(this.page);
    }

    private page = () => {
        let { restrictMarks } = this.controller;
        return <Page header="选择限制性标记">
            <div className="row no-gutters">
                {restrictMarks.map((v: any) => this.renderRestrictMark(v, this.onRestrictMarkClick))}
            </div>
        </Page>
    }

    private renderRestrictMark = (restrictMark: any, onClick: any) => {
        let { id, no, description } = restrictMark;
        return <div key={id} className="col-12 cursor-pointer" >
            <div className="pt-1 pb-1 px-2" onClick={() => this.onRestrictMarkClick(restrictMark)}
                style={{ border: '1px solid #eeeeee', marginRight: '-1px', marginBottom: '-1px' }}
            >
                <span className="ml-1 align-middle">
                    <FA name="chevron-right" className="text-info small" />
                    &nbsp; {no} [{description}]
                </span>
            </div>
        </div>;
    }

    private onRestrictMarkClick = async (item: any) => {
        await this.controller.returnRestrictMark(item);
        this.closePage();
    }
}
