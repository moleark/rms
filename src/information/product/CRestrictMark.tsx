import * as React from 'react';
import { CUqBase } from 'CBase';
import { observable } from 'mobx';
import { VRestrictMark } from './VRestrictMark';

export class CRestrictMark extends CUqBase {

    @observable restrictMarks: any;

    protected async internalStart() {
        this.restrictMarks = await this.uqs.rms.RestrictMark.search("", 0, 200);
        this.openVPage(VRestrictMark);
    }

    returnRestrictMark = (model: any) => {
        this.returnCall(model);
    }
}