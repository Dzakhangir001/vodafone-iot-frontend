<template lang="pug">
  ui-panel(v-bind="$attrs" :padding="2")
    .container
      ui-map
        slot
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UiMap from './Map.global.vue';

@Component({ components: { UiMap }, inheritAttrs: false })
export default class Map extends Vue {}
</script>

<style lang="scss" scoped>
.container {
  overflow: hidden;
  border-radius: 3px;
  height: 100%;
}
</style>
