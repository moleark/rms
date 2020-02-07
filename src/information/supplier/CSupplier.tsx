import * as React from 'react';
import { View, BoxId, Image } from 'tonva';
import { CUqBase } from 'CBase';
import { nav } from 'tonva';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import iconj from '../images/icon.jpg';
import { VSupplier } from './VSupplier';
import { VSupplierList } from './VSupplierList';
import { VHome } from '../VHome';
import { VSupplierDetail } from './VSupplierDetail';
import { SupplierItem } from "model/supplierItem";

export class CSupplier extends CUqBase {

    fromOrderCreation: boolean;
    @observable suppliers: any[] = [];

    async internalStart(fromOrderCreation: boolean) {
        this.fromOrderCreation = fromOrderCreation;
        this.suppliers = await this.uqs.rms.Supplier.search("", 0, 100);
    }

    renderRootList() {
        return this.renderView(VSupplierList);
    }

    saveSupplierData = async (supplier: any) => {

        if (supplier.id === undefined) {
            supplier.createTime = Date.now();
            await this.uqs.rms.Supplier.save(undefined, supplier);
        } else {
            await this.uqs.rms.Supplier.save(supplier.id, supplier);
        }

        await this.cApp.cHome.start();
    }


    /**
    * 打开新建界面
    */
    onNewSupplier = async () => {
        this.openVPage(VSupplier, { description: undefined });
    }

    /**
    * 打开编辑界面
    */
    onEditSupplier = async (supplier: any) => {
        this.openVPage(VSupplier, supplier);
    }

    /**
    * 打开详情界面
    */
    onSupplierSelected = async (supplier: any) => {
        let { id } = supplier;
        let item = await this.uqs.rms.SearchSupplierContact.query({ _id: id });
        let param: SupplierItem = {
            parent: supplier,
            item: item.ret[0],
            child: item,
        }
        this.openVPage(VSupplierDetail, param);
    }
}

