import { storiesOf } from '@storybook/vue';
import { actions } from '@storybook/addon-actions';
import FloorListPanel from '@/components/floor-list-panel/FloorListPanel.vue';
import FloorListItem from '@/components/floor-list-panel/FloorListItem.vue';
import GatewayItem from '@/components/floor-list-panel/GatewayItem.vue';
import AlarmItem from '@/components/floor-list-panel/AlarmItem.vue';

const floorList = [
  {
    gateways: ['GREEN', 'RED'],
    alarms: ['WHG 1', 'WHG 2'],
    floorName: 'Erdgeschoss',
  },
  {
    gateways: ['GREEN', 'RED'],
    alarms: ['WHG 1', 'WHG 2'],
    floorName: 'Erdgeschoss',
  },
  {
    gateways: ['GREEN', 'RED'],
    alarms: ['WHG 1', 'WHG 2'],
    floorName: 'Erdgeschoss',
  },
  {
    gateways: ['GREEN', 'RED'],
    alarms: ['WHG 1', 'WHG 2'],
    floorName: 'Erdgeschoss',
  },
  {
    gateways: ['GREEN', 'RED'],
    alarms: ['WHG 1', 'WHG 2'],
    floorName: 'Erdgeschoss',
  },
  {
    gateways: ['GREEN', 'RED'],
    alarms: ['WHG 3'],
    floorName: '1. Obergeschoss',
  },
  {
    gateways: ['GREEN', 'RED'],
    alarms: ['WHG 1', 'WHG 2', 'WHG 3', 'WHG 4'],
    floorName: '1. Obergeschoss',
  },
  {
    gateways: ['GREEN', 'GREEN'],
    alarms: [],
    floorName: 'Erdgeschoss',
  },
  {
    gateways: ['GREEN', 'RED'],
    alarms: ['WHG 3'],
    floorName: '1. Obergeschoss',
  },
  {
    gateways: ['GREEN', 'RED'],
    alarms: ['WHG 1', 'qwdqwWHG 2', 'WHG 3', 'WHG 1', 'WHG 2', 'WHG 3'],
    floorName: '1. Obergeschoss',
  },
  {
    gateways: ['GREEN', 'RED', 'GREEN'],
    alarms: [
      'WHG 1',
      'WHG 2',
      'WHG 3',
      ' WHG 4',
      'WHG 5',
      'WHG 6',
      'WHG 7',
      'WHG 8',
      'WHG 9',
      'WHG 10',
      'WHG 9',
      'WHG 10',
      'WHG 11',
    ],
    floorName: '1. Obergeschos test',
  },
];

storiesOf('Visual| Floor List Panel', module).add('Showcase', () => ({
  components: { FloorListPanel, FloorListItem, GatewayItem, AlarmItem },
  template: `
            <floor-list-panel :floors-amount="floorList.length">
              <floor-list-item v-for="(item, i) in floorList" :key="i" :floor-name="item.floorName" @buttonClick="buttonClick">
               <template #gateways>
                 <gateway-item v-for="(status, i) in item.gateways" :key="i" :status="status"/>
               </template>
               <template #alarms>
                <alarm-item v-for="(name, i) in item.alarms" :key="i" :name="name"/>
               </template>
              </floor-list-item> 
            </floor-list-panel>
      `,
  data: () => ({ floorList }),
  methods: {
    ...actions('buttonClick'),
  },
}));
