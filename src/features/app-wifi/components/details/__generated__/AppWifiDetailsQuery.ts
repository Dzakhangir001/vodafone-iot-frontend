/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { NodeType } from "./../../../../../types/iot-portal";

// ====================================================
// GraphQL query operation: AppWifiDetailsQuery
// ====================================================

export interface AppWifiDetailsQuery_node_ancestors {
  __typename: "Node";
  id: string;
  type: NodeType;
  name: string;
}

export interface AppWifiDetailsQuery_node {
  __typename: "Node";
  id: string;
  name: string;
  /**
   * The ancestor nodes of this node that match the given filter ordered from
   * far to close (e.g. from root node to parent node with default filter).
   */
  ancestors: AppWifiDetailsQuery_node_ancestors[];
}

export interface AppWifiDetailsQuery_wifi_gateways_gateway_site {
  __typename: "Node";
  id: string;
  name: string;
}

export interface AppWifiDetailsQuery_wifi_gateways_gateway_masterOf {
  __typename: "Node";
  id: string;
}

export interface AppWifiDetailsQuery_wifi_gateways_gateway {
  __typename: "Gateway";
  serial: string;
  site: AppWifiDetailsQuery_wifi_gateways_gateway_site;
  masterOf: AppWifiDetailsQuery_wifi_gateways_gateway_masterOf[];
}

export interface AppWifiDetailsQuery_wifi_gateways {
  __typename: "WifiGateway";
  gateway: AppWifiDetailsQuery_wifi_gateways_gateway;
  ok: boolean;
}

export interface AppWifiDetailsQuery_wifi_configuration {
  __typename: "WifiConfiguration";
  ssid: string;
  encryptionKey: string;
}

export interface AppWifiDetailsQuery_wifi_node {
  __typename: "Node";
  id: string;
  name: string;
  type: NodeType;
}

export interface AppWifiDetailsQuery_wifi {
  __typename: "Wifi";
  id: string;
  gateways: AppWifiDetailsQuery_wifi_gateways[];
  configuration: AppWifiDetailsQuery_wifi_configuration | null;
  node: AppWifiDetailsQuery_wifi_node;
  ok: boolean;
}

export interface AppWifiDetailsQuery {
  node: AppWifiDetailsQuery_node;
  wifi: AppWifiDetailsQuery_wifi;
}

export interface AppWifiDetailsQueryVariables {
  id: string;
}
