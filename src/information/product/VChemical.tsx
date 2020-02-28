import * as React from 'react';
import { VPage, Page, List, LMR, SearchBox, FA } from 'tonva';
import { observer } from 'mobx-react';
import { CChemical } from './CChemical';

export class VChemical extends VPage<CChemical> {
    async open(param?: any) {
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { chemicals, searchChemicalByKey } = this.controller;

        let header = <header className="py-2 px-2 text-center text-white">
            <span className="h5 align-middle" style={{ textAlign: 'center' }}>选择chemid</span>
        </header>;
        return <Page header={header} onScrollBottom={this.onScrollBottom} headerClassName="bg-primary">
            <SearchBox className="w-80 mt-1 mr-2"
                size='sm'
                onSearch={(key: string) => searchChemicalByKey(key)}
                placeholder="请输入CAS、名称关键字" />
            <List items={chemicals} item={{ render: this.renderItem }} />
        </Page>;
    });

    private onScrollBottom = async () => {
        await this.controller.chemicals.more();
    }

    private renderItem = (item: any, index: number) => {
        let { CAS, description } = item;
        let { supplier } = this.controller;
        let { onNewProduct } = this.controller.cApp.cProduct;
        return <LMR className="py-2 border" onClick={() => onNewProduct(item, supplier)}>
            <div><FA name="circle" className="px-2 text-primary"></FA>CAS:{CAS}</div>
            <div className="px-4 text-muted small">英文：{description}</div>
        </LMR >;
    }

}
