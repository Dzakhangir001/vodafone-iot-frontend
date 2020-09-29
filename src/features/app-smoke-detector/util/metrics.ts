import { get } from 'lodash';
import { AppSmokeDetectorMetricsFragment } from './__generated__/AppSmokeDetectorMetricsFragment';

export type StateIndicator = 'GREEN' | 'RED' | 'GRAY';

interface DataPoint {
  value: string | number;
}

const RESOLVERS: Record<string, (point?: DataPoint) => StateIndicator> = {
  battery: (point) => (point === undefined ? 'GRAY' : point.value === '1' ? 'RED' : 'GREEN'),
  connection: (point) => (point === undefined ? 'GRAY' : point.value === '1' ? 'GREEN' : 'RED'),
  pollution: (point) => (point === undefined ? 'GRAY' : point.value < 28 ? 'GREEN' : 'RED'),
  montage: (point) => (point === undefined ? 'GRAY' : point.value === '1' ? 'RED' : 'GREEN'),
  radio: (point) => (point === undefined ? 'GRAY' : point.value === '1' ? 'RED' : 'GREEN'),
  // sounder: () => 'GRAY',
  // smokebox: () => 'GRAY',
};

export function resolveMetricState(
  metrics: AppSmokeDetectorMetricsFragment,
  name: keyof typeof RESOLVERS,
): StateIndicator {
  return RESOLVERS[name](get(metrics, [name, 'latestDataPoint']) || undefined);
}

export function resolveAggregatedMetricsState(metrics: AppSmokeDetectorMetricsFragment): StateIndicator {
  const metricStates = Object.keys(RESOLVERS).map((name) => resolveMetricState(metrics, name));
  if (metricStates.some((state) => state === 'RED')) {
    return 'RED';
  } else if (metricStates.some((state) => state === 'GRAY')) {
    return 'GRAY';
  } else {
    return 'GREEN';
  }
}
