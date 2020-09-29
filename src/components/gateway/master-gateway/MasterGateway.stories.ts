import { storiesOf } from '@storybook/vue';
import { FRAME } from '@@/storybook/util/frame-decorator';
import { numberProp } from '@@/storybook/util';
import { withKnobs } from '@storybook/addon-knobs';
import GatewayProperty from '../GatewayProperty.vue';
import MasterGateway from './MasterGateway.vue';

storiesOf('Visual|Gateway/Master', module)
  .addDecorator(withKnobs)
  .add(
    'Dev',
    () => ({
      components: {
        GatewayProperty,
        MasterGateway,
      },
      props: {
        width: numberProp('Width', 500, 250, 1000),
        height: numberProp('Height', 120, 60, 240),
      },
      template: `
        <div :style="\`width: \${width}px; height: \${height}px;\`">
          <master-gateway>
            <gateway-property label="Modell">Lorem Ipsum</gateway-property>
            <gateway-property label="ID">02000000000001000000BD72</gateway-property>
            <gateway-property label="Name">WGZ-012345</gateway-property>
          </master-gateway>
        </div>
      `,
    }),
    { [FRAME]: { size: 0 } },
  );
