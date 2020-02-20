import { CUqBase } from 'CBase';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { VCurrency } from './VCurrency';

export class CCurrency extends CUqBase {

    @observable currencys: any;

    protected async internalStart() {
        this.currencys = await this.uqs.common.Currency.search("", 0, 100);
        this.openVPage(VCurrency);
    }

    returnCurrency = (model: any) => {
        this.returnCall(model);
    }
}
