import * as React from 'react';
import { CHome } from './CHome';
import { Page, View, SearchBox } from 'tonva';

export class VHome extends View<CHome> {

    async open(param?: any) {
        this.openPage(this.page);
    }

    render(param: any): JSX.Element {
        return <this.page />
    }

    private page = () => {
        let { onNewSupplier, searchSupplierByKey } = this.controller.cApp.cSupplier;

        let right = <div className="d-flex align-items-center">
            <SearchBox
                size='sm'
                onSearch={(key: string) => searchSupplierByKey(key)}
                placeholder="请输入关键字" />
            <div><span onClick={() => onNewSupplier()} className="fa-stack">
                <i className="fa fa-plus-square fa-stack-2x cursor-pointer my-1" style={{ fontSize: '1.6rem' }}></i>
            </span></div>
        </div>;
        let header = <header>
            <div className="px-3" >供应商</div>
        </header>;
        return <Page right={right} header={header} onScrollBottom={this.onScrollBottom} headerClassName="py-1 bg-primary">
            <this.content />
        </Page>;
    };

    private content = () => {
        let { controller } = this;
        let { toSupplierList } = controller;
        return <>
            {toSupplierList()}
        </>
    };

    private onScrollBottom = async () => {
        await this.controller.cApp.cSupplier.suppliers.more();
    }
}