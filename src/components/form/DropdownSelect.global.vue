<template lang="pug">
  .dropdown-select
    label.label(:for="id('input')")
      span.error-message(v-if="error && errorMessage")
        | {{ errorMessage }}
      span(v-else)
        slot
      span.tooltip-icon(v-if="tooltip")
        | {{ tooltipLabel }}
    select(
      v-bind="$attrs"
      :class="{ error }"
      :id="id('input')"
      :value="value === emptyValue ? '' : value"
      @input="$emit('update', $event.target.value === '' ? emptyValue : $event.target.value)"
    )
      option(v-if="emptyOption" value="")
        | –
      option(v-for="option of options" :value="option.value")
        | {{ option.label === undefined ? option.value : option.label }}
</template>

<script lang="ts">
import { Component, Model, Mixins } from 'vue-property-decorator';
import Id from '@/components/mixins/id';
import { StringProp, BooleanProp, ArrayProp, OptionalProp } from '@/util/prop-decorators';

interface Option {
  value: unknown;
  label?: string;
}

@Component({ inheritAttrs: false })
export default class DropdownSelect extends Mixins(Id) {
  @Model('update')
  private readonly value!: unknown;
  @ArrayProp(() => [])
  private readonly options!: Option[];
  @BooleanProp()
  private readonly emptyOption!: boolean;
  @OptionalProp()
  private readonly emptyValue: unknown;
  @BooleanProp()
  private readonly error!: boolean;
  @StringProp()
  private readonly errorMessage?: string;
  @StringProp()
  private readonly tooltip?: string;
  @StringProp('?')
  private readonly tooltipLabel!: string;
}
</script>

<style lang="scss" scoped>
.dropdown-select {
  margin-bottom: 16px;
  @include textColor(dark);
  font-size: 13px;
  line-height: 15px;
}
.label {
  margin-bottom: 6px;
  display: flex;
  align-items: center;
}
.error-message {
  @include textColor(red);
}
.input {
  display: block;
  box-sizing: border-box;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.18);
  width: calc(100% + 4px);
  margin: 0 -2px;
  border-radius: 4px;
  border: 2px solid #ffffff;
  padding: 10px;
  @include backgroundColor(shaded);
  font-weight: 700;
  transition: all 0.3s;
}
.input.error {
  border-color: textColor(red);
}
.tooltip-icon {
  border-radius: 50%;
  @include textColor(white);
  line-height: 1;
  min-width: 16px;
  min-height: 16px;
  background: textColor(blue);
  margin-left: 10px;
  font-weight: bolder;
  font-size: 13px;
  text-align: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
