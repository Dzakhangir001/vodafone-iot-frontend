<template lang="pug">
  .select
    label.label
      span.error-message(v-if="error && errorMessage")
        | {{ errorMessage }}
      span(v-else)
        slot
      span.tooltip-icon(v-if="tooltip")
        | {{ tooltipLabel }}
    multiselect(
      :placeholder="placeholder",
      label="label",
      track-by="value",
      class="multiselect-sm",
      :value="selectedItems",
      :options="options",
      :multiple="multiple",
      :taggable="taggable",
      @input="onChange"
    )
</template>

<script lang="ts">
import { Component, Model, Vue } from 'vue-property-decorator';
import { StringProp, BooleanProp, ArrayProp } from '@/util/prop-decorators';
import Multiselect from 'vue-multiselect';
import '../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css';
import { SelectOption } from './model';

@Component({
  inheritAttrs: false,
  components: { Multiselect },
})
export default class VueMultiselect extends Vue {
  @Model('update')
  private readonly value!: SelectOption[];
  @ArrayProp(true)
  private readonly options!: SelectOption[];
  @BooleanProp()
  private readonly multiple!: boolean;
  @BooleanProp()
  private readonly taggable!: boolean;
  @BooleanProp()
  private readonly error!: boolean;
  @StringProp()
  private readonly errorMessage!: string;
  @StringProp()
  private readonly label!: string;
  @StringProp()
  private readonly placeholder?: string;
  @StringProp()
  private readonly tooltip?: string;
  @StringProp('?')
  private readonly tooltipLabel!: string;

  selectedItems: SelectOption[] = [];
  onChange(items: SelectOption[]) {
    this.selectedItems = items;
    this.$emit('update', this.selectedItems);
  }
}
</script>

<style lang="scss">
.select {
  margin-bottom: 16px;
  margin-right: 16px;
  color: colorVodafone(black);
  font-size: fontSize(fs-base);

  line-height: lineHeight(lh-100);
  min-width: 200px;
  max-width: 1000px;
}
.error-message {
  color: colorVodafone(vodafone-red);
}
.multiselect__tag {
  background: #2d4196 !important;
  cursor: pointer;
  margin-right: 1px;
  margin-top: 0;
  margin-bottom: 2px;
  padding-top: 0;
  padding-bottom: 0;
  font-size: 12px;
  line-height: 22px;
  font-weight: 600;
}
.multiselect__tag-icon:focus,
.multiselect__tag-icon:hover {
  background: colorVodafone(vodafone-red) !important;
}
.multiselect__option--highlight:after {
  background: colorVodafone(vodafone-red) !important;
}
.multiselect__tag-icon:focus:after,
.multiselect__tag-icon:hover:after {
  color: #fff !important;
}
.multiselect__option--selected.multiselect__option--highlight {
  background: colorVodafone(vodafone-red) !important;
}
.multiselect__option--highlight {
  background: colorVodafone(vodafone-red) !important;
}
.multiselect__option {
  padding: 10px !important;
  min-height: 20px !important;
  line-height: 12px !important;
}
.multiselect__option:after {
  display: none;
  min-height: 20px !important;
  font-size: 10px !important;
  line-height: 32px !important;
}
.multiselect,
.multiselect__input,
.multiselect__single,
.multiselect--active {
  margin-top: 6px;
  font-size: fontSize(fs-base) !important;
  color: #696969 !important;
}
.multiselect-sm {
  min-height: 32px;
  border-radius: 3px;
  cursor: pointer;
  .multiselect__select {
    height: 32px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .multiselect__tags {
    min-height: 32px;
    padding-top: 4px;
    padding-left: 12px;
  }
}
</style>
