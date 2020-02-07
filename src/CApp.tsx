import { CAppBase, IConstructor, User, nav } from "tonva";
import { UQs } from "./uqs";
import { CUqBase } from "./CBase";
import { VMain } from './ui/main';
import { CHome } from "./information/CHome";
import { CSupplier } from "./information/supplier/CSupplier";
import { CSupplierContact } from "./information/supplierContact/CSupplierContact";


export class CApp extends CAppBase {
    get uqs(): UQs { return this._uqs as UQs };

    topKey: any;
    cHome: CHome;
    cSupplier: CSupplier;
    cSupplierContact: CSupplierContact;

    protected newC<T extends CUqBase>(type: IConstructor<T>): T {
        return new type(this);
    }

    protected async internalStart() {

        this.cHome = this.newC(CHome);
        this.cSupplier = this.newC(CSupplier);
        this.cSupplierContact = this.newC(CSupplierContact);
        let promises: PromiseLike<void>[] = [];
        promises.push(this.cSupplier.start());
        await Promise.all(promises);
        this.showMain();
        this.topKey = nav.topKey();
    }

    showMain(initTabName?: string) {
        this.openVPage(VMain, initTabName);
    }
    async loginCallBack(user: User) {

    }
}
