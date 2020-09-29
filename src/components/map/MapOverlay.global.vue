<template lang="pug">
  .overlay-container(ref="overlay")
    slot
</template>

<script lang="ts">
import { ArrayProp, EnumProp } from '@/util/prop-decorators';
import { Overlay } from 'ol';
import { Coordinate } from 'ol/coordinate';
import OverlayPositioning from 'ol/OverlayPositioning';
import { fromLonLat } from 'ol/proj';
import { Component, Vue, Inject, Watch } from 'vue-property-decorator';
import Map from './Map.global.vue';
import { GET_MAP, REFIT } from './model';

@Component
export default class MapOverlay extends Vue {
  @ArrayProp(true)
  private readonly position!: Coordinate;

  @EnumProp('center-center')
  private readonly positioning!: OverlayPositioning;

  // non-reactivity intended
  private overlay!: Overlay;

  public readonly $refs!: { overlay: HTMLElement };

  @Inject(GET_MAP)
  private readonly getMap!: Map['getMap'];

  @Inject(REFIT)
  private readonly refit!: Map['refit'];

  @Watch('position')
  private updatePosition(position: Coordinate): void {
    this.overlay.setPosition(fromLonLat(position));
    this.refit();
  }

  private mounted(): void {
    this.overlay = new Overlay({
      position: fromLonLat(this.position),
      positioning: this.positioning,
      element: this.$refs.overlay,
      // stopEvent: false,
      autoPan: false,
    });

    this.getMap().addOverlay(this.overlay);
    this.refit();
  }
}
</script>
