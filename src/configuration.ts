import { AppConfig } from "tonva";
import { tvs } from "./tvs";
import AnalyticalChemistry from './images/AnalyticalChemistry.png';
import LabSupplies from './images/LabSupplies.png';
import LifeScience from './images/LifeScience.png';
import MaterialScience from './images/MaterialScience.png';
import OrganicChemistry from './images/OrganicChemistry.png';

export const appConfig: AppConfig = {
    appName: '百灵威系统工程部/rms',
    version: '1.0.1',
    tvs: tvs,
    oem: '百灵威'
};
// 生产配置
export const GLOABLE = {
    CHINA: 43,
    TIPDISPLAYTIME: 2000
}