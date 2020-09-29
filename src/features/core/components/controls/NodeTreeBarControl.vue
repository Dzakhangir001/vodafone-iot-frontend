<template lang="pug">
  node-tree-bar(
    :root-nodes="rootNodes"
    :node-types="app.types"
    :active-node="activeNode"
    @click="toggle($event); pushNodeLocation($event);"
  )
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator';
import NodeTreeBar from '@/components/node-tree-bar/NodeTreeBar.vue';
import NodeTreeNode from '@/components/node-tree-bar/model';
import { NodeType } from '@/types/iot-portal';
import { ApolloQueryResult } from 'apollo-client';
import AppPropertyMixin from '../mixins/app-property';
import NodeLocationGeneratorMixin from '../mixins/node-location-generator';
import nodePathQuery from './node-path.gql';
import rootNodesQuery from './root-nodes.gql';
import {
  CoreNodeTreeBarControlNodePathQuery,
  CoreNodeTreeBarControlNodePathQueryVariables,
} from './__generated__/CoreNodeTreeBarControlNodePathQuery';
import {
  CoreNodeTreeBarControlRootNodesQuery,
  CoreNodeTreeBarControlRootNodesQueryVariables,
} from './__generated__/CoreNodeTreeBarControlRootNodesQuery';
import { CoreNodeTreeBarControlNodeFragment } from './__generated__/CoreNodeTreeBarControlNodeFragment';

type Node = CoreNodeTreeBarControlNodeFragment & { children?: Node[] };

@Component({
  apollo: {
    rootNodes: {
      query: rootNodesQuery,
      variables(): CoreNodeTreeBarControlRootNodesQueryVariables {
        return { parentIds: [null] };
      },
      manual: true,
      result(this: NodeTreeBarControl, { data }: ApolloQueryResult<CoreNodeTreeBarControlRootNodesQuery>): void {
        for (const node of data.rootNodes) {
          this.addNode(node);
        }

        this.rootNodes = this.mapNodeReferences(data.rootNodes);
      },
    },
  },
  components: { NodeTreeBar },
  data() {
    return { rootNodes: undefined };
  },
})
export default class NodeTreeBarControl extends Mixins(AppPropertyMixin, NodeLocationGeneratorMixin) {
  private rootNodes!: NodeTreeNode[];
  private readonly nodes: Record<string, NodeTreeNode> = {};

  private get activeNode(): NodeTreeNode | undefined {
    return this.nodes[this.$route.params.nodeId];
  }

  private toggle(node: NodeTreeNode): void {
    const { children = [] } = node;
    if (children.length > 0) {
      this.nodes[node.id].open =
        !node.open && children.filter((child) => this.isAllowedNodeType(child.type as NodeType)).length > 0;
    }

    if (this.nodes[node.id].open) {
      this.loadNodePath(node.id);
    }
  }

  private isAllowedNodeType(type: NodeType): boolean {
    return this.app.types ? this.app.types.includes(type) : true;
  }

  private addNode({ id, type, name, children }: Node, open?: boolean): void {
    const treeNode = this.nodes[id] || (this.nodes[id] = { id, type, name, children: undefined, open: false });

    treeNode.name = name;

    if (children) {
      for (const child of children) {
        this.addNode(child);
      }
      treeNode.children = this.mapNodeReferences(children);
    }

    if (open !== undefined) {
      treeNode.open = open;
    }
  }

  private mapNodeReferences(nodes: Node[]): NodeTreeNode[] {
    return nodes.map(({ id }) => this.nodes[id]);
  }

  @Watch('$route.params.nodeId', { immediate: true })
  private async loadNodePath(id: string | undefined): Promise<void> {
    if (id === undefined) {
      return;
    }

    const variables: CoreNodeTreeBarControlNodePathQueryVariables = { id };

    const { data } = await this.$apollo.query<CoreNodeTreeBarControlNodePathQuery>({ query: nodePathQuery, variables });

    for (const node of data.nodeInfo.ancestors) {
      this.addNode(node, true);
    }
  }
}
</script>
