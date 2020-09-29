/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { GatewayState, NodeType } from "./../../../../../types/iot-portal";

// ====================================================
// GraphQL fragment: MasterGatewayFragment
// ====================================================

export interface MasterGatewayFragment_masterGateway_meta {
  __typename: "GatewayMeta";
  name: string | null;
  mountingNotes: string | null;
}

export interface MasterGatewayFragment_masterGateway_site {
  __typename: "Node";
  id: string;
  name: string;
  type: NodeType;
}

export interface MasterGatewayFragment_masterGateway {
  __typename: "Gateway";
  id: string;
  serial: string;
  state: GatewayState;
  bootDate: DateTime | null;
  firmware: string | null;
  meta: MasterGatewayFragment_masterGateway_meta;
  site: MasterGatewayFragment_masterGateway_site;
}

export interface MasterGatewayFragment {
  __typename: "Node";
  masterGateway: MasterGatewayFragment_masterGateway | null;
}
