import { MetricKind, NodeType, ResolutionInput, DateFilterInput } from '@/types/iot-portal';
import { ChartPoint } from 'chart.js';
import { MomentInput } from 'moment';
import { Component, VueConstructor } from 'vue';
import { RawLocation } from 'vue-router';
import { NodeLocationGenerator } from './router/node-location-generator';

export const AUTHORIZATION = 'authorization';
export const CREDENTIALS_STORAGE = sessionStorage;
export const REMEMBER_ME_STORAGE = localStorage;

export interface App {
  name: string;
  label?: string;
  link: {
    to: RawLocation;
    icon: string | Component;
    [key: string]: any;
  };
  alwaysAllowed?: boolean;
  types?: NodeType[];
  generateNodeLocation?: NodeLocationGenerator;
  order?: number;
}

export interface HistoryItem {
  category: string;
  metric: string;
  formattedValue: string;
  date: Exclude<MomentInput, void>;
}

export interface MetricDescriptor {
  name: string;
}

export interface DataSetDescriptor {
  name: string;
  resolution?: ResolutionInput;
  kind?: MetricKind;
}

export interface DateFilter {
  label: string;
  date(): DateFilterInput;
}

export interface DeviceRole {
  name: string;
  label: string;
  shortLabel: string;
  icons: {
    sm?: string;
    md: string;
    lg?: string;
  };
  component: VueConstructor;
  formatValue?: (value: string | number | boolean) => string;
  history?: {
    metrics: {
      descriptor: DataSetDescriptor;
      category: string;
      label: string;
      formatValue?(value: string | number): string;
    }[];
  };
  statistics?: {
    metric: DataSetDescriptor;
    chartType: ChartType;
    dateFilters?: DateFilter[];
    yLabels?: Label[];
    dataPointToChartPoint: (point: { date: DateTime; value: string | number }) => ChartPoint;
  };
  metrics?: MetricDescriptor[];
  connectionMetricName?: string;
  batteryMetricName?: string;
}

export interface Label {
  value: string | number | Date;
  label: string;
}

export type ChartType = 'LINE' | 'STEPPED';

export interface Manufacturer {
  name: string;
  label: string;
  image?: string;
}
