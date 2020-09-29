<script lang="ts">
import { ArrayProp, FunctionProp } from '@/util/prop-decorators';
import { ChartData, ChartOptions, ChartPoint } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line } from 'vue-chartjs';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  extends: Line,
})
export default class LineChart extends Vue {
  @ArrayProp(true)
  private chartPoints!: ChartPoint[];

  @FunctionProp()
  private formatValue?: (value: string | number | Date) => string;

  private get chartData(): ChartData {
    return {
      datasets: [
        {
          backgroundColor: 'transparent',
          borderColor: '#e60000',
          pointBackgroundColor: '#e60000',
          pointHoverBackgroundColor: '#e60000',
          data: this.chartPoints,
          pointHoverRadius: 3.5,
          pointRadius: 3,
          borderWidth: 2,
        },
        {
          data: this.chartPoints.slice(0, -1),
          datalabels: {
            align: 'bottom',
            anchor: 'start',
            offset: 6,
            formatter: (point: ChartPoint, context) => {
              const y = Number(point.y) - Number(this.chartPoints[context.dataIndex + 1].y);

              return `+${this.formatValue ? this.formatValue(y) : y}`;
            },
          },
          fill: 'none',
        },
      ],
    };
  }

  private get chartOptions(): ChartOptions {
    const dateFormatter = new Intl.DateTimeFormat('default', { weekday: 'short', day: '2-digit', month: '2-digit' });

    return {
      plugins: {
        datalabels: {
          color: '#969595',
          formatter: (point: ChartPoint) => (this.formatValue && point.y ? this.formatValue(point.y) : point.y),
          align: 'top',
          anchor: 'end',
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
        yAxes: [{ display: false }, { display: false }],
        xAxes: [
          {
            type: 'time',
            distribution: 'linear',
            time: {
              unit: 'day',
              round: 'day',
              displayFormats: {
                day: 'x',
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
