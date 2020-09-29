/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { NodeType } from "./../../../../types/iot-portal";

// ====================================================
// GraphQL query operation: AppSmokeDetectorNodeViewQuery
// ====================================================

export interface AppSmokeDetectorNodeViewQuery_data_ancestors {
  __typename: "Node";
  id: string;
  type: NodeType;
  name: string;
}

export interface AppSmokeDetectorNodeViewQuery_data_apartments_floor {
  __typename: "Node";
  id: string;
  name: string;
}

export interface AppSmokeDetectorNodeViewQuery_data_apartments_devices_meta {
  __typename: "DeviceMeta";
  serial: string | null;
}

export interface AppSmokeDetectorNodeViewQuery_data_apartments_devices_room {
  __typename: "Node";
  id: string;
  name: string;
}

export interface AppSmokeDetectorNodeViewQuery_data_apartments_devices_connection_ContinuousMetric {
  __typename: "ContinuousMetric";
}

export interface AppSmokeDetectorNodeViewQuery_data_apartments_devices_connection_DiscreteMetric_latestDataPoint {
  __typename: "DiscreteDataPoint";
  date: DateTime;
  value: string;
}

export interface AppSmokeDetectorNodeViewQuery_data_apartments_devices_connection_DiscreteMetric {
  __typename: "DiscreteMetric";
  latestDataPoint: AppSmokeDetectorNodeViewQuery_data_apartments_devices_connection_DiscreteMetric_latestDataPoint | null;
}

export type AppSmokeDetectorNodeViewQuery_data_apartments_devices_connection = AppSmokeDetectorNodeViewQuery_data_apartments_devices_connection_ContinuousMetric | AppSmokeDetectorNodeViewQuery_data_apartments_devices_connection_DiscreteMetric;

export interface AppSmokeDetectorNodeViewQuery_data_apartments_devices_battery_ContinuousMetric {
  __typename: "ContinuousMetric";
}

export interface AppSmokeDetectorNodeViewQuery_data_apartments_devices_battery_DiscreteMetric_latestDataPoint {
  __typename: "DiscreteDataPoint";
  date: DateTime;
  value: string;
}

export interface AppSmokeDetectorNodeViewQuery_data_apartments_devices_battery_DiscreteMetric {
  __typename: "DiscreteMetric";
  latestDataPoint: AppSmokeDetectorNodeViewQuery_data_apartments_devices_battery_DiscreteMetric_latestDataPoint | null;
}

export type AppSmokeDetectorNodeViewQuery_data_apartments_devices_battery = AppSmokeDetectorNodeViewQuery_data_apartments_devices_battery_ContinuousMetric | AppSmokeDetectorNodeViewQuery_data_apartments_devices_battery_DiscreteMetric;

export interface AppSmokeDetectorNodeViewQuery_data_apartments_devices_pollution_DiscreteMetric {
  __typename: "DiscreteMetric";
}

export interface AppSmokeDetectorNodeViewQuery_data_apartments_devices_pollution_ContinuousMetric_latestDataPoint {
  __typename: "ContinuousDataPoint";
  date: DateTime;
  value: number;
}

export interface AppSmokeDetectorNodeViewQuery_data_apartments_devices_pollution_ContinuousMetric {
  __typename: "ContinuousMetric";
  latestDataPoint: AppSmokeDetectorNodeViewQuery_data_apartments_devices_pollution_ContinuousMetric_latestDataPoint | null;
}

export type AppSmokeDetectorNodeViewQuery_data_apartments_devices_pollution = AppSmokeDetectorNodeViewQuery_data_apartments_devices_pollution_DiscreteMetric | AppSmokeDetectorNodeViewQuery_data_apartments_devices_pollution_ContinuousMetric;

export interface AppSmokeDetectorNodeViewQuery_data_apartments_devices_montage_ContinuousMetric {
  __typename: "ContinuousMetric";
}

export interface AppSmokeDetectorNodeViewQuery_data_apartments_devices_montage_DiscreteMetric_latestDataPoint {
  __typename: "DiscreteDataPoint";
  date: DateTime;
  value: string;
}

export interface AppSmokeDetectorNodeViewQuery_data_apartments_devices_montage_DiscreteMetric {
  __typename: "DiscreteMetric";
  latestDataPoint: AppSmokeDetectorNodeViewQuery_data_apartments_devices_montage_DiscreteMetric_latestDataPoint | null;
}

