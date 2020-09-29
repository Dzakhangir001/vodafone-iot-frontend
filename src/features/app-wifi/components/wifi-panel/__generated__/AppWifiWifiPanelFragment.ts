/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { NodeType } from "./../../../../../types/iot-portal";

// ====================================================
// GraphQL fragment: AppWifiWifiPanelFragment
// ====================================================

export interface AppWifiWifiPanelFragment_configuration {
  __typename: "WifiConfiguration";
  ssid: string;
  encryptionKey: string;
}

export interface AppWifiWifiPanelFragment_node {
  __typename: "Node";
  id: string;
  name: string;
  type: NodeType;
}

export interface AppWifiWifiPanelFragment {
  __typename: "Wifi";
  id: string;
  configuration: AppWifiWifiPanelFragment_configuration | null;
  node: AppWifiWifiPanelFragment_node;
  ok: boolean;
}
