import * as React from 'react';
import { VPage, Page } from 'tonva';
import { FA } from 'tonva';
import { CVatRate } from './CVatRate';

export class VVatRate extends VPage<CVatRate> {

    async open(param: any) {
        this.openPage(this.page);
    }

    private page = () => {
        let { vatRates } = this.controller;
        return <Page header="选择增值税率">
            <div className="row no-gutters">
                {vatRates.map((v: any) => this.renderVatRate(v, this.onVatRateClick))}
            </div>
        </Page>
    }

    private renderVatRate = (vatRate: any, onClick: any) => {
        let { id, description } = vatRate;
        return <div key={id} className="col-6 col-md-4 col-lg-3 cursor-pointer" >
            <div className="pt-1 pb-1 px-2" onClick={() => this.onVatRateClick(vatRate)}
                style={{ border: '1px solid #eeeeee', marginRight: '-1px', marginBottom: '-1px' }}
            >
                <span className="ml-1 align-middle">
                    <FA name="chevron-right" className="text-info small" />
                    &nbsp; {description}
                </span>
            </div>
        </div>;
    }

    private onVatRateClick = async (item: any) => {
        await this.controller.returnVatRate(item);
        this.closePage();
    }
}
