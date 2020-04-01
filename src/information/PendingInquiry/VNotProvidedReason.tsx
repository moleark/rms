import * as React from 'react';
import { VPage, Page } from 'tonva';
import { FA } from 'tonva';
import { CNotProvidedReason } from './CNotProvidedReason';

export class VNotProvidedReason extends VPage<CNotProvidedReason> {

    async open(param: any) {
        this.openPage(this.page);
    }

    private page = () => {
        let { notProvidedReasons } = this.controller;
        return <Page header="选择不可供原因">
            <div className="row no-gutters">
                {notProvidedReasons.map((v: any) => this.renderNotProvidedReason(v, this.onNotProvidedReasonClick))}
            </div>
        </Page>
    }

    private renderNotProvidedReason = (notProvidedReason: any, onClick: any) => {
        let { id, description } = notProvidedReason;
        return <div key={id} className="col-12 cursor-pointer" >
            <div className="pt-1 pb-1 px-2" onClick={() => this.onNotProvidedReasonClick(notProvidedReason)}
                style={{ border: '1px solid #eeeeee', marginRight: '-1px', marginBottom: '-1px' }}
            >
                <span className="ml-1 align-middle">
                    <FA name="chevron-right" className="text-info small" />
                    &nbsp; {description}
                </span>
            </div>
        </div>;
    }

    private onNotProvidedReasonClick = async (item: any) => {
        await this.controller.returnNotProvidedReason(item);
        this.closePage();
    }
}
