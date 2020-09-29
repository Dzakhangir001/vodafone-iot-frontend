/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AddContractInput } from "./../../../../../types/iot-portal";

// ====================================================
// GraphQL mutation operation: AppUserManagementAddContractMutation
// ====================================================

export interface AppUserManagementAddContractMutation_addContract {
  __typename: "Contract";
  id: string;
}

export interface AppUserManagementAddContractMutation {
  /**
   * Add a contract.
   */
  addContract: AppUserManagementAddContractMutation_addContract;
}

export interface AppUserManagementAddContractMutationVariables {
  input: AddContractInput;
}
