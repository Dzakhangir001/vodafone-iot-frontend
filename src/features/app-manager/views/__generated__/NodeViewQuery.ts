/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { NodeType } from "./../../../../types/iot-portal";

// ====================================================
// GraphQL query operation: NodeViewQuery
// ====================================================

export interface NodeViewQuery_data {
  __typename: "Node";
  id: string;
  type: NodeType;
}

export interface NodeViewQuery {
  data: NodeViewQuery_data;
}

export interface NodeViewQueryVariables {
  nodeId: string;
}
