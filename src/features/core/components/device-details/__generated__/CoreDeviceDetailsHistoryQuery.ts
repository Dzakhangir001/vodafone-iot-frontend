/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { DataSetDescriptorInput } from "./../../../../../types/iot-portal";

// ====================================================
// GraphQL query operation: CoreDeviceDetailsHistoryQuery
// ====================================================

export interface CoreDeviceDetailsHistoryQuery_history_ContinuousDataSet_metric {
  __typename: "ContinuousMetric";
  name: string;
}

export interface CoreDeviceDetailsHistoryQuery_history_ContinuousDataSet_CONTINUOUS {
  __typename: "ContinuousDataPoint";
  date: DateTime;
  value: number;
}

export interface CoreDeviceDetailsHistoryQuery_history_ContinuousDataSet {
  __typename: "ContinuousDataSet";
  metric: CoreDeviceDetailsHistoryQuery_history_ContinuousDataSet_metric;
  CONTINUOUS: CoreDeviceDetailsHistoryQuery_history_ContinuousDataSet_CONTINUOUS[];
}

export interface CoreDeviceDetailsHistoryQuery_history_DiscreteDataSet_metric {
  __typename: "DiscreteMetric";
  name: string;
}

export interface CoreDeviceDetailsHistoryQuery_history_DiscreteDataSet_DISCRETE {
  __typename: "DiscreteDataPoint";
  date: DateTime;
  value: string;
}

export interface CoreDeviceDetailsHistoryQuery_history_DiscreteDataSet {
  __typename: "DiscreteDataSet";
  metric: CoreDeviceDetailsHistoryQuery_history_DiscreteDataSet_metric;
  DISCRETE: CoreDeviceDetailsHistoryQuery_history_DiscreteDataSet_DISCRETE[];
}

export type CoreDeviceDetailsHistoryQuery_history = CoreDeviceDetailsHistoryQuery_history_ContinuousDataSet | CoreDeviceDetailsHistoryQuery_history_DiscreteDataSet;

export interface CoreDeviceDetailsHistoryQuery {
  /**
   * Get multiple data sets described by the given data set descriptors.
   */
  history: CoreDeviceDetailsHistoryQuery_history[];
}

export interface CoreDeviceDetailsHistoryQueryVariables {
  descriptors: DataSetDescriptorInput[];
}
