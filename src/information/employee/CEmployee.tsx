import * as React from 'react';
import { CUqBase } from 'CBase';
import { PageItems, Query } from 'tonva';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { VPickEmployee } from './VPickEmployee';

// 员工
class PageEmployee extends PageItems<any> {
    private searchEmployeeQuery: Query;
    constructor(searchQuery: Query) {
        super();
        this.firstSize = this.pageSize = 14;
        this.searchEmployeeQuery = searchQuery;
    }

    protected async loadResults(param: any, pageStart: any, pageSize: number): Promise<{ [name: string]: any[]; }> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchEmployeeQuery.page(param, pageStart, pageSize);
        return ret;
    }
    protected setPageStart(item: any): any {
        this.pageStart = item === undefined ? 0 : item.id;
    }
}

export class CEmployee extends CUqBase {
    @observable pageEmployee: PageEmployee;

    protected async internalStart() {
        await this.searchEmployeeByKey("");
        this.openVPage(VPickEmployee);
    }

    searchEmployeeByKey = async (key: string) => {
        this.pageEmployee = new PageEmployee(this.uqs.hr.SearchEmployee);
        this.pageEmployee.first({ key: key });
    }

    returnEmployee = (model: any) => {
        this.returnCall(model);
    }

}