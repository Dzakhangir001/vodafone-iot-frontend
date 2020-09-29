<template lang="pug">
  li
    ui-clickable.link(v-bind="$attrs" @click="$emit('click', $event)")
      img.icon(v-if="icon" :src="icon" alt="")
      .icon(v-else)
      span.label
        slot
</template>

<script lang="ts">
import { StringProp } from '@/util/prop-decorators';
import { Component, Vue } from 'vue-property-decorator';
import UiClickable from '@/components/clickables/Clickable.global.vue';

@Component({ components: { UiClickable }, inheritAttrs: false })
export default class SensorAction extends Vue {
  @StringProp(true)
  public icon!: string;
}
</script>

<style lang="scss" scoped>
.link {
  display: flex;
  align-items: center;
  color: colorVodafone(dark-grey);
}
.link:hover {
  color: colorVodafone(vodafone-red);
}
.icon {
  flex: 0 0 auto;
  width: 13px;
  height: 13px;
  margin-right: 10px;
}
.label {
  font-size: fontSize(fs-base);
  line-height: lineHeight(lh-xl);
  @include textOverflow();
}
</style>
