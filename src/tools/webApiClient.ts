import fetch, { Headers } from 'node-fetch';

export class WebApiClient {

    constructor() {
    }

    async newChemical(model?: any): Promise<any> {
        try {
            let { CAS, description, descriptoinCN, molecularFomula, molecularWeight } = model;
            let chemical = { CAS: CAS, EnglishName: description, ChineseName: descriptoinCN, MolecularFomula: molecularFomula, MolecularWeight: molecularWeight };

            let url = await this.getUrl("http://localhost:38311/api/Chemical/CreateChemid", chemical);
            let fetchInit = {
                headers: {
                    "Content-Type": 'application/x-www-form-urlencoded'
                },
                method: "post"
            };
            let res = await fetch(url, fetchInit);
            if (res.status !== 200) {
                console.error(res.statusText, res.status);
                throw {
                    error: res.statusText,
                    code: res.status,
                };
            }
            let json = await res.json();
            if (json.error !== undefined) {
                throw json.error;
            }
            if (json.ok === true) {
                return json;
            }
            return json;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    protected async getUrl(url: string, params: any = undefined): Promise<any> {
        if (params) {
            let keys = Object.keys(params);
            if (keys.length > 0) {
                let c = '?';
                for (let k of keys) {
                    let v = params[k];
                    if (v === undefined) continue;
                    url += c + k + '=' + encodeURIComponent(params[k]);
                    c = '&';
                }
            }
        }
        return url;
    }
}
export const httpClient = new WebApiClient();