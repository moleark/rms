import * as React from 'react';
import { VPage, Page, List, LMR, SearchBox, FA } from 'tonva';
import { observer } from 'mobx-react';
import { CSupplier } from './CSupplier';

export class VPickSupplier extends VPage<CSupplier> {
    async open(param?: any) {
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { suppliers, searchSupplierByKey } = this.controller;

        let header = <header className="py-2 px-2 text-center text-white">
            <span className="h5 align-middle" style={{ textAlign: 'center' }}>选择供应商</span>
        </header>;
        return <Page header={header} onScrollBottom={this.onScrollBottom} headerClassName="bg-primary">
            <SearchBox className="w-80 mt-1 mr-2"
                size='sm'
                onSearch={(key: string) => searchSupplierByKey(key)}
                placeholder="请输入关键字" />
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
