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

        let right = <div className="d-flex align-items-center">
            <div><span onClick={() => onNewBrand()} className="fa-stack">
                <i className="fa fa-plus-square fa-stack-2x cursor-pointer my-1" style={{ fontSize: '1.6rem' }}></i>
            </span>
            </div>
        </div>;
        let header = <header>
            <div>选择品牌</div>
        </header>;
        return <Page header={header} right={right} onScrollBottom={this.onScrollBottom} headerClassName="py-1 bg-primary" >
            <SearchBox
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
