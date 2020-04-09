import * as React from 'react';
import { CUqBase } from 'CBase';
import { observable } from 'mobx';
import { VRestrictMark } from './VRestrictMark';

export class CRestrictMark extends CUqBase {

    @observable restrictMarks: any;
    @observable restrictMarkResult: any[] = [];
    private product: any;
    restrictMarkList: any[];

    protected async internalStart(param: any) {
        if (param !== undefined) {
            let { parent, item, child } = param;
            this.product = parent;
            this.restrictMarkList = child;
        }
        this.restrictMarks = await this.uqs.rms.RestrictMark.search("", 0, 200);
        this.openVPage(VRestrictMark);
    }

    returnRestrictMark = (model: any) => {
        this.returnCall(model);
    }

    saveProductRestrictMark = async (models: any[]) => {

        if (this.product !== undefined && models !== undefined) {
            let { id } = this.product;
            if (this.restrictMarkList !== undefined) {
                for (let olditem of this.restrictMarkList) {
                    await this.uqs.rms.ProductRestrictMark.del({ product: id, arr1: [{ restrictMark: olditem.id }] });
                }
            }
            for (let item of this.restrictMarkResult) {
                await this.uqs.rms.ProductRestrictMark.add({ product: id, arr1: [{ restrictMark: item.id }] });
            }
        }
        this.closePage();
        await this.cApp.cProduct.showProductDetail(this.product);
    }
}