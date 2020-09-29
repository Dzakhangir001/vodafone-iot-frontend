<template lang="pug">
  label(@mouseenter="$emit('mouseenter')" @mouseleave="$emit('mouseleave')")
    input.input(
      v-bind="$attrs"
      type="radio"
      :class="{ replaced }"
      :value="checkedValue"
      :checked="checked"
      @input="$emit('update', checkedValue)"
    )
    slot(:checked="checked")
</template>

<script lang="ts">
import { Component, Model, Vue } from 'vue-property-decorator';
import { BooleanProp, OptionalProp } from '@/util/prop-decorators';

@Component({ inheritAttrs: false })
export default class RadioButton extends Vue {
  @Model('update')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private value!: any;

  @OptionalProp()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private checkedValue!: any;

  @BooleanProp()
  private replaced!: boolean;

  private get checked(): boolean {
    return this.value === this.checkedValue;
  }
}
</script>

<style lang="scss" scoped>
.replaced {
  display: block;
  appearance: none;
}
</style>
