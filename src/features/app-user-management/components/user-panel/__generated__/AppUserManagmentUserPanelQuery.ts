/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AppUserManagmentUserPanelQuery
// ====================================================

export interface AppUserManagmentUserPanelQuery_collection_items {
  __typename: "User";
  id: string;
  name: string;
  email: string | null;
}

export interface AppUserManagmentUserPanelQuery_collection {
  __typename: "UserCollection";
  items: AppUserManagmentUserPanelQuery_collection_items[];
  count: number;
}

export interface AppUserManagmentUserPanelQuery {
  /**
   * Get a collection of users.
   */
  collection: AppUserManagmentUserPanelQuery_collection;
}

export interface AppUserManagmentUserPanelQueryVariables {
  query?: string | null;
  skip?: number | null;
  take?: number | null;
}
