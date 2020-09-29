<template lang="pug">
  .wrapper
    img.logo(
      src="@/assets/images/logos/vodafone.png"
      alt="Vodafone"
      @click="$emit('logo-click')"
    )
    .end
      slot
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class TopBar extends Vue {}
</script>

<style lang="scss" scoped>
.wrapper {
  box-sizing: border-box;
  height: 76px;
  display: flex;
  align-items: center;
  background: colorVodafone(white);
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.2);
}
.logo {
  flex: 0 0 auto;
  margin: 2px 10px 0;
  cursor: pointer;
  width: 28px;
}
.end {
  flex: 0 1 auto;
  margin-left: auto;
  height: 100%;
}
</style>
