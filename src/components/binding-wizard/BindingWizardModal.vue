<template lang="pug">
  .binding-wizard-modal
    slot(:open="() => void (open = true)")
      ui-button(front :icon="plus" @click="open = true")
        | Sensor hinzufügen
    ui-modal(ref="modal" :visible="open" no-close-on-backdrop)
      binding-wizard(v-bind="$attrs" :add-action="decoratedAddAction" @close="open = false")
</template>

<script lang="ts">
import UiButton from '@/components/clickables/Button.global.vue';
import UiModal from '@/components/modal/Modal.global.vue';
import { Component, Vue } from 'vue-property-decorator';
import BindingWizard from './BindingWizard.vue';
import plus from './icons/plus.svg';
import { FunctionProp } from '@/util/prop-decorators';
import { AddAction } from './model';

@Component({
  components: { BindingWizard, UiButton, UiModal },
  inheritAttrs: false,
})
export default class BindingWizardModal extends Vue {
  private open = false;
  private plus = plus;

  public readonly $refs!: { modal: UiModal };

  @FunctionProp()
  private addAction!: AddAction;

  private get decoratedAddAction(): AddAction {
    return async (...args) => {
      const result = await this.addAction(...args);

      this.open = false;

      await this.$refs.modal.hidden();

      return result;
    };
  }
}
</script>
