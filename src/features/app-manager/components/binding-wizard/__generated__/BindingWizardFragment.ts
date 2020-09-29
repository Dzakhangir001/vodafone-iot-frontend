/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { NodeType } from "./../../../../../types/iot-portal";

// ====================================================
// GraphQL fragment: BindingWizardFragment
// ====================================================

export interface BindingWizardFragment_context_rooms {
  __typename: "Node";
  id: string;
  type: NodeType;
  name: string;
}

export interface BindingWizardFragment_context {
  __typename: "Node";
  id: string;
  /**
   * The descendant nodes of this node that match the given filter.
   */
  rooms: BindingWizardFragment_context_rooms[];
}

export interface BindingWizardFragment {
  __typename: "Node";
  id: string;
  type: NodeType;
  /**
   * The farthest ancestor node of this node matching the given filter, if any.
   */
  context: BindingWizardFragment_context | null;
}
