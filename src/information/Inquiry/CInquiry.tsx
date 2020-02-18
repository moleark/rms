import * as React from 'react';
import { View, BoxId, Image, PageItems, Query, Context } from 'tonva';
import { CUqBase } from 'CBase';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { VInquiryList } from './VInquiryList';

class PageInquiry extends PageItems<any> {

    private searchInquiry: Query;
    constructor(searchQuery: Query) {
        super();
        this.firstSize = this.pageSize = 14;
        this.searchInquiry = searchQuery;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchInquiry.page(param, pageStart, pageSize);
        return ret;
    }
    protected setPageStart(item: any): any {
        this.pageStart = item === undefined ? 0 : item.id;
    }
}

export class CInquiry extends CUqBase {

    @observable inquirys: any;

    async internalStart(param: any) {
        this.searchInquiryByKey(param);
    }

    searchInquiryByKey = async (key: string) => {
        this.inquirys = await this.uqs.rms.InquirySheet.mySheets(undefined, 1, -20);
    }

    loadList = async () => {
        await this.searchInquiryByKey("");
    }

    render = observer(() => {
        return this.renderView(VInquiryList);
    })

    tab = () => {
        return <this.render />;
    }
}