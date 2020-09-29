<template lang="pug">
  ui-panel.add-user-panel
    ui-tab-bar(v-model="activeFilter")
      ui-tab-button(v-for="[value, label] in filterValues" :key="value" :value="value")
        | {{ label }}
    step1(v-if="activeFilter === 'step1'")
    step2(v-else-if="activeFilter === 'step2'" :roles="roles")
    step3(v-else-if="activeFilter === 'step3'")
</template>

<script lang="ts">
import { ObjectProp } from '@/util/prop-decorators';
import { UserRole } from '@/types/iot-portal';
import { cloneDeep, defaults } from 'lodash';
import { Vue, Component, Provide } from 'vue-property-decorator';
import {
  AppUserManagementAddUserMutation,
  AppUserManagementAddUserMutationVariables,
} from './__generated__/AppUserManagementAddUserMutation';
import {
  AppUserManagementSetAllowedAppsForUserMutationVariables,
  AppUserManagementSetAllowedAppsForUserMutation,
} from './__generated__/AppUserManagementSetAllowedAppsForUserMutation';
import addUserMutation from './add-user.gql';
import setAllowedAppsMutation from './set-allowed-apps.gql';
import { UserData, ADD_USER_WIZARD, AppPermissionList } from './model';
import Step1 from './Step1.vue';
import Step2 from './Step2.vue';
import Step3 from './Step3.vue';

const DEFAULT_USER_DATA: UserData = {
  repeatedEmail: '',
  addUser: { firstName: '', lastName: '', email: '', role: UserRole.ADMIN },
  setAllowedAppsForUser: { id: '', apps: [] },
};

@Component({
  components: { Step1, Step2, Step3 },
  data() {
    return { userData: undefined };
  },
})
export default class AddUserWizard extends Vue {
  @ObjectProp()
  private initialUserData?: Partial<UserData>;

  private filterValues = [
    ['step1', 'Persönliche Daten'],
    ['step2', 'Zugriffsrechte Apps/Sensoren'],
    ['step3', 'Zugriffsrechte BK/UVE/Objecte etc...'],
  ];
  private activeFilter = this.filterValues[0][0];
  private roles = [
    { value: UserRole.ADMIN, label: 'Admin' },
    { value: UserRole.EXPERT, label: 'Expert' },
    { value: UserRole.USER, label: 'User' },
  ];

  public userData!: UserData;

  public appPermissionData!: AppPermissionList;

  @Provide(ADD_USER_WIZARD)
  private getAddUserWizard() {
    return this;
  }

  private created(): void {
    this.userData = this.createUserData();
  }

  public async complete(): Promise<void> {
    this.userData.setAllowedAppsForUser.id = await this.addUser(this.userData);
    await this.setUserPermission(this.userData);

    this.$emit('user-added', this.userData);

    this.userData = this.createUserData();
    this.activeFilter = 'step1';
  }

  private createUserData(): UserData {
    return cloneDeep(defaults(this.initialUserData ? cloneDeep(this.initialUserData) : {}, DEFAULT_USER_DATA));
  }

  private async addUser({ addUser }: UserData): Promise<string> {
    const variables: AppUserManagementAddUserMutationVariables = {
      input: addUser,
    };

    const { data } = await this.$apollo.mutate<AppUserManagementAddUserMutation>({
      mutation: addUserMutation,
      variables,
    });

    if (!data) {
      throw new Error('Der Benutzer konnte nicht hinzugefügt werden!');
    }

    return data.addUser.id;
  }

  private async setUserPermission({ setAllowedAppsForUser }: UserData): Promise<void> {
    const variables: AppUserManagementSetAllowedAppsForUserMutationVariables = {
      input: setAllowedAppsForUser,
    };

    const { data } = await this.$apollo.mutate<AppUserManagementSetAllowedAppsForUserMutation>({
      mutation: setAllowedAppsMutation,
      variables,
    });

    if (!data) {
      throw new Error('Die App-Rechte für den Nutzer konnten nicht angelegt werden');
    }
  }
}
</script>
