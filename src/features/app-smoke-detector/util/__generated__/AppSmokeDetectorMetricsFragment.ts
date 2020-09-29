/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AppSmokeDetectorMetricsFragment
// ====================================================

export interface AppSmokeDetectorMetricsFragment_connection_ContinuousMetric {
  __typename: "ContinuousMetric";
}

export interface AppSmokeDetectorMetricsFragment_connection_DiscreteMetric_latestDataPoint {
  __typename: "DiscreteDataPoint";
  date: DateTime;
  value: string;
}

export interface AppSmokeDetectorMetricsFragment_connection_DiscreteMetric {
  __typename: "DiscreteMetric";
  latestDataPoint: AppSmokeDetectorMetricsFragment_connection_DiscreteMetric_latestDataPoint | null;
}

export type AppSmokeDetectorMetricsFragment_connection = AppSmokeDetectorMetricsFragment_connection_ContinuousMetric | AppSmokeDetectorMetricsFragment_connection_DiscreteMetric;

export interface AppSmokeDetectorMetricsFragment_battery_ContinuousMetric {
  __typename: "ContinuousMetric";
}

export interface AppSmokeDetectorMetricsFragment_battery_DiscreteMetric_latestDataPoint {
  __typename: "DiscreteDataPoint";
  date: DateTime;
  value: string;
}

export interface AppSmokeDetectorMetricsFragment_battery_DiscreteMetric {
  __typename: "DiscreteMetric";
  latestDataPoint: AppSmokeDetectorMetricsFragment_battery_DiscreteMetric_latestDataPoint | null;
}

export type AppSmokeDetectorMetricsFragment_battery = AppSmokeDetectorMetricsFragment_battery_ContinuousMetric | AppSmokeDetectorMetricsFragment_battery_DiscreteMetric;

export interface AppSmokeDetectorMetricsFragment_pollution_DiscreteMetric {
  __typename: "DiscreteMetric";
}

export interface AppSmokeDetectorMetricsFragment_pollution_ContinuousMetric_latestDataPoint {
  __typename: "ContinuousDataPoint";
  date: DateTime;
  value: number;
}

export interface AppSmokeDetectorMetricsFragment_pollution_ContinuousMetric {
  __typename: "ContinuousMetric";
  latestDataPoint: AppSmokeDetectorMetricsFragment_pollution_ContinuousMetric_latestDataPoint | null;
}

export type AppSmokeDetectorMetricsFragment_pollution = AppSmokeDetectorMetricsFragment_pollution_DiscreteMetric | AppSmokeDetectorMetricsFragment_pollution_ContinuousMetric;

export interface AppSmokeDetectorMetricsFragment_montage_ContinuousMetric {
  __typename: "ContinuousMetric";
}

export interface AppSmokeDetectorMetricsFragment_montage_DiscreteMetric_latestDataPoint {
  __typename: "DiscreteDataPoint";
  date: DateTime;
  value: string;
}

export interface AppSmokeDetectorMetricsFragment_montage_DiscreteMetric {
  __typename: "DiscreteMetric";
  latestDataPoint: AppSmokeDetectorMetricsFragment_montage_DiscreteMetric_latestDataPoint | null;
}

export type AppSmokeDetectorMetricsFragment_montage = AppSmokeDetectorMetricsFragment_montage_ContinuousMetric | AppSmokeDetectorMetricsFragment_montage_DiscreteMetric;

export interface AppSmokeDetectorMetricsFragment_radio_ContinuousMetric {
  __typename: "ContinuousMetric";
}

export interface AppSmokeDetectorMetricsFragment_radio_DiscreteMetric_latestDataPoint {
  __typename: "DiscreteDataPoint";
  date: DateTime;
  value: string;
}

export interface AppSmokeDetectorMetricsFragment_radio_DiscreteMetric {
  __typename: "DiscreteMetric";
  latestDataPoint: AppSmokeDetectorMetricsFragment_radio_DiscreteMetric_latestDataPoint | null;
}

export type AppSmokeDetectorMetricsFragment_radio = AppSmokeDetectorMetricsFragment_radio_ContinuousMetric | AppSmokeDetectorMetricsFragment_radio_DiscreteMetric;

export interface AppSmokeDetectorMetricsFragment {
  __typename: "Device";
  connection: AppSmokeDetectorMetricsFragment_connection;
  battery: AppSmokeDetectorMetricsFragment_battery;
  pollution: AppSmokeDetectorMetricsFragment_pollution;
  montage: AppSmokeDetectorMetricsFragment_montage;
  radio: AppSmokeDetectorMetricsFragment_radio;
}
