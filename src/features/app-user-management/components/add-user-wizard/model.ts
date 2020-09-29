import { AppUserManagementAddUserMutationVariables } from './__generated__/AppUserManagementAddUserMutation';
import { AppUserManagementSetAllowedAppsForUserMutationVariables } from './__generated__/AppUserManagementSetAllowedAppsForUserMutation';

export interface UserData {
  repeatedEmail: string;
  addUser: AppUserManagementAddUserMutationVariables['input'];
  setAllowedAppsForUser: AppUserManagementSetAllowedAppsForUserMutationVariables['input'];
}

export interface AppPermission {
  id: number;
  label: string;
  name: string;
}
export interface AppPermissionList {
  name: string;
  data: AppPermission[];
}

export const ADD_USER_WIZARD = Symbol('ADD_USER_WIZARD');
