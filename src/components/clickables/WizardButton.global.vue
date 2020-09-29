<template lang="pug">
  ui-clickable.wizard-button(
    v-bind="$attrs"
    tag="button"
    :disabled="busy || $attrs.disabled"
    @click="$emit('click', $event)"
  )
    spinner(v-if="busy")
    slot
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { BooleanProp } from '@/util/prop-decorators';
import UiClickable from '@/components/clickables/Clickable.global.vue';
import Spinner from '@/components/clickables/Spinner.vue';

@Component({ components: { UiClickable, Spinner }, inheritAttrs: false })
export default class WizardButton extends Vue {
  @BooleanProp()
  private busy!: boolean;
}
</script>

<style lang="scss" scoped>
.wizard-button {
  outline: none;
  border: 2px solid colorVodafone(white);
  border-radius: 5px;
  padding: 10px 12px;
  background-color: colorVodafone(vodafone-red);
  color: colorVodafone(white);
  font-size: fontSize(fs-base);
  font-weight: 600;
  line-height: lineHeight(lh-reset);
  @include textOverflow();
  transition: all 0.3s ease-in-out;
  &:focus {
    box-shadow: none;
  }
}
.inactive {
  border-color: colorVodafone(white);
  background-clip: colorVodafone(light-grey);
  color: colorVodafone(white);
}
</style>
