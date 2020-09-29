<template lang="pug">
  li.apartment-list-item
    .sensors
      slot
    ui-button(v-bind="$attrs" fixed-width :icon="triangle" @click="$emit('click', $event)")
      | {{ buttonLabel }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Button from '@/components/clickables/Button.global.vue';
import { StringProp } from '@/util/prop-decorators';
import triangle from '@/assets/images/triangle.svg';

@Component({
  components: {
    'ui-button': Button,
  },
  inheritAttrs: false,
})
export default class ApartmentListItem extends Vue {
  @StringProp(true)
  public buttonLabel!: string;

  private triangle = triangle;
}
</script>

<style lang="scss" scoped>
.apartment-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 6px 15px 6px 15px;
  box-sizing: border-box;
  &:nth-child(odd) {
    background-color: colorVodafone(light-grey);
  }
}
.sensors {
  display: flex;
  flex-wrap: wrap;
}
// TODO Get rid of star selector
.sensors > * {
  margin: 4px;
}
</style>
