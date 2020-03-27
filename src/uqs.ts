import { Query, Map, Tuid, Action, Sheet, History } from "tonva";

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
    RsProductChemical: Map;
    SupplierBankAccount: Map;
    InquiryPendingItem: Map;
    PackPrice: Map;
    SearchSupplierContact: Query;
    SearchSupplierBankAccount: Query;
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
    InquiryHistory: History;
    SearchProductById: Query;
    AddPackagePrice: Action;
    UpdateInquiryPending: Action;
    AddPackage: Action;
    SearchVatRate: Query;
    SearchProductProperty: Query;
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

export interface UQs {
    rms: UqRMS;
    common: UqCommon;
    chemical: UqChemical;
}
