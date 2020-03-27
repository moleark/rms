import { CUqBase } from 'CBase';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { VPackUnit } from './VPackUnit';

export class CPackUnit extends CUqBase {

    @observable packUnits: any;

    protected async internalStart() {
        let result = await this.uqs.common.SearchPackType.query("");
        this.packUnits = result.ret;
        this.openVPage(VPackUnit);
    }

    returnPackUnit = (model: any) => {
        this.returnCall(model);
    }
}
