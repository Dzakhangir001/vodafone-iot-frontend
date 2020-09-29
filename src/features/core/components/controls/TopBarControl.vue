<template lang="pug">
  top-bar(@logo-click="onLogoClick")
    user-toolbar(v-if="user" :name="user.name" role="Administrator" @logoutClick="onLogoutClick")
</template>

<script lang="ts">
import TopBar from '@/components/top-bar/TopBar.vue';
import UserToolbar from '@/components/user-toolbar/UserToolbar.vue';
import { Component, Mixins } from 'vue-property-decorator';
import { User } from '../../auth';
import { AUTHENTICATOR } from '../../container';
import { RootState } from '../../store';
import ContainerMixin from '../mixins/container';

@Component({ components: { TopBar, UserToolbar } })
export default class TopBarControl extends Mixins(ContainerMixin) {
  @RootState
  private readonly user?: User;

  private async onLogoutClick(): Promise<void> {
    this.container(AUTHENTICATOR).logout();

    this.$router.push({ name: 'Login' });
  }

  private onLogoClick(): void {
    this.$router.push({ name: 'Home' });
  }
}
</script>
