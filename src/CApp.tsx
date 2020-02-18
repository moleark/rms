import { CAppBase, IConstructor, User, nav } from "tonva";
import { UQs } from "./uqs";
import { CUqBase } from "./CBase";
import { VMain } from './ui/main';
import { CHome } from "./information/CHome";
import { CSupplier } from "./information/supplier/CSupplier";
import { CSupplierContact } from "./information/supplierContact/CSupplierContact";
import { CProduct } from "./information/product/CProduct";
import { CChemical } from "./information/product/CChemical";
import { CBrand } from "./information/product/CBrand";
import { CPackage } from "./information/package/CPackage";
import { CPickSupplier } from 'information/supplier/CPickSupplier';
import { CPickProduct } from 'information/product/CPickProduct';
import { CPendingInquiry } from 'information/PendingInquiry/CPendingInquiry';
import { CInquiry } from 'information/Inquiry/CInquiry';

export class CApp extends CAppBase {
    get uqs(): UQs { return this._uqs as UQs };

    topKey: any;
    cHome: CHome;
    cSupplier: CSupplier;
    cPickSupplier: CPickSupplier;
    cSupplierContact: CSupplierContact;
    cProduct: CProduct;
    cPickProduct: CPickProduct;
    cChemical: CChemical;
    cBrand: CBrand;
    cPackage: CPackage;
    cPendingInquiry: CPendingInquiry;
    cInquiry: CInquiry;

    protected newC<T extends CUqBase>(type: IConstructor<T>): T {
        return new type(this);
    }

    protected async internalStart() {

        this.cHome = this.newC(CHome);
        this.cSupplier = this.newC(CSupplier);
        this.cPickSupplier = this.newC(CPickSupplier);
        this.cProduct = this.newC(CProduct);
        this.cPickProduct = this.newC(CPickProduct);
        this.cChemical = this.newC(CChemical);
        this.cBrand = this.newC(CBrand);
        this.cPackage = this.newC(CPackage);
        this.cSupplierContact = this.newC(CSupplierContact);
        this.cPendingInquiry = this.newC(CPendingInquiry);
        this.cInquiry = this.newC(CInquiry);
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
