<template lang="pug">
  ui-cell(:basis="0" :max="45").device
    ui-clickable(v-bind="$attrs" @click="$emit('click', $event)")
      mini-sensor(:icon="icon" :border="alerted ? 'RED' : 'NONE'")
</template>

<script lang="ts">
import MiniSensor from '@/components/mini-sensor/MiniSensor.vue';
import { StringProp, BooleanProp } from '@/util/prop-decorators';
import { Component, Vue } from 'vue-property-decorator';

@Component({ components: { MiniSensor }, inheritAttrs: false })
export default class PropertyPanelDevice extends Vue {
  @StringProp(true)
  private icon!: string;

  @BooleanProp()
  private alerted!: boolean;
}
</script>

<style lang="scss" scoped>
.device {
  padding: 2px;
}
</style>
