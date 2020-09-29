<template lang="pug">
  ui-panel
    news-item(v-for="(item, i) of (news || {}).items || []" :key="i" :news="item")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { fetchNews, News } from '../../util/fetch-news';
import NewsItem from './NewsItem.vue';

@Component({
  components: { NewsItem },
  data() {
    return { news: undefined };
  },
})
export default class NewsPanelControl extends Vue {
  private news: News[] | undefined;

  private created(): void {
    this.fetchNews();
  }

  private async fetchNews(): Promise<void> {
    this.news = await fetchNews();
  }
}
</script>
