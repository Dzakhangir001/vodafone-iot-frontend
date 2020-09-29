import centered from '@storybook/addon-centered/dist/vue';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import Table from './Table.global.vue';

storiesOf('Utility|Table', module)
  .addDecorator(centered)
  .addDecorator(withKnobs)

  .add('Showcase', () => ({
    components: {
      'ui-table': Table,
    },
    data() {
      return {
        columns: [
          { name: 'serialnumber', label: 'Seriennummer', $isDisabled: true },
          { name: 'devicetype', label: 'Gerätetyp', sort: 'ASC' },
          { name: 'category', label: 'Kategorie', align: 'center', $isDisabled: true },
          { name: 'datatype', label: 'Datentyp', sort: 'DESC' },
          { name: 'data', label: 'Datenwert' },
          { name: 'datetime', label: 'Datum, Uhrzeit' },
        ],
        data: [
          {
            serialnumber: '23015789',
            devicetype: 'Fensterkontakt',
            category: 'Alarm',
            datatype: 'Batterie',
            data: '3.1Volt',
            datetime: '19.06.2019 10:45',
          },
          {
            serialnumber: '23015789',
            devicetype: 'Fensterkontakt',
            category: 'Alarm',
            datatype: 'Batterie',
            data: '3.1Volt',
            datetime: '19.06.2019 10:45',
          },
          {
            serialnumber: '23015789',
            devicetype: 'Fensterkontakt',
            category: 'Information',
            datatype: 'Batterie',
            data: '3.1Volt',
            datetime: '19.06.2019 10:45',
          },
          {
            serialnumber: '23015789',
            devicetype: 'Fensterkontakt',
            category: 'Information',
            datatype: 'Batterie',
            data: '3.1Volt',
            datetime: '19.06.2019 10:45',
          },
          {
            serialnumber: '23015789',
            devicetype: 'Fensterkontakt',
            category: 'Information',
            datatype: 'Batterie',
            data: '3.1Volt',
            datetime: '19.06.2019 10:45',
          },
        ],
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; justify-content: space-between; background-color: white;">
        <ui-table :columns="columns" :data="data" striped @changeSort="changeSort">
          <template #category="{ row }">
            <span :style="{ 'color': row.category === 'Alarm' ? '#f5a623' : '#979797' }">
              {{ row.category }}
            </span>
          </template>
        </ui-table>
      </div>
    `,
  }));
