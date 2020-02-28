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

        let right = <div className="cursor-pointer text-info" onClick={() => onEditProduct(item)}>
            <FA name="edit" />
        </div>
        return <LMR right={right} className="px-2 d-flex p-1 cursor-pointer">
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
        return <Page header={header} right={right} headerClassName="py-1 bg-primary">
            <List items={products} item={{ render: this.renderRootCategory }} />
        </Page >;
    })

}