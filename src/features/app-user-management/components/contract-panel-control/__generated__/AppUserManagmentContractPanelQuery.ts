/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AppUserManagmentContractPanelQuery
// ====================================================

export interface AppUserManagmentContractPanelQuery_collection_items_customer {
  __typename: "Customer";
  id: string;
  name: string;
  /**
   * This represents an external reference of this customer, e.g. from the
   * Unitymedia/Vodafone CRM.
   */
  externalId: string | null;
}

export interface AppUserManagmentContractPanelQuery_collection_items_properties {
  __typename: "NodeCollection";
  count: number;
}

export interface AppUserManagmentContractPanelQuery_collection_items_meta_companyAddress {
  __typename: "ContractMetaCompanyAddress";
  street: string | null;
  postal: string | null;
  locality: string | null;
}

export interface AppUserManagmentContractPanelQuery_collection_items_meta {
  __typename: "ContractMeta";
  apartmentCount: number | null;
  companyName: string | null;
  companyAddress: AppUserManagmentContractPanelQuery_collection_items_meta_companyAddress;
  endDate: DateTime | null;
  offer: string | null;
  salesPartner: string | null;
  signingDate: DateTime | null;
  startDate: DateTime | null;
}

export interface AppUserManagmentContractPanelQuery_collection_items {
  __typename: "Contract";
  id: string;
  /**
   * This represents an external reference of this contract, e.g. from the
   * Unitymedia/Vodafone CRM.
   */
  externalId: string;
  customer: AppUserManagmentContractPanelQuery_collection_items_customer;
  /**
   * The nodes of type `PROPERTY` covered by this contract.
   */
  properties: AppUserManagmentContractPanelQuery_collection_items_properties;
  meta: AppUserManagmentContractPanelQuery_collection_items_meta;
}

export interface AppUserManagmentContractPanelQuery_collection {
  __typename: "ContractCollection";
  items: AppUserManagmentContractPanelQuery_collection_items[];
  count: number;
}

export interface AppUserManagmentContractPanelQuery {
  /**
   * Get a collection of contracts.
   */
  collection: AppUserManagmentContractPanelQuery_collection;
}

export interface AppUserManagmentContractPanelQueryVariables {
  skip?: number | null;
  take?: number | null;
}
