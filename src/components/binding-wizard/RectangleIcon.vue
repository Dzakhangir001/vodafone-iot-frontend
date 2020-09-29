<template>
  <div class="item">
    <input
      v-if="!iconType"
      :id="id(iconValue)"
      type="radio"
      :value="iconValue"
      :checked="iconValue === value"
      class="input-hidden"
      @input="$emit('update', iconValue)"
    />
    <label :for="id(iconValue)">
      <div class="label-inner" :class="[labelSize, borderColor]">
        <slot name="icon"></slot>
      </div>
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Model, Mixins } from 'vue-property-decorator';
import { StringProp, EnumProp, BooleanProp } from '@/util/prop-decorators';
import Id from '@/components/mixins/id';

@Component
export default class RectangleIcon extends Mixins(Id) {
  @Model('update', { type: String, default: '' })
  private value!: string;
  @StringProp()
  private iconValue?: string;
  @BooleanProp()
  private iconType?: boolean;
  @EnumProp('md', 'sm', 'lg')
  private size!: string;
  @EnumProp('blue', 'red')
  private borderColor!: string;

  private get labelSize(): string {
    return `label-${this.size}`;
  }
}
</script>

<style lang="scss" scoped>
.item {
  margin-right: 14px;
  margin-bottom: 14px;
  .input-hidden {
    position: absolute;
    left: -9999px;
    & + label > .label-inner {
      border: 2px solid transparent;
    }
    &:checked + label > .label-inner {
      &.blue {
        border-color: colorVodafone(aqua-blue);
      }
      &.red {
        border-color: colorVodafone(vodafone-red);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.22);
      }
    }
  }
  .label-inner {
    transition: 0.3s all;
    box-shadow: 0 2px 7px rgba(0, 0, 0, 0.26);
    border-radius: 6px;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: content-box;
    &.label-md {
      width: 56px;
    }
    &.label-lg {
      width: 116px;
    }
    &.label-sm {
      height: 41px;
      width: 41px;
    }
  }
}
</style>
