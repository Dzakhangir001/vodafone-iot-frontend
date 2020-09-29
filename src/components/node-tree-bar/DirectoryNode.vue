<template lang="pug">
  .wrapper
    ui-clickable.node(:disabled="children.length === 0" @click="onClick(node);")
      p.name(:title="node.name")
        | {{ node.name }}
      img.icon(v-if="children.length > 0" src="@/components/node-tree-bar/images/arrow-down.svg" alt="")
    component(v-if="node.open && node.children" :is="nodeList" :nodes="node.children" indent)
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import UiClickable from '@/components/clickables/Clickable.global.vue';
import Node from './Node.vue';

@Component({ components: { UiClickable } })
export default class DirectoryNode extends Mixins(Node) {}
</script>

<style lang="scss" scoped>
.node {
  display: flex;
  align-items: center;
  font-size: fontSize(fs-100);
  line-height: lineHeight(lh-xl);
  font-weight: 700;
  color: colorVodafone(black);
}
.node:not(.disabled):hover {
  color: colorVodafone(vodafone-red);
}
.name {
  flex: 1 0 0;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.icon {
  width: 8px;
  margin-left: 8px;
}
</style>
