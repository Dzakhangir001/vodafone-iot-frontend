<template lang="pug">
  ui-content-header(
    :headline="data.name"
    :back-link="!parent.disabled"
    @back-click="$router.push(parent.route)"
  )
    slot(name="breadcrumb")
    template(v-for="{ name, disabled, route } of ancestors")
      ui-breadcrumb-item(:disabled="disabled" @click="$router.push(route)")
        | {{ name }}
      | {{ ' ' }}
</template>

<script lang="ts">
import { ObjectProp } from '@/util/prop-decorators';
import { last } from 'lodash';
import { Component, Mixins } from 'vue-property-decorator';
import { RawLocation } from 'vue-router';
import { NodeLocationGeneratorFragment } from '../../router/node-location-generator';
import NodeLocationGeneratorMixin from '../mixins/node-location-generator';
import { NodeContentHeaderFragment } from './__generated__/NodeContentHeaderFragment';

interface Node extends Partial<NodeLocationGeneratorFragment> {
  disabled: boolean;
  route?: RawLocation;
}

@Component
export default class NodeContentHeaderAdapter extends Mixins(NodeLocationGeneratorMixin) {
  @ObjectProp(true)
  protected readonly data!: NodeContentHeaderFragment;

  private get parent(): Node {
    return last(this.ancestors) || { disabled: true };
  }

  private get ancestors(): Node[] {
    const nodes = new Array<Node>();

    for (const ancestor of this.data.ancestors) {
      const route = this.generateNodeLocation(ancestor);

      nodes.push({
        ...ancestor,
        disabled: route === undefined,
        route,
      });
    }

    return nodes;
  }
}
</script>
