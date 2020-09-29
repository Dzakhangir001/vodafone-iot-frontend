/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { MetricKind, DateFilterInput, ResolutionInput } from "./../../../../../types/iot-portal";

// ====================================================
// GraphQL query operation: CoreDeviceDetailsStatisticsQuery
// ====================================================

export interface CoreDeviceDetailsStatisticsQuery_statistics_ContinuousMetric_CONTINUOUS_dataPoints {
  __typename: "ContinuousDataPoint";
  date: DateTime;
  value: number;
}

export interface CoreDeviceDetailsStatisticsQuery_statistics_ContinuousMetric_CONTINUOUS {
  __typename: "ContinuousDataSet";
  dataPoints: CoreDeviceDetailsStatisticsQuery_statistics_ContinuousMetric_CONTINUOUS_dataPoints[];
}

export interface CoreDeviceDetailsStatisticsQuery_statistics_ContinuousMetric {
  __typename: "ContinuousMetric";
  name: string;
  CONTINUOUS: CoreDeviceDetailsStatisticsQuery_statistics_ContinuousMetric_CONTINUOUS;
}

export interface CoreDeviceDetailsStatisticsQuery_statistics_DiscreteMetric_DISCRETE_dataPoints {
  __typename: "DiscreteDataPoint";
  date: DateTime;
  value: string;
}

export interface CoreDeviceDetailsStatisticsQuery_statistics_DiscreteMetric_DISCRETE {
  __typename: "DiscreteDataSet";
  dataPoints: CoreDeviceDetailsStatisticsQuery_statistics_DiscreteMetric_DISCRETE_dataPoints[];
}

export interface CoreDeviceDetailsStatisticsQuery_statistics_DiscreteMetric {
  __typename: "DiscreteMetric";
  name: string;
  DISCRETE: CoreDeviceDetailsStatisticsQuery_statistics_DiscreteMetric_DISCRETE;
}

export type CoreDeviceDetailsStatisticsQuery_statistics = CoreDeviceDetailsStatisticsQuery_statistics_ContinuousMetric | CoreDeviceDetailsStatisticsQuery_statistics_DiscreteMetric;

export interface CoreDeviceDetailsStatisticsQuery {
  /**
   * Get a single metric of a single device.
   */
  statistics: CoreDeviceDetailsStatisticsQuery_statistics;
}

export interface CoreDeviceDetailsStatisticsQueryVariables {
  deviceId: string;
  name: string;
  kind?: MetricKind | null;
  dateFilter: DateFilterInput;
  resolution?: ResolutionInput | null;
}
