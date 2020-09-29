/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AlertSeverity, GatewayState } from "./../../../../types/iot-portal";

// ====================================================
// GraphQL query operation: AppManagerViewQuery
// ====================================================

export interface AppManagerViewQuery_deviceRoles_devices_alerts {
  __typename: "AlertCollection";
  count: number;
  /**
   * Highest severity of alerts.
   */
  severity: AlertSeverity | null;
}

export interface AppManagerViewQuery_deviceRoles_devices {
  __typename: "Device";
  id: string;
  role: string;
  bound: boolean;
  alerts: AppManagerViewQuery_deviceRoles_devices_alerts;
}

export interface AppManagerViewQuery_deviceRoles {
  __typename: "DeviceRoleAggregation";
  role: string;
  deviceCount: number;
  devices: AppManagerViewQuery_deviceRoles_devices[];
}

export interface AppManagerViewQuery_gateways {
  __typename: "Gateway";
  id: string;
  serial: string;
  state: GatewayState;
  lastReportDate: DateTime | null;
}

export interface AppManagerViewQuery_propertyNodes_meta_propertyLocation {
  __typename: "Location";
  longitude: number;
  latitude: number;
}

export interface AppManagerViewQuery_propertyNodes_meta {
  __typename: "NodeMeta";
  propertyLocation: AppManagerViewQuery_propertyNodes_meta_propertyLocation | null;
}

export interface AppManagerViewQuery_propertyNodes_alerts {
  __typename: "AlertCollection";
  count: number;
  /**
   * Highest severity of alerts.
   */
  severity: AlertSeverity | null;
}

export interface AppManagerViewQuery_propertyNodes {
  __typename: "Node";
  id: string;
  name: string;
  meta: AppManagerViewQuery_propertyNodes_meta;
  alerts: AppManagerViewQuery_propertyNodes_alerts;
}

export interface AppManagerViewQuery {
  deviceRoles: AppManagerViewQuery_deviceRoles[];
  gateways: AppManagerViewQuery_gateways[];
  __typename: "Query";
  /**
   * Get a list of nodes.
   */
  propertyNodes: AppManagerViewQuery_propertyNodes[];
}

export interface AppManagerViewQueryVariables {
  roles?: string[] | null;
}
