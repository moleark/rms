import { CUqBase } from '../CBase';
import { VHome } from './VHome';

export class CHome extends CUqBase {

    async internalStart(param: any) {

        let { cSupplier } = this.cApp;
        await cSupplier.start();
        // this.openVPage(VHome);
    }

    toSupplierList = () => {
        let { cSupplier } = this.cApp;
        return cSupplier.renderRootList();
    }
    tab = () => this.renderView(VHome);
}