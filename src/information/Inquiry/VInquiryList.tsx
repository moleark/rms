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
        let { supplier, contactName, inquiryUser, startDate, inquiryDate, date, sheet, way, result } = item;
        let { openInquiryDetail } = this.controller;

        let right = <div className="cursor-pointer text-info small">
            <div>开始：<EasyDate date={inquiryDate} /></div>
            <div>询出：<EasyDate date={inquiryDate} /></div>
            <div>结束：<EasyDate date={date} /></div>
        </div>
        let left = <div>
            <div>{tv(supplier, v => <>{v.name}</>)}</div>
            <div className="text-muted small">方式：{way === 1 ? "Email询价" : (way === 2 ? "电话询价" : "传真询价")}</div>
            <div className="text-muted small">结果：{result === 1 ? "有价格" : (way === 2 ? "有价格" : "无")}</div>
        </div>
        return <LMR left={left} right={right} className="py-2 px-3 border-top" onClick={() => openInquiryDetail(sheet)}>
        </LMR >
    }

    private page = observer(() => {
        let { inquirys, searchInquiryByKey } = this.controller;

        let right = <div className="w-19c d-flex">
            <SearchBox className="w-80"
                size='sm'
                onSearch={(key: string) => searchInquiryByKey(key)}
                placeholder="请输入供应商关键字" />
        </div>;
        let header = <header className="py-2 px-4 text-center text-white">
            <span className="h5 align-middle" style={{ textAlign: 'center' }}>询价单</span>
        </header>;
        return <Page header={header} right={right} onScrollBottom={this.onScrollBottom} headerClassName="bg-primary">
            <List items={inquirys} item={{ render: this.renderRootCategory }} none="目前还没询价单哦！" />
        </Page>;
    })

    private onScrollBottom = async () => {
        await this.controller.inquirys.more();
    }
}