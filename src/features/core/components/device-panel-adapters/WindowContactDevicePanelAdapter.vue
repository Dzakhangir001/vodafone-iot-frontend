<template lang="pug">
  device-panel(v-bind="$attrs" :background-image="backgroundImage")
    template(#actions)
      slot(name="actions")
    template(#properties)
      slot(name="properties")
    template(#overlay)
      slot(name="overlay")
    template(#footer)
      .state
        p.last-activity(v-if="opened")
          ui-relative-time(:date="opened.date" #default="{ displayDate }")
            | Letzte Statusänderung: {{ displayDate }} {{ opened.value === '1' ? 'geöffnet' : 'geschlossen' }}
        p.last-updated(v-if="lastUpdateDate")
          ui-relative-time(:date="lastUpdateDate" #default="{ displayDate }")
            | Letztes Update: {{ displayDate }}
</template>

<script lang="ts">
import DevicePanel from '@/components/sensor/DevicePanel.vue';
import { ObjectProp } from '@/util/prop-decorators';
import { Component, Mixins } from 'vue-property-decorator';
import windowClosedImage from '../../assets/device-roles/window-contact-lg-close.svg';
import { DevicePanelQuery } from '../device-panel/__generated__/DevicePanelQuery';
import DeviceRoleMapMixin from '../mixins/device-role-map';
import MetricMapMixin, { DataPoint } from './metric-map-mixin';

@Component({ components: { DevicePanel } })
export default class WindowContactDevicePanelAdapter extends Mixins(DeviceRoleMapMixin, MetricMapMixin) {
  @ObjectProp(true)
  private readonly device!: DevicePanelQuery['data'];

  private get opened(): DataPoint | undefined {
    return this.latestDataPoint('opened');
  }

  private get backgroundImage(): string {
    if (!this.metricMap) {
      return windowClosedImage;
    }

    const metric = this.metricMap.opened;

    if (metric && metric.__typename === 'DiscreteMetric' && metric.DISCRETE && metric.DISCRETE.value !== '1') {
      return windowClosedImage;
    }

    const { lg, md } = this.deviceRoleMap.WINDOW_CONTACT.icons;

    return lg || md;
  }
}
</script>

<style lang="scss" scoped>
.state {
  position: relative;
  margin: 0 0 16px;
  font-size: fontSize(fs-50);
  line-height: lineHeight(lh-reset);
  text-align: center;
}
.last-activity {
  margin: 0;
  padding: 0 16px;
  @include textOverflow();
}
</style>
