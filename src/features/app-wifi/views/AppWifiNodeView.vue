<template lang="pug">
  ui-layout(use="core-layout-default" node-tree-bar #default)
    component(
      v-if="data"
      :is="component"
      :node-id="nodeId"
    )
</template>

<script lang="ts">
import NodeIdMixin from '@core/components/mixins/node-id';
import { Component as ComponentType } from 'vue';
import { Component, Mixins } from 'vue-property-decorator';
import { NodeViewQuery, NodeViewQueryVariables } from './__generated__/NodeViewQuery';
import query from './node-view.gql';
import { NodeType } from '@/types/iot-portal';
import Overview from '../components/overview/Overview.vue';
import Details from '../components/details/Details.vue';

@Component({
  apollo: {
    data: {
      query,
      variables(): NodeViewQueryVariables {
        return { nodeId: this.nodeId };
      },
    },
  },
  data() {
    return {
      data: undefined,
    };
  },
})
export default class AppWifiNodeView extends Mixins(NodeIdMixin) {
  private readonly data?: NodeViewQuery['data'];

  private get component(): ComponentType | undefined {
    const { type } = this.data || { type: undefined };

    return type === NodeType.DIRECTORY ? Overview : type === NodeType.PROPERTY ? Details : undefined;
  }
}
</script>
