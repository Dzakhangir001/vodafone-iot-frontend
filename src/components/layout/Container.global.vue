<template lang="pug">
  flex(justify="center")
    cell(v-bind="$attrs")
      slot
</template>

<script lang="ts">
import Cell from '@/components/layout/Cell.global.vue';
import Flex from '@/components/layout/Flex.global.vue';
import { Component, Vue } from 'vue-property-decorator';

@Component({ components: { Flex, Cell }, inheritAttrs: false })
export default class Container extends Vue {}
</script>
