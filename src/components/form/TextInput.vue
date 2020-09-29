<template lang="pug">
  .text-input
    label.label(:for="id('input')")
      span.error-message(v-if="error && errorMessage")
        | {{ errorMessage }}
      span(v-else)
        slot
      span.tooltip-icon(v-if="tooltip")
        | {{ tooltipLabel }}
    component.input(
      v-bind="$attrs"
      :is="component"
      :class="{ error }"
      :type="type"
      :id="id('input')"
      :placeholder="placeholder"
      :value.prop="value === emptyValue ? '' : value"
      @input="onInput"
    )
</template>

<script lang="ts">
import { Component, Model, Mixins } from 'vue-property-decorator';
import Id from '@/components/mixins/id';
import { StringProp, BooleanProp, OptionalProp } from '@/util/prop-decorators';

@Component({ inheritAttrs: false })
export default class TextInput extends Mixins(Id) {
  @Model('update')
  private readonly value!: unknown;
  @OptionalProp('')
  private readonly emptyValue!: unknown;
  @BooleanProp()
  private readonly multiline!: boolean;
  @BooleanProp()
  private readonly password!: boolean;
  @BooleanProp()
  private readonly error!: boolean;
  @StringProp()
  private readonly errorMessage!: string;
  @StringProp()
  private readonly label!: string;
  @StringProp()
  private readonly placeholder?: string;
  @StringProp()
  private readonly tooltip?: string;
  @StringProp('?')
  private readonly tooltipLabel!: string;

  private get component(): string {
    return this.multiline ? 'textarea' : 'input';
  }

  private get type(): string | undefined {
    return this.password ? 'password' : this.multiline ? undefined : 'text';
  }

  private onInput({ target }: { target: HTMLInputElement }): void {
    const value = target.value.trim();

    this.$emit('update', value === '' ? this.emptyValue : value);
  }
}
</script>

<style lang="scss" scoped>
.text-input {
  margin-bottom: 20px;
  color: colorVodafone(black);
  font-size: fontSize(fs-150);
  line-height: lineHeight(lh-100);
}
.label {
  margin-bottom: 6px;
  display: flex;
  align-items: center;
}
.error-message {
  color: colorVodafone(vodafone-red);
}
.input {
  display: block;
  box-sizing: border-box;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.6);
  width: calc(100% + 4px);
  height: 48px;
  margin: 0 -2px;
  border-radius: 3px;
  border: 2px solid colorVodafone(light-grey);
  padding: 10px;
  transition: all 0.3s;
}
.input:focus {
  border-color: colorVodafone(vodafone-red);
  outline: none;
  background-color: colorVodafone(white);
}
textarea.input {
  height: 80px;
  resize: none;
}
.input.error {
  border-color: colorVodafone(voadfone-red);
}
.tooltip-icon {
  border-radius: 50%;
  color: colorVodafone(white);
  line-height: lineHeight(lh-reset);
  min-width: 16px;
  min-height: 16px;
  background: colorVodafone(vodafone-red);
  margin-left: 10px;
  font-weight: bolder;
  font-size: fontSize(fs-base);

  text-align: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
