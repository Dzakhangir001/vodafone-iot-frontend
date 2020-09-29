import { booleanProp, textProp } from '@@/storybook/util';
import centered from '@storybook/addon-centered/dist/vue';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import moment from 'moment';
import RelativeTime from './RelativeTime.global.vue';

// need to add a whitespace at the end, see
// https://github.com/storybooks/storybook/issues/6243
const DEFAULT_DATE =
  moment()
    .add(moment.duration('-PT2M'))
    .toISOString() + ' ';

storiesOf('Utility|Date & Time/Relative Time', module)
  .addDecorator(centered)
  .addDecorator(withKnobs)

  .add('Showcase', () => ({
    components: {
      subject: RelativeTime,
    },
    template: `
      <div>
        <h1>Relative Time</h1>
        <p>
          Displays a relative time string based on <a href="https://momentjs.com/" target="_blank">moment</a>'s
          <a href="https://momentjs.com/docs/#/displaying/from/" target="_blank">from</a> &amp;
          <a href="https://momentjs.com/docs/#/displaying/to/" target="_blank">to</a> functions.
        </p>
        <p>
          If no reference date is given uses an automatic updating "now" date: <br />
          <strong><subject :date="now" /></strong>
        </p>
      </div>
    `,
    data() {
      return {
        now: moment(),
      };
    },
  }))

  .add('Sandbox', () => ({
    components: {
      subject: RelativeTime,
    },
    props: {
      date: textProp('Date', DEFAULT_DATE),
      reference: textProp('Reference date', ''),
      min: textProp('Min. duration', '-PT3M'),
      max: textProp('Max. duration', ''),
      to: booleanProp('To', false),
      suffix: booleanProp('Suffix', true),
      format: textProp('Format', 'L'),
    },
    template: `
      <div>
        <subject
          v-bind="$props"
          :date="date.trim().length > 0 ? date.trim() : undefined"
          :reference="reference.trim().length > 0 ? reference.trim() : undefined"
        />
      </div>
    `,
  }));
