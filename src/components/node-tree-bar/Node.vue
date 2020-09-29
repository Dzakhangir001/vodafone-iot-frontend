<template lang="pug">
  li
    ui-clickable.node(
      :class="{ open: node.open || children.length === 0, active: isActiveNode(node) }"
      :title="node.name"
      @click="onClick(node);"
    )
      | {{ node.name }}
    component(v-if="node.open && children.length > 0" :is="nodeList" :nodes="children" indent)
</template>

<script lang="ts">
import { Component, Inject, Vue } from 'vue-property-decorator';
import UiClickable from '@/components/clickables/Clickable.global.vue';
import { RequiredProp } from '@/util/prop-decorators';
import NodeTreeNode, { ON_NODE_CLICK, FILTER_NODES, IS_ACTIVE_NODE } from './model';
import NodeList from './NodeList.vue';
import NodeTreeBar from './NodeTreeBar.vue';

@Component({ components: { UiClickable } })
export default class Node extends Vue {
  @RequiredProp()
  private node!: NodeTreeNode;

  // use as dynamic component to handle recursive component nesting
  private nodeList = NodeList;

  @Inject(ON_NODE_CLICK)
  private onClick!: NodeTreeBar['onNodeClick'];

  @Inject(FILTER_NODES)
  private filterNodes!: NodeTreeBar['filterNodes'];

  @Inject(IS_ACTIVE_NODE)
  private isActiveNode!: NodeTreeBar['isActiveNode'];

  private get children(): NodeTreeNode[] {
    const { children } = this.node;

    return children ? this.filterNodes(children) : [];
  }
}
</script>

<style lang="scss" scoped>
.node {
  display: block;
  line-height: 28px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.node::before {
  content: '+';
  display: inline-block;
  margin-left: 5px;
  width: 0.75em;
}
.node.open::before {
  content: '-';
}
.node.active,
.node:hover {
  color: colorVodafone(vodafone-red);
}
</style>
