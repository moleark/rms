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
        let { id, no, date, discription } = item;
        let { openInquiryDetail } = this.controller;

        return <div className="m-3 justify-content-between cursor-pointer" onClick={() => openInquiryDetail(id)}>
            <div><span className="small text-muted">询价单号: </span><strong>{no}</strong></div>
            <div className="small text-muted"><EasyDate date={date} /></div>
        </div>;
    }

    private page = observer(() => {
        let { inquirys, searchInquiryByKey } = this.controller;

        let right = <div className="w-19c d-flex">
            <SearchBox className="w-80"
                size='sm'
                onSearch={(key: string) => searchInquiryByKey(key)}
                placeholder="请输入关键字" />
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