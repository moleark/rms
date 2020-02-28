import * as React from 'react';
import { VPage, Page, List, LMR, SearchBox, FA, tv } from 'tonva';
import { observer } from 'mobx-react';
import { CPickProduct } from './CPickProduct';

export class VPickProduct extends VPage<CPickProduct> {
    async open(param?: any) {
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { products, searchProductByKey } = this.controller;
        let { onNewPendingInquiry } = this.controller.cApp.cNewPendingInquiry;

        let header = <header>
            <div className="px-3" >选择产品</div>
        </header>;
        return <Page header={header} onScrollBottom={this.onScrollBottom} headerClassName="py-1 bg-primary">
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
        let { CAS, description, supplier } = item;
        return <LMR className="py-2 border">
            <div><FA name="circle" className="px-2 text-primary"></FA>{CAS}</div>
            <div className="px-4 text-muted small">{description}</div>
            <div className="px-4 text-muted small">{tv(supplier, v => <>{v.name}</>)}</div>
        </LMR >;
    }

}
