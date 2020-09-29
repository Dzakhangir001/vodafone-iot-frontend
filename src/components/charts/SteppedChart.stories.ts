import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import { FRAME } from '@@/storybook/util/frame-decorator';
import SteppedChart from './SteppedChart.vue';

storiesOf('Visual|Charts/SteppedChart', module)
  .addDecorator(withKnobs)
  .add(
    'Showcase',
    () => ({
      components: {
        SteppedChart,
      },
      data() {
        return {
          chartPoints: [
            { x: 1568966400000, y: 1 },
            { x: 1568962800000, y: 0 },
            { x: 1568959200000, y: 1 },
            { x: 1568955600000, y: -1 },
            { x: 1568954100000, y: 0 },
            { x: 1568952000000, y: 1 },
            { x: 1568950320000, y: -1 },
            { x: 1568949120000, y: 1 },
            { x: 1568948140000, y: 0 },
            { x: 1568947140000, y: -1 },
            { x: 1568946550000, y: 0 },
            { x: 1568945870000, y: 1 },
            { x: 1568944160000, y: -1 },
            { x: 1568943350000, y: 1 },
          ],
        };
      },
      template: `
        <stepped-chart
          :chart-points="chartPoints"
          style="max-width: 800px; height: 280px;"
        />
      `,
    }),
    { [FRAME]: { size: 0 } },
  );
