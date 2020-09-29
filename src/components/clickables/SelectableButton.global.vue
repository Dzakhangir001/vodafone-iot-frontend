<template lang="pug">
  ui-clickable.selectable-button(
    tag="button"
    @click="$emit('click', !selected)"
    :class="{ [color.toLowerCase()]: true, active: selected }"
  )
    slot
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UiClickable from '@/components/clickables/Clickable.global.vue';
import { EnumProp, BooleanProp } from '@/util/prop-decorators';

@Component({ components: { UiClickable }, inheritAttrs: false })
export default class SelectableButton extends Vue {
  @BooleanProp()
  private selected!: boolean;

  @EnumProp(true, 'RED', 'GREEN', 'BLUE')
  private color!: 'RED' | 'GREEN' | 'BLUE';
}
</script>

<style lang="scss" scoped>
.selectable-button {
  height: 29px;
  border-radius: 15px;
  padding: 1px 30px 0 30px;
  border: none;
  outline: none;
  font-size: fontSize(fs-base);
  color: colorVodafone(white);
  line-height: lineHeight(lh-reset);
}
.red {
  background-color: colorVodafone(vodafone-red);
  &.active {
    background-color: colorVodafone(dark-red);
  }
}
.green {
  background-color: colorVodafone(digital-green);
  &.active {
    background-color: colorVodafone(digital-green-active);
  }
}
.blue {
  background-color: colorVodafone(aqua-blue);
  &.active {
    background-color: colorVodafone(turquoise);
  }
}
</style>
