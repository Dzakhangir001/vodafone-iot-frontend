<template lang="pug">
  li
    ui-clickable.link(v-bind="$attrs" :class="{ active }" active-class="active" @click="$emit('click', $event)")
      .icon-wrapper
        component(:is="icon")
</template>

<script lang="ts">
import { Component as ComponentType } from 'vue';
import { Component, Vue } from 'vue-property-decorator';
import UiClickable from '@/components/clickables/Clickable.global.vue';
import { BooleanProp, RequiredProp } from '@/util/prop-decorators';

@Component({ components: { UiClickable }, inheritAttrs: false })
export default class AppLink extends Vue {
  @RequiredProp()
  private icon!: string | ComponentType;

  // this prop is mostly used for testing in storybook
  @BooleanProp()
  private active!: boolean;
}
</script>

<style lang="scss" scoped>
.link {
  display: block;
  box-sizing: border-box;
  height: 42px;
  width: 50px;
  padding: 4px 8px;
}
.icon-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
}
.link.active .icon-wrapper {
  background-color: colorVodafone(dark-red);
}
.link:hover .icon-stroke {
  stroke: colorVodafone(white);
}
.link:hover .icon-fill {
  fill: colorVodafone(white);
}
.push-down {
  margin-top: auto;
}
</style>
