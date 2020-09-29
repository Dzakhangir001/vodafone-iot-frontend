<template lang="pug">
  nav.wrapper
    //- UN-188 temporarily removed
    //- search(:query="searchQuery" @update:query="$emit('update:searchQuery', $event)")
    node-list.tree(v-if="rootNodes.length > 0" :nodes="rootNodes")
    p.tree(v-else-if="emptyMessage")
      | {{ emptyMessage }}
</template>

<script lang="ts">
import { Component, Vue, Provide, Model } from 'vue-property-decorator';
import { ArrayProp, OptionalProp, ObjectProp } from '@/util/prop-decorators';
import NodeTreeNode, { ON_NODE_CLICK, FILTER_NODES, IS_ACTIVE_NODE } from './model';
import NodeList from './NodeList.vue';
import Search from './Search.vue';

@Component({ components: { Search, NodeList } })
export default class NodeTreeBar extends Vue {
  @Model('update:searchQuery', { type: String, default: '' })
  private readonly searchQuery?: string;
  @ArrayProp(() => [])
  private readonly rootNodes!: NodeTreeNode[];
  @ArrayProp()
  private readonly nodeTypes?: string[];
  @ObjectProp()
  private readonly activeNode?: NodeTreeNode;
  @OptionalProp()
  private readonly emptyMessage?: string;

  @Provide(ON_NODE_CLICK)
  private onNodeClick(node: NodeTreeNode): void {
    this.$emit('click', node);
  }

  @Provide(FILTER_NODES)
  private filterNodes(nodes: NodeTreeNode[]): NodeTreeNode[] {
    const { nodeTypes } = this;
    if (!nodeTypes) {
      return nodes;
    }

    return nodes.filter((node) => nodeTypes.includes(node.type));
  }

  @Provide(IS_ACTIVE_NODE)
  private isActiveNode(node: NodeTreeNode): boolean {
    return node === this.activeNode;
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  box-sizing: border-box;
  height: 100%;
  width: 240px;
  padding: 20px;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: colorVodafone(white);
}

.tree {
  margin-top: 20px;
  padding: 0 5px;
  color: colorVodafone(grey);
}
</style>
