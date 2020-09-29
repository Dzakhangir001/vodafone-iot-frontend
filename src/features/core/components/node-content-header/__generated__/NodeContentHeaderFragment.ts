/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { NodeType } from "./../../../../../types/iot-portal";

// ====================================================
// GraphQL fragment: NodeContentHeaderFragment
// ====================================================

export interface NodeContentHeaderFragment_ancestors {
  __typename: "Node";
  id: string;
  type: NodeType;
  name: string;
}

export interface NodeContentHeaderFragment {
  __typename: "Node";
  name: string;
  /**
   * The ancestor nodes of this node that match the given filter ordered from
   * far to close (e.g. from root node to parent node with default filter).
   */
  ancestors: NodeContentHeaderFragment_ancestors[];
}
