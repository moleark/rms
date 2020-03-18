import { CUqBase } from 'CBase';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { VPackUnit } from './VPackUnit';

export class CPackUnit extends CUqBase {

    @observable packUnits: any;

    protected async internalStart() {
        this.packUnits = await this.uqs.common.PackType.search("", 0, 100);
        this.openVPage(VPackUnit);
    }

    returnPackUnit = (model: any) => {
        this.returnCall(model);
    }
}
