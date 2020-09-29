/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AppSmokeDetectorProtocolFragment
// ====================================================

export interface AppSmokeDetectorProtocolFragment_apartments_floor {
  __typename: "Node";
  id: string;
  name: string;
}

export interface AppSmokeDetectorProtocolFragment_apartments_devices_meta {
  __typename: "DeviceMeta";
  serial: string | null;
}

export interface AppSmokeDetectorProtocolFragment_apartments_devices_room {
  __typename: "Node";
  id: string;
  name: string;
}

export interface AppSmokeDetectorProtocolFragment_apartments_devices_connection_ContinuousMetric {
  __typename: "ContinuousMetric";
}

export interface AppSmokeDetectorProtocolFragment_apartments_devices_connection_DiscreteMetric_latestDataPoint {
  __typename: "DiscreteDataPoint";
  date: DateTime;
  value: string;
}

export interface AppSmokeDetectorProtocolFragment_apartments_devices_connection_DiscreteMetric {
  __typename: "DiscreteMetric";
  latestDataPoint: AppSmokeDetectorProtocolFragment_apartments_devices_connection_DiscreteMetric_latestDataPoint | null;
}

export type AppSmokeDetectorProtocolFragment_apartments_devices_connection = AppSmokeDetectorProtocolFragment_apartments_devices_connection_ContinuousMetric | AppSmokeDetectorProtocolFragment_apartments_devices_connection_DiscreteMetric;

export interface AppSmokeDetectorProtocolFragment_apartments_devices_battery_ContinuousMetric {
  __typename: "ContinuousMetric";
}

export interface AppSmokeDetectorProtocolFragment_apartments_devices_battery_DiscreteMetric_latestDataPoint {
  __typename: "DiscreteDataPoint";
  date: DateTime;
  value: string;
}

export interface AppSmokeDetectorProtocolFragment_apartments_devices_battery_DiscreteMetric {
  __typename: "DiscreteMetric";
  latestDataPoint: AppSmokeDetectorProtocolFragment_apartments_devices_battery_DiscreteMetric_latestDataPoint | null;
}

export type AppSmokeDetectorProtocolFragment_apartments_devices_battery = AppSmokeDetectorProtocolFragment_apartments_devices_battery_ContinuousMetric | AppSmokeDetectorProtocolFragment_apartments_devices_battery_DiscreteMetric;

export interface AppSmokeDetectorProtocolFragment_apartments_devices_pollution_DiscreteMetric {
  __typename: "DiscreteMetric";
}

export interface AppSmokeDetectorProtocolFragment_apartments_devices_pollution_ContinuousMetric_latestDataPoint {
  __typename: "ContinuousDataPoint";
  date: DateTime;
  value: number;
}

export interface AppSmokeDetectorProtocolFragment_apartments_devices_pollution_ContinuousMetric {
  __typename: "ContinuousMetric";
  latestDataPoint: AppSmokeDetectorProtocolFragment_apartments_devices_pollution_ContinuousMetric_latestDataPoint | null;
}

export type AppSmokeDetectorProtocolFragment_apartments_devices_pollution = AppSmokeDetectorProtocolFragment_apartments_devices_pollution_DiscreteMetric | AppSmokeDetectorProtocolFragment_apartments_devices_pollution_ContinuousMetric;

export interface AppSmokeDetectorProtocolFragment_apartments_devices_montage_ContinuousMetric {
  __typename: "ContinuousMetric";
}

export interface AppSmokeDetectorProtocolFragment_apartments_devices_montage_DiscreteMetric_latestDataPoint {
  __typename: "DiscreteDataPoint";
  date: DateTime;
  value: string;
}

export interface AppSmokeDetectorProtocolFragment_apartments_devices_montage_DiscreteMetric {
  __typename: "DiscreteMetric";
  latestDataPoint: AppSmokeDetectorProtocolFragment_apartments_devices_montage_DiscreteMetric_latestDataPoint | null;
}

export type AppSmokeDetectorProtocolFragment_apartments_devices_montage = AppSmokeDetectorProtocolFragment_apartments_devices_montage_ContinuousMetric | AppSmokeDetectorProtocolFragment_apartments_devices_montage_DiscreteMetric;

export interface AppSmokeDetectorProtocolFragment_apartments_devices_radio_ContinuousMetric {
  __typename: "ContinuousMetric";
}

export interface AppSmokeDetectorProtocolFragment_apartments_devices_radio_DiscreteMetric_latestDataPoint {
  __typename: "DiscreteDataPoint";
  date: DateTime;
  value: string;
}

export interface AppSmokeDetectorProtocolFragment_apartments_devices_radio_DiscreteMetric {
  __typename: "DiscreteMetric";
  latestDataPoint: AppSmokeDetectorProtocolFragment_apartments_devices_radio_DiscreteMetric_latestDataPoint | null;
}

export type AppSmokeDetectorProtocolFragment_apartments_devices_radio = AppSmokeDetectorProtocolFragment_apartments_devices_radio_ContinuousMetric | AppSmokeDetectorProtocolFragment_apartments_devices_radio_DiscreteMetric;

export interface AppSmokeDetectorProtocolFragment_apartments_devices {
  __typename: "Device";
  id: string;
  meta: AppSmokeDetectorProtocolFragment_apartments_devices_meta;
  room: AppSmokeDetectorProtocolFragment_apartments_devices_room;
  connection: AppSmokeDetectorProtocolFragment_apartments_devices_connection;
  battery: AppSmokeDetectorProtocolFragment_apartments_devices_battery;
  pollution: AppSmokeDetectorProtocolFragment_apartments_devices_pollution;
  montage: AppSmokeDetectorProtocolFragment_apartments_devices_montage;
  radio: AppSmokeDetectorProtocolFragment_apartments_devices_radio;
}

export interface AppSmokeDetectorProtocolFragment_apartments {
  __typename: "Node";
  id: string;
  name: string;
  floor: AppSmokeDetectorProtocolFragment_apartments_floor | null;
  devices: AppSmokeDetectorProtocolFragment_apartments_devices[];
}

export interface AppSmokeDetectorProtocolFragment {
  __typename: "Node";
  /**
   * The descendant nodes of this node that match the given filter.
   */
  apartments: AppSmokeDetectorProtocolFragment_apartments[];
}
