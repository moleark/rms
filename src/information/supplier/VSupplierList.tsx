import * as React from 'react';
import { observer } from 'mobx-react';
import { View, EasyDate, FA, LMR, List, EasyTime, Page } from 'tonva';
import { CSupplier } from './CSupplier';

export class VSupplierList extends View<CSupplier> {

    private renderRootCategory = (item: any, parent: any) => {
        let { no, name, createTime } = item;
        let { onEditSupplier } = this.controller;

        let right = <div className="p-2 cursor-pointer text-info" onClick={() => onEditSupplier(item)}>
            <FA name="edit" />
        </div>
        return <LMR right={right} className="py-2">
            <p onClick={() => this.controller.onSupplierSelected(item)}>
                <FA name="location-arrow" className="px-2 text-primary"></FA>
                {no} - {name}
            </p>
        </LMR>
    }

    render(param: any): JSX.Element {
        return <this.content />
    }

    private content = observer(() => {
        let { suppliers } = this.controller;
        return <List items={suppliers} item={{ render: this.renderRootCategory }} none="目前还没有供应商哦！" />;
    });
} 
