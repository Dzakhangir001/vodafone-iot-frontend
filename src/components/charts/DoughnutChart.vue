<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Doughnut } from 'vue-chartjs';
import { ArrayProp } from '@/util/prop-decorators';
import { ChartPoint } from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  extends: Doughnut,
})
export default class DoughnutChart extends Vue {
  @ArrayProp(true)
  private chartPoints!: ChartPoint[];

  @ArrayProp(true)
  private colors!: string[];

  @Watch('chartPoints')
  private dataPoints(): void {
    // @ts-ignore
    return this.renderChart(this.chartData, this.chartOptions);
  }

  private get chartData(): ChartData {
    return {
      datasets: [
        {
          data: this.chartPoints,
          backgroundColor: this.colors,
          borderWidth: 0,
        },
      ],
    };
  }

  private get chartOptions(): ChartOptions {
    return {
      responsive: true,
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
      plugins: {
        datalabels: {
          display: false,
        },
      },
      scales: {
        yAxes: [
          {
            display: false,
          },
        ],
        xAxes: [
          {
            display: false,
          },
        ],
      },
    };
  }

  private mounted(): void {
    if (this.chartPoints.length < 1) {
      return;
    }

    // @ts-ignore
    this.addPlugin([ChartDataLabels]);
    // @ts-ignore
    this.renderChart(this.chartData, this.chartOptions);
  }
}
</script>
