import DevicePanel from '@/components/sensor/DevicePanel.vue';
import lamp from '@/components/sensor/images/lamp.svg';
import { numberProp } from '@@/storybook/util';
import { FRAME } from '@@/storybook/util/frame-decorator';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import BindingProcessFailedOverlay from './BindingProcessFailedOverlay.global.vue';
import BindingProcessIdleOverlay from './BindingProcessIdleOverlay.global.vue';
import BindingProcessInProgressOverlay from './BindingProcessInProgressOverlay.global.vue';
import BindingProcessWaitingOverlay from './BindingProcessWaitingOverlay.global.vue';

storiesOf('App Manager|Binding Process Overlays', module)
  .addDecorator(withKnobs)
  .add(
    'Dev',
    () => ({
      components: {
        BindingProcessFailedOverlay,
        BindingProcessIdleOverlay,
        BindingProcessInProgressOverlay,
        BindingProcessWaitingOverlay,
        DevicePanel,
      },
      props: {
        width: numberProp('Width', 240, 120, 480),
        height: numberProp('Height', 320, 160, 640),
      },
      data() {
        return { lamp };
      },
      template: `
        <div :style="\`margin: 5px; width: \${width}px; height: \${height}px;\`">
          <device-panel
            connection-status="RED"
            battery-status="GREEN"
            headline="Lampe"
            description="Küche"
            overlay
            :background-image="lamp"
          >
            <template #overlay>
              <binding-process-failed-overlay></binding-process-failed-overlay>
            </template>
          </device-panel>
        </div>
        <div :style="\`margin: 5px; width: \${width}px; height: \${height}px;\`">
          <device-panel
            connection-status="RED"
            battery-status="GREEN"
            headline="Lampe"
            description="Küche"
            overlay
            :background-image="lamp"
          >
            <template #overlay>
              <binding-process-idle-overlay></binding-process-idle-overlay>
            </template>
          </device-panel>
        </div>
        <div :style="\`margin: 5px; width: \${width}px; height: \${height}px;\`">
          <device-panel
            connection-status="RED"
            battery-status="GREEN"
            headline="Lampe"
            description="Küche"
            overlay
            :background-image="lamp"
          >
            <template #overlay>
              <binding-process-in-progress-overlay></binding-process-in-progress-overlay>
            </template>
          </device-panel>
        </div>
        <div :style="\`margin: 5px; width: \${width}px; height: \${height}px;\`">
          <device-panel
            connection-status="RED"
            battery-status="GREEN"
            headline="Lampe"
            description="Küche"
            overlay
            :background-image="lamp"
          >
            <template #overlay>
              <binding-process-waiting-overlay></binding-process-waiting-overlay>
            </template>
          </device-panel>
        </div>
      `,
    }),
    { [FRAME]: { size: 0 } },
  );
