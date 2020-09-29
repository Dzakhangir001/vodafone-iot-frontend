<template lang="pug">
  ui-layout(use="core-layout-default" node-tree-bar :scroll-to-top="data && data.type === 'PROPERTY'" #default)
    component(v-if="data" :is="`app-manager-${data.type.toLowerCase()}-node-content`" :node-id="nodeId" :filter="filter")
</template>

<script lang="ts">
import NodeIdMixin from '@core/components/mixins/node-id';
import { Component, Mixins } from 'vue-property-decorator';
import FilterPropMixin from '@core/components/mixins/filter-prop';
import { NodeViewQuery, NodeViewQueryVariables } from './__generated__/NodeViewQuery';
import query from './node-view.gql';

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
export default class NodeView extends Mixins(NodeIdMixin, FilterPropMixin) {
  private readonly data?: NodeViewQuery['data'];
}
</script>
