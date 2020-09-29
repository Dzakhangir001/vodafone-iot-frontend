<template lang="pug">
  ui-flex.add-user-container
    ui-cell(:basis="1")
      ui-flex
        ui-cell(:basis="0" :min="150" :max="300")
          text-input(v-model="userData.addUser.firstName")
            | Vorname
        ui-cell(:basis="0" :min="150" :max="300")
          text-input(v-model="userData.addUser.lastName")
            | Nachname
    ui-cell(:basis="1")
      ui-flex
        ui-cell(:basis="0" :min="150" :max="300")
          text-input(v-model="userData.addUser.email")
            | Email
        ui-cell(:basis="0" :min="150" :max="300")
          text-input(v-model="userData.repeatedEmail")
            | Email wiederholen
</template>

<script lang="ts">
import TextInput from '@/components/form/TextInput.vue';
import { Component, Vue, Inject } from 'vue-property-decorator';
import AddUserWizard from './AddUserWizard.global.vue';
import { ADD_USER_WIZARD, UserData } from './model';

@Component({ components: { TextInput } })
export default class Step1 extends Vue {
  private repeatedEmail = '';

  @Inject(ADD_USER_WIZARD)
  private getAddUserWizard!: AddUserWizard['getAddUserWizard'];

  private get userData(): UserData {
    return this.getAddUserWizard().userData;
  }
}
</script>

<style lang="scss" scoped>
.add-user-container {
  padding-top: 20px;
}
</style>
