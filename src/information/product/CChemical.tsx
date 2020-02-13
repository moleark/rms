import * as React from 'react';
import { View, BoxId, Image, PageItems, Query } from 'tonva';
import { CUqBase } from 'CBase';
import { nav } from 'tonva';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { VChemical } from './VChemical';

class PageChemical extends PageItems<any> {

    private searchChemical: Query;
    constructor(searchQuery: Query) {
        super();
        this.firstSize = this.pageSize = 8;
        this.searchChemical = searchQuery;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
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

    async internalStart(param: any) {
        this.searchChemicalByKey(param);
        this.openVPage(VChemical);
    }

    searchChemicalByKey = async (key: string) => {
        this.chemicals = new PageChemical(this.uqs.chemical.SearchChemical);
        this.chemicals.first({ key: key });
    }
}