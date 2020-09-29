import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import { FRAME } from '@@/storybook/util/frame-decorator';
import DoughnutChart from './DoughnutChart.vue';

storiesOf('Visual|Charts/Doughnut', module)
  .addDecorator(withKnobs)
  .add(
    'Showcase',
    () => ({
      components: {
        DoughnutChart,
      },
      data() {
        return {
          chartPoints: [70, 30],
          colors: ['#66cd05', '#fe004f'],
        };
      },
      template: `
        <doughnut-chart
          :chart-points="chartPoints"
          :colors="colors"
          style="max-width: 800px; height: 280px;"
        />
      `,
    }),
    { [FRAME]: { size: 0 } },
  );
