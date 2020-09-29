/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AppUserManagmentCustomerViewQuery
// ====================================================

export interface AppUserManagmentCustomerViewQuery_customer_contact {
  __typename: "User";
  id: string;
  name: string;
  email: string | null;
}

export interface AppUserManagmentCustomerViewQuery_customer_contracts_items_customer {
  __typename: "Customer";
  id: string;
  name: string;
  /**
   * This represents an external reference of this customer, e.g. from the
   * Unitymedia/Vodafone CRM.
   */
  externalId: string | null;
}

export interface AppUserManagmentCustomerViewQuery_customer_contracts_items_properties {
  __typename: "NodeCollection";
  count: number;
}

export interface AppUserManagmentCustomerViewQuery_customer_contracts_items_meta_companyAddress {
  __typename: "ContractMetaCompanyAddress";
  street: string | null;
  postal: string | null;
  locality: string | null;
}

export interface AppUserManagmentCustomerViewQuery_customer_contracts_items_meta {
  __typename: "ContractMeta";
  apartmentCount: number | null;
  companyName: string | null;
  companyAddress: AppUserManagmentCustomerViewQuery_customer_contracts_items_meta_companyAddress;
  endDate: DateTime | null;
  offer: string | null;
  salesPartner: string | null;
  signingDate: DateTime | null;
  startDate: DateTime | null;
}

export interface AppUserManagmentCustomerViewQuery_customer_contracts_items {
  __typename: "Contract";
  id: string;
  /**
   * This represents an external reference of this contract, e.g. from the
   * Unitymedia/Vodafone CRM.
   */
  externalId: string;
  customer: AppUserManagmentCustomerViewQuery_customer_contracts_items_customer;
  /**
   * The nodes of type `PROPERTY` covered by this contract.
   */
  properties: AppUserManagmentCustomerViewQuery_customer_contracts_items_properties;
  meta: AppUserManagmentCustomerViewQuery_customer_contracts_items_meta;
}

export interface AppUserManagmentCustomerViewQuery_customer_contracts {
  __typename: "ContractCollection";
  items: AppUserManagmentCustomerViewQuery_customer_contracts_items[];
  count: number;
}

export interface AppUserManagmentCustomerViewQuery_customer_directories_items {
  __typename: "Node";
  id: string;
  name: string;
}

export interface AppUserManagmentCustomerViewQuery_customer_directories {
  __typename: "NodeCollection";
  items: AppUserManagmentCustomerViewQuery_customer_directories_items[];
  count: number;
}

export interface AppUserManagmentCustomerViewQuery_customer {
  __typename: "Customer";
  id: string;
  creationDate: DateTime;
  modificationDate: DateTime;
  /**
   * Record version used for optimistic locking.
   */
  version: number;
  name: string;
  /**
   * This represents an external reference of this customer, e.g. from the
   * Unitymedia/Vodafone CRM.
   */
  externalId: string | null;
  contact: AppUserManagmentCustomerViewQuery_customer_contact | null;
  contracts: AppUserManagmentCustomerViewQuery_customer_contracts;
  /**
   * The nodes of type `DIRECTORY` owned and administered by this customer.
   */
  directories: AppUserManagmentCustomerViewQuery_customer_directories;
}

export interface AppUserManagmentCustomerViewQuery {
  customer: AppUserManagmentCustomerViewQuery_customer;
}

export interface AppUserManagmentCustomerViewQueryVariables {
  id: string;
}
