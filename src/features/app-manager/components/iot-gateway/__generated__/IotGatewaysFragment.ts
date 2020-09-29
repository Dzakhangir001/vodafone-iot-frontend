/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { GatewayState, NodeType } from "./../../../../../types/iot-portal";

// ====================================================
// GraphQL fragment: IotGatewaysFragment
// ====================================================

export interface IotGatewaysFragment_iotGateways_path {
  __typename: "Node";
  id: string;
  name: string;
  type: NodeType;
}

export interface IotGatewaysFragment_iotGateways_meta {
  __typename: "GatewayMeta";
  mountingNotes: string | null;
  name: string | null;
}

export interface IotGatewaysFragment_iotGateways_devices {
  __typename: "Device";
  id: string;
  bound: boolean;
}

export interface IotGatewaysFragment_iotGateways {
  __typename: "Gateway";
  id: string;
  serial: string;
  state: GatewayState;
  bootDate: DateTime | null;
  firmware: string | null;
  path: IotGatewaysFragment_iotGateways_path[];
  meta: IotGatewaysFragment_iotGateways_meta;
  devices: IotGatewaysFragment_iotGateways_devices[];
}

export interface IotGatewaysFragment {
  __typename: "Node";
  iotGateways: IotGatewaysFragment_iotGateways[];
}
