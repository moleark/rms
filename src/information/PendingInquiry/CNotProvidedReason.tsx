import * as React from 'react';
import { CUqBase } from 'CBase';
import { observable } from 'mobx';
import { VNotProvidedReason } from './VNotProvidedReason';

export class CNotProvidedReason extends CUqBase {

    @observable notProvidedReasons: any;

    protected async internalStart() {
        this.notProvidedReasons = await this.uqs.rms.NotProvidedReason.search("", 0, 200);
        this.openVPage(VNotProvidedReason);
    }

    returnNotProvidedReason = (model: any) => {
        this.returnCall(model);
    }
}