/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SetAllowedAppsForUserInput } from "./../../../../../types/iot-portal";

// ====================================================
// GraphQL mutation operation: AppUserManagementSetAllowedAppsForUserMutation
// ====================================================

export interface AppUserManagementSetAllowedAppsForUserMutation_setAllowedAppsForUser_user {
  __typename: "User";
  id: string;
  apps: string[];
}

export interface AppUserManagementSetAllowedAppsForUserMutation_setAllowedAppsForUser {
  __typename: "SetAllowedAppsForUserOutput";
  user: AppUserManagementSetAllowedAppsForUserMutation_setAllowedAppsForUser_user;
}

export interface AppUserManagementSetAllowedAppsForUserMutation {
  /**
   * Set the apps the user is allowed to use.
   */
  setAllowedAppsForUser: AppUserManagementSetAllowedAppsForUserMutation_setAllowedAppsForUser;
}

export interface AppUserManagementSetAllowedAppsForUserMutationVariables {
  input: SetAllowedAppsForUserInput;
}
