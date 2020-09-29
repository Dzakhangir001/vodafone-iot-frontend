import { storiesOf } from '@storybook/vue';
import { FRAME } from '@@/storybook/util/frame-decorator';
import { numberProp, textProp } from '@@/storybook/util';
import { withKnobs } from '@storybook/addon-knobs';
import SummaryPanel from './SummaryPanel.vue';
import moment from 'moment';

storiesOf('Visual|Summary Panel', module)
  .addDecorator(withKnobs)
  .add(
    'Showcase',
    () => ({
      components: {
        SummaryPanel,
      },
      props: {
        width: numberProp('Width', 500, 250, 1000),
        height: numberProp('Height', 120, 60, 240),
        onlineCount: numberProp('Online Count', 13),
        totalCount: numberProp('Total Count', 14),
        title: textProp('Title', 'IoT Gateways'),
      },
      data() {
        return {
          lastReportDate: moment().subtract(5, 'minutes'),
        };
      },
      template: `
        <div :style="\`width: \${width}px; height: \${height}px;\`">
          <summary-panel
            :total-count="totalCount"
            :online-count="onlineCount"
            :title="title"
            :lastReportDate="lastReportDate"
          >
            {{ title }}
          </summary-panel>
        </div>
      `,
    }),
    { [FRAME]: { size: 0 } },
  );
