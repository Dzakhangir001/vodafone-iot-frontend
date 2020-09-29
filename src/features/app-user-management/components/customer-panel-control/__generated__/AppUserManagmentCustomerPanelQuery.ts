/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AppUserManagmentCustomerPanelQuery
// ====================================================

export interface AppUserManagmentCustomerPanelQuery_customers_items_contracts {
  __typename: "ContractCollection";
  count: number;
}

export interface AppUserManagmentCustomerPanelQuery_customers_items_contact {
  __typename: "User";
  id: string;
  name: string;
  email: string | null;
}

export interface AppUserManagmentCustomerPanelQuery_customers_items {
  __typename: "Customer";
  id: string;
  name: string;
  /**
   * This represents an external reference of this customer, e.g. from the
   * Unitymedia/Vodafone CRM.
   */
  externalId: string | null;
  contracts: AppUserManagmentCustomerPanelQuery_customers_items_contracts;
  contact: AppUserManagmentCustomerPanelQuery_customers_items_contact | null;
}

export interface AppUserManagmentCustomerPanelQuery_customers {
  __typename: "CustomerCollection";
  items: AppUserManagmentCustomerPanelQuery_customers_items[];
  count: number;
}

export interface AppUserManagmentCustomerPanelQuery {
  /**
   * Get a collection of customers.
   */
  customers: AppUserManagmentCustomerPanelQuery_customers;
}

export interface AppUserManagmentCustomerPanelQueryVariables {
  skip?: number | null;
  take?: number | null;
}
