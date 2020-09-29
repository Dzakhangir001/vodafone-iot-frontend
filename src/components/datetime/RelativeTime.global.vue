<template lang="pug">
  time(:datetime="momentDate.toISOString()" :title="momentDate.format('LLL')")
    slot(v-bind="{ momentDate, displayDate, inRange, relativeDate, formattedDate }")
      | {{ displayDate }}
</template>

<script lang="ts">
import { BooleanProp, StringProp, RequiredProp, OptionalProp } from '@/util/prop-decorators';
import moment, { DurationInputArg1, Moment, MomentInput } from 'moment';
import { Component, Vue } from 'vue-property-decorator';
import schedule from './moment-ticker';

type NonEmptyMomentInput = Exclude<MomentInput, void>;
type NonEmptyDurationInput = Exclude<DurationInputArg1, void>;

@Component
export default class RelativeTime extends Vue {
  @RequiredProp()
  public date!: NonEmptyMomentInput;
  @OptionalProp()
  public min?: NonEmptyDurationInput;
  @OptionalProp()
  public max?: NonEmptyDurationInput;
  @OptionalProp()
  public reference?: NonEmptyMomentInput;
  @BooleanProp(false)
  public to!: boolean;
  @BooleanProp(true)
  public suffix!: boolean;
  @StringProp('L')
  public format!: string;

  // init with null to make sure its reactive
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public now: Moment = null as any;

  public get referenceDate() {
    return this.reference === undefined ? this.now : moment(this.reference);
  }

  public get momentDate() {
    return moment(this.date);
  }

  public get relativeDate() {
    const date = this.momentDate;
    const referenceDate = moment[this.to ? 'min' : 'max'](date, this.referenceDate);

    return date[this.to ? 'to' : 'from'](referenceDate, !this.suffix);
  }

  public get formattedDate() {
    return this.momentDate.format(this.format);
  }

  public get inRange() {
    if (
      this.min !== undefined &&
      this.referenceDate
        .clone()
        .add(moment.duration(this.min))
        .isAfter(this.momentDate)
    ) {
      return false;
    }

    if (
      this.max !== undefined &&
      this.referenceDate
        .clone()
        .add(moment.duration(this.max))
        .isBefore(this.momentDate)
    ) {
      return false;
    }

    return true;
  }

  public get displayDate() {
    return this.inRange ? this.relativeDate : this.formattedDate;
  }

  public created() {
    let unschedule: undefined | (() => void);

    this.$watch(
      () => this.reference === undefined,
      (live) => {
        if (!live) {
          if (unschedule) {
            this.$off('hook:beforeDestroy', unschedule);
            unschedule();
            unschedule = undefined;
          }

          return;
        }

        if (!this.now) {
          this.now = moment();
        }

        if (!unschedule) {
          unschedule = schedule((now) => (this.now = now));
          this.$once('hook:beforeDestroy', unschedule);
        }
      },
      { immediate: true },
    );
  }
}
</script>
