import * as React from 'react';
import { observer } from 'mobx-react';
import { View, EasyDate, FA, LMR, List, EasyTime, Page, VPage, SearchBox, tv } from 'tonva';
import { CInquiry } from './CInquiry';

export class VInquiryList extends VPage<CInquiry> {

    async open(param?: any) {
    }

    render() {
        return <this.page />
    }

    private renderRootCategory = (item: any, parent: any) => {
        let { supplier, contactName, inquiryUser, startDate, inquiryDate, date, sheet, way } = item;
        let { openInquiryDetail } = this.controller;

        let right = <div className="cursor-pointer text-muted small">
            {/* <div>开始：<EasyDate date={inquiryDate} /></div> */}
            <div>询出：<EasyDate date={inquiryDate} /></div>
            <div>结束：<EasyDate date={date} /></div>
        </div>
        let left = <div>
            <div><b>{tv(supplier, v => <>{v.name}</>)}</b></div>
            <div className="text-muted small">方式：{way === 1 ? "Email询价" : (way === 2 ? "电话询价" : "传真询价")}</div>
        </div>
        return <LMR left={left} right={right} className="px-3 d-flex p-1 cursor-pointer" onClick={() => openInquiryDetail(sheet)}>
        </LMR >
    }

    private page = observer(() => {
        let { inquirys, searchInquiryByKey } = this.controller;

        let right = <div className="d-flex align-items-center">
            <SearchBox
                size='sm'
                onSearch={(key: string) => searchInquiryByKey(key)}
                placeholder="请输入供应商关键字" />
        </div>;
        let header = <header>
            <div className="px-3" >询价单</div>
        </header>;
        return <Page header={header} right={right} onScrollBottom={this.onScrollBottom} headerClassName="py-1 bg-primary">
            <List items={inquirys} item={{ render: this.renderRootCategory }} />
        </Page>;
    })

    private onScrollBottom = async () => {
        await this.controller.inquirys.more();

    }
}