/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AppManagerAggregatedMetricsQuery
// ====================================================

export interface AppManagerAggregatedMetricsQuery_data_HEAT_METER_COUNTER_CurrentEnergy {
  __typename: "MetricAggregation";
  total: number;
  count: number | null;
  sum: number | null;
}

export interface AppManagerAggregatedMetricsQuery_data_HEAT_METER_COUNTER_CurrentDate {
  __typename: "MetricAggregation";
  count: number | null;
  min: number | null;
  max: number | null;
}

export interface AppManagerAggregatedMetricsQuery_data_HEAT_METER_COUNTER_LastPeriodEnergy {
  __typename: "MetricAggregation";
  count: number | null;
  sum: number | null;
}

export interface AppManagerAggregatedMetricsQuery_data_HEAT_METER_COUNTER_LastPeriodEnd {
  __typename: "MetricAggregation";
  count: number | null;
  min: number | null;
  max: number | null;
}

export interface AppManagerAggregatedMetricsQuery_data_HEAT_METER_COUNTER_LastMonthEnergy {
  __typename: "MetricAggregation";
  count: number | null;
  sum: number | null;
}

export interface AppManagerAggregatedMetricsQuery_data_HEAT_METER_COUNTER_LastMonthEnd {
  __typename: "MetricAggregation";
  count: number | null;
  min: number | null;
  max: number | null;
}

export interface AppManagerAggregatedMetricsQuery_data {
  __typename: "Node";
  id: string;
  HEAT_METER_COUNTER_CurrentEnergy: AppManagerAggregatedMetricsQuery_data_HEAT_METER_COUNTER_CurrentEnergy;
  HEAT_METER_COUNTER_CurrentDate: AppManagerAggregatedMetricsQuery_data_HEAT_METER_COUNTER_CurrentDate;
  HEAT_METER_COUNTER_LastPeriodEnergy: AppManagerAggregatedMetricsQuery_data_HEAT_METER_COUNTER_LastPeriodEnergy;
  HEAT_METER_COUNTER_LastPeriodEnd: AppManagerAggregatedMetricsQuery_data_HEAT_METER_COUNTER_LastPeriodEnd;
  HEAT_METER_COUNTER_LastMonthEnergy: AppManagerAggregatedMetricsQuery_data_HEAT_METER_COUNTER_LastMonthEnergy;
  HEAT_METER_COUNTER_LastMonthEnd: AppManagerAggregatedMetricsQuery_data_HEAT_METER_COUNTER_LastMonthEnd;
}

export interface AppManagerAggregatedMetricsQuery {
  data: AppManagerAggregatedMetricsQuery_data;
}

export interface AppManagerAggregatedMetricsQueryVariables {
  nodeId: string;
}
