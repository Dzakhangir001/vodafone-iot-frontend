<template lang="pug">
  nav.wrapper
    ul.list
      slot
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AppBar extends Vue {}
</script>

<style lang="scss" scoped>
.wrapper {
  box-sizing: border-box;
  height: 100%;
  width: 50px;
  padding: 10px 0;
  background: colorVodafone(vodafone-red);
}
.list {
  padding: 0;
  margin: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
