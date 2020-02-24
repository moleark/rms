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
    SearchNewInquiryPending: Query;
    SearchInquiryPending: Query;
    SearchInquiryPendingBySupplier: Query;
    AddInquiryPending: Action;
    DeleteInquiryPending: Action;
    DeleteInquiryPackage: Action;
    DeleteInquiryPendingBySupplier: Action;
    InquirySheet: Sheet;
    GetInquirySheet: Query;
    $user: Tuid;
    SearchProductById: Query;
    AddInquiryResultHistory: Action;
    UpdateInquiryPending: Action;
}

export interface UqCommon {
    Country: Tuid;
    Address: Tuid;
    Currency: Tuid;
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
