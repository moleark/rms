import { Query, Map, Tuid, Action, Sheet } from "tonva";

export interface UqRMS {
    Supplier: Tuid;
    SupplierContact: Tuid;
    Product: Tuid;
    Brand: Tuid;
    ProductChemical: Map;
    SearchSupplierContact: Query;
    SearchSupplier: Query;
    SearchProduct: Query;
    SearchBrand: Query;
    GetPack: Query;
    SearchInquiryPending: Query;
    SearchInquiryPendingBySupplier: Query;
    AddInquiryPending: Action;
    DeleteInquiryPending: Action;
    DeleteInquiryPendingBySupplier: Action;
    InquirySheet: Sheet;
    GetInquirySheet: Query;
    $user: Tuid;
    SearchProductById: Query;
}

export interface UqCommon {
    Country: Tuid;
    Address: Tuid;
    GetCountryProvinces: Query;
    GetProvinceCities: Query;
    GetCityCounties: Query;
}

export interface UqChemical {
    SearchChemical: Query;
}

export interface UQs {
    rms: UqRMS;
    common: UqCommon;
    chemical: UqChemical;
}
