<template lang="pug">
  span.date-container
    slot(v-if="date === undefined" name="empty")
      | {{ emptyMessage }}
    time(v-else-if="momentDate.isValid()" :datetime="momentDate.toISOString()" :title="momentDate.format('LLL')")
      slot(v-bind="{ momentDate, formattedDate }")
        | {{ formattedDate }}
    slot(v-else name="invalid")
      | {{ invalidMessage.replace('{' + '{ date }' + '}', date) }}
</template>

<script lang="ts">
import { StringProp, OptionalProp } from '@/util/prop-decorators';
import moment, { MomentInput } from 'moment';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Date extends Vue {
  @OptionalProp()
  public date?: Exclude<MomentInput, void>;

  @StringProp('L')
  public format!: string;

  @StringProp('Ungültiges Datum {{ date }}')
  public invalidMessage!: string;

  @StringProp('')
  public emptyMessage!: string;

  public get momentDate() {
    return moment(this.date);
  }

  public get formattedDate() {
    return this.momentDate.format(this.format);
  }
}
</script>
