import * as React from 'react';
import { observer } from 'mobx-react';
import { View, EasyDate, FA, LMR, List, EasyTime, Page, VPage, SearchBox, tv } from 'tonva';
import { CNewPendingInquiry } from './CNewPendingInquiry';

export class VNewPendingInquiryList extends VPage<CNewPendingInquiry> {

    async open(param?: any) {
    }

    render() {
        return <this.page />
    }

    private renderRootCategory = (item: any, parent: any) => {
        let { supplier, date } = item;
        let { onShowNewPendingInquiryDetail } = this.controller;

        let right = <div className="p-2 cursor-pointer text-muted">
            <EasyDate date={date} />
        </div>
        return <LMR right={right} className="m-2 justify-content-between cursor-pointer" onClick={() => onShowNewPendingInquiryDetail(item)}>
            <div><span className="small text-muted"></span>{tv(supplier, v => <>{v.name}</>)}</div>
        </LMR >
    }

    private page = observer(() => {
        let { newpendingInquirys, onNewPendingInquiry, searchNewPendingInquiryByKey, pickProduct } = this.controller;

        let right = <div className="w-19c d-flex">
            <SearchBox className="w-80"
                size='sm'
                onSearch={(key: string) => searchNewPendingInquiryByKey(key)}
                placeholder="请输入供应商关键字" />
            <span onClick={() => pickProduct()} className="fa-stack">
                <i className="fa fa-square fa-stack-2x text-primary"></i>
                <i className="fa fa-plus fa-stack-1x"></i>
            </span>
        </div>;
        let header = <header className="py-2 px-4 text-center text-white">
            <span className="h5 align-middle" style={{ textAlign: 'center' }}>待询出</span>
        </header>;
        return <Page header={header} right={right} onScrollBottom={this.onScrollBottom} headerClassName="bg-primary">
            <div className="py-2">
                <List items={newpendingInquirys} item={{ render: this.renderRootCategory }} none="目前还没待询出记录哦！" />
            </div>
        </Page>;
    })

    private onScrollBottom = async () => {
        await this.controller.newpendingInquirys.more();
    }
}