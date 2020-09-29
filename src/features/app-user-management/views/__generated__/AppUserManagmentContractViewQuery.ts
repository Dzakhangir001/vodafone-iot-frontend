/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AppUserManagmentContractViewQuery
// ====================================================

export interface AppUserManagmentContractViewQuery_contract_meta_companyAddress {
  __typename: "ContractMetaCompanyAddress";
  street: string | null;
  postal: string | null;
  locality: string | null;
}

export interface AppUserManagmentContractViewQuery_contract_meta {
  __typename: "ContractMeta";
  salesPartner: string | null;
  offer: string | null;
  companyName: string | null;
  companyAddress: AppUserManagmentContractViewQuery_contract_meta_companyAddress;
  signingDate: DateTime | null;
  startDate: DateTime | null;
  endDate: DateTime | null;
  apartmentCount: number | null;
}

export interface AppUserManagmentContractViewQuery_contract_customer {
  __typename: "Customer";
  id: string;
  name: string;
  /**
   * This represents an external reference of this customer, e.g. from the
   * Unitymedia/Vodafone CRM.
   */
  externalId: string | null;
}

export interface AppUserManagmentContractViewQuery_contract_contact {
  __typename: "User";
  id: string;
  name: string;
  email: string | null;
}

export interface AppUserManagmentContractViewQuery_contract_properties_items {
  __typename: "Node";
  id: string;
  name: string;
}

export interface AppUserManagmentContractViewQuery_contract_properties {
  __typename: "NodeCollection";
  items: AppUserManagmentContractViewQuery_contract_properties_items[];
  count: number;
}

export interface AppUserManagmentContractViewQuery_contract {
  __typename: "Contract";
  id: string;
  creationDate: DateTime;
  modificationDate: DateTime;
  /**
   * Record version used for optimistic locking.
   */
  version: number;
  /**
   * This represents an external reference of this contract, e.g. from the
   * Unitymedia/Vodafone CRM.
   */
  externalId: string;
  meta: AppUserManagmentContractViewQuery_contract_meta;
  customer: AppUserManagmentContractViewQuery_contract_customer;
  contact: AppUserManagmentContractViewQuery_contract_contact | null;
  /**
   * The nodes of type `PROPERTY` covered by this contract.
   */
  properties: AppUserManagmentContractViewQuery_contract_properties;
}

export interface AppUserManagmentContractViewQuery {
  contract: AppUserManagmentContractViewQuery_contract;
}

export interface AppUserManagmentContractViewQueryVariables {
  id: string;
}
