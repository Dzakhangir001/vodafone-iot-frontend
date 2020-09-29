<template lang="pug">
  .states
    slot
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class DeviceStateIndicators extends Vue {}
</script>

<style lang="scss" scoped>
.states {
  display: flex;
  justify-content: space-between;
}
</style>
