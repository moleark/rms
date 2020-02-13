import * as React from 'react';
import { FA, Page, VPage } from "tonva";
import _ from 'lodash';
import { CPackage } from './CPackage';

export class VPackageDetail extends VPage<CPackage> {

    private package: any;

    async open(param: any) {
        this.package = param;
        this.openPage(this.page);
    }

    private page = () => {
        let packageData = _.clone(this.package);
        let { radiox, radioy, unit, type } = packageData;

        let header = <header className="py-2 text-center text-white">
            <span className="h5 align-middle">包装详情</span>
        </header>;

        return <Page header={header} headerClassName="bg-primary">
            <div className="py-2 bg-white mb-3">
                <div className="cursor-pointer">
                    &nbsp;<FA className="align-middle text-warning" name="credit-card" /><span className="h6 py-2 px-1 align-middle"><b> 包装基本信息</b></span>
                </div>
                <div className="py-2 cat-root-sub">
                    <div><span className="px-4 align-middle">&nbsp;套：</span><span>{radiox}</span></div>
                    <div><span className="px-4 align-middle ">规格：</span><span>{radioy}</span></div>
                    <div><span className="px-4 align-middle ">单位：</span><span>{unit}</span></div>
                    <div><span className="px-4 align-middle ">类型：</span><span>{type === 1 ? "目录包装" : "非目录包装"}</span></div>
                </div>
            </div>
        </Page >
    }
}