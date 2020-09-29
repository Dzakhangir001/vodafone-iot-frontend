<template lang="pug">
  .search
    input.query(type="text" :value="query" @input="$emit('update:query', $event.target.value)")
    img.icon(src="@/components/node-tree-bar/images/search.svg" alt="Search")
</template>

<script lang="ts">
import { Component, Vue, Model } from 'vue-property-decorator';

@Component
export default class Search extends Vue {
  @Model('update:query', { type: String, default: '' })
  private query!: string;
}
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  border-radius: 4px;
  align-items: center;
  height: 34px;
  background-color: colorVodafone(aqua-blue);
}
.query {
  flex: 1 1 auto;
  min-width: 0;
  margin: 2px 10px 0;
  border: 0;
  outline: none;
  background: none;
  color: colorVodafone(white);
}
.icon {
  flex: 0 0 auto;
  width: 12px;
  margin-right: 10px;
}
</style>
