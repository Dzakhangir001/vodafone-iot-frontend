<template lang="pug">
  ui-flex.container
    ui-cell(:basis="1")
      ui-flex()
        ui-cell(basis="auto" :max="270")
          .input-container
            | Bitte wählen Sie eine Rolle für den User
            select.select(v-model="userData.addUser.role")
              option(v-for="{ value, label } in roles" :value="value")
                | {{ label }}
      ui-flex(justify="space-between")
        ui-cell(:basis="0")
          h4
            | Bitte wählen Sie die Applikationen aus, auf denen Zugriff erteilt weden soll
      roles-and-permissions-multi-select(:left-column="options")
</template>

<script lang="ts">
import TextInput from '@/components/form/TextInput.vue';
import { ArrayProp } from '@/util/prop-decorators';
import { Component, Inject, Mixins } from 'vue-property-decorator';
import RolesAndPermissionsMultiSelect from '../multi-select/RolesAndPermissionsMultiSelect.vue';
import { ADD_USER_WIZARD, UserData } from './model';
import AddUserWizard from './AddUserWizard.global.vue';
import ContainerMixin from '@/features/core/components/mixins/container';
import { APPS } from '@/features/core/container';

@Component({
  components: {
    TextInput,
    RolesAndPermissionsMultiSelect,
  },
})
export default class Step2 extends Mixins(ContainerMixin) {
  @ArrayProp()
  private roles!: { value: string; label: string }[];

  @Inject(ADD_USER_WIZARD)
  private getAddUserWizard!: AddUserWizard['getAddUserWizard'];

  private get userData(): UserData {
    return this.getAddUserWizard().userData;
  }

  private get options() {
    const appOptions = this.container(APPS)
      .filter(({ alwaysAllowed }) => !alwaysAllowed)
      .map(({ name, label }, id) => ({ id, label: label === undefined ? name : label, name }));

    return [
      {
        name: 'Apps',
        data: appOptions,
      },
    ];
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-top: 20px;
  width: 40%;
  .input-container {
    width: 250px;
    .select {
      height: 34px;
      outline: none;
      display: block;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      -webkit-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.18);
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.18);
      width: calc(100% + 4px);
      margin: 0 -2px;
      border-radius: 4px;
      border: 2px solid #ffffff;
      padding: 10px;
      background-color: #ededed;
      font-weight: 700;
      -webkit-transition: all 0.3s;
      transition: all 0.3s;
      font-size: 13px;
      line-height: 15px;
      -moz-appearance: none;
      text-indent: 0.01px;
    }
    option {
      color: colorVodafone(grey);
    }
  }
}
</style>
