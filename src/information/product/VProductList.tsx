import * as React from 'react';
import { observer } from 'mobx-react';
import { View, EasyDate, FA, LMR, List, EasyTime, Page, VPage, SearchBox, tv } from 'tonva';
import { CProduct } from './CProduct';

export class VProductList extends VPage<CProduct> {

    private pickType: string;
    async open(param?: any) {
    }

    render() {
        return <this.page />
    }

    private renderRootCategory = (item: any, parent: any) => {
        let { no, description, createTime, supplier, CAS, purity } = item;
        let { showProductDetail } = this.controller;
        let showcas = CAS === undefined ? <b>[无]</b> : <b>{CAS}</b>;
        let showpurity = purity === undefined ? "" : <b>{purity}</b>;

        return <LMR className="px-3 d-flex p-1 cursor-pointer">
            <div onClick={() => showProductDetail(item)}>
                <b>{no}</b>
                <div>{showcas}&nbsp;&nbsp;{showpurity}</div>
                <div><b>{description}</b></div>
                <div className="py-1 text-muted">{tv(supplier, v => <>{v.name}</>)}</div>
            </div>
        </LMR>
    }

    private pickSelect = async () => {
        this.pickType = await this.vCall(VSelectType);
        this.closePage();
        this.controller.start();
    }

    private page = observer(() => {
        let { products, onNewProduct, searchProductByKey, pickChemical } = this.controller;

        let right = <div className="d-flex align-items-center">
            <div><span onClick={() => this.pickSelect()} className="fa-stack">
                <i className="fa fa-filter fa-stack-2x cursor-pointer my-1" style={{ fontSize: '1.6rem' }}></i>
            </span></div>
            <SearchBox
                size='sm'
                onSearch={(key: string) => searchProductByKey(this.pickType, key)}
                placeholder="请输入cas、名称关键字" />
            <div><span onClick={() => pickChemical()} className="fa-stack">
                <i className="fa fa-plus-square fa-stack-2x cursor-pointer my-1" style={{ fontSize: '1.6rem' }}></i>
            </span></div>
        </div>;
        let header = <header>
            <div className="px-3" >产品</div>
        </header>;
        let filter = this.pickType === undefined ? "" : <div className="text-muted small px-3 py-2">筛选条件：{this.pickType}</div>;
        return <Page header={header} right={right} onScrollBottom={this.onScrollBottom} headerClassName="py-1 bg-primary">
            {filter}
            <List items={products} item={{ render: this.renderRootCategory }} />
        </Page >;
    })

    private onScrollBottom = async () => {
        await this.controller.products.more();
    }
}

class VSelectType extends VPage<CProduct> {
    async open() {
        this.openPage(this.page);
    }

    private onConfirm = async (name: string) => {
        await this.returnCall(name);
        this.closePage();
    }

    private page = (pakage: any) => {
        return <Page header="筛选类型" back="close" headerClassName="bg-primary">
            <div className="d-flex mt-3 justify-content-end">
                <button className="btn btn-outline-info mr-3" onClick={() => this.onConfirm(undefined)}>取消</button>
                <button className="btn btn-outline-info mr-3" onClick={() => this.onConfirm('供应商')}>供应商</button>
                <button className="btn btn-outline-info mr-3" onClick={() => this.onConfirm('中英文名称')}>中英文名称</button>
                <button className="btn btn-outline-info mr-3" onClick={() => this.onConfirm('CAS')}>CAS</button>
            </div>
        </Page>;
    }
}