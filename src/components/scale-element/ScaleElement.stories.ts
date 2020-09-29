import { storiesOf } from '@storybook/vue';
import { FRAME } from '@@/storybook/util/frame-decorator';
import { textProp, numberProp } from '@@/storybook/util';
import { withKnobs } from '@storybook/addon-knobs';
import ScaleElement from './ScaleElement.vue';

storiesOf('Visual|Scale Element', module)
  .addDecorator(withKnobs)
  .add(
    'Showcase',
    () => ({
      components: {
        ScaleElement,
      },
      props: {
        title: textProp('Title', 'Anlangenstatus'),
        width: numberProp('Width', 500, 250, 1000),
        height: numberProp('Height', 120, 60, 240),
        minValue: numberProp('MinValue', 30),
        maxValue: numberProp('MaxValue', 65),
        minIntervalValue: numberProp('MinIntervalValue', 50),
        maxIntervalValue: numberProp('MaxIntervalValue', 60),
        valueSteps: numberProp('ValueSteps', 1),
      },
      template: `
        <div :style="\`width: \${width}px; height: \${height}px;\`">
          <scale-element
            :title="title"
            :value="60"
            :minValue="10"
            :maxValue="75"
            :minIntervalValue="20"
            :maxIntervalValue="40"
            :valueSteps="valueSteps"
          />
          <div style="margin-top: 70px">
            <scale-element
              :title="title"
              :value="35"
              :minValue="minValue"
              :maxValue="maxValue"
              :minIntervalValue="minIntervalValue"
              :maxIntervalValue="maxIntervalValue"
              :color="'ORANGE'"
              :valueSteps="valueSteps"
            />
          </div>
          <div style="margin-top: 70px">
            <scale-element
              :title="title"
              :value="10"
              :minValue="minValue"
              :maxValue="maxValue"
              :color="'RED'"
              :valueSteps="0.5"
            />
          </div>
        </div>
      `,
    }),
    { [FRAME]: { size: 0 } },
  );
