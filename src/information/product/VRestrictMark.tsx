import * as React from 'react';
import { VPage, Page } from 'tonva';
import { FA } from 'tonva';
import { CRestrictMark } from './CRestrictMark';

export class VRestrictMark extends VPage<CRestrictMark> {

    private result: string = "";

    async open(param: any) {
        this.openPage(this.page);
    }

    private page = () => {
        let { restrictMarks, restrictMarkResult, restrictMarkList } = this.controller;
        let oldresult: string = " ";
        if (restrictMarkList !== undefined) {
            for (let item of restrictMarkList) {
                let { no } = item;
                if (oldresult.length === 1) {
                    oldresult += no;
                } else {
                    oldresult += "-" + no;
                }

            }
        }
        if (restrictMarkResult !== undefined) {
            for (let item of restrictMarkResult) {
                let { no } = item;
                if (this.result.length === 0) {
                    this.result += no;
                } else {
                    this.result += "-" + no;
                }

            }
        }

        let right = <div className="d-flex align-items-center">
            <div><span onClick={() => this.onReturn(restrictMarkResult)} className="fa-stack text-success">
                <i className="fa fa-check-circle-o fa-stack-2x cursor-pointer my-1" style={{ fontSize: '1.6rem' }}></i>
            </span></div>
            <div><span onClick={() => this.onCancel()} className="fa-stack text-danger">
                <i className="fa fa-times-circle-o fa-stack-2x cursor-pointer my-1" style={{ fontSize: '1.6rem' }}></i>
            </span></div>
        </div>;

        let showhead = "选择限制性标记" + oldresult;
        return <Page header={showhead} right={right} >
            <div className="bg-white py-2">结果：{this.result}</div>
            <div className="row no-gutters">
                {restrictMarks.map((v: any) => this.renderRestrictMark(v, this.onRestrictMarkClick))}
            </div>
        </Page >
    }

    private onCancel = async () => {
        this.controller.restrictMarkResult = [];
        this.result = "";
        await this.controller.call<number>();
    }

    private onReturn = async (restrictMarkResult: any[]) => {
        await this.controller.saveProductRestrictMark(restrictMarkResult);
    }

    private renderRestrictMark = (restrictMark: any, onClick: any) => {
        let { id, no, description } = restrictMark;
        return <div key={id} className="col-12 cursor-pointer" >
            <div className="pt-1 pb-1 px-2" onClick={() => this.onRestrictMarkClick(restrictMark)}
                style={{ border: '1px solid #eeeeee', marginRight: '-1px', marginBottom: '-1px' }}
            >
                <span className="ml-1 align-middle">
                    <FA name="chevron-right" className="text-info small" />
                    &nbsp; {no} [{description}]
                </span>
            </div>
        </div>;
    }

    private onRestrictMarkClick = async (item: any) => {
        let { restrictMarkResult } = this.controller;
        let cpi = restrictMarkResult.find(e => e.id === item.id);
        if (cpi === undefined) {
            restrictMarkResult.push(item);
        }

        await this.controller.call<number>();
        // await this.controller.returnRestrictMark(item);
        // this.closePage();
    }
}
