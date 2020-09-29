import { ObjectProp } from '@/util/prop-decorators';
import { Component, Vue } from 'vue-property-decorator';
import { CoreDevicePanelMetricsQuery } from '../device-panel/__generated__/CoreDevicePanelMetricsQuery';
import moment, { MomentInput } from 'moment';
import { isNotNull } from '@/util/lang';

export interface DataPoint {
  date: DateTime;
  value: string | number;
}

@Component
export default class MetricMapMixin extends Vue {
  @ObjectProp()
  protected readonly metricMap?: Record<string, CoreDevicePanelMetricsQuery['metrics'][number]>;

  protected latestDataPoint(name: string): DataPoint | undefined {
    if (!this.metricMap) {
      return undefined;
    }

    const metric = this.metricMap[name];

    if (!metric) {
      return undefined;
    }

    if (metric.__typename === 'ContinuousMetric') {
      return metric.CONTINUOUS || undefined;
    }

    return metric.DISCRETE || undefined;
  }

  protected get lastUpdateDate(): Exclude<MomentInput, void> | undefined {
    if (!this.metricMap) {
      return undefined;
    }

    const dates = Object.values(this.metricMap)
      .map((metric) => (metric.__typename === 'ContinuousMetric' ? metric.CONTINUOUS : metric.DISCRETE))
      .filter(isNotNull)
      .map(({ date }) => moment(date));

    const latest = dates.pop();

    if (!latest || dates.length === 0) {
      return latest;
    }

    return dates.reduce((latest, date) => moment.max(latest, date), latest);
  }
}
