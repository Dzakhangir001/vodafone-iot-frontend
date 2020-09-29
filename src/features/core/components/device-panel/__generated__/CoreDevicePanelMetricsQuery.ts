/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { MetricDescriptorInput } from "./../../../../../types/iot-portal";

// ====================================================
// GraphQL query operation: CoreDevicePanelMetricsQuery
// ====================================================

export interface CoreDevicePanelMetricsQuery_metrics_ContinuousMetric_CONTINUOUS {
  __typename: "ContinuousDataPoint";
  date: DateTime;
  value: number;
}

export interface CoreDevicePanelMetricsQuery_metrics_ContinuousMetric {
  __typename: "ContinuousMetric";
  name: string;
  CONTINUOUS: CoreDevicePanelMetricsQuery_metrics_ContinuousMetric_CONTINUOUS | null;
}

export interface CoreDevicePanelMetricsQuery_metrics_DiscreteMetric_DISCRETE {
  __typename: "DiscreteDataPoint";
  date: DateTime;
  value: string;
}

export interface CoreDevicePanelMetricsQuery_metrics_DiscreteMetric {
  __typename: "DiscreteMetric";
  name: string;
  DISCRETE: CoreDevicePanelMetricsQuery_metrics_DiscreteMetric_DISCRETE | null;
}

export type CoreDevicePanelMetricsQuery_metrics = CoreDevicePanelMetricsQuery_metrics_ContinuousMetric | CoreDevicePanelMetricsQuery_metrics_DiscreteMetric;

export interface CoreDevicePanelMetricsQuery {
  /**
   * Get multiple metrics described by the given metric descriptors.
   */
  metrics: CoreDevicePanelMetricsQuery_metrics[];
}

export interface CoreDevicePanelMetricsQueryVariables {
  descriptors: MetricDescriptorInput[];
}
