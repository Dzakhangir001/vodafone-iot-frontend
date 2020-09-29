<template lang="pug">
  ui-wizard(ref="wizard" title="Vertrag anlegen")
    template(#default="props")
      slot(v-bind="props")
    template(#content)
      ui-flex
        ui-cell(:basis="1")
          text-input(v-model="formData.externalId" :error="displayErrors && !externalIdValid")
            | Vertragsnummer
        ui-cell(:grow="0" push-right)
          ui-wizard-button(:busy="busy" @click="complete")
            | Vertrag anlegen
</template>

<script lang="ts">
import TextInput from '@/components/form/TextInput.vue';
import Busyable, { Busy } from '@/components/mixins/busyable';
import Wizard from '@/components/modal/Wizard.global.vue';
import { ObjectProp } from '@/util/prop-decorators';
import { clone, defaults } from 'lodash';
import { Component, Mixins } from 'vue-property-decorator';
import {
  AppUserManagementAddContractMutation,
  AppUserManagementAddContractMutationVariables,
} from './__generated__/AppUserManagementAddContractMutation';
import addContractMutation from './add-contract.gql';

type FormData = AppUserManagementAddContractMutationVariables['input'];

const DEFAULT_FORM_DATA: FormData = {
  customerId: '',
  externalId: '',
};

@Component({
  components: { TextInput },
  data() {
    return { formData: undefined };
  },
})
export default class AddContractWizardControl extends Mixins(Busyable) {
  @ObjectProp()
  private readonly initialFormData?: Partial<FormData>;

  private formData!: FormData;
  private displayErrors = false;
  private errorMessage = '';

  public readonly $refs!: { wizard: Wizard };

  private get valid(): boolean {
    return this.externalIdValid;
  }

  private get externalIdValid(): boolean {
    return this.formData.externalId.length > 0;
  }

  private created(): void {
    this.reset();
  }

  @Busy()
  public async complete(): Promise<void> {
    if (!this.valid) {
      this.displayErrors = true;
      this.errorMessage = 'Bitte prüfen Sie Ihre Eingaben!';

      return;
    }

    this.displayErrors = false;
    this.errorMessage = '';

    let id;
    try {
      id = await this.addContract(this.formData);
    } catch (e) {
      this.displayErrors = true;
      this.errorMessage = e instanceof Error ? e.message : '';

      return;
    }

    await this.$refs.wizard.hide();

    this.$emit('contract-added', id);
    this.reset();
  }

  private reset(): void {
    this.formData = defaults(this.initialFormData ? clone(this.initialFormData) : {}, DEFAULT_FORM_DATA);
  }

  private async addContract(formData: FormData): Promise<string> {
    const variables: AppUserManagementAddContractMutationVariables = { input: formData };

    const { data } = await this.$apollo.mutate<AppUserManagementAddContractMutation>({
      mutation: addContractMutation,
      variables,
    });

    if (!data) {
      throw new Error('Der Vertrag konnte nicht hinzugefügt werden!');
    }

    return data.addContract.id;
  }
}
</script>
