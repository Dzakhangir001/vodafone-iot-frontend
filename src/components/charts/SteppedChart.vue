<script lang="ts">
import { ArrayProp } from '@/util/prop-decorators';
import { ChartData, ChartOptions, ChartPoint } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line } from 'vue-chartjs';
import { Component, Vue } from 'vue-property-decorator';
import { ChartDataSets } from '@@/node_modules/@types/chart.js';
import moment from 'moment';
import { Moment } from '@@/node_modules/moment';
import { Label } from '@core/model';

@Component({
  extends: Line,
})
export default class SteppedChart extends Vue {
  @ArrayProp(true)
  protected chartPoints!: ChartPoint[];

  @ArrayProp(true)
  protected yLabels!: Label[];

  private get chartData(): ChartData {
    let datasets: ChartDataSets[] = [];
    let state: ChartPoint[][] = [];
    let current: ChartPoint[] = [];
    let solid: ChartDataSets = {
      steppedLine: 'after',
      backgroundColor: 'transparent',
      borderColor: '#e60000',
      data: [],
      pointRadius: 0,
    };
    let dotted: ChartDataSets = {
      steppedLine: 'after',
      backgroundColor: 'transparent',
      borderColor: '#bfbfbf',
      data: [],
      pointRadius: 0,
      borderDash: [10, 5],
    };
    let oneDayAgo: Moment = moment().subtract(moment.duration('PT24H'));

    const { chartPoints } = this.chartPoints
      .sort((a, b) => Number(a.x) - Number(b.x))
      .reduce(
        (agg, chartPoint) => {
          if (agg.previousValue === chartPoint.y || !moment(chartPoint.x).isAfter(oneDayAgo)) {
            return agg;
          }

          agg.chartPoints.push(chartPoint);

          agg.previousValue = Number(chartPoint.y);

          return agg;
        },
        {
          previousValue: NaN,
          chartPoints: new Array<ChartPoint>(),
        },
      );
    chartPoints.forEach((chartPoint, index, array) => {
      current.push(chartPoint);
      if (index) {
        state.push(current);
        current = [];
        current.push(chartPoint);
      }
      if (index && index === array.length - 1 && current.length > 1) {
        state.push(current);
      }
    });

    state.forEach((state) => {
      if (state[0].y !== 0 && state[1].y === 0) {
        let temp = Object.assign({}, dotted);
        temp.data = state;
        datasets.push(temp);
      } else {
        let temp = Object.assign({}, solid);
        temp.data = state;
        datasets.push(temp);
      }
    });

    return {
      datasets,
    };
  }

  private get chartOptions(): ChartOptions {
    const dateFormatter = new Intl.DateTimeFormat('default', { weekday: 'short', hour: '2-digit' });
    const yAxesLabels = new Map();

    this.yLabels.forEach((label) => {
      yAxesLabels.set(label.value, label.label);
    });

    return {
      plugins: {
        datalabels: {
          display: false,
        },
      },
      legend: {
        display: false,
      },
      layout: {
        padding: 30,
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            gridLines: {
              display: true,
              drawBorder: false,
            },
            ticks: {
              padding: 20,
              callback: (value) => {
                if (value % 1 === 0) {
                  return yAxesLabels.get(value) || value;
                }
              },
            },
          },
        ],
        xAxes: [
          {
            type: 'time',
            distribution: 'linear',
            time: {
              unit: 'hour',
              min: String(moment().subtract(moment.duration('PT8H'))),
              max: String(moment()),
              displayFormats: {
                hour: 'x',
              },
            },
            ticks: {
              padding: 20,
              labelOffset: 0,
              fontColor: '#969595',
              fontSize: 11,
              callback: (value) => {
                try {
                  return dateFormatter.format(new Date(Number(value)));
                } catch {
                  return value;
                }
              },
            },
            scaleLabel: {
              display: false,
            },
            gridLines: {
              drawBorder: false,
            },
          },
        ],
      },
      tooltips: {
        enabled: false,
      },
    };
  }

  private mounted(): void {
    if (this.chartPoints.length < 2) {
      return;
    }

    // @ts-ignore
    this.addPlugin([ChartDataLabels]);
    // @ts-ignore
    this.renderChart(this.chartData, this.chartOptions);
  }
}
</script>
