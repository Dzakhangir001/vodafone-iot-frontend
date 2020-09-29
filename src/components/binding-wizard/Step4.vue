<template lang="pug">
  .step-4
    step-hint
      | Bitte geben sie die Sensordaten ein.
    .summary
      emblem.role(:src="selectedRoleOption.icon" :label="selectedRoleOption.label")
      emblem.manufacturer(:src="selectedManufacturerOption.icon" :label="selectedManufacturerOption.label")
    step-label(error)
      | {{ displayErrors && errorMessage ? errorMessage : '\xa0' }}
    text-input(v-model="$parent.config.serial" :error="displayErrors && !serialValid")
      | Seriennummer
    text-input(
      v-model="$parent.config.encryptionKey"
      :error="displayErrors && !encryptionKeyValid"
      error-message="Ungültiges Format!"
    )
      | AES-Key (falls erforderlich)
    step-controls(:inactive="!valid" :busy="busy" @prev="$parent.step--" @complete="onComplete")
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import Busyable, { Busy } from '@/components/mixins/busyable';
import TextInput from '@/components/form/TextInput.vue';
import Emblem from '@/components/images/Emblem.vue';
import { Option } from './model';
import BindingWizard from './BindingWizard.vue';
import StepControls from './StepControls.vue';
import StepHint from './StepHint.vue';
import StepLabel from './StepLabel.vue';

// FIXME 16hex is too short for possible key lengths of AES:
// 128bit (32hex)
// 192bit (48hex)
// 256bit (64hex)
// talk to tarent what the actual encryption standard in use is
const AES_FORMAT = /^([a-z0-9]{16}){2,4}$/i;

@Component({
  components: { Emblem, StepControls, StepHint, StepLabel, TextInput },
})
export default class Step4 extends Mixins(Busyable) {
  private displayErrors = false;
  private errorMessage = '';

  public readonly $parent!: BindingWizard;

  private get valid(): boolean {
    return this.serialValid && this.encryptionKeyValid;
  }

  private get serialValid(): boolean {
    return this.$parent.config.serial.length > 0;
  }

  private get encryptionKeyValid(): boolean {
    const key = this.$parent.config.encryptionKey;

    return !key || AES_FORMAT.test(key);
  }

  private get selectedRoleOption(): Option {
    for (const option of this.$parent.roleOptions) {
      if (option.value === this.$parent.config.role) {
        return option;
      }
    }

    return { value: '', label: '' };
  }

  private get selectedManufacturerOption(): Option {
    for (const option of this.$parent.manufacturerOptions) {
      if (option.value === this.$parent.config.manufacturer) {
        return option;
      }
    }

    return { value: '', label: '' };
  }

  @Busy()
  private async onComplete(): Promise<void> {
    if (!this.valid) {
      this.displayErrors = true;

      return;
    }

    this.displayErrors = false;
    this.errorMessage = '';

    try {
      await this.$parent.complete();
    } catch (e) {
      this.displayErrors = true;
      this.errorMessage = e instanceof Error ? e.message : '';
    }
  }
}
</script>

<style lang="scss" scoped>
.summary {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.role {
  width: 60px;
  height: 60px;
}
.manufacturer {
  width: 120px;
  height: 60px;
}
</style>
