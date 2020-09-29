import { storiesOf } from '@storybook/vue';
import { FRAME } from '@@/storybook/util/frame-decorator';
import { numberProp } from '@@/storybook/util';
import { withKnobs } from '@storybook/addon-knobs';
import GatewayProperty from '../GatewayProperty.vue';
import IotGatewayPanel from './IotGatewayPanel.vue';

storiesOf('Visual|Gateway/IoT', module)
  .addDecorator(withKnobs)
  .add(
    'Dev',
    () => ({
      components: {
        GatewayProperty,
        IotGatewayPanel,
      },
      props: {
        onlineCount: numberProp('Online Count', 24),
        totalCount: numberProp('Total Count', 55),
        width: numberProp('Width', 500, 250, 1000),
        height: numberProp('Height', 120, 60, 240),
      },
      template: `
        <div :style="\`width: \${width}px; height: \${height}px;\`">
          <iot-gateway
            :total-count="totalCount"
            :online-count="onlineCount"
          >
            <gateway-property label="Modell">Lorem Ipsum</gateway-property>
            <gateway-property label="ID">02000000000001000000BD72</gateway-property>
            <gateway-property label="Name">WGZ-012345</gateway-property>
          </iot-gateway>
        </div>
      `,
    }),
    { [FRAME]: { size: 0 } },
  );
