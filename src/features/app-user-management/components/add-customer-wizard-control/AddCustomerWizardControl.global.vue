<template lang="pug">
  ui-wizard(ref="wizard" title="Kunde anlegen")
    template(#default="props")
      slot(v-bind="props")
    template(#content)
      ui-flex
        ui-cell(:basis="1")
          text-input(v-model="formData.name" :error="displayErrors && !nameValid")
            | Name
          text-input(v-model="formData.externalId")
            | Kundennummer (optional)
        ui-cell(:grow="0" push-right)
          ui-wizard-button(:busy="busy" @click="complete")
            | Kunde anlegen
</template>

<script lang="ts">
import TextInput from '@/components/form/TextInput.vue';
import Busyable, { Busy } from '@/components/mixins/busyable';
import Wizard from '@/components/modal/Wizard.global.vue';
import { ObjectProp } from '@/util/prop-decorators';
import { clone, defaults } from 'lodash';
import { Component, Mixins } from 'vue-property-decorator';
import {
  AppUserManagementAddCustomerMutation,
  AppUserManagementAddCustomerMutationVariables,
} from './__generated__/AppUserManagementAddCustomerMutation';
import addCustomerMutation from './add-customer.gql';

type FormData = AppUserManagementAddCustomerMutationVariables['input'];

const DEFAULT_FORM_DATA: FormData = {
  name: '',
  externalId: '',
};

@Component({
  components: { TextInput },
  data() {
    return { formData: undefined };
  },
})
export default class AddCustomerWizardControl extends Mixins(Busyable) {
  @ObjectProp()
  private readonly initialFormData?: Partial<FormData>;

  private formData!: FormData;
  private displayErrors = false;
  private errorMessage = '';

  public readonly $refs!: { wizard: Wizard };

  private get valid(): boolean {
    return this.nameValid;
  }

  private get nameValid(): boolean {
    return this.formData.name.length > 0;
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
      id = await this.addCustomer(this.formData);
    } catch (e) {
      this.displayErrors = true;
      this.errorMessage = e instanceof Error ? e.message : '';

      return;
    }

    await this.$refs.wizard.hide();

    this.$emit('customer-added', id);
    this.reset();
  }

  private reset(): void {
    this.formData = defaults(this.initialFormData ? clone(this.initialFormData) : {}, DEFAULT_FORM_DATA);
  }

  private async addCustomer(formData: FormData): Promise<string> {
    const variables: AppUserManagementAddCustomerMutationVariables = { input: formData };

    const { data } = await this.$apollo.mutate<AppUserManagementAddCustomerMutation>({
      mutation: addCustomerMutation,
      variables,
    });

    if (!data) {
      throw new Error('Der Kunde konnte nicht hinzugefügt werden!');
    }

    return data.addCustomer.id;
  }
}
</script>
