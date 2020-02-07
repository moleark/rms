import { Query, Map, Tuid, Action } from "tonva";

export interface UqRMS {
    Supplier: Tuid;
    SupplierContact: Tuid;
    Product: Tuid;
    ProductChemical: Map;
    SearchSupplierContact: Query;
}

export interface UqCommon {
    Country: Tuid;
}

export interface UQs {
    rms: UqRMS;
    common: UqCommon;
}
