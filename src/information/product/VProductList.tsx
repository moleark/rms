import * as React from 'react';
import { observer } from 'mobx-react';
import { View, EasyDate, FA, LMR, List, EasyTime, Page, VPage, SearchBox, tv } from 'tonva';
import { CProduct } from './CProduct';

export class VProductList extends VPage<CProduct> {

    async open(param?: any) {
    }

    render() {
        return <this.page />
    }

    private renderRootCategory = (item: any, parent: any) => {
        let { no, description, createTime, supplier, CAS, purity } = item;
        let { showProductDetail } = this.controller;

        let right = <div className="cursor-pointer text-muted">
            {purity}
        </div>
        return <LMR right={right} className="px-3 d-flex p-1 cursor-pointer">
            <div onClick={() => showProductDetail(item)}>
                <b>{CAS}</b>
                <div><b>{description}</b></div>
                <div className="py-1 text-muted">{tv(supplier, v => <>{v.name}</>)}</div>
            </div>
        </LMR>
    }

    private page = observer(() => {
        let { products, onNewProduct, searchProductByKey, pickChemical } = this.controller;

        let right = <div className="d-flex align-items-center">
            <SearchBox
                size='sm'
                onSearch={(key: string) => searchProductByKey(key)}
                placeholder="请输入cas、名称关键字" />
            <div><span onClick={() => pickChemical()} className="fa-stack">
                <i className="fa fa-plus-square fa-stack-2x cursor-pointer my-1" style={{ fontSize: '1.6rem' }}></i>
            </span></div>
        </div>;
        let header = <header>
            <div className="px-3" >产品</div>
        </header>;
        return <Page header={header} right={right} onScrollBottom={this.onScrollBottom} headerClassName="py-1 bg-primary">
            <List items={products} item={{ render: this.renderRootCategory }} />
        </Page >;
    })

    private onScrollBottom = async () => {
        await this.controller.products.more();
    }
}