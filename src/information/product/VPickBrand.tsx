import * as React from 'react';
import { VPage, Page, List, LMR, SearchBox, FA } from 'tonva';
import { observer } from 'mobx-react';
import { CBrand } from './CBrand';

export class VPickBrand extends VPage<CBrand> {
    async open(param?: any) {
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { brands, searchBrandByKey, onNewBrand } = this.controller;

        let right = <div className="w-19c d-flex">
            <span onClick={() => onNewBrand()} className="fa-stack">
                <i className="fa fa-square fa-stack-2x text-primary"></i>
                <i className="fa fa-plus fa-stack-1x"></i>
            </span>
        </div>;
        let header = <header className="py-2 px-2 text-center text-white">
            <span className="h5 align-middle" style={{ textAlign: 'center' }}>选择品牌</span>
        </header>;
        return <Page header={header} right={right} onScrollBottom={this.onScrollBottom} headerClassName="bg-primary" >
            <SearchBox className="w-60"
                size='sm'
                onSearch={(key: string) => searchBrandByKey(key)}
                placeholder="请输入关键字" />
            <List items={brands} item={{ render: this.renderItem, onClick: this.onClick }} />
        </Page>;
    });


    private onScrollBottom = async () => {
        await this.controller.brands.more();
    }

    private onClick = async (model: any) => {
        await this.controller.returnBrand(model);
        this.closePage();
    }

    private renderItem = (item: any, index: number) => {
        let { no, name } = item;
        return <LMR className="py-2 border">
            <div><FA name="circle" className="px-2 text-primary"></FA>{no} - {name}</div>
        </LMR >;
    }

}
