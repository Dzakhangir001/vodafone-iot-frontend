<template lang="pug">
  ui-flex.container
    ui-cell(:basis="1")
      ui-flex(justify="space-between")
        ui-cell(:basis="0")
          h4
            | Bitte wählen Sie die BK, WE, Objeckte, Etagen, etc. auf denen Zugriff erteilt werden soll
      ui-flex(justify="flex-start")
        ui-cell(basis="auto" :max="270")
          .input-container
            text-input(placeholder="Filter...")
              | Zugriffsrechte auswahlen
        ui-cell(basis="auto" :max="70" :min="70")
        ui-cell(basis="auto")
          .input-container
            text-input(placeholder="Filter...")
              | Ihre Auswahl:
      nodes-multi-select(:left-column="data")
      ui-flex(justify="flex-end")
        ui-cell(basis="auto" :max="160")
          ui-wizard-button(:busy="busy" @click="onComplete").finish-button
            | Benutzer anlegen
</template>

<script lang="ts">
import TextInput from '@/components/form/TextInput.vue';
import Busyable, { Busy } from '@/components/mixins/busyable';
import { Component, Mixins, Inject } from 'vue-property-decorator';
import NodesMultiSelect from '../multi-select/NodesMultiSelect.vue';
import AddUserWizard from './AddUserWizard.global.vue';
import { ADD_USER_WIZARD } from './model';

@Component({ components: { NodesMultiSelect, TextInput } })
export default class Step3 extends Mixins(Busyable) {
  private displayErrors = false;
  private errorMessage = '';

  private data = [
    {
      id: 1,
      label: 'Buchungskreis 1',
    },
    {
      id: 2,
      label: 'Buchungskreis 2',
      data: [
        {
          id: 3,
          label: 'Wirtschaftseineit 1',
        },
        {
          id: 4,
          label: 'Wirtschaftseineit 2',
        },
        {
          id: 5,
          label: 'Wirtschaftseineit 3',
          data: [
            {
              id: 6,
              label: 'Object Seeweise 1',
            },
            {
              id: 7,
              label: 'Object Seeweise 4',
            },
            {
              id: 8,
              label: 'Object Seeweise 6',
            },
            {
              id: 9,
              label: 'Object Seeweise 12',
            },
          ],
        },
      ],
    },
    {
      id: 10,
      label: 'Buchungskreis 3',
    },
    {
      id: 11,
      label: 'Buchungskreis 4',
    },
  ];

  @Inject(ADD_USER_WIZARD)
  private getAddUserWizard!: AddUserWizard['getAddUserWizard'];

  @Busy()
  private async onComplete(): Promise<void> {
    this.displayErrors = false;
    this.errorMessage = '';

    try {
      await this.getAddUserWizard().complete();
    } catch (e) {
      this.displayErrors = true;
      this.errorMessage = e instanceof Error ? e.message : '';
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-top: 20px;
}
.finish-button {
  border-radius: 5px;
}
</style>
