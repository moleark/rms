import * as React from 'react';
import { VPage, Page } from 'tonva';
import { FA } from 'tonva';
import { CCurrency } from './CCurrency';

export class VCurrency extends VPage<CCurrency> {

    async open(param: any) {
        this.openPage(this.page);
    }

    private page = () => {
        let { currencys } = this.controller;
        return <Page header="选择币种">
            <div className="row no-gutters">
                {currencys.map((v: any) => this.renderCurrency(v, this.onCurrencyClick))}
            </div>
        </Page>
    }

    private renderCurrency = (currency: any, onClick: any) => {
        let { id, name } = currency;
        return <div key={id} className="col-6 col-md-4 col-lg-3 cursor-pointer" >
            <div className="pt-1 pb-1 px-2" onClick={() => this.onCurrencyClick(currency)}
                style={{ border: '1px solid #eeeeee', marginRight: '-1px', marginBottom: '-1px' }}
            >
                <span className="ml-1 align-middle">
                    <FA name="chevron-right" className="text-info small" />
                    &nbsp; {name}
                </span>
            </div>
        </div>;
    }

    private onCurrencyClick = async (item: any) => {
        await this.controller.returnCurrency(item);
        this.closePage();
    }
}
