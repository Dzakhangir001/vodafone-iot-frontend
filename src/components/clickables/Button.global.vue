<template lang="pug">
  ui-clickable.button-container(tag="button" v-bind="$attrs" :class="{ inline }" @click="$emit('click', $event)")
    span.label(v-if="$scopedSlots[slotName('front')]" :class="{ fixed: fixedWidth }")
      slot(:name="slotName('front')")
    .inner(:class="{ fixed: fixedWidth }")
      span.label(v-if="$scopedSlots[slotName('before')]" :class="{ fixed: fixedWidth }")
        slot(:name="slotName('before')")
      .icon(v-if="icon")
        img(:src="icon")
      span.label(v-if="$scopedSlots[slotName('after')]" :class="{ fixed: fixedWidth }")
        slot(:name="slotName('after')")
    span.label(v-if="$scopedSlots[slotName('back')]" :class="{ fixed: fixedWidth }")
      slot(:name="slotName('back')")
</template>

<script lang="ts">
import { StringProp, BooleanProp } from '@/util/prop-decorators';
import { Component, Vue } from 'vue-property-decorator';
import UiClickable from './Clickable.global.vue';

@Component({ components: { UiClickable }, inheritAttrs: false })
export default class ButtonWithIcon extends Vue {
  @StringProp()
  private readonly icon?: string;
  @BooleanProp()
  private readonly after!: boolean;
  @BooleanProp()
  private readonly front!: boolean;
  @BooleanProp()
  private readonly back!: boolean;
  @BooleanProp()
  private readonly fixedWidth!: boolean;
  @BooleanProp()
  private readonly inline!: boolean;

  public slotName(slotName: string): string {
    const defaultSlotName = this.front ? 'front' : this.back ? 'back' : this.after ? 'after' : 'before';
    if (slotName === defaultSlotName) {
      return 'default';
    }
    return slotName;
  }
}
</script>

<style lang="scss" scoped>
.button-container {
  display: flex;
  align-items: center;
  padding: 0;
  border: none;
  outline: none;
  font: inherit;
  color: inherit;
  background-color: transparent;
  border-radius: 15px;
  font-size: fontSize(fs-base);
  line-height: lineHeight(lh-25);

  &.inline {
    display: inline-flex;
  }
}
.label {
  color: colorVodafone(vodafone-red);
  font-size: fontSize(fs-100);
  white-space: nowrap;
  margin: 0 5px;

  &.fixed {
    width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 20px;
  background: colorVodafone(white);
  border-radius: 15px;
  width: fit-content;

  &.fixed {
    width: 160px;
  }

  :hover > & {
    box-shadow: 0 0 0 2px colorVodafone(vodafone-red);
  }
}
.icon {
  width: 20px;
  height: 20px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
