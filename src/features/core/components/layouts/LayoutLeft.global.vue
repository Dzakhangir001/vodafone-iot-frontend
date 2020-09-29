<template lang="pug">
  flex.layout(:style="{ background }" root align="center").center-mobile
    cell(v-bind="Object.assign({ grow: 0, basis: 'auto' }, $attrs)")
      slot
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Cell from '@/components/layout/Cell.global.vue';
import Flex from '@/components/layout/Flex.global.vue';
import { StringProp } from '@/util/prop-decorators';

@Component({ components: { Cell, Flex }, inheritAttrs: false })
export default class LayoutLeft extends Vue {
  @StringProp()
  private readonly background?: string;
}
</script>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
}

.layout-enter-active,
.layout-leave-active {
  transition: opacity 300ms;
}
.layout-enter,
.layout-leave-to {
  opacity: 0;
}

.center-mobile {
  justify-content: center;
  @media (min-width: map-get($breakpoints, sm)) {
    justify-content: flex-start;
  }
}
</style>
