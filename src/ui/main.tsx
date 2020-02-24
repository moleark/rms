import * as React from 'react';
import { VPage, TabCaptionComponent, Page, Tabs } from 'tonva';
import { CApp } from '../CApp';

const color = (selected: boolean) => selected === true ? 'text-primary' : 'text-muted';

export class VMain extends VPage<CApp> {
    async open(param?: any) {
        this.openPage(this.render);
    }
    render = (param?: any): JSX.Element => {
        let { cHome, cProduct, cPendingInquiry, cInquiry, cNewPendingInquiry } = this.controller;
        let faceTabs = [
            { name: 'supplier', label: '供应商', icon: 'home', content: cHome.tab, notify: undefined },
            { name: 'product', label: '产品', icon: 'check-square-o', content: cProduct.tab, onShown: cProduct.loadList },
            { name: 'pendingInquiry', label: '待询价', icon: 'pencil-square-o', content: cNewPendingInquiry.tab, onShown: cNewPendingInquiry.loadList },
            { name: 'inquirying', label: '已询价', icon: 'pencil-square-o', content: cPendingInquiry.tab, onShown: cPendingInquiry.loadList },
            { name: 'inquiry', label: '询价单', icon: 'bandcamp', content: cInquiry.tab, onShown: cInquiry.loadList }
        ].map(v => {
            let { name, label, icon, content, notify, onShown } = v;
            return {
                name: name,
                caption: (selected: boolean) => TabCaptionComponent(label, icon, color(selected)),
                content: content,
                notify: notify,
                onShown: onShown,
            }
        });
        return <Page header={false}>
            <Tabs tabs={faceTabs} />
        </Page>;
    }
}
