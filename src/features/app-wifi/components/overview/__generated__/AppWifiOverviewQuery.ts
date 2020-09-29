/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { NodeType } from "./../../../../../types/iot-portal";

// ====================================================
// GraphQL query operation: AppWifiOverviewQuery
// ====================================================

export interface AppWifiOverviewQuery_node_ancestors {
  __typename: "Node";
  id: string;
  type: NodeType;
  name: string;
}

export interface AppWifiOverviewQuery_node {
  __typename: "Node";
  id: string;
  name: string;
  /**
   * The ancestor nodes of this node that match the given filter ordered from
   * far to close (e.g. from root node to parent node with default filter).
   */
  ancestors: AppWifiOverviewQuery_node_ancestors[];
  type: NodeType;
}

export interface AppWifiOverviewQuery_wifis_configuration {
  __typename: "WifiConfiguration";
  ssid: string;
  encryptionKey: string;
}

export interface AppWifiOverviewQuery_wifis_node {
  __typename: "Node";
  id: string;
  name: string;
  type: NodeType;
}

export interface AppWifiOverviewQuery_wifis {
  __typename: "Wifi";
  id: string;
  configuration: AppWifiOverviewQuery_wifis_configuration | null;
  node: AppWifiOverviewQuery_wifis_node;
  ok: boolean;
}

export interface AppWifiOverviewQuery {
  node: AppWifiOverviewQuery_node;
  wifis: AppWifiOverviewQuery_wifis[];
}

export interface AppWifiOverviewQueryVariables {
  id: string;
}
