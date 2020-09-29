/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AlertSeverity, GatewayState } from "./../../../../types/iot-portal";

// ====================================================
// GraphQL query operation: HomeViewQuery
// ====================================================

export interface HomeViewQuery_deviceRoles_devices_alerts {
  __typename: "AlertCollection";
  count: number;
  /**
   * Highest severity of alerts.
   */
  severity: AlertSeverity | null;
}

export interface HomeViewQuery_deviceRoles_devices {
  __typename: "Device";
  id: string;
  role: string;
  bound: boolean;
  alerts: HomeViewQuery_deviceRoles_devices_alerts;
}

export interface HomeViewQuery_deviceRoles {
  __typename: "DeviceRoleAggregation";
  role: string;
  deviceCount: number;
  devices: HomeViewQuery_deviceRoles_devices[];
}

export interface HomeViewQuery_gateways {
  __typename: "Gateway";
  id: string;
  serial: string;
  state: GatewayState;
  lastReportDate: DateTime | null;
}

export interface HomeViewQuery_recentAlerts_items_device_meta {
  __typename: "DeviceMeta";
  serial: string | null;
}

export interface HomeViewQuery_recentAlerts_items_device_site {
  __typename: "Node";
  id: string;
  name: string;
}

export interface HomeViewQuery_recentAlerts_items_device {
  __typename: "Device";
  id: string;
  role: string;
  meta: HomeViewQuery_recentAlerts_items_device_meta;
  site: HomeViewQuery_recentAlerts_items_device_site;
}

export interface HomeViewQuery_recentAlerts_items {
  __typename: "Alert";
  device: HomeViewQuery_recentAlerts_items_device;
  startDate: DateTime;
  name: string;
  severity: AlertSeverity;
}

export interface HomeViewQuery_recentAlerts {
  __typename: "AlertCollection";
  items: HomeViewQuery_recentAlerts_items[];
}

export interface HomeViewQuery_propertyNodes_meta_propertyLocation {
  __typename: "Location";
  longitude: number;
  latitude: number;
}

export interface HomeViewQuery_propertyNodes_meta {
  __typename: "NodeMeta";
  propertyLocation: HomeViewQuery_propertyNodes_meta_propertyLocation | null;
}

export interface HomeViewQuery_propertyNodes_alerts {
  __typename: "AlertCollection";
  count: number;
  /**
   * Highest severity of alerts.
   */
  severity: AlertSeverity | null;
}

export interface HomeViewQuery_propertyNodes {
  __typename: "Node";
  id: string;
  name: string;
  meta: HomeViewQuery_propertyNodes_meta;
  alerts: HomeViewQuery_propertyNodes_alerts;
}

export interface HomeViewQuery {
  deviceRoles: HomeViewQuery_deviceRoles[];
  gateways: HomeViewQuery_gateways[];
  recentAlerts: HomeViewQuery_recentAlerts;
  __typename: "Query";
  /**
   * Get a list of nodes.
   */
  propertyNodes: HomeViewQuery_propertyNodes[];
}

export interface HomeViewQueryVariables {
  roles?: string[] | null;
}
