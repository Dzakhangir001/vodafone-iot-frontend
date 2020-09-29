<template lang="pug">
  .login-wrapper
    .header
      img.logo(
        src="@/assets/images/logos/vodafone.png"
        alt="Vodafone"
      )
    .error
      | {{ errorMessage }}
    text-input(v-model="email")
      | E-Mail
    text-input(v-model="password" password)
      | Passwort
    .footer
      check-box(v-model="rememberMe")
        | Angemeldet bleiben
      .login-button
        flat-button(color="RED" :busy="busy" @click="onLoginClick")
          | Einloggen
      .forgotten-password
        ui-clickable(@click="onPasswordResetClick").underline Passwort vergessen ?
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import TextInput from '@/components/form/TextInput.vue';
import CheckBox from '@/components/form/CheckBox.vue';
import FlatButton from '@/components/clickables/FlatButton.global.vue';
import Busyable, { Busy } from '@/components/mixins/busyable';
import { FunctionProp } from '@/util/prop-decorators';
import { LoginAction } from './model';

@Component({ components: { TextInput, CheckBox, FlatButton } })
export default class LoginPanel extends Mixins(Busyable) {
  @FunctionProp()
  private readonly loginAction!: LoginAction;

  private email = '';
  private password = '';
  private rememberMe = false;
  private errorMessage = '';

  @Busy()
  private async onLoginClick(): Promise<void> {
    this.errorMessage = '';
    try {
      const { email, password, rememberMe } = this;
      await this.loginAction({ email, password, rememberMe });
    } catch (e) {
      this.errorMessage = e instanceof Error ? e.message : '';
    }
  }

  @Busy()
  private async onPasswordResetClick(): Promise<void> {
    const realm = 'staging';
    window.open(`https://keycloak.smartwowi.de/auth/realms/${realm}/login-actions/reset-credentials?client_id=portal`);
  }
}
</script>

<style lang="scss" scoped>
.login-wrapper {
  box-sizing: border-box;
  width: calc(100vw - 20px);
  margin-left: 50px;
  max-width: 300px;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.13);
  background-color: colorVodafone(white);
  padding: 20px;
  @media (max-width: map-get($breakpoints, sm)) {
    margin-left: 0px;
  }
}
.header {
  width: 50px;
  display: flex;
  margin: {
    top: 25px;
    bottom: 50px;
  }
}
.logo {
  margin-left: auto;
  width: 50px;
  height: 50px;
}
.error {
  height: 13px;
  font-size: fontSize(fs-base);

  line-height: lineHeight(lh-100);
  margin: 7px 0 7px 0;
  color: colorVodafone(vodafone-red);
}
.footer {
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  > div {
    margin-top: 20px;
  }
}
.login-button,
.forgotten-password {
  margin: 0 auto;
  font-size: fontSize(fs-100);
}
.underline {
  text-decoration: underline;
}
</style>
