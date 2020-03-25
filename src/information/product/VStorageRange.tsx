import * as React from 'react';
import { VPage, Page } from 'tonva';
import { FA } from 'tonva';
import { CStorageRange } from './CStorageRange';

export class VStorageRange extends VPage<CStorageRange> {

    async open(param: any) {
        this.openPage(this.page);
    }

    private page = () => {
        let { storageRanges } = this.controller;
        return <Page header="选择存储条件">
            <div className="row no-gutters">
                {storageRanges.map((v: any) => this.renderStorageRange(v, this.onStorageRangeClick))}
            </div>
        </Page>
    }

    private renderStorageRange = (storageRange: any, onClick: any) => {
        let { id, no, description } = storageRange;
        return <div key={id} className="col-12 cursor-pointer" >
            <div className="pt-1 pb-1 px-2" onClick={() => this.onStorageRangeClick(storageRange)}
                style={{ border: '1px solid #eeeeee', marginRight: '-1px', marginBottom: '-1px' }}
            >
                <span className="ml-1 align-middle">
                    <FA name="chevron-right" className="text-info small" />
                    &nbsp; {no} [{description}]
                </span>
            </div>
        </div>;
    }

    private onStorageRangeClick = async (item: any) => {
        await this.controller.returnStorageRange(item);
        this.closePage();
    }
}
