<template lang="pug">
  .step-3
    step-hint
      | Bitte wählen Sie einen Hersteller aus.
    .manufacturers
      emblem-radio-button(
        v-for="option of $parent.manufacturerOptions"
        :key="option.value"
        v-model="$parent.config.manufacturer"
        :checked-value="option.value"
        :src="option.icon"
        :label="option.label"
        @mouseenter="hoverManufacturerLabel = option.label"
        @mouseleave="hoverManufacturerLabel = undefined"
      )
    step-label(v-if="displayErrors && !manufacturerValid" error)
      | Bitte wählen Sie den Hersteller des Geräts aus!
    step-label(v-else)
      | {{ hoverManufacturerLabel || manufacturerLabel || '\xa0' }}
    step-controls(:inactive="!valid" @prev="$parent.step--" @next="onNext")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import EmblemRadioButton from '@/components/form/EmblemRadioButton.vue';
import BindingWizard from './BindingWizard.vue';
import StepControls from './StepControls.vue';
import StepHint from './StepHint.vue';
import StepLabel from './StepLabel.vue';

@Component({
  components: { EmblemRadioButton, StepControls, StepHint, StepLabel },
  data() {
    return {
      hoverManufacturerLabel: undefined,
    };
  },
})
export default class Step3 extends Vue {
  private displayErrors = false;
  private hoverManufacturerLabel?: string;

  public readonly $parent!: BindingWizard;

  private get valid(): boolean {
    return this.manufacturerValid;
  }

  private get manufacturerValid(): boolean {
    return this.$parent.config.manufacturer.length > 0;
  }

  private get manufacturerLabel(): string {
    for (const option of this.$parent.manufacturerOptions) {
      if (option.value === this.$parent.config.manufacturer) {
        return option.label;
      }
    }

    return '';
  }

  private onNext(): void {
    if (!this.valid) {
      this.displayErrors = true;

      return;
    }

    this.$parent.step++;
  }
}
</script>

<style lang="scss" scoped>
.manufacturers {
  display: grid;
  grid-template-columns: repeat(3, 120px);
  grid-auto-rows: 60px;
  grid-gap: 14px;
  margin-bottom: 20px;
}
</style>
