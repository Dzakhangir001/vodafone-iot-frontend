<template lang="pug">
  li.item
    ui-clickable.link(v-bind="$attrs" @click="$emit('click', $event)")
      slot
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UiClickable from '@/components/clickables/Clickable.global.vue';

@Component({ components: { UiClickable } })
export default class BreadcrumbItem extends Vue {}
</script>

<style lang="scss" scoped>
.item {
  display: inline;
}
.item:not(:first-child)::before {
  content: '»';
  display: inline;
  margin-left: px2rem(1);
  margin-right: px2rem(3);
}
.item:last-child {
  color: colorVodafone(vodafone-red);
}
.link:hover {
  color: colorVodafone(vodafone-red);
}
</style>
