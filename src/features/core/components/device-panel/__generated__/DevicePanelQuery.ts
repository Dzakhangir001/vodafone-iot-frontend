/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { NodeType } from "./../../../../../types/iot-portal";

// ====================================================
// GraphQL query operation: DevicePanelQuery
// ====================================================

export interface DevicePanelQuery_data_meta {
  __typename: "DeviceMeta";
  mountingNotes: string | null;
  notes: string | null;
  serial: string | null;
  manufacturer: string | null;
  encryptionKey: string | null;
}

export interface DevicePanelQuery_data_site_parent {
  __typename: "Node";
  type: NodeType;
  name: string;
}

export interface DevicePanelQuery_data_site {
  __typename: "Node";
  id: string;
  name: string;
  parent: DevicePanelQuery_data_site_parent | null;
}

export interface DevicePanelQuery_data_gateway {
  __typename: "Gateway";
  id: string;
  serial: string;
}

export interface DevicePanelQuery_data_recentAlerts_items {
  __typename: "Alert";
  startDate: DateTime;
}

export interface DevicePanelQuery_data_recentAlerts {
  __typename: "AlertCollection";
  items: DevicePanelQuery_data_recentAlerts_items[];
}

export interface DevicePanelQuery_data {
  __typename: "Device";
  id: string;
  role: string;
  bound: boolean;
  meta: DevicePanelQuery_data_meta;
  site: DevicePanelQuery_data_site;
  gateway: DevicePanelQuery_data_gateway | null;
  recentAlerts: DevicePanelQuery_data_recentAlerts;
}

export interface DevicePanelQuery {
  data: DevicePanelQuery_data;
}

export interface DevicePanelQueryVariables {
  deviceId: string;
}
