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
        return <LMR right={right} className="m-2 justify-content-between cursor-pointer">
            <div><span className="small">{name}</span></div>
        </LMR>
    }

    render(param: any): JSX.Element {
        return <this.content />
    }

    private content = observer(() => {
        let { suppliers } = this.controller;
        return <div className="py-2"><List items={suppliers} item={{ render: this.renderRootCategory }} /></div>;
    });
} 
