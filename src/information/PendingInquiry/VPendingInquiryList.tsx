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
        let { supplier } = item;
        let { onShowPendingInquiryDetail, onAddInquiry } = this.controller;

        let right = <div className="p-2 cursor-pointer text-info" onClick={() => onAddInquiry(item)}>
            <FA name="edit" />
        </div>
        return <LMR right={right} className="py-2">
            <div onClick={() => onShowPendingInquiryDetail(item)}>
                <div>
                    <FA name="location-arrow" className="px-2 text-primary"></FA>
                    {tv(supplier, v => <>{v.name}</>)}
                </div>
            </div>
        </LMR >
    }

    private page = observer(() => {
        let { pendingInquirys, onNewPendingInquiry, searchPendingInquiryByKey, pickProduct } = this.controller;

        let right = <div className="w-19c d-flex">
            <SearchBox className="w-80"
                size='sm'
                onSearch={(key: string) => searchPendingInquiryByKey(key)}
                placeholder="请输入供应商关键字" />
            <span onClick={() => pickProduct()} className="fa-stack">
                <i className="fa fa-square fa-stack-2x text-primary"></i>
                <i className="fa fa-plus fa-stack-1x"></i>
            </span>
        </div>;
        let header = <header className="py-2 px-4 text-center text-white">
            <span className="h5 align-middle" style={{ textAlign: 'center' }}>待询价</span>
        </header>;
        return <Page header={header} right={right} onScrollBottom={this.onScrollBottom} headerClassName="bg-primary">
            <List items={pendingInquirys} item={{ render: this.renderRootCategory }} none="目前还没待询价记录哦！" />
        </Page>;
    })

    private onScrollBottom = async () => {
        await this.controller.pendingInquirys.more();
    }
}