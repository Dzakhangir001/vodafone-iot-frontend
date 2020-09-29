/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { NodeType, GatewayState } from "./../../../../../../types/iot-portal";

// ====================================================
// GraphQL query operation: FloorNodeContentQuery
// ====================================================

export interface FloorNodeContentQuery_data_apartments_devices_site_context {
  __typename: "Node";
  id: string;
  type: NodeType;
  name: string;
}

export interface FloorNodeContentQuery_data_apartments_devices_site {
  __typename: "Node";
  id: string;
  /**
   * The farthest ancestor node of this node matching the given filter, if any.
   */
  context: FloorNodeContentQuery_data_apartments_devices_site_context | null;
}

export interface FloorNodeContentQuery_data_apartments_devices {
  __typename: "Device";
  id: string;
  role: string;
  site: FloorNodeContentQuery_data_apartments_devices_site;
}

export interface FloorNodeContentQuery_data_apartments {
  __typename: "Node";
  id: string;
  name: string;
  type: NodeType;
  devices: FloorNodeContentQuery_data_apartments_devices[];
}

export interface FloorNodeContentQuery_data_ancestors {
  __typename: "Node";
  id: string;
  type: NodeType;
  name: string;
}

export interface FloorNodeContentQuery_data_masterGateway_meta {
  __typename: "GatewayMeta";
  name: string | null;
  mountingNotes: string | null;
}

export interface FloorNodeContentQuery_data_masterGateway_site {
  __typename: "Node";
  id: string;
  name: string;
  type: NodeType;
}

export interface FloorNodeContentQuery_data_masterGateway {
  __typename: "Gateway";
  id: string;
  serial: string;
  state: GatewayState;
  bootDate: DateTime | null;
  firmware: string | null;
  meta: FloorNodeContentQuery_data_masterGateway_meta;
  site: FloorNodeContentQuery_data_masterGateway_site;
}

export interface FloorNodeContentQuery_data_iotGateways_path {
  __typename: "Node";
  id: string;
  name: string;
  type: NodeType;
}

export interface FloorNodeContentQuery_data_iotGateways_meta {
  __typename: "GatewayMeta";
  mountingNotes: string | null;
  name: string | null;
}

export interface FloorNodeContentQuery_data_iotGateways_devices {
  __typename: "Device";
  id: string;
  bound: boolean;
}

export interface FloorNodeContentQuery_data_iotGateways {
  __typename: "Gateway";
  id: string;
  serial: string;
  state: GatewayState;
  bootDate: DateTime | null;
  firmware: string | null;
  path: FloorNodeContentQuery_data_iotGateways_path[];
  meta: FloorNodeContentQuery_data_iotGateways_meta;
  devices: FloorNodeContentQuery_data_iotGateways_devices[];
}

export interface FloorNodeContentQuery_data {
  __typename: "Node";
  id: string;
  apartments: FloorNodeContentQuery_data_apartments[];
  name: string;
  /**
   * The ancestor nodes of this node that match the given filter ordered from
   * far to close (e.g. from root node to parent node with default filter).
   */
  ancestors: FloorNodeContentQuery_data_ancestors[];
  masterGateway: FloorNodeContentQuery_data_masterGateway | null;
  iotGateways: FloorNodeContentQuery_data_iotGateways[];
}

export interface FloorNodeContentQuery {
  data: FloorNodeContentQuery_data;
}

export interface FloorNodeContentQueryVariables {
  nodeId: string;
}
