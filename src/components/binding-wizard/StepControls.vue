<template lang="pug">
  .controls
    ui-clickable.arrow(v-if="$listeners.prev" @click="$emit('prev')")
      img(src="@/components/binding-wizard/icons/arrow-prev.svg" alt="Zurück")
    ui-clickable.arrow.next(v-if="$listeners.next" @click="$emit('next')")
      arrow-next(:class="{ inactive }")
    ui-wizard-button.next(v-if="$listeners.complete" :class="{ inactive }" :busy="busy" @click="$emit('complete')")
      | Verbindung herstellen
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UiClickable from '@/components/clickables/Clickable.global.vue';
import UiWizardButton from '@/components/clickables/WizardButton.global.vue';
import ArrowNext from './icons/arrow-next.svg?vue';
import { BooleanProp } from '@/util/prop-decorators';

@Component({
  components: { ArrowNext, UiClickable, UiWizardButton },
})
export default class StepControls extends Vue {
  @BooleanProp()
  private inactive!: boolean;
  @BooleanProp()
  private busy!: boolean;
}
</script>

<style lang="scss" scoped>
.controls {
  min-height: 30px;
  display: flex;
  margin-top: 18px;
  align-items: stretch;
}
.arrow {
  display: flex;
  align-items: center;
}
.next {
  margin-left: auto;
}
.icon {
  transition: 0.3s all;
}
.inactive .icon {
  stroke: #abadb0;
}
</style>
