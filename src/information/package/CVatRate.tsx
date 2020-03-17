import { CUqBase } from 'CBase';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { VVatRate } from './VVatRate';

export class CVatRate extends CUqBase {

    @observable vatRates: any;

    protected async internalStart() {
        let result = await this.uqs.rms.SearchVatRate.query("");
        this.vatRates = result.ret;
        this.openVPage(VVatRate);
    }

    returnVatRate = (model: any) => {
        this.returnCall(model);
    }
}
