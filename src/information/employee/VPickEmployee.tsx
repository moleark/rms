import * as React from 'react';
import { VPage, Page, List, LMR, SearchBox } from 'tonva';
import { observer } from 'mobx-react';
import { CEmployee } from './CEmployee';


export class VPickEmployee extends VPage<CEmployee> {
    async open(param?: any) {
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { pageEmployee, searchEmployeeByKey } = this.controller;

        let right = <div className="d-flex align-items-center">
            <SearchBox
                size='sm'
                onSearch={(key: string) => searchEmployeeByKey(key)}
                placeholder="请输入关键字" />
        </div>;

        return <Page header="选择负责人" right={right} onScrollBottom={this.onScrollBottom} headerClassName="bg-primary">
            <List items={pageEmployee} item={{ render: this.renderItem, onClick: this.onClick }} />
        </Page>;
    });

    private onScrollBottom = async () => {
        await this.controller.pageEmployee.more();
    }


    private onClick = async (model: any) => {
        await this.controller.returnEmployee(model);
        this.closePage();
    }

    private renderItem = (item: any, index: number) => {
        let { name } = item;
        return <LMR className="px-3 py-2 border" left={name}>
        </LMR >;
    }

}
