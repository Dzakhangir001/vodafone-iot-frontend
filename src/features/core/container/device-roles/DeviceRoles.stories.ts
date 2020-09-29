import DeviceRoleMapMixin from '@core/components/mixins/device-role-map';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';

storiesOf('Core | Device Roles', module)
  .addDecorator(withKnobs)

  .add('Registry', () => ({
    mixins: [DeviceRoleMapMixin],
    template: `
        <table style="width:100%; border-collapse: collapse" >
          <tr v-for="role in deviceRoleMap" :key="role.name">
            <th style="color: #646464; border: 1px solid #c7c7c7;">{{ role.name }} - {{role.label}}</th>
            <td style="border: 1px solid #c7c7c7;">
              <div style="display: flex; align-items: center; justify-content: space-evenly;">
                <img v-for="icon in role.icons" :key="icon.name" :src="icon" :alt="role.shortLabel" style="padding: 5px 0"/>
              </div>
            </td>
          </tr>
        </table>
      `,
  }));
