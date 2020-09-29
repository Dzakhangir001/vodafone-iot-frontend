<template lang="pug">
  .step-1
    step-hint
      | Bitte wählen Sie einen Raum aus.
    .rooms
      emblem-radio-button(
        v-for="option of $parent.roomOptions"
        :key="option.value"
        v-model="$parent.config.siteId"
        :checked-value="option.value"
        :src="option.icon || defaultRoomImage"
        :label="option.label"
        @mouseenter="hoverRoomLabel = option.label"
        @mouseleave="hoverRoomLabel = undefined"
      )
    step-label(v-if="displayErrors && !siteIdValid" error)
      | Bitte wählen Sie den Raum aus in dem das Gerät installiert wird!
    step-label(v-else)
      | {{ hoverRoomLabel || roomLabel || '\xa0' }}
    text-input(v-model="$parent.config.mountingNotes")
      | Genauer Ort (optional)
    text-input(v-model="$parent.config.notes" multiline)
      | Kommentar (optional)
    step-controls(:inactive="!valid" @next="onNext")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import EmblemRadioButton from '@/components/form/EmblemRadioButton.vue';
import TextInput from '@/components/form/TextInput.vue';
import defaultRoomImage from './icons/room-default.svg';
import BindingWizard from './BindingWizard.vue';
import StepControls from './StepControls.vue';
import StepHint from './StepHint.vue';
import StepLabel from './StepLabel.vue';

@Component({
  components: { EmblemRadioButton, StepControls, StepHint, StepLabel, TextInput },
  data() {
    return {
      hoverRoomLabel: undefined,
    };
  },
})
export default class Step1 extends Vue {
  private displayErrors = false;
  private defaultRoomImage = defaultRoomImage;
  private hoverRoomLabel?: string;
  public readonly $parent!: BindingWizard;

  private get valid(): boolean {
    return this.siteIdValid;
  }

  private get siteIdValid(): boolean {
    return this.$parent.config.siteId.length > 0;
  }

  private get roomLabel(): string {
    for (const option of this.$parent.roomOptions) {
      if (option.value === this.$parent.config.siteId) {
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
.rooms {
  display: grid;
  grid-template-columns: repeat(4, 60px);
  grid-auto-rows: 60px;
  grid-gap: 14px;
  margin-bottom: 20px;
}
</style>