export type AppSmokeDetectorNodeViewQuery_data_apartments_devices_montage = AppSmokeDetectorNodeViewQuery_data_apartments_devices_montage_ContinuousMetric | AppSmokeDetectorNodeViewQuery_data_apartments_devices_montage_DiscreteMetric;

export interface AppSmokeDetectorNodeViewQuery_data_apartments_devices_radio_ContinuousMetric {
  __typename: "ContinuousMetric";
}

export interface AppSmokeDetectorNodeViewQuery_data_apartments_devices_radio_DiscreteMetric_latestDataPoint {
  __typename: "DiscreteDataPoint";
  date: DateTime;
  value: string;
}

export interface AppSmokeDetectorNodeViewQuery_data_apartments_devices_radio_DiscreteMetric {
  __typename: "DiscreteMetric";
  latestDataPoint: AppSmokeDetectorNodeViewQuery_data_apartments_devices_radio_DiscreteMetric_latestDataPoint | null;
}

export type AppSmokeDetectorNodeViewQuery_data_apartments_devices_radio = AppSmokeDetectorNodeViewQuery_data_apartments_devices_radio_ContinuousMetric | AppSmokeDetectorNodeViewQuery_data_apartments_devices_radio_DiscreteMetric;

export interface AppSmokeDetectorNodeViewQuery_data_apartments_devices {
  __typename: "Device";
  id: string;
  meta: AppSmokeDetectorNodeViewQuery_data_apartments_devices_meta;
  room: AppSmokeDetectorNodeViewQuery_data_apartments_devices_room;
  connection: AppSmokeDetectorNodeViewQuery_data_apartments_devices_connection;
  battery: AppSmokeDetectorNodeViewQuery_data_apartments_devices_battery;
  pollution: AppSmokeDetectorNodeViewQuery_data_apartments_devices_pollution;
  montage: AppSmokeDetectorNodeViewQuery_data_apartments_devices_montage;
  radio: AppSmokeDetectorNodeViewQuery_data_apartments_devices_radio;
}

export interface AppSmokeDetectorNodeViewQuery_data_apartments {
  __typename: "Node";
  id: string;
  name: string;
  floor: AppSmokeDetectorNodeViewQuery_data_apartments_floor | null;
  devices: AppSmokeDetectorNodeViewQuery_data_apartments_devices[];
}

export interface AppSmokeDetectorNodeViewQuery_data {
  __typename: "Node";
  id: string;
  name: string;
  /**
   * The ancestor nodes of this node that match the given filter ordered from
   * far to close (e.g. from root node to parent node with default filter).
   */
  ancestors: AppSmokeDetectorNodeViewQuery_data_ancestors[];
  /**
   * The descendant nodes of this node that match the given filter.
   */
  apartments: AppSmokeDetectorNodeViewQuery_data_apartments[];
}

export interface AppSmokeDetectorNodeViewQuery_files_items_context {
  __typename: "SmokeDetectorProtocolNode";
  type: NodeType;
  name: string;
}

export interface AppSmokeDetectorNodeViewQuery_files_items_devices_checks {
  __typename: "SmokeDetectorProtocolCheck";
  name: string;
  ok: boolean;
}

export interface AppSmokeDetectorNodeViewQuery_files_items_devices_site {
  __typename: "SmokeDetectorProtocolNode";
  name: string;
}

export interface AppSmokeDetectorNodeViewQuery_files_items_devices {
  __typename: "SmokeDetectorProtocolDevice";
  serial: string;
  checks: AppSmokeDetectorNodeViewQuery_files_items_devices_checks[];
  site: AppSmokeDetectorNodeViewQuery_files_items_devices_site;
}

export interface AppSmokeDetectorNodeViewQuery_files_items {
  __typename: "SmokeDetectorProtocol";
  id: string;
  createdAt: DateTime;
  context: AppSmokeDetectorNodeViewQuery_files_items_context[];
  devices: AppSmokeDetectorNodeViewQuery_files_items_devices[];
}

export interface AppSmokeDetectorNodeViewQuery_files {
  __typename: "SmokeDetectorProtocolCollection";
  items: AppSmokeDetectorNodeViewQuery_files_items[];
  count: number;
}

export interface AppSmokeDetectorNodeViewQuery {
  data: AppSmokeDetectorNodeViewQuery_data;
  __typename: "Query";
  /**
   * Retrieve multiple smoke detector protocols.
   */
  files: AppSmokeDetectorNodeViewQuery_files;
}

export interface AppSmokeDetectorNodeViewQueryVariables {
  nodeId: string;
  skip?: number | null;
  take?: number | null;
}
