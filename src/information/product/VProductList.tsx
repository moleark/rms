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
        let { no, description, createTime, supplier, CAS } = item;
        let { onEditProduct, showProductDetail } = this.controller;

        let right = <div className="p-2 cursor-pointer text-info" onClick={() => onEditProduct(item)}>
            <FA name="edit" />
        </div>
        let left = <div onClick={() => showProductDetail(item)}>
            <div className="">{CAS}</div>
            <div className="">{description}</div>
            <div className="text-muted small">{tv(supplier, v => <>{v.name}</>)}</div>
        </div>
        return <LMR left={left} right={right} className="py-2 px-3 border-top">
        </LMR >
    }

    private page = observer(() => {
        let { products, onNewProduct, searchProductByKey, pickChemical } = this.controller;

        let right = <div className="w-19c d-flex">
            <SearchBox className="w-80"
                size='sm'
                onSearch={(key: string) => searchProductByKey(key)}
                placeholder="请输入cas、名称关键字" />
            <span onClick={() => pickChemical()} className="fa-stack">
                <i className="fa fa-square fa-stack-2x text-primary"></i>
                <i className="fa fa-plus fa-stack-1x"></i>
            </span>
        </div>;
        let header = <header className="py-2 px-4 text-center text-white">
            <span className="h5 align-middle" style={{ textAlign: 'center' }}>产品</span>
        </header>;
        return <Page header={header} right={right} headerClassName="bg-primary">
            <List items={products} item={{ render: this.renderRootCategory }} />
        </Page >;
    })

}