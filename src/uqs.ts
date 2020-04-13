import { Query, Map, Tuid, Action, Sheet, History, Pending } from "tonva";

export interface UqRMS {
    Supplier: Tuid;
    SupplierContact: Tuid;
    Product: Tuid;
    RsBrand: Tuid;
    BankAccount: Tuid;
    VatRate: Tuid;
    StorageRange: Tuid;
    RestrictMark: Tuid;
    InquiryPackage: Tuid;
    ProductProperty: Tuid;
    NotProvidedReason: Tuid;
    RsProductChemical: Map;
    SupplierBankAccount: Map;
    InquiryPendingItem: Map;
    PackPrice: Map;
    SupplierHandler: Map;
    SupplierFinanceContact: Map;
    ProductRestrictMark: Map;
    SearchSupplierContact: Query;
    SearchSupplierBankAccount: Query;
    SearchSupplier: Query;
    SearchProduct: Query;
    SearchBrand: Query;
    GetPack: Query;
    SearchNewInquiryPending: Query;
    SearchInquiryPending: Query;
    SearchInquiryPendingBySupplier: Query;
    SearchProductByOrigin: Query;
    AddInquiryPending: Action;
    DeleteInquiryPending: Action;
    DeleteInquiryPackage: Action;
    DeleteInquiryPendingBySupplier: Action;
    AddInquiryResult: Action;
    InquirySheet: Sheet;
    GetInquirySheet: Query;
    InquiryHistory: History;
    SearchProductById: Query;
    AddPackagePrice: Action;
    UpdateInquiryPending: Action;
    AddPackage: Action;
    SearchVatRate: Query;
    SearchProductProperty: Query;
    SearchInquiryPendingByID: Query;
}

export interface UqCommon {
    Country: Tuid;
    Address: Tuid;
    Currency: Tuid;
    PackType: Tuid;
    GetCountryProvinces: Query;
    GetProvinceCities: Query;
    GetCityCounties: Query;
    SearchPackType: Query;
}

export interface UqChemical {
    Chemical: Tuid;
    SearchChemical: Query;
}

export interface UqHr {
    SearchEmployee: Query;
}

export interface UQs {
    rms: UqRMS;
    common: UqCommon;
    chemical: UqChemical;
    hr: UqHr;
}
