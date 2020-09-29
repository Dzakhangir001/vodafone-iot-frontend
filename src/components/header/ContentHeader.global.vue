<template lang="pug">
  header.content-header
    ui-clickable.back-link(v-if="backLink" @click="$emit('back-click', $event)")
      arrow-left.image
    .right
      h1.headline
        slot(name="headline")
          | {{ headline }}
      p.description(v-if="$scopedSlots.description")
        slot(name="description")
      nav.breadcrumb(v-if="$scopedSlots.default")
        ol.list
          slot
</template>

<script lang="ts">
import ArrowLeft from './arrow-left.svg?vue';
import UiClickable from '@/components/clickables/Clickable.global.vue';
import { StringProp, BooleanProp } from '@/util/prop-decorators';
import { Component, Vue } from 'vue-property-decorator';

@Component({ components: { ArrowLeft, UiClickable } })
export default class ContentHeader extends Vue {
  @StringProp()
  public headline?: string;
  @BooleanProp()
  public backLink!: boolean;
}
</script>

<style lang="scss" scoped>
.content-header {
  display: flex;
  flex-direction: row;
  align-items: stretch;
}
.back-link {
  flex: 0 0 auto;
  margin-right: px2rem(16);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.image {
  display: block;
}
.arrow {
  stroke: colorVodafone(vodafone-red);
}
.back-link:hover .arrow {
  stroke: colorVodafone(vodafone-red-mouseover);
}
.right {
  flex: 1 0 auto;
  margin-top: px2rem(-5);
  margin-bottom: px2rem(-5);
}
.headline {
  margin: 0;
  color: colorVodafone(black);
  font-size: fontSize(fs-100);
  line-height: lineHeight(lh-xxl);
  font-weight: 700;
}
.description,
.breadcrumb {
  padding: 0;
  margin: 0;
  color: colorVodafone(grey);
  font-size: fontSize(fs-50);
  line-height: lineHeight(lh-50);
}
.list {
  padding: 0;
  margin: 0;
  list-style-type: none;
}
</style>
