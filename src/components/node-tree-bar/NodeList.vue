<template lang="pug">
  ol.list(:class="{ indent }")
    component(
      v-for="(node, index) in nodes"
      :is="componentFor(node)"
      :key="index"
      :node="node"
    )
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ArrayProp, BooleanProp } from '@/util/prop-decorators';
import DirectoryNode from './DirectoryNode.vue';
import Node from './Node.vue';
import NodeTreeNode from './model';

@Component
export default class NodeList extends Vue {
  @ArrayProp(true)
  private nodes!: NodeTreeNode[];

  @BooleanProp()
  private indent!: boolean;

  private componentFor({ type }: NodeTreeNode) {
    return type === 'DIRECTORY' ? DirectoryNode : Node;
  }
}
</script>

<style lang="scss" scoped>
.list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.indent {
  padding-left: 0.5em;
}
</style>
