import * as React from 'react';
import { CUqBase } from 'CBase';
import { observable } from 'mobx';
import { VStorageRange } from './VStorageRange';

export class CStorageRange extends CUqBase {

    @observable storageRanges: any;

    protected async internalStart() {
        this.storageRanges = await this.uqs.rms.StorageRange.search("", 0, 100);
        this.openVPage(VStorageRange);
    }

    returnStorageRange = (model: any) => {
        this.returnCall(model);
    }
}