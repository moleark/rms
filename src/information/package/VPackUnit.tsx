import * as React from 'react';
import { VPage, Page } from 'tonva';
import { FA } from 'tonva';
import { CPackUnit } from './CPackUnit';

export class VPackUnit extends VPage<CPackUnit> {

    async open(param: any[]) {
        this.openPage(this.page);
    }

    private page = () => {
        let { packUnits } = this.controller;
        return <Page header="选择包装单位">
            <div className="row no-gutters">
                {packUnits.map((v: any) => this.renderPackUnit(v, this.onPackUnitClick))}
            </div>
        </Page>
    }

    private renderPackUnit = (packUnit: any, onClick: any) => {
        let { id, name } = packUnit;
        return <div key={id} className="col-6 col-md-4 col-lg-3 cursor-pointer" >
            <div className="pt-1 pb-1 px-2" onClick={() => this.onPackUnitClick(packUnit)}
                style={{ border: '1px solid #eeeeee', marginRight: '-1px', marginBottom: '-1px' }}
            >
                <span className="ml-1 align-middle">
                    <FA name="chevron-right" className="text-info small" />
                    &nbsp; {name}
                </span>
            </div>
        </div>;
    }

    private onPackUnitClick = async (item: any) => {
        await this.controller.returnPackUnit(item);
        this.closePage();
    }
}
