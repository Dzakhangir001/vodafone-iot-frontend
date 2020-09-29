<template lang="pug">
  transition(name="loader" mode="out-in")
    component(v-if="root" :is="root")
    layout-centered(v-else)
      | Loading...
</template>

<script lang="ts">
import { VueConstructor } from 'vue';
import { Component, Vue, Provide } from 'vue-property-decorator';
import container from '@/bootstrap';
import { Container, Name } from '@/util/container';
import { ROOT_COMPONENT, CONTAINER } from '../container';
import LayoutCentered from './layouts/LayoutCentered.global.vue';

const CONTAINER_ERROR = (): never => {
  throw new Error('Container not available yet');
};

@Component({ components: { LayoutCentered } })
export default class Loader extends Vue {
  private get: Container = CONTAINER_ERROR;

  private get root(): VueConstructor | undefined {
    try {
      return this.get(ROOT_COMPONENT);
    } catch {
      return undefined;
    }
  }

  @Provide(CONTAINER)
  private container(name: Name): ReturnType<Container> {
    return this.get(name);
  }

  private async created(): Promise<void> {
    this.get = await container();
  }
}
</script>

<style lang="scss" scoped>
.loader-enter-active,
.loader-leave-active {
  transition: opacity 300ms;
}
.loader-enter,
.loader-leave-to {
  opacity: 0;
}
</style>
