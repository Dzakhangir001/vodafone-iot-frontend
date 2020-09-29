<template lang="pug">
  .map-wrapper
    .map(ref="map")
    .content
      slot
</template>

<script lang="ts">
import Debounce from '@/util/debounce-decorator';
import NextTick from '@/util/next-tick-decorator';
import { Map as OlMap, View } from 'ol';
import { defaults } from 'ol/control';
import { Extent, boundingExtent } from 'ol/extent';
import { Tile as TileLayer } from 'ol/layer';
import { OSM } from 'ol/source';
import { FitOptions } from 'ol/View';
import { Component, Provide, Vue } from 'vue-property-decorator';
import { GET_MAP, LOCATION_GERMANY, REFIT } from './model';

@Component
export default class Map extends Vue {
  // non-reactivity intended
  public map!: OlMap;
  public fitting!: boolean;
  public interacted!: boolean;

  public readonly $refs!: { map: HTMLElement };

  @Provide(GET_MAP)
  private getMap(): OlMap {
    return this.map;
  }

  @Provide(REFIT)
  @Debounce(200)
  @NextTick(true)
  private refit(force = false): void {
    if (!force && this.interacted) {
      return;
    }

    const extent = boundingExtent(
      this.map
        .getOverlays()
        .getArray()
        .map((overlay) => overlay.getPosition()),
    );

    this.fit(extent, { maxZoom: 16, padding: [60, 60, 60, 60] });
  }

  private created(): void {
    this.fitting = false;
    this.interacted = false;

    const controls = defaults({ attribution: false });
    const source = new OSM({ url: 'https://openstreetmap.smartwowi.de/tile/{z}/{x}/{y}.png' });
    const layers = [new TileLayer({ source })];
    const view = new View({ center: LOCATION_GERMANY, zoom: 5, enableRotation: false });

    this.map = new OlMap({ controls, layers, view });

    const onViewChange = () => {
      if (this.fitting) {
        return;
      }

      this.interacted = true;
      view.un('change', onViewChange);
    };
    view.on('change', onViewChange);
  }

  private mounted(): void {
    this.map.setTarget(this.$refs.map);
  }

  private destroyed(): void {
    this.map.setTarget(undefined);
    this.map = (undefined as unknown) as OlMap;
  }

  private fit(extent: Extent, options?: FitOptions): void {
    this.fitting = true;
    const { callback = undefined } = options || {};

    this.map.getView().fit(extent, {
      ...options,
      callback: (...args) => {
        this.fitting = false;

        if (callback) {
          callback(...args);
        }
      },
    });
  }
}
</script>

<style lang="scss" scoped>
@import '~ol/ol.css';

.map-wrapper,
.map {
  width: 100%;
  height: 100%;
}
.content {
  display: none;
}
</style>
