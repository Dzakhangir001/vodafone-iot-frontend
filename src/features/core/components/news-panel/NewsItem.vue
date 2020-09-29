<template lang="pug">
  .news-item
    h3.headline
      ui-relative-time.date(:date="news.date" min="-P7D")
      | {{ news.headline }}

    p.content {{ news.content }}
    ui-clickable(v-if="news.link" @click="open") » Mehr erfahren
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { News } from '../../util/fetch-news';
import { ObjectProp } from '@/util/prop-decorators';

@Component
export default class NewsItem extends Vue {
  @ObjectProp()
  private readonly news!: News;

  private open(): void {
    window.open(this.news.link, '_blank');
  }
}
</script>

<style lang="scss" scoped>
.news-item:not(:last-child) {
  margin-bottom: 16px;
}
.date {
  font-size: fontSize(fs-base);
  font-weight: 400;
  margin-right: 16px;
}
.headline {
  margin: 0;
  font-weight: 400;
}
.content {
  margin: 0;
}
</style>
