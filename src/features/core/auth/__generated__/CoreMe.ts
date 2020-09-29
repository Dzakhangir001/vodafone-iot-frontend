/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CoreMe
// ====================================================

export interface CoreMe_me {
  __typename: "User";
  id: string;
  name: string;
  email: string | null;
  apps: string[];
}

export interface CoreMe {
  me: CoreMe_me;
}
