<template lang="pug">
  ui-button.pagination(type="text" :disabled="value === page" @click="$emit('input', page)")
    slot
      span.page(:style="{ width }") {{ page }}
</template>

<script lang="ts">
import { IntegerProp } from '@/util/prop-decorators';
import { Component, Model, Vue } from 'vue-property-decorator';

@Component
export default class PageButton extends Vue {
  @Model(undefined, { type: Number, required: true })
  public value!: number;
  @IntegerProp(true, 1)
  public page!: number;
  @IntegerProp(true, 1)
  public totalPages!: number;

  public get width(): string {
    return `${Math.floor(Math.log10(this.totalPages) + 1)}ch`;
  }
}
</script>

<style lang="scss" scoped>
.page {
  display: inline-block;
}
.pagination {
  margin: 0 2px 0 2px;
}
</style>
