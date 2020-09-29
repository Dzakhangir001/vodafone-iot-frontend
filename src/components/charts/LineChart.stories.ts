import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import { FRAME } from '@@/storybook/util/frame-decorator';
import LineChart from './LineChart.vue';

storiesOf('Visual|Charts/Line', module)
  .addDecorator(withKnobs)
  .add(
    'Showcase',
    () => ({
      components: {
        LineChart,
      },
      data() {
        return {
          chartPoints: [
            { x: 1568410438345, y: 53.76 },
            { x: 1568235715340, y: 53.234 },
            { x: 1567977272507, y: 52.800000000000004 },
            { x: 1567891895939, y: 52.658 },
          ],
        };
      },
      template: `
        <line-chart
          :chart-points="chartPoints"
          :format-value="formatValue"
          style="max-width: 800px; height: 280px;"
        />
      `,
      methods: {
        formatValue(value: number): string {
          return `${value.toLocaleString()}\xa0m³`;
        },
      },
    }),
    { [FRAME]: { size: 0 } },
  );
