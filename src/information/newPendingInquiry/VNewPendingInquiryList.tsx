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

        let right = <div className="cursor-pointer text-muted">
            <EasyDate date={date} />
        </div>
        return <LMR right={right} className="px-2 d-flex p-1 cursor-pointer" onClick={() => onShowNewPendingInquiryDetail(item)}>
            <div><b>{tv(supplier, v => <>{v.name}</>)}</b></div>
        </LMR >
    }

    private page = observer(() => {
        let { newpendingInquirys, onNewPendingInquiry, searchNewPendingInquiryByKey, pickProduct } = this.controller;

        let right = <div className="d-flex align-items-center">
            <SearchBox
                size='sm'
                onSearch={(key: string) => searchNewPendingInquiryByKey(key)}
                placeholder="请输入供应商关键字" />
            <div><span onClick={() => pickProduct()} className="fa-stack">
                <i className="fa fa-plus-square fa-stack-2x cursor-pointer my-1" style={{ fontSize: '1.6rem' }}></i>
            </span></div>
        </div>;
        let header = <header>
            <div className="px-3" >待询出</div>
        </header>;
        return <Page header={header} right={right} onScrollBottom={this.onScrollBottom} headerClassName="py-1 bg-primary">
            <List items={newpendingInquirys} item={{ render: this.renderRootCategory }} none="目前还没待询出记录哦！" />
        </Page>;
    })

    private onScrollBottom = async () => {
        await this.controller.newpendingInquirys.more();
    }
}