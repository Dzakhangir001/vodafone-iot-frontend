/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { GatewayState, NodeType, FloorType, AlertSeverity } from "./../../../../../../types/iot-portal";

// ====================================================
// GraphQL query operation: PropertyNodeContentQuery
// ====================================================

export interface PropertyNodeContentQuery_data_gateways {
  __typename: "Gateway";
  id: string;
  serial: string;
  state: GatewayState;
  lastReportDate: DateTime | null;
}

export interface PropertyNodeContentQuery_data_floors_meta {
  __typename: "NodeMeta";
  floorType: FloorType | null;
}

export interface PropertyNodeContentQuery_data_floors_apartments_devices_alerts {
  __typename: "AlertCollection";
  count: number;
  /**
   * Highest severity of alerts.
   */
  severity: AlertSeverity | null;
}

export interface PropertyNodeContentQuery_data_floors_apartments_devices {
  __typename: "Device";
  id: string;
  role: string;
  alerts: PropertyNodeContentQuery_data_floors_apartments_devices_alerts;
}

export interface PropertyNodeContentQuery_data_floors_apartments_alerts {
  __typename: "AlertCollection";
  count: number;
  /**
   * Highest severity of alerts.
   */
  severity: AlertSeverity | null;
}

export interface PropertyNodeContentQuery_data_floors_apartments_gateways {
  __typename: "Gateway";
  id: string;
}

export interface PropertyNodeContentQuery_data_floors_apartments {
  __typename: "Node";
  id: string;
  type: NodeType;
  name: string;
  devices: PropertyNodeContentQuery_data_floors_apartments_devices[];
  alerts: PropertyNodeContentQuery_data_floors_apartments_alerts;
  gateways: PropertyNodeContentQuery_data_floors_apartments_gateways[];
}

export interface PropertyNodeContentQuery_data_floors_rooms_devices_alerts {
  __typename: "AlertCollection";
  count: number;
  /**
   * Highest severity of alerts.
   */
  severity: AlertSeverity | null;
}

export interface PropertyNodeContentQuery_data_floors_rooms_devices {
  __typename: "Device";
  id: string;
  role: string;
  alerts: PropertyNodeContentQuery_data_floors_rooms_devices_alerts;
}

export interface PropertyNodeContentQuery_data_floors_rooms_alerts {
  __typename: "AlertCollection";
  count: number;
  /**
   * Highest severity of alerts.
   */
  severity: AlertSeverity | null;
}

export interface PropertyNodeContentQuery_data_floors_rooms_gateways {
  __typename: "Gateway";
  id: string;
}

export interface PropertyNodeContentQuery_data_floors_rooms {
  __typename: "Node";
  id: string;
  type: NodeType;
  name: string;
  devices: PropertyNodeContentQuery_data_floors_rooms_devices[];
  alerts: PropertyNodeContentQuery_data_floors_rooms_alerts;
  gateways: PropertyNodeContentQuery_data_floors_rooms_gateways[];
}

export interface PropertyNodeContentQuery_data_floors_iotGateways_path {
  __typename: "Node";
  id: string;
  name: string;
  type: NodeType;
}

export interface PropertyNodeContentQuery_data_floors_iotGateways_meta {
  __typename: "GatewayMeta";
  mountingNotes: string | null;
  name: string | null;
}

export interface PropertyNodeContentQuery_data_floors_iotGateways_devices {
  __typename: "Device";
  id: string;
  bound: boolean;
}

export interface PropertyNodeContentQuery_data_floors_iotGateways {
  __typename: "Gateway";
  id: string;
  serial: string;
  state: GatewayState;
  lastReportDate: DateTime | null;
  bootDate: DateTime | null;
  firmware: string | null;
  path: PropertyNodeContentQuery_data_floors_iotGateways_path[];
  meta: PropertyNodeContentQuery_data_floors_iotGateways_meta;
  devices: PropertyNodeContentQuery_data_floors_iotGateways_devices[];
}

export interface PropertyNodeContentQuery_data_floors_devices_alerts {
  __typename: "AlertCollection";
  count: number;
  /**
   * Highest severity of alerts.
   */
  severity: AlertSeverity | null;
}

export interface PropertyNodeContentQuery_data_floors_devices_context {
  __typename: "Node";
  id: string;
  name: string;
}

export interface PropertyNodeContentQuery_data_floors_devices {
  __typename: "Device";
  id: string;
  bound: boolean;
  role: string;
  alerts: PropertyNodeContentQuery_data_floors_devices_alerts;
  context: PropertyNodeContentQuery_data_floors_devices_context[];
}

export interface PropertyNodeContentQuery_data_floors_alerts {
  __typename: "AlertCollection";
  count: number;
  /**
   * Highest severity of alerts.
   */
  severity: AlertSeverity | null;
}

export interface PropertyNodeContentQuery_data_floors {
  __typename: "Node";
  id: string;
  name: string;
  type: NodeType;
  meta: PropertyNodeContentQuery_data_floors_meta;
  /**
   * The descendant nodes of this node that match the given filter.
   */
  apartments: PropertyNodeContentQuery_data_floors_apartments[];
  /**
   * The descendant nodes of this node that match the given filter.
   */
  rooms: PropertyNodeContentQuery_data_floors_rooms[];
  iotGateways: PropertyNodeContentQuery_data_floors_iotGateways[];
  devices: PropertyNodeContentQuery_data_floors_devices[];
  alerts: PropertyNodeContentQuery_data_floors_alerts;
}

export interface PropertyNodeContentQuery_data_alerts_items_device_meta {
  __typename: "DeviceMeta";
  serial: string | null;
}

export interface PropertyNodeContentQuery_data_alerts_items_device_site {
  __typename: "Node";
  id: string;
  name: string;
}

export interface PropertyNodeContentQuery_data_alerts_items_device {
  __typename: "Device";
  id: string;
  role: string;
  meta: PropertyNodeContentQuery_data_alerts_items_device_meta;
  site: PropertyNodeContentQuery_data_alerts_items_device_site;
}

export interface PropertyNodeContentQuery_data_alerts_items {
  __typename: "Alert";
  device: PropertyNodeContentQuery_data_alerts_items_device;
  startDate: DateTime;
  name: string;
  severity: AlertSeverity;
}

export interface PropertyNodeContentQuery_data_alerts {
  __typename: "AlertCollection";
  items: PropertyNodeContentQuery_data_alerts_items[];
}

export interface PropertyNodeContentQuery_data_ancestors {
  __typename: "Node";
  id: string;
  type: NodeType;
  name: string;
}

export interface PropertyNodeContentQuery_data_masterGateway_meta {
  __typename: "GatewayMeta";
  name: string | null;
  mountingNotes: string | null;
}

export interface PropertyNodeContentQuery_data_masterGateway_site {
  __typename: "Node";
  id: string;
  name: string;
  type: NodeType;
}

export interface PropertyNodeContentQuery_data_masterGateway {
  __typename: "Gateway";
  id: string;
  serial: string;
  state: GatewayState;
  bootDate: DateTime | null;
  firmware: string | null;
  meta: PropertyNodeContentQuery_data_masterGateway_meta;
  site: PropertyNodeContentQuery_data_masterGateway_site;
}

export interface PropertyNodeContentQuery_data {
  __typename: "Node";
  id: string;
  gateways: PropertyNodeContentQuery_data_gateways[];
  floors: PropertyNodeContentQuery_data_floors[];
  alerts: PropertyNodeContentQuery_data_alerts;
  name: string;
  /**
   * The ancestor nodes of this node that match the given filter ordered from
   * far to close (e.g. from root node to parent node with default filter).
   */
  ancestors: PropertyNodeContentQuery_data_ancestors[];
  masterGateway: PropertyNodeContentQuery_data_masterGateway | null;
}

export interface PropertyNodeContentQuery {
  data: PropertyNodeContentQuery_data;
}

export interface PropertyNodeContentQueryVariables {
  nodeId: string;
}
