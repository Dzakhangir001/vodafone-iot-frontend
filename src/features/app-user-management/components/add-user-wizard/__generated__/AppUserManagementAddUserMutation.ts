/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AddUserInput } from "./../../../../../types/iot-portal";

// ====================================================
// GraphQL mutation operation: AppUserManagementAddUserMutation
// ====================================================

export interface AppUserManagementAddUserMutation_addUser {
  __typename: "User";
  id: string;
}

export interface AppUserManagementAddUserMutation {
  /**
   * Add a user.
   */
  addUser: AppUserManagementAddUserMutation_addUser;
}

export interface AppUserManagementAddUserMutationVariables {
  input: AddUserInput;
}
