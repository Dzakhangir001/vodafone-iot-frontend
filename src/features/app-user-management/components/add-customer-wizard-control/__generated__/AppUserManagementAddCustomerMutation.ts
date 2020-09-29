/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AddCustomerInput } from "./../../../../../types/iot-portal";

// ====================================================
// GraphQL mutation operation: AppUserManagementAddCustomerMutation
// ====================================================

export interface AppUserManagementAddCustomerMutation_addCustomer {
  __typename: "Customer";
  id: string;
}

export interface AppUserManagementAddCustomerMutation {
  /**
   * Add a customer.
   */
  addCustomer: AppUserManagementAddCustomerMutation_addCustomer;
}

export interface AppUserManagementAddCustomerMutationVariables {
  input: AddCustomerInput;
}
