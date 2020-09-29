/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AppUserManagmentContractTableFragment
// ====================================================

export interface AppUserManagmentContractTableFragment_customer {
  __typename: "Customer";
  id: string;
  name: string;
  /**
   * This represents an external reference of this customer, e.g. from the
   * Unitymedia/Vodafone CRM.
   */
  externalId: string | null;
}

export interface AppUserManagmentContractTableFragment_properties {
  __typename: "NodeCollection";
  count: number;
}

export interface AppUserManagmentContractTableFragment_meta_companyAddress {
  __typename: "ContractMetaCompanyAddress";
  street: string | null;
  postal: string | null;
  locality: string | null;
}

export interface AppUserManagmentContractTableFragment_meta {
  __typename: "ContractMeta";
  apartmentCount: number | null;
  companyName: string | null;
  companyAddress: AppUserManagmentContractTableFragment_meta_companyAddress;
  endDate: DateTime | null;
  offer: string | null;
  salesPartner: string | null;
  signingDate: DateTime | null;
  startDate: DateTime | null;
}

export interface AppUserManagmentContractTableFragment {
  __typename: "Contract";
  id: string;
  /**
   * This represents an external reference of this contract, e.g. from the
   * Unitymedia/Vodafone CRM.
   */
  externalId: string;
  customer: AppUserManagmentContractTableFragment_customer;
  /**
   * The nodes of type `PROPERTY` covered by this contract.
   */
  properties: AppUserManagmentContractTableFragment_properties;
  meta: AppUserManagmentContractTableFragment_meta;
}
