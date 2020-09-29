import { MetricKind, TimeUnit } from '@/types/iot-portal';
import { option } from '@/util/container';
import moment from 'moment';
import lg from '@core/assets/device-roles/smoke-detector-lg.svg';
import md from '@core/assets/device-roles/smoke-detector-md.svg';
import sm from '@core/assets/device-roles/smoke-detector-sm.svg';
import component from '@core/components/device-panel-adapters/SmokeDetectorDevicePanelAdapter.vue';
import { DEVICE_ROLES } from '..';

export default option(DEVICE_ROLES, async () => ({
  name: 'SMOKE_DETECTOR',
  label: 'Rauchmelder',
  shortLabel: 'Rauchmelder',
  icons: { sm, md, lg },
  component,
  history: {
    metrics: [
      {
        descriptor: { name: 'AlarmCount', kind: MetricKind.DISCRETE, resolution: { amount: 1, unit: TimeUnit.DAY } },
        category: 'Alarm',
        label: 'Anzahl',
      },
      {
        descriptor: { name: 'LastAlarm', kind: MetricKind.DISCRETE, resolution: { amount: 1, unit: TimeUnit.DAY } },
        category: 'Info Alarm',
        label: 'Letzter Alarm',
        formatValue(value) {
          return moment(value).format('DD.MM.YYYY');
        },
      },
      {
        descriptor: {
          name: 'AlarmCounter',
          kind: MetricKind.CONTINUOUS,
          resolution: { amount: 1, unit: TimeUnit.DAY },
        },
        category: 'Info Alarm',
        label: 'Anzahl Alarme',
      },
      {
        descriptor: { name: 'FraudCount', kind: MetricKind.CONTINUOUS, resolution: { amount: 1, unit: TimeUnit.DAY } },
        category: 'Beschädigung',
        label: 'Beschädigungsversuche',
      },
      {
        descriptor: { name: 'Battery', kind: MetricKind.CONTINUOUS, resolution: { amount: 1, unit: TimeUnit.DAY } },
        category: 'Status RWM ',
        label: 'Batterie',
        formatValue(value) {
          return value + ' Volt';
        },
      },
      {
        descriptor: { name: 'DustLevel', kind: MetricKind.CONTINUOUS, resolution: { amount: 1, unit: TimeUnit.DAY } },
        category: 'Status RWM ',
        label: 'Verschmutzung',
      },
      {
        descriptor: { name: 'OpenClose', kind: MetricKind.DISCRETE, resolution: { amount: 1, unit: TimeUnit.DAY } },
        category: 'Status RWM ',
        label: 'Anzahl Öffnungen',
      },
      {
        descriptor: { name: 'LastRemoval', kind: MetricKind.DISCRETE, resolution: { amount: 1, unit: TimeUnit.DAY } },
        category: 'Status RWM ',
        label: 'Letzte Öffnung',
        formatValue(value) {
          return moment(value).format('DD.MM.YYYY');
        },
      },
      {
        descriptor: { name: 'LastFraud', kind: MetricKind.DISCRETE, resolution: { amount: 1, unit: TimeUnit.DAY } },
        category: 'Status RWM ',
        label: 'Letzter Beschädigungsversuch',
        formatValue(value) {
          return moment(value).format('DD.MM.YYYY');
        },
      },
      {
        descriptor: {
          name: 'IsInRemovedState',
          kind: MetricKind.DISCRETE,
          resolution: { amount: 1, unit: TimeUnit.DAY },
        },
        category: 'Status RWM ',
        label: 'Installationsstatus',
        formatValue(value) {
          return value === '1' ? 'Deinstalliert' : 'Installiert';
        },
      },
      {
        descriptor: { name: 'BatteryLow', kind: MetricKind.DISCRETE, resolution: { amount: 1, unit: TimeUnit.DAY } },
        category: 'Alarm',
        label: 'Batterie',
        formatValue(value) {
          return value === '1' ? 'Batteriestand niedrig' : 'Batteriestand gut';
        },
      },
      {
        descriptor: { name: 'Alarm', kind: MetricKind.DISCRETE, resolution: { amount: 1, unit: TimeUnit.DAY } },
        category: 'Alarm',
        label: 'Alarm',
        formatValue(value) {
          return value === '1' ? 'Alarm Rauchwarnmelder' : 'Kein Alarm Rauchwarnmelder';
        },
      },
      {
        descriptor: {
          name: 'IsInFraudState',
          kind: MetricKind.DISCRETE,
          resolution: { amount: 1, unit: TimeUnit.DAY },
        },
        category: 'Alarm',
        label: 'Beschädigungsversuch',
        formatValue(value) {
          return value === '1' ? 'Beschädigt' : 'Unbeschädigt';
        },
      },
      {
        descriptor: { name: 'BatteryLow', kind: MetricKind.DISCRETE, resolution: { amount: 1, unit: TimeUnit.DAY } },
        category: 'Batterie',
        label: 'Zustand',
        formatValue(value) {
          return value === '1' ? 'Niedrig' : 'Ok';
        },
      },
    ],
  },
  metrics: [
    { name: 'DustLevel', kind: MetricKind.DISCRETE },
    { name: 'IsInFraudState', kind: MetricKind.DISCRETE },
    { name: 'IsInRemovedState', kind: MetricKind.DISCRETE },
    { name: 'BatteryLow', kind: MetricKind.DISCRETE },
  ],
  batteryMetricName: 'BatteryLow',
}));
