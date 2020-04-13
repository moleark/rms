import * as React from 'react';
import { View, BoxId, Image, PageItems, Query } from 'tonva';
import { CUqBase } from 'CBase';
import { nav } from 'tonva';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { VChemical } from './VChemical';
import { VAddChemical } from './VAddChemical';
import { httpClient } from "../../tools/webApiClient";

class PageChemical extends PageItems<any> {

    private searchChemical: Query;
    constructor(searchQuery: Query) {
        super();
        this.firstSize = this.pageSize = 14;
        this.searchChemical = searchQuery;
    }

    protected async loadResults(param: any, pageStart: any, pageSize: number): Promise<{ [name: string]: any[]; }> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchChemical.page(param, pageStart, pageSize);
        return ret;
    }
    protected setPageStart(item: any): any {
        this.pageStart = item === undefined ? 0 : item.id;
    }
}

export class CChemical extends CUqBase {

    @observable chemicals: PageChemical;
    @observable supplier: any;

    async internalStart(param: any) {
        this.supplier = param;
        this.searchChemicalByKey("");
        this.openVPage(VChemical);
    }

    searchChemicalByKey = async (key: string) => {
        if (key.length < 20) {
            key = key.replace("-", "").replace("-", "");
        }

        this.chemicals = new PageChemical(this.uqs.chemical.SearchChemical);
        this.chemicals.first({ key: key });
    }

    /**
    * 打开新建界面
    */
    onNewChemical = async () => {
        this.openVPage(VAddChemical, { description: undefined });
    }

    saveChemicalData = async (chemical: any) => {

        if (chemical.id === undefined) {
            chemical.no = await httpClient.newChemical(chemical);
            await this.uqs.chemical.Chemical.save(undefined, chemical);
        }
        this.closePage();
        await this.searchChemicalByKey("");
    }
}