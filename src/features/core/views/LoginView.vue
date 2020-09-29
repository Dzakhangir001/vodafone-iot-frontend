<template lang="pug">
  ui-layout(use="core-layout-left" :background="background" #default)
    login-panel(:login-action="loginAction")
</template>

<script lang="ts">
import LoginPanel from '@/components/login-panel/LoginPanel.vue';
import { LoginData } from '@/components/login-panel/model.ts';
import { isString } from '@/util/lang';
import { Component, Mixins } from 'vue-property-decorator';
import background from '@core/assets/login-bg-wave.png';
import overlay from '@core/assets/login-bg-building.svg';
import ContainerMixin from '../components/mixins/container';
import { AUTHENTICATOR } from '../container';

@Component({ components: { LoginPanel } })
export default class LoginView extends Mixins(ContainerMixin) {
  private async loginAction(data: LoginData): Promise<void> {
    try {
      await this.container(AUTHENTICATOR).login(data);
    } catch {
      throw new Error('Anmeldung fehlgeschlagen!');
    }

    this.$router.replace(isString(this.$route.query.r) ? this.$route.query.r : { name: 'Home' });
  }

  private get background(): string {
    return `url(${overlay}) no-repeat 50% 100%, url(${background})`;
  }
}
</script>
