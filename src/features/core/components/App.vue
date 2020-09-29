<template lang="pug">
  #app
    layout-engine(default-layout="core-layout-default")
      router-view(:key="routerViewKey")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Route } from 'vue-router';
import LayoutEngine from '@/components/layout/layout-engine';

@Component({ components: { LayoutEngine } })
export default class App extends Vue {
  private get routerViewKey(): string {
    if (!App.hasKeyGenerator(this.$route)) {
      return this.$route.path;
    }

    return App.callKeyGenerator(this.$route);
  }

  private static hasKeyGenerator(route: Route): boolean {
    return route && route.meta && route.meta.key && typeof route.meta.key === 'function';
  }

  private static callKeyGenerator(route: Route): string {
    return route.meta.key(route);
  }
}
</script>
