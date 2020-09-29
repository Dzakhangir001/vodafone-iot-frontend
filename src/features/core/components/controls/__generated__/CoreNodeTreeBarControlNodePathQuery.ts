/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { NodeType } from "./../../../../../types/iot-portal";

// ====================================================
// GraphQL query operation: CoreNodeTreeBarControlNodePathQuery
// ====================================================

export interface CoreNodeTreeBarControlNodePathQuery_nodeInfo_ancestors_children_children {
  __typename: "Node";
  id: string;
  type: NodeType;
  name: string;
}

export interface CoreNodeTreeBarControlNodePathQuery_nodeInfo_ancestors_children {
  __typename: "Node";
  id: string;
  type: NodeType;
  name: string;
  children: CoreNodeTreeBarControlNodePathQuery_nodeInfo_ancestors_children_children[];
}

export interface CoreNodeTreeBarControlNodePathQuery_nodeInfo_ancestors {
  __typename: "Node";
  id: string;
  type: NodeType;
  name: string;
  children: CoreNodeTreeBarControlNodePathQuery_nodeInfo_ancestors_children[];
}

export interface CoreNodeTreeBarControlNodePathQuery_nodeInfo {
  __typename: "Node";
  id: string;
  /**
   * The ancestor nodes of this node that match the given filter ordered from
   * far to close (e.g. from root node to parent node with default filter).
   */
  ancestors: CoreNodeTreeBarControlNodePathQuery_nodeInfo_ancestors[];
}

export interface CoreNodeTreeBarControlNodePathQuery {
  nodeInfo: CoreNodeTreeBarControlNodePathQuery_nodeInfo;
}

export interface CoreNodeTreeBarControlNodePathQueryVariables {
  id: string;
}
