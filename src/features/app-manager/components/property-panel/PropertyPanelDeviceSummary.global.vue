<template lang="pug">
  ui-cell(:basis="0" :max="200" :grow="1")
    .device-summary(:style="style")
      .label(@click="dropdown = !dropdown")
        ui-state-indicator.side(:state="state" :size="15")
        | {{ label }}
        img(v-if="$scopedSlots['actions']" src="./arrow-down.svg")
      .backdrop(v-if="dropdown && $scopedSlots['actions']")
        nav.dropdown(:style="backgroundColor")
          ul.actions(@click="dropdown = false")
            slot(name="actions")
      ui-flex(justify="center" align="center").devices
        slot(name="devices")
</template>

<script lang="ts">
import StateProperty from '@/components/state-indicator/state-property-mixin';
import { StringProp } from '@/util/prop-decorators';
import { Component, Mixins } from 'vue-property-decorator';

@Component
export default class PropertyPanelDeviceSummary extends Mixins(StateProperty) {
  @StringProp(true)
  private label!: string;

  @StringProp()
  private color?: string;

  private dropdown = false;

  private get style() {
    return {
      backgroundColor: this.color || '#f7f7f7',
    };
  }
}
</script>

<style lang="scss" scoped>
.device-summary {
  width: 180px;
  border-radius: 5px;
  position: relative;
  min-height: 100px;
}
.devices {
  width: 160px;
  overflow: hidden;
  margin: auto;
  padding-bottom: 10px;
}
.label {
  cursor: pointer;
  text-align: center;
  padding: 5px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.backdrop {
  position: absolute;
  top: 25px;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: 0 0 4px 4px;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 10;
}
.dropdown {
  padding: 5px 16px 16px;
  display: flex;
  justify-content: center;
  background-color: white;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.12);
}
.actions {
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
