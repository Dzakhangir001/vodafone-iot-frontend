/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AppSmokeDetectorStateListFragment
// ====================================================

export interface AppSmokeDetectorStateListFragment_apartments_floor {
  __typename: "Node";
  id: string;
  name: string;
}

export interface AppSmokeDetectorStateListFragment_apartments_devices_meta {
  __typename: "DeviceMeta";
  serial: string | null;
}

export interface AppSmokeDetectorStateListFragment_apartments_devices_room {
  __typename: "Node";
  id: string;
  name: string;
}

export interface AppSmokeDetectorStateListFragment_apartments_devices_connection_ContinuousMetric {
  __typename: "ContinuousMetric";
}

export interface AppSmokeDetectorStateListFragment_apartments_devices_connection_DiscreteMetric_latestDataPoint {
  __typename: "DiscreteDataPoint";
  date: DateTime;
  value: string;
}

export interface AppSmokeDetectorStateListFragment_apartments_devices_connection_DiscreteMetric {
  __typename: "DiscreteMetric";
  latestDataPoint: AppSmokeDetectorStateListFragment_apartments_devices_connection_DiscreteMetric_latestDataPoint | null;
}

export type AppSmokeDetectorStateListFragment_apartments_devices_connection = AppSmokeDetectorStateListFragment_apartments_devices_connection_ContinuousMetric | AppSmokeDetectorStateListFragment_apartments_devices_connection_DiscreteMetric;

export interface AppSmokeDetectorStateListFragment_apartments_devices_battery_ContinuousMetric {
  __typename: "ContinuousMetric";
}

export interface AppSmokeDetectorStateListFragment_apartments_devices_battery_DiscreteMetric_latestDataPoint {
  __typename: "DiscreteDataPoint";
  date: DateTime;
  value: string;
}

export interface AppSmokeDetectorStateListFragment_apartments_devices_battery_DiscreteMetric {
  __typename: "DiscreteMetric";
  latestDataPoint: AppSmokeDetectorStateListFragment_apartments_devices_battery_DiscreteMetric_latestDataPoint | null;
}

export type AppSmokeDetectorStateListFragment_apartments_devices_battery = AppSmokeDetectorStateListFragment_apartments_devices_battery_ContinuousMetric | AppSmokeDetectorStateListFragment_apartments_devices_battery_DiscreteMetric;

export interface AppSmokeDetectorStateListFragment_apartments_devices_pollution_DiscreteMetric {
  __typename: "DiscreteMetric";
}

export interface AppSmokeDetectorStateListFragment_apartments_devices_pollution_ContinuousMetric_latestDataPoint {
  __typename: "ContinuousDataPoint";
  date: DateTime;
  value: number;
}

export interface AppSmokeDetectorStateListFragment_apartments_devices_pollution_ContinuousMetric {
  __typename: "ContinuousMetric";
  latestDataPoint: AppSmokeDetectorStateListFragment_apartments_devices_pollution_ContinuousMetric_latestDataPoint | null;
}

export type AppSmokeDetectorStateListFragment_apartments_devices_pollution = AppSmokeDetectorStateListFragment_apartments_devices_pollution_DiscreteMetric | AppSmokeDetectorStateListFragment_apartments_devices_pollution_ContinuousMetric;

export interface AppSmokeDetectorStateListFragment_apartments_devices_montage_ContinuousMetric {
  __typename: "ContinuousMetric";
}

export interface AppSmokeDetectorStateListFragment_apartments_devices_montage_DiscreteMetric_latestDataPoint {
  __typename: "DiscreteDataPoint";
  date: DateTime;
  value: string;
}

export interface AppSmokeDetectorStateListFragment_apartments_devices_montage_DiscreteMetric {
  __typename: "DiscreteMetric";
  latestDataPoint: AppSmokeDetectorStateListFragment_apartments_devices_montage_DiscreteMetric_latestDataPoint | null;
}

export type AppSmokeDetectorStateListFragment_apartments_devices_montage = AppSmokeDetectorStateListFragment_apartments_devices_montage_ContinuousMetric | AppSmokeDetectorStateListFragment_apartments_devices_montage_DiscreteMetric;

export interface AppSmokeDetectorStateListFragment_apartments_devices_radio_ContinuousMetric {
  __typename: "ContinuousMetric";
}

export interface AppSmokeDetectorStateListFragment_apartments_devices_radio_DiscreteMetric_latestDataPoint {
  __typename: "DiscreteDataPoint";
  date: DateTime;
  value: string;
}

export interface AppSmokeDetectorStateListFragment_apartments_devices_radio_DiscreteMetric {
  __typename: "DiscreteMetric";
  latestDataPoint: AppSmokeDetectorStateListFragment_apartments_devices_radio_DiscreteMetric_latestDataPoint | null;
}

export type AppSmokeDetectorStateListFragment_apartments_devices_radio = AppSmokeDetectorStateListFragment_apartments_devices_radio_ContinuousMetric | AppSmokeDetectorStateListFragment_apartments_devices_radio_DiscreteMetric;

export interface AppSmokeDetectorStateListFragment_apartments_devices {
  __typename: "Device";
  id: string;
  meta: AppSmokeDetectorStateListFragment_apartments_devices_meta;
  room: AppSmokeDetectorStateListFragment_apartments_devices_room;
  connection: AppSmokeDetectorStateListFragment_apartments_devices_connection;
  battery: AppSmokeDetectorStateListFragment_apartments_devices_battery;
  pollution: AppSmokeDetectorStateListFragment_apartments_devices_pollution;
  montage: AppSmokeDetectorStateListFragment_apartments_devices_montage;
  radio: AppSmokeDetectorStateListFragment_apartments_devices_radio;
}

export interface AppSmokeDetectorStateListFragment_apartments {
  __typename: "Node";
  id: string;
  name: string;
  floor: AppSmokeDetectorStateListFragment_apartments_floor | null;
  devices: AppSmokeDetectorStateListFragment_apartments_devices[];
}

export interface AppSmokeDetectorStateListFragment {
  __typename: "Node";
  /**
   * The descendant nodes of this node that match the given filter.
   */
  apartments: AppSmokeDetectorStateListFragment_apartments[];
}
