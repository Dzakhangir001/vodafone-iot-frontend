<template lang="pug">
  ui-clickable.flat-button-container(
    tag="button"
    v-bind="$attrs"
    :disabled="busy || $attrs.disabled"
    :class="{ [color.toLowerCase()]: true, 'fixed-width': fixedWidth }"
    @click="$emit('click', $event)"
  )
    spinner(v-if="busy")
    slot
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UiClickable from '@/components/clickables/Clickable.global.vue';
import Spinner from '@/components/clickables/Spinner.vue';
import { BooleanProp, EnumProp } from '@/util/prop-decorators';

@Component({ components: { UiClickable, Spinner }, inheritAttrs: false })
export default class FlatButton extends Vue {
  @BooleanProp()
  private readonly fixedWidth!: boolean;
  @BooleanProp()
  private readonly busy!: boolean;
  @EnumProp('BLUE', 'RED', 'GREEN')
  private readonly color!: 'RED' | 'GREEN' | 'BLUE';
}
</script>

<style lang="scss" scoped>
.flat-button-container {
  border-radius: 1px;
  &.fixed-width {
    width: 160px;
  }
  padding: 15px;
  border: none;
  outline: none;
  font-size: fontSize(fs-100);
  line-height: lineHeight(lh-100);
  color: colorVodafone(white);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
}
.red {
  background-color: colorVodafone(vodafone-red);
  &:hover {
    background-color: colorVodafone(vodafone-red-mouseover);
  }
  &:active {
    background-color: colorVodafone(vodafone-red-active);
  }
}
.green {
  background-color: #137b2a;
  &:hover {
    background-color: #3a914d;
  }
  &:active {
    background-color: #62a771;
  }
}
.blue {
  background-color: #2d4196;
  &:hover {
    background-color: #5061a8;
  }
  &:active {
    background-color: #7380b9;
  }
}
</style>
