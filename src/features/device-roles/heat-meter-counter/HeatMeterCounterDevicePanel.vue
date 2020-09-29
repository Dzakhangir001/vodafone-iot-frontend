<template lang="pug">
  device-panel(v-bind="$attrs")
    template(#actions)
      slot(name="actions")
    template(#properties)
      slot(name="properties")
    template(#overlay)
      slot(name="overlay")
    template(#content)
      counter(:icon="heatMeterCounterSm" :value="meterReading")
        ui-date(:date="meterReadingDate" format="YYYY")
        | {{ '' }} (kWh)
      counter(:icon="heatMeterCounterSm" :value="meterReadingLastPeriod")
        ui-date(:date="meterReadingLastPeriodDate" format="YYYY")
        | {{ '' }} (kWh)
      counter(:icon="heatMeterCounterSm" :value="meterReadingLastPeriodDiff")
        | Differenz {{ '' }}
        ui-date(:date="meterReadingLastPeriodDate" format="YYYY")
        | {{ ' / ' }}
        ui-date(:date="meterReadingDate" format="YYYY")
        | {{ '' }} (kWh)
      counter(:icon="heatMeterCounterSm" :value="meterReadingLastMonth")
        ui-date(:date="meterReadingLastMonthDate" format="MMMM YYYY" #default="{ formattedDate }")
          | Letzter Monat {{ formattedDate }}
        | {{ '' }} (kWh)
</template>

<script lang="ts">
import Counter from '@/components/sensor/Counter.vue';
import DevicePanel from '@/components/sensor/DevicePanel.vue';
import { NumberProp, OptionalProp } from '@/util/prop-decorators';
import { MomentInput } from 'moment';
import { Component, Vue } from 'vue-property-decorator';
import heatMeterCounterSm from './heat-meter-counter-sm.svg';

@Component({ components: { DevicePanel, Counter } })
export default class HeatMeterCounterDevicePanel extends Vue {
  @NumberProp()
  private readonly meterReading?: number;

  @OptionalProp()
  private readonly meterReadingDate?: Exclude<MomentInput, void>;

  @NumberProp()
  private readonly meterReadingLastPeriod?: number;

  @OptionalProp()
  private readonly meterReadingLastPeriodDate?: Exclude<MomentInput, void>;

  @NumberProp()
  private readonly meterReadingLastMonth?: number;

  @OptionalProp()
  private readonly meterReadingLastMonthDate?: Exclude<MomentInput, void>;

  private readonly heatMeterCounterSm = heatMeterCounterSm;

  private get meterReadingLastPeriodDiff(): number | undefined {
    const current = this.meterReading;
    const last = this.meterReadingLastPeriod;

    return current && last ? Math.max(0, current - last) : undefined;
  }
}
</script>
