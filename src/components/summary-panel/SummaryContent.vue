<template lang="pug">
  .summary-content-wrapper(ref="summaryContentWrapper")
    .content
      .total-count
        doughnut-chart(
          :chartPoints="state"
          :colors="colors"
          style="width: 55px; height: 52px;"
        )
      .main
        .title
          slot
        .list
          .item
            span(:style="{color: colors[2]}")
              | {{ state[2] }} 
            span
              | {{ state[2] > 1 ? 'Sensor ' : 'Sensoren ' }} mit {{ state[2] > 1 ? 'Alarm' : 'Alarmen' }}
          .item
            span(:style="{color: colors[1]}")
              | {{ state[1] }} 
            span
              | {{ state[1] > 1 ? 'Sensor ' : 'Sensoren ' }} mit {{ state[1] > 1 ? 'Warnung' : 'Warnungen' }}
          .item
            span(:style="{color: colors[0]}")
              | {{ state[0] }} 
            span
              | {{ state[0] > 1 ? 'Sensor ' : 'Sensoren ' }} störungsfrei im Betrieb
    resize-observer(@notify="resized")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ArrayProp } from '@/util/prop-decorators';
import RelativeTime from '@/components/datetime/RelativeTime.global.vue';
import Throttle from '@/util/throttle-decorator';
import { ResizeObserver } from 'vue-resize';
import DoughnutChart from '@/components/charts/DoughnutChart.vue';

@Component({
  components: {
    DoughnutChart,
    RelativeTime,
    ResizeObserver,
  },
})
export default class SummaryContent extends Vue {
  @ArrayProp(true)
  private colors!: string[];
  @ArrayProp(true)
  private state!: number[];

  public $refs!: { summaryContentWrapper: Element };
  private panelWidth: number = 0;

  @Throttle(500, false)
  public resized() {
    this.panelWidth = this.$refs.summaryContentWrapper.clientWidth;
  }
}
</script>

<style lang="scss" scoped>
.summary-content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.content {
  display: flex;
  width: 100%;
  align-items: center;
}
.main {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.total-count {
  width: 55px;
  min-width: 55px;
  height: 52px;
  min-height: 52px;
  padding-top: 3px;
  margin-right: 27px;
  font-size: fontSize(fs-300);
  line-height: 50px;
  text-align: center;
  color: #333333;
  font-weight: 700;
}
.title {
  font-size: fontSize(fs-150);
}
.bar-wrapper {
  margin-top: 12px;
}
.bar {
  width: 100%;
  min-width: 132px;
  height: 8px;
  border-radius: 6px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
  background-color: colorVodafone(vodafone-red);
  overflow: hidden;
}
.online-bar {
  height: 8px;
  float: right;
  background-color: colorVodafone(digital-green);
}
.label {
  font-size: fontSize(fs-base);
  display: flex;
  justify-content: space-between;
}
.online {
  color: colorVodafone(digital-green);
}
.offline {
  color: colorVodafone(vodafone-red);
}
.report-date {
  font-size: fontSize(fs-base);
  color: #333333;
  margin-top: 5px;
  @include textOverflow();
}
</style>
