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

        let right = <div className="cursor-pointer text-muted">
            <EasyDate date={inquiryDate} />
        </div>
        let left = <div><b>{tv(supplier, v => <>{v.name}</>)}</b></div>
        return <LMR left={left} right={right} className="px-3 d-flex p-1 cursor-pointer" onClick={() => onShowPendingInquiryDetail(item)}>
        </LMR >
    }

    private page = observer(() => {
        let { pendingInquirys, searchPendingInquiryByKey } = this.controller;

        let right = <div className="d-flex align-items-center">
            <SearchBox
                size='sm'
                onSearch={(key: string) => searchPendingInquiryByKey(key)}
                placeholder="请输入供应商关键字" />
        </div>;
        let header = <header>
            <div className="px-3" >已询出</div>
        </header>;
        return <Page header={header} right={right} onScrollBottom={this.onScrollBottom} headerClassName="py-1 bg-primary">
            <List items={pendingInquirys} item={{ render: this.renderRootCategory }} />
        </Page>;
    })

    private onScrollBottom = async () => {
        await this.controller.pendingInquirys.more();
    }
}