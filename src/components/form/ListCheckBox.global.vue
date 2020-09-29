<template lang="pug">
  check-box(v-model="checked" v-bind="$attrs")
    slot
</template>

<script lang="ts">
import { ArrayProp, RequiredProp } from '@/util/prop-decorators';
import { Component, Vue } from 'vue-property-decorator';
import CheckBox from './CheckBox.vue';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Value = any;

@Component({ components: { CheckBox }, model: { prop: 'selection' }, inheritAttrs: false })
export default class ListCheckBox extends Vue {
  @ArrayProp()
  private selection!: Value[];

  @RequiredProp()
  private value!: Value;

  private get checked(): boolean {
    return this.selection.includes(this.value);
  }

  private set checked(value: boolean) {
    if (this.checked === value) {
      return;
    }

    const selection = value ? [...this.selection, this.value] : this.selection.filter((value) => value !== this.value);

    this.$emit('input', selection);
  }
}
</script>

<style lang="scss" scoped>
.checkbox-wrapper {
  position: relative;
  color: #838486;
  font-size: fontSize(fs-base);
  line-height: lineHeight(lh-100);
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
