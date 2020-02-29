import * as React from 'react';
import { VPage, Page, List, LMR, SearchBox, FA } from 'tonva';
import { observer } from 'mobx-react';
import { CPickSupplier } from './CPickSupplier';

export class VPickSupplier extends VPage<CPickSupplier> {
    async open(param?: any) {
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { suppliers, searchSupplierByKey } = this.controller;

        let right = <div className="d-flex align-items-center">
            <SearchBox
                size='sm'
                onSearch={(key: string) => searchSupplierByKey(key)}
                placeholder="请输入关键字" />
        </div>;
        return <Page header="选择供应商" right={right} onScrollBottom={this.onScrollBottom} headerClassName="py-1 bg-primary">
            <List items={suppliers} item={{ render: this.renderItem, onClick: this.onClick }} />
        </Page>;
    });


    private onScrollBottom = async () => {
        await this.controller.suppliers.more();
    }

    private onClick = async (model: any) => {
        await this.controller.returnSupplier(model);
        this.closePage();
    }

    private renderItem = (item: any, index: number) => {
        let { name } = item;
        return <LMR className="py-2 border">
            <div><FA name="circle" className="px-2 text-primary"></FA>{name}</div>
        </LMR >;
    }

}
