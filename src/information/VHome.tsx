import * as React from 'react';
import { CHome } from './CHome';
import { Page, View } from 'tonva';

export class VHome extends View<CHome> {

    async open(param?: any) {
        this.openPage(this.page);
    }

    render(param: any): JSX.Element {
        return <this.page />
    }

    private page = () => {
        let { onNewSupplier } = this.controller.cApp.cSupplier;
        let right =
            <div onClick={() => onNewSupplier()} >
                <span className="fa-stack">
                    <i className="fa fa-square fa-stack-2x text-primary"></i>
                    <i className="fa fa-plus fa-stack-1x"></i>
                </span>
            </div>;
        let header = <header className="py-2 px-4 text-center text-white">
            <span className="h5 align-middle" style={{ textAlign: 'center' }}>供应商列表</span>
        </header>;
        return <Page right={right} header={header} headerClassName="bg-primary">
            <this.content />
        </Page>;
    };

    private content = () => {
        let { controller } = this;
        let { toSupplierList } = controller;
        return <>
            {toSupplierList()}
        </>
    };
}