/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { NodeType } from "./../../../../types/iot-portal";

// ====================================================
// GraphQL query operation: AppWifiNodeViewQuery
// ====================================================

export interface AppWifiNodeViewQuery_data {
  __typename: "Node";
  id: string;
  type: NodeType;
}

export interface AppWifiNodeViewQuery {
  data: AppWifiNodeViewQuery_data;
}

export interface AppWifiNodeViewQueryVariables {
  nodeId: string;
}
