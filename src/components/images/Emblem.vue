<template lang="pug">
  component.emblem(:is="src ? 'img' : 'div'" v-bind="$attrs" :src="src" :alt="label" :class="borderColor")
    | {{ src ? undefined : label }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { EnumProp, StringProp } from '@/util/prop-decorators';

@Component({ inheritAttrs: false })
export default class Emblem extends Vue {
  @StringProp()
  private src?: string;

  @StringProp(true)
  private label!: string;

  @EnumProp(false, 'blue', 'red')
  private borderColor?: string;
}
</script>

<style lang="scss" scoped>
.emblem {
  object-fit: contain;
  box-sizing: border-box;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.26);
  border: 2px solid colorVodafone(white);
  border-radius: 6px;
  padding: 10px;
  width: 100%;
  height: 100%;
  background-color: colorVodafone(white);
  transition: 0.3s all;
}
div.emblem {
  display: flex;
  justify-content: center;
  align-items: center;
}
.blue {
  border-color: colorVodafone(aqua-blue);
}
.red {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.22);
  border-color: colorVodafone(vodafone-red);
}
</style>
