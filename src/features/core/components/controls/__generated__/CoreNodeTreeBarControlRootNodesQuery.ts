/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { NodeType } from "./../../../../../types/iot-portal";

// ====================================================
// GraphQL query operation: CoreNodeTreeBarControlRootNodesQuery
// ====================================================

export interface CoreNodeTreeBarControlRootNodesQuery_rootNodes_children {
  __typename: "Node";
  id: string;
  type: NodeType;
  name: string;
}

export interface CoreNodeTreeBarControlRootNodesQuery_rootNodes {
  __typename: "Node";
  id: string;
  type: NodeType;
  name: string;
  children: CoreNodeTreeBarControlRootNodesQuery_rootNodes_children[];
}

export interface CoreNodeTreeBarControlRootNodesQuery {
  /**
   * Get a list of nodes.
   */
  rootNodes: CoreNodeTreeBarControlRootNodesQuery_rootNodes[];
}

export interface CoreNodeTreeBarControlRootNodesQueryVariables {
  parentIds?: (string | null)[] | null;
}
