<template>
  <span class="spinner"></span>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class Spinner extends Vue {}
</script>

<style lang="scss" scoped>
@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}
.spinner {
  margin-right: 5px;
  &:before {
    content: '';
    box-sizing: border-box;
    width: 15px;
    height: 15px;
    margin-bottom: -3px;
    border-radius: 50%;
    border-top: 2px solid #fff;
    border-right: 2px solid transparent;
    animation: spinner 0.6s linear infinite;
    display: inline-block;
  }
}
</style>
