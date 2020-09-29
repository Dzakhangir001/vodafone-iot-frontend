/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { MetricDescriptorInput } from "./../../../../../types/iot-portal";

// ====================================================
// GraphQL subscription operation: MetricChangesSubscription
// ====================================================

export interface MetricChangesSubscription_metricChanges_ContinuousMetricChange_CONTINUOUS {
  __typename: "ContinuousDataPoint";
  date: DateTime;
  value: number;
}

export interface MetricChangesSubscription_metricChanges_ContinuousMetricChange {
  __typename: "ContinuousMetricChange";
  name: string;
  CONTINUOUS: MetricChangesSubscription_metricChanges_ContinuousMetricChange_CONTINUOUS | null;
}

export interface MetricChangesSubscription_metricChanges_DiscreteMetricChange_DISCRETE {
  __typename: "DiscreteDataPoint";
  date: DateTime;
  value: string;
}

export interface MetricChangesSubscription_metricChanges_DiscreteMetricChange {
  __typename: "DiscreteMetricChange";
  name: string;
  DISCRETE: MetricChangesSubscription_metricChanges_DiscreteMetricChange_DISCRETE | null;
}

export type MetricChangesSubscription_metricChanges = MetricChangesSubscription_metricChanges_ContinuousMetricChange | MetricChangesSubscription_metricChanges_DiscreteMetricChange;

export interface MetricChangesSubscription {
  /**
   * Subscribe to multiple metrics described by the given metric descriptors.
   */
  metricChanges: MetricChangesSubscription_metricChanges;
}

export interface MetricChangesSubscriptionVariables {
  descriptors: MetricDescriptorInput[];
}
