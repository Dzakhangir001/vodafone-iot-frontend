/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { NodeType, GatewayState } from "./../../../../../../types/iot-portal";

// ====================================================
// GraphQL query operation: ApartmentNodeContentQuery
// ====================================================

export interface ApartmentNodeContentQuery_data_context_rooms_devices {
  __typename: "Device";
  id: string;
  role: string;
}

export interface ApartmentNodeContentQuery_data_context_rooms {
  __typename: "Node";
  id: string;
  type: NodeType;
  name: string;
  devices: ApartmentNodeContentQuery_data_context_rooms_devices[];
}

export interface ApartmentNodeContentQuery_data_context {
  __typename: "Node";
  id: string;
  /**
   * The descendant nodes of this node that match the given filter.
   */
  rooms: ApartmentNodeContentQuery_data_context_rooms[];
}

export interface ApartmentNodeContentQuery_data_ancestors {
  __typename: "Node";
  id: string;
  type: NodeType;
  name: string;
}

export interface ApartmentNodeContentQuery_data_masterGateway_meta {
  __typename: "GatewayMeta";
  name: string | null;
  mountingNotes: string | null;
}

export interface ApartmentNodeContentQuery_data_masterGateway_site {
  __typename: "Node";
  id: string;
  name: string;
  type: NodeType;
}

export interface ApartmentNodeContentQuery_data_masterGateway {
  __typename: "Gateway";
  id: string;
  serial: string;
  state: GatewayState;
  bootDate: DateTime | null;
  firmware: string | null;
  meta: ApartmentNodeContentQuery_data_masterGateway_meta;
  site: ApartmentNodeContentQuery_data_masterGateway_site;
}

export interface ApartmentNodeContentQuery_data_iotGateways_path {
  __typename: "Node";
  id: string;
  name: string;
  type: NodeType;
}

export interface ApartmentNodeContentQuery_data_iotGateways_meta {
  __typename: "GatewayMeta";
  mountingNotes: string | null;
  name: string | null;
}

export interface ApartmentNodeContentQuery_data_iotGateways_devices {
  __typename: "Device";
  id: string;
  bound: boolean;
}

export interface ApartmentNodeContentQuery_data_iotGateways {
  __typename: "Gateway";
  id: string;
  serial: string;
  state: GatewayState;
  bootDate: DateTime | null;
  firmware: string | null;
  path: ApartmentNodeContentQuery_data_iotGateways_path[];
  meta: ApartmentNodeContentQuery_data_iotGateways_meta;
  devices: ApartmentNodeContentQuery_data_iotGateways_devices[];
}

export interface ApartmentNodeContentQuery_data {
  __typename: "Node";
  id: string;
  /**
   * The farthest ancestor node of this node matching the given filter, if any.
   */
  context: ApartmentNodeContentQuery_data_context | null;
  type: NodeType;
  name: string;
  /**
   * The ancestor nodes of this node that match the given filter ordered from
   * far to close (e.g. from root node to parent node with default filter).
   */
  ancestors: ApartmentNodeContentQuery_data_ancestors[];
  masterGateway: ApartmentNodeContentQuery_data_masterGateway | null;
  iotGateways: ApartmentNodeContentQuery_data_iotGateways[];
}

export interface ApartmentNodeContentQuery {
  data: ApartmentNodeContentQuery_data;
}

export interface ApartmentNodeContentQueryVariables {
  nodeId: string;
}
