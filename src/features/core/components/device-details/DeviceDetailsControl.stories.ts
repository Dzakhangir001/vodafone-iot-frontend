// import { booleanProp, textProp, objectProp } from '@@/storybook/util';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import { FRAME } from '@@/storybook/util/frame-decorator';
import DeviceDetailsControl from './DeviceDetailsControl.global.vue';

storiesOf('Core|Device Details', module)
  .addDecorator(withKnobs)
  .add(
    'Dev',
    () => ({
      components: {
        DeviceDetailsControl,
      },
      data() {
        return {
          data: [
            {
              category: 'Alarm',
              dataType: 'Batterie',
              dataValue: '3.1Volt',
              datetime: '2019-08-29 15:13:00',
            },
            {
              category: 'Alarm',
              dataType: 'Batterie',
              dataValue: '3.1Volt',
              datetime: '2009-08-05 15:13:00',
            },
            {
              category: 'Information',
              dataType: 'Batterie',
              dataValue: '3.1Volt',
              datetime: '2019-08-29 16:13:00',
            },
            {
              category: 'Information',
              dataType: 'Batterie',
              dataValue: '3.1Volt',
              datetime: '2019-08-05 18:13:00',
            },
            {
              category: 'Information',
              dataType: 'Batterie',
              dataValue: '3.1Volt',
              datetime: '2019-08-26 15:13:00',
            },
          ],
        };
      },
      template: `
        <div style="background-color: #ffffff;">
          <device-details-control :data="data"></device-details-control>
        </div>
      `,
    }),
    { [FRAME]: { size: 0 } },
  );
