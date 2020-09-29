<template lang="pug">
  .apartment-list-panel-container
    .header
      span Geräte
      span Standort
    ul.content
      slot
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ApartmentListPanel extends Vue {}
</script>

<style lang="scss" scoped>
.apartment-list-panel-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 35px 30px 20px 30px;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.13);
  border-radius: 4px;
  background-color: colorVodafone(white);
}
.title {
  width: 100%;
  height: 22px;
  color: colorVodafone(black);
  font-size: fontSize(fs-base);
  line-height: lineHeight(lh-100);
  padding: 0 10px 0 10px;
  box-sizing: border-box;
  margin-bottom: 15px;
}
.header {
  display: flex;
  justify-content: space-between;
  font-size: fontSize(fs-base);
  line-height: lineHeight(lh-100);
  padding: 0 15px 0 15px;
  box-sizing: border-box;
  margin-bottom: 10px;
}
.content {
  padding: 0;
}
</style>
