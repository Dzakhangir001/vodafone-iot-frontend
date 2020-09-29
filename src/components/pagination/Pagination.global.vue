<template lang="pug">
  .pagination(v-if="totalPages > 1")
    page-button(v-bind="$props" :page="1" @input="input"): span.control «
    page-button(v-if="totalPages > 2" v-bind="$props" :page="prevPage" @input="input"): span.control ‹
    ol(v-if="list.length")
      //- we do not use a key on purpose, to avoid some out of sync updates on disabled state
      li(v-for="page in list")
        page-button(v-bind="$props" :page="page" @input="input" :class="{highlighed: currentPage === page}")
    page-button(v-if="totalPages > 2" v-bind="$props" :page="nextPage" @input="input"): span.control ›
    page-button(v-bind="$props" :page="totalPages" @input="input"): span.control »
</template>

<script lang="ts">
import { IntegerProp } from '@/util/prop-decorators';
import { range } from 'lodash';
import { Component, Model, Vue } from 'vue-property-decorator';
import PageButton from './PageButton.vue';

@Component({ components: { PageButton } })
export default class Pagination extends Vue {
  @Model('input', { type: Number, required: true })
  public value!: number;
  @IntegerProp(true, 0)
  public totalPages!: number;
  @IntegerProp(5, 0)
  public displayPages!: number;

  private currentPage: number = 0;

  mounted() {
    this.currentPage = this.value;
  }

  public get list(): number[] {
    const { displayPages, totalPages, value } = this;

    if (displayPages < 1) {
      return [];
    }

    const neighbors = Math.ceil((displayPages - 1) / 2);

    let from = value - neighbors;
    let to = value + neighbors;

    if (from < 1) {
      to -= from - 1;
    }
    if (to > totalPages) {
      from -= to - totalPages;
    }

    return range(Math.max(1, from), Math.min(to, totalPages) + 1);
  }

  public get prevPage(): number {
    return Math.max(this.value - 1, 1);
  }

  public get nextPage(): number {
    return Math.min(this.value + 1, this.totalPages);
  }

  public input(value: number): void {
    this.currentPage = value;
    this.$emit('input', value);
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  margin-top: 10px;
  justify-content: flex-end;

  & .control {
    display: inline-block;
    width: 1.5ch;
  }

  & > ol {
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;

    & > li {
      display: inline;
      margin: 0 2px 0 2px;
    }
    .highlighed {
      box-shadow: 0 0 0 2px colorVodafone(aqua-blue);
    }
  }
}
</style>
