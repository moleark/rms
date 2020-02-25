import * as React from 'react';
import { observer } from 'mobx-react';
import { View, EasyDate, FA, LMR, List, EasyTime, Page, VPage, SearchBox, tv } from 'tonva';
import { CPendingInquiry } from './CPendingInquiry';

export class VPendingInquiryList extends VPage<CPendingInquiry> {

    async open(param?: any) {
    }

    render() {
        return <this.page />
    }

    private renderRootCategory = (item: any, parent: any) => {
        let { supplier, inquiryDate } = item;
        let { onShowPendingInquiryDetail } = this.controller;

        let right = <div className="cursor-pointer text-info">
            <EasyDate date={inquiryDate} />
        </div>
        let left = <div>{tv(supplier, v => <>{v.name}</>)}</div>
        return <LMR left={left} right={right} className="py-2 px-3" onClick={() => onShowPendingInquiryDetail(item)}>
        </LMR >
    }

    private page = observer(() => {
        let { pendingInquirys, searchPendingInquiryByKey } = this.controller;

        let right = <div className="w-19c d-flex">
            <SearchBox className="w-80"
                size='sm'
                onSearch={(key: string) => searchPendingInquiryByKey(key)}
                placeholder="请输入供应商关键字" />
        </div>;
        let header = <header className="py-2 px-4 text-center text-white">
            <span className="h5 align-middle" style={{ textAlign: 'center' }}>已询出</span>
        </header>;
        return <Page header={header} right={right} onScrollBottom={this.onScrollBottom} headerClassName="bg-primary">
            <List items={pendingInquirys} item={{ render: this.renderRootCategory }} none="目前还没已询价记录哦！" />
        </Page>;
    })

    private onScrollBottom = async () => {
        await this.controller.pendingInquirys.more();
    }
}