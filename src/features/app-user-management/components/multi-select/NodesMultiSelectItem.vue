<template lang="pug">
  div
    div(v-for="item in data" :key="item.label")
      h4(@click="toggleSelected(item)" :style="indent"  :class="{'selected': isSelected(item.id)}")
        span(v-if="side === 'left' && item.data && item.data.length > 0"  @click="isOpen = !isOpen")
          span(v-if="!isOpen")
            | +
          span(v-else)
            | -
        | {{ item.label }}
      nodes-multi-select-item(
        v-if="item.data && item.data.length > 0"
        v-show="isOpen"
        :data="item.data"
        :selected="selected"
        :depth="+depth + 1"
        :bus="bus"
        :side="side"
      )
</template>

<script lang="ts">
import { ArrayProp, OptionalProp, ObjectProp, StringProp } from '@/util/prop-decorators';
import { find } from 'lodash';
import { Component, Vue } from 'vue-property-decorator';

interface Data {
  id: number;
  label: string;
  data?: Data[];
}

@Component
export default class NodesMultiSelectItem extends Vue {
  @ArrayProp()
  private data!: Data[];

  @OptionalProp()
  private depth!: string;

  @StringProp()
  private side!: string;

  @ArrayProp()
  private selected!: Data[];

  @ObjectProp()
  private bus!: Vue;

  private isOpen = true;

  private get indent() {
    return { paddingLeft: `${Number(this.depth) * 10}px` };
  }

  private toggleSelected(item: Data) {
    let selectedItem = find(this.selected, { id: item.id });
    if (!selectedItem) {
      this.bus.$emit('updateSelected', item, this.side);
    } else {
      this.bus.$emit('removeSelected', item, this.side);
    }
  }

  private isSelected(id: number) {
    return !!find(this.selected, { id });
  }
}
</script>

<style>
.selected {
  background-color: #c5c5c5;
}
h4 {
  margin: 0;
  cursor: pointer;
}
</style>
