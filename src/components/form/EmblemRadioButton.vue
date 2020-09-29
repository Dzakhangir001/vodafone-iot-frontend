<template lang="pug">
  radio-button(
    v-bind="$attrs"
    replaced
    :value="value"
    @mouseenter="mouseEnter"
    @mouseleave="mouseLeave"
    @update="$emit('update', $event)"
    #default="{ checked }"
  )
    emblem(:src="src" :label="label" :border-color="checked || hover ? 'blue' : undefined")
</template>

<script lang="ts">
import { Component, Model, Vue } from 'vue-property-decorator';
import { StringProp } from '@/util/prop-decorators';
import Emblem from '@/components/images/Emblem.vue';
import RadioButton from './RadioButton.vue';

@Component({ components: { Emblem, RadioButton }, inheritAttrs: false })
export default class EmblemRadioButton extends Vue {
  @Model('update')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private value!: any;

  @StringProp(true)
  private src!: string;

  @StringProp()
  private label?: string;

  private hover: boolean = false;
  private mouseEnter(): void {
    this.hover = true;
    this.$emit('mouseenter');
  }

  private mouseLeave(): void {
    this.hover = false;
    this.$emit('mouseleave');
  }
}
</script>
