import { actions } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/vue';
import NodeTreeBar from '@/components/node-tree-bar/NodeTreeBar.vue';

const rootNodes = [
  {
    type: 'DIRECTORY',
    name: '63165 Mühlheim am Main',
    children: [
      {
        type: 'DIRECTORY',
        name: '1234 Test Dir',
        children: [
          {
            type: 'PROPERTY',
            name: 'Test Seewiese 6',
            children: [
              {
                type: 'FLOOR',
                name: 'Test Staffelgeschoss',
                children: [
                  {
                    type: 'APARTMENT',
                    name: 'Test 123',
                    children: [
                      {
                        type: 'ROOM',
                        name: 'Test kitchen',
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'DIRECTORY',
    name: '12345 Sehr sehr langer Name',
    children: [
      {
        type: 'DIRECTORY',
        name: 'Verzeichnis + Objekt auf einer Ebene',
        children: [],
      },
      {
        type: 'PROPERTY',
        name: 'Seewiese 6',
        children: [
          {
            type: 'FLOOR',
            name: 'Staffelgeschoss',
            children: [
              {
                type: 'APARTMENT',
                name: '123',
                children: [
                  {
                    type: 'ROOM',
                    name: 'kitchen',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'DIRECTORY',
        name: 'Verzeichnis + Objekt auf einer Ebene',
        children: [
          {
            type: 'PROPERTY',
            name: 'Extrem sehr sehr langer Name eines Objekts',
            children: [],
          },
        ],
      },
      {
        type: 'DIRECTORY',
        name: 'Optischer Ausgleich',
        children: [],
      },
      {
        type: 'PROPERTY',
        name: 'Seewiese 6',
        children: [
          {
            type: 'FLOOR',
            name: 'Staffelgeschoss',
            children: [
              {
                type: 'APARTMENT',
                name: '123',
                children: [
                  {
                    type: 'ROOM',
                    name: 'kitchen',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'DIRECTORY',
        name: 'I Optischer Ausgleich',
        children: [],
      },
    ],
  },
  {
    type: 'DIRECTORY',
    name: '12345 Leeres Verzeichnis',
    children: [],
  },
];

storiesOf('Visual|Node Tree Bar', module)
  .add('Showcase', () => ({
    components: { NodeTreeBar },
    template: `
      <div style="height: 100vh;">
        <node-tree-bar v-model="searchQuery" :root-nodes="rootNodes" @click="onNodeClick" />
      </div>
    `,
    data: () => ({ rootNodes, searchQuery: '' }),
    methods: {
      ...actions('onNodeClick'),
    },
  }))

  .add('Dev', () => ({
    components: { NodeTreeBar },
    template: `
      <div style="display: flex; justify-content: space-around; align-items: center;">
        <div style="flex: 0 0 240px; height: 100vh;">
          <node-tree-bar v-model="searchQuery" :root-nodes="rootNodes" @click="onNodeClick" />
        </div>
        <div style="flex: 0 0 20vw;">
          {{ searchQuery }}
        </div>
        <div style="flex: 0 0 240px; height: 100vh;">
          <node-tree-bar v-model="searchQuery" empty-message="Keine Einträge gefunden" />
        </div>
      </div>
    `,
    data: () => ({ rootNodes, searchQuery: '' }),
    methods: {
      ...actions('onNodeClick'),
    },
  }));
