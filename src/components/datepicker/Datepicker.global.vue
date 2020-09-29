<template lang="pug">
  ui-tooltip(v-model="datepickerOpen" placement="bottom" trigger="manual" :hide-delay="0")
    template(#default)
      ui-clickable.trigger.date(@click="datepickerOpen = !datepickerOpen")
        calendar-icon.calendar-icon
        | {{ formattedDate === undefined ? '–' : formattedDate }}
    template(#content)
      ui-clickable.trigger.clear(
        v-if="clearable && formattedDate !== undefined"
        @click="datepickerOpen = false; $emit('input', emptyValue)"
      )
        | Auswahl entfernen
        clear-icon.clear-icon
      v-datepicker.picker(:value="value" inline @input="datepickerOpen = false; $emit('input', $event)")
</template>

<script lang="ts">
import UiClickable from '@/components/clickables/Clickable.global.vue';
import { BooleanProp, OptionalProp } from '@/util/prop-decorators';
import moment from 'moment';
import { Component, Vue } from 'vue-property-decorator';
import VDatepicker from 'vuejs-datepicker';
import CalendarIcon from './calendar.svg?vue';
import ClearIcon from './clear.svg?vue';

@Component({ components: { CalendarIcon, VDatepicker, UiClickable, ClearIcon }, inheritAttrs: false })
export default class Datepicker extends Vue {
  @OptionalProp()
  private readonly value?: Date | string | number | null;

  @BooleanProp()
  private readonly clearable!: boolean;

  @OptionalProp()
  private readonly emptyValue: unknown;

  private datepickerOpen = false;

  private get formattedDate(): string | undefined {
    return this.value === undefined || this.value === null ? undefined : moment(this.value).format('L');
  }
}
</script>

<style lang="scss" scoped>
.date {
  color: colorVodafone(black);
}
.calendar-icon {
  margin-right: 0.5em;
  margin-bottom: -2px;
}
.clear {
  display: block;
  width: fit-content;
  margin-left: auto;
  margin-bottom: 2px;
}
.clear-icon {
  margin-left: 0.5em;
  margin-bottom: -3px;
}
.trigger:hover {
  color: colorVodafone(vodafone-red);
}
.trigger:hover .icon {
  stroke: colorVodafone(vodafone-red);
}
.picker /deep/ .vdp-datepicker__calendar {
  border: none;
}
.picker /deep/ .vdp-datepicker__calendar header .prev:not(.disabled):hover,
.picker /deep/ .vdp-datepicker__calendar header .next:not(.disabled):hover,
.picker /deep/ .vdp-datepicker__calendar header .up:not(.disabled):hover {
  background-color: colorVodafone(lighter);
}
.picker /deep/ .vdp-datepicker__calendar .cell.selected {
  color: colorVodafone(white);
  background-color: colorVodafone(vodafone-red);
}
.picker /deep/ .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day:hover,
.picker /deep/ .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).month:hover,
.picker /deep/ .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).year:hover {
  border-color: colorVodafone(vodafone-red);
}
</style>
