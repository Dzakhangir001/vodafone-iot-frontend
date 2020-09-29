<template lang="pug">
  .step-2
    step-hint
      | Bitte wählen Sie einen Sensor aus.
    .roles
      emblem-radio-button(
        v-for="option of $parent.roleOptions"
        :key="option.value"
        v-model="$parent.config.role"
        :checked-value="option.value"
        :src="option.icon"
        :label="option.label"
        @mouseenter="hoverDeviceLabel = option.label"
        @mouseleave="hoverDeviceLabel = undefined"
      )
    step-label(v-if="displayErrors && !roleValid" error)
      | Bitte wählen Sie die Rolle des Geräts aus!
    step-label(v-else)
      | {{ hoverDeviceLabel || roleLabel || '\xa0' }}
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
      hoverDeviceLabel: undefined,
    };
  },
})
export default class Step2 extends Vue {
  private displayErrors = false;
  private hoverDeviceLabel?: string;

  public readonly $parent!: BindingWizard;

  private get valid(): boolean {
    return this.roleValid;
  }

  private get roleValid(): boolean {
    return this.$parent.config.role.length > 0;
  }

  private get roleLabel(): string {
    for (const option of this.$parent.roleOptions) {
      if (option.value === this.$parent.config.role) {
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
.roles {
  display: grid;
  grid-template-columns: repeat(4, 60px);
  grid-auto-rows: 60px;
  grid-gap: 14px;
  margin-bottom: 20px;
}
</style>
