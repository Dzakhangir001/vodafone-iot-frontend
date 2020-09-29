<template lang="pug">
  app-bar
    app-link(v-for="(app, index) of apps" v-bind="app.link" :key="index")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppBar from '@/components/app-bar/AppBar.vue';
import AppLink from '@/components/app-bar/AppLink.vue';
import { App } from '../../model';
import { RootGetter } from '../../store';

@Component({ components: { AppBar, AppLink } })
export default class AppBarControl extends Vue {
  @RootGetter
  private readonly allowedAppMap!: Record<string, App>;

  private get apps(): App[] {
    return Object.values(this.allowedAppMap).sort((a, b) => (a.order || 0) - (b.order || 0));
  }
}
</script>
