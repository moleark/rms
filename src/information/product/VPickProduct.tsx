import * as React from 'react';
import { VPage, Page, List, LMR, SearchBox, FA } from 'tonva';
import { observer } from 'mobx-react';
import { CPickProduct } from './CPickProduct';

export class VPickProduct extends VPage<CPickProduct> {
    async open(param?: any) {
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { products, searchProductByKey } = this.controller;
        let { onNewPendingInquiry } = this.controller.cApp.cPendingInquiry;

        let header = <header className="py-2 px-2 text-center text-white">
            <span className="h5 align-middle" style={{ textAlign: 'center' }}>选择产品</span>
        </header>;
        return <Page header={header} onScrollBottom={this.onScrollBottom} headerClassName="bg-primary">
            <SearchBox className="w-80 mt-1 mr-2"
                size='sm'
                onSearch={(key: string) => searchProductByKey(key)}
                placeholder="请输入关键字" />
            <List items={products} item={{ render: this.renderItem, onClick: onNewPendingInquiry }} />
        </Page>;
    });


    private onScrollBottom = async () => {
        await this.controller.products.more();
    }

    private renderItem = (item: any, index: number) => {
        let { CAS, description } = item;
        return <LMR className="py-2 border">
            <div><FA name="circle" className="px-2 text-primary"></FA>{CAS}</div>
            <div className="px-4 text-muted small">{description}</div>
        </LMR >;
    }

}
