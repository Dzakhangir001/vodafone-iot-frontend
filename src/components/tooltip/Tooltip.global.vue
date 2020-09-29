<template lang="pug">
  v-popover(
    :open="open"
    :placement="placement"
    :trigger="trigger"
    :delay="{ show: showDelay, hide: hideDelay }"
    :offset="14"
    :boundaries-element="boundariesElement"
    @update:open="$emit('update:open', $event)"
  )
    template(#default)
      slot
    template(#popover)
      slot(name="content")
        component(v-if="contentComponent" :is="contentComponent" v-bind="contentProps")
</template>

<script lang="ts">
import { ObjectProp, EnumProp, NumberProp } from '@/util/prop-decorators';
import { Component as ComponentType } from 'vue';
import { Component, Vue, Model } from 'vue-property-decorator';

@Component({ inheritAttrs: false })
export default class Tooltip extends Vue {
  @Model('update:open', { type: Boolean, default: false })
  private readonly open!: boolean;

  @EnumProp('top', 'bottom')
  private readonly placement!: string;

  @EnumProp('hover', 'manual', 'click')
  private readonly trigger!: string;

  @NumberProp(0)
  private readonly showDelay!: number;

  @NumberProp(300)
  private readonly hideDelay!: number;

  @ObjectProp()
  private readonly contentComponent?: ComponentType | string;

  @ObjectProp()
  private readonly contentProps?: Record<string, unknown>;

  private get boundariesElement(): HTMLElement {
    return document.body;
  }
}
</script>

<style lang="scss">
.tooltip {
  z-index: 10000;
  background-color: #ffffff;
}
.tooltip .tooltip-inner {
  box-sizing: border-box;
  padding: 16px;
  position: relative;
  max-width: 80vw;
  box-shadow: 0 2px 8px rgba(0, 2, 70, 0.24);
  height: 100%;
  max-height: 640px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  color: colorVodafone(black);
}
.tooltip .tooltip-arrow {
  position: absolute;
  margin-top: -12px;
  width: 23px;
  height: 23px;
  transform: rotate(45deg);
  background-color: #ffffff;
  box-shadow: 2px 2px 4px -2px rgba(0, 2, 70, 0.24);
}
.tooltip[x-placement='bottom'] .tooltip-arrow {
  top: 0;
  transform: rotate(225deg);
}
</style>
