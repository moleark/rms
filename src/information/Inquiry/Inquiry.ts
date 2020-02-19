import { observable, autorun, IReactionDisposer } from 'mobx';
import { Action, Query, TuidDiv, BoxId, Tuid } from 'tonva';
import { CApp } from 'CApp';

export interface PackRow {
    pack: BoxId;
    quantity: number;
}
