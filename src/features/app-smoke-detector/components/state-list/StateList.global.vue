<template lang="pug">
  .smoke-detector-state-list-wrapper
    .header
      .hblock
        .floor
          | Etage
        .apartment
          | Wohnung
      .hblock
        .state
          | Wartungszustand
    .list
      slot
        span.no-device
          | Keine Rauchwarnmelder gefunden

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class StateList extends Vue {}
</script>

<style lang="scss" scoped>
.smoke-detector-state-list-wrapper {
  box-sizing: border-box;
  width: 100%;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.13);
  border-radius: 4px;
  background-color: colorVodafone(white);
  padding: 20px;
}
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 10px 10px 60px;
}
.hblock {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.floor {
  min-width: 100px;
}
.list {
  display: flex;
  flex-direction: column;
}
.no-device {
  margin-top: 5px;
  text-align: center;
}
</style>
