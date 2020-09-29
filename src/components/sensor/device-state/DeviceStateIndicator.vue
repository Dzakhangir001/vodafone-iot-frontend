<template lang="pug">
  .container(:class="{ 'push-down': pushDown }")
    img.image(v-if="state === 'RED'" src="./device-state-indicator-red.svg")
    img.image(v-else-if="state === 'GREEN'" src="./device-state-indicator-green.svg")
    img.image(v-else-if="state === 'GRAY'" src="./device-state-indicator-red.svg")
    .label
      slot
</template>

<script lang="ts">
import { EnumProp, BooleanProp } from '@/util/prop-decorators';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class DeviceStateIndicator extends Vue {
  @EnumProp(true, 'RED', 'GREEN', 'GRAY')
  private readonly state!: 'RED' | 'GREEN' | 'GRAY';

  @BooleanProp()
  private readonly pushDown!: boolean;
}
</script>

<style lang="scss" scoped>
.container {
  width: 33%;
}
.image {
  width: 25px;
  height: 25px;
  display: block;
  margin: 0 auto;
}
.label {
  margin-top: 5px;
  font-size: fontSize(fs-50);
  line-height: lineHeight(lh-reset);
  text-align: center;
}
.push-down {
  margin-top: 27px;
}
</style>
