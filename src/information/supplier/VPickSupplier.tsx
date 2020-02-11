import * as React from 'react';
import { VPage, Page, List, LMR, SearchBox } from 'tonva';
import { observer } from 'mobx-react';
import { CSupplier } from './CSupplier';

export class VPickSupplier extends VPage<CSupplier> {
    async open(param?: any) {
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { suppliers, searchSupplierByKey } = this.controller;

        let header = <header className="py-2 px-4 text-center text-white">
            <span className="h5 align-middle" style={{ textAlign: 'center' }}>选择供应商</span>
        </header>;
        return <Page header={header} onScrollBottom={this.onScrollBottom} >
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
        return <LMR className="px-3 py-2 border" left={name}>
        </LMR >;
    }

}
