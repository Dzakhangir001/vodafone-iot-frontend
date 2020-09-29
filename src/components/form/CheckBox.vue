<template lang="pug">
  label.checkbox-wrapper
    input.checkbox(
      type="checkbox"
      :checked="value"
      @change="$emit('input', $event.target.checked)"
    )
    .checkmark
    .text
      slot
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { BooleanProp } from '@/util/prop-decorators';

@Component
export default class CheckBox extends Vue {
  @BooleanProp()
  private value!: boolean;
}
</script>

<style lang="scss" scoped>
.checkbox-wrapper {
  position: relative;
  color: colorVodafone(vodafone-dark-grey);
  font-size: fontSize(fs-150);
  line-height: lineHeight(lh-reset);
  cursor: pointer;
}
.checkbox {
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
}
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 15px;
  width: 15px;
  box-sizing: border-box;
  background-color: colorVodafone(shaded);
  border-radius: 4px;
}
.checkbox:checked ~ .checkmark {
  background-color: colorVodafone(vodafone-red);
}
.checkmark:after {
  content: '';
  position: absolute;
  display: none;
}
.checkbox:checked ~ .checkmark:after {
  display: block;
}
.checkmark:after {
  left: 5px;
  top: 2.5px;
  width: 3px;
  height: 6px;
  border: solid white;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
.text {
  margin-left: 25px;
  padding-top: 1px;
}
</style>
