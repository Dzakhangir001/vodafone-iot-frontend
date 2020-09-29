<template lang="pug">
  .preview-panel
    .modal-header
      h5.modal-title
        | Pdf Preview
      ui-clickable.close-button(tag="button" @click="$emit('close')")
        img(src="@/components/binding-wizard/icons/wizard-close.svg" alt="Schließen")
    .page-wrapper
      .page(ref="page")
        .header
          div
            .title
              | {{ title }}
            .sub-title
              | Protokoll zur Installation und Prüfung von Rauchwarnmeldern gemäß DIN 14676
          img.logo(
            src="@/assets/images/logos/vodafone.png"
            alt="Vodafone"
            width="65"
          )
        .divider
        .info
          .maintenance
            .label
              | Wartungsinformationen
            .info-items
              info-item(label="Inspektionsdatum" :value="moment(data.createdAt).format('L')")
              info-item(label="Letzte Inspektion" value="n/a")
              info-item(label="Zeitraum zwischen der Inspektion" value="n/a")
          .device
            .label
              | Geräteinformationen
            .info-items
              info-item(label="Buchungskreis" value="n/a")
              info-item(label="Adresse" value="n/a")
              info-item(label="Etage" :value="floor")
              info-item(label="Wohnung" :value="apartment")
              info-item(label="Wirtschaftseinheit" value="n/a")
        .divider
        .check-points
          .label
            | Prüfungspunkte
          ui-table(:columns="columns.concat(stateColumns)" :data="checkPoints" striped)
            template(v-for="{ name, label } of columns.concat(stateColumns)" :slot="name + '.label'")
              .theader
                | {{ label }}
            template(v-for="{ name } of stateColumns" #[name]="{ row }")
              img(:src="stateIndicator(row[name])" alt="")
    .modal-footer
      ui-flat-button(color="RED" fixed-width @click="")
        | Drucken
      ui-flat-button.download(color="RED" fixed-width @click="downloadAsPdf()")
        | Download PDF
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { AppSmokeDetectorFilesFragment } from './__generated__/AppSmokeDetectorFilesFragment';
import { ObjectProp } from '@/util/prop-decorators';
import { Column } from '@/components/table/model';
import InfoItem from './InfoItem.vue';
import GREEN from '../state-list/green.svg';
import GRAY from '../state-list/gray.svg';
import RED from '../state-list/red.svg';
import html2pdf from 'html2pdf.js';
import moment from 'moment';
import { find, get } from 'lodash';
import { NodeType } from '@/types/iot-portal';

@Component({ components: { InfoItem } })
export default class PreviewPanel extends Vue {
  @ObjectProp(true)
  private readonly data!: AppSmokeDetectorFilesFragment['files']['items'][number];

  private moment = moment;

  private stateIndicator(check?: boolean): string {
    return check === undefined ? GRAY : check ? GREEN : RED;
  }

  private readonly columns: readonly Column[] = [
    { label: 'Seriennummer', name: 'serial', align: 'left' },
    { label: 'Raum', name: 'room', align: 'left' },
  ];
  private readonly stateColumns: readonly Column[] = [
    { label: 'Verbindung', name: 'connection', align: 'center' },
    { label: 'Batterie', name: 'battery', align: 'center' },
    { label: 'Verschmutzung', name: 'pollution', align: 'center' },
    { label: 'Montage', name: 'montage', align: 'center' },
    { label: 'Funkmodul', name: 'radio', align: 'center' },
  ];
  private get title(): string {
    return 'Wartungsprotokoll ' + moment(this.data.createdAt).format('YYYY');
  }
  private get floor(): string {
    return get(find(this.data.context, { type: NodeType.FLOOR }), 'name', 'n/a');
  }
  private get apartment(): string {
    return get(find(this.data.context, { type: NodeType.APARTMENT }), 'name', 'n/a');
  }
  private get checkPoints(): object[] {
    return this.data.devices.map((device) => {
      let checkPoint = {
        serial: device.serial,
        room: device.site.name,
      };
      for (const check of device.checks) {
        checkPoint = { ...checkPoint, [check.name]: check.ok };
      }
      return checkPoint;
    });
  }

  private downloadAsPdf(): void {
    const page = this.$refs.page;
    const opt = {
      margin: [10, 0],
      filename: this.title + '.pdf',
      html2canvas: { scale: 2 },
    };
    html2pdf()
      .set(opt)
      .from(page)
      .save();
  }
}
</script>

<style lang="scss" scoped>
.preview-panel {
  width: 800px;
  padding: 16px 30px;
}
.modal-header {
  margin-bottom: 5px;
  display: flex;
}
.modal-title {
  margin: 0 auto 0 0;
  @include textOverflow();
  color: colorVodafone(vodafone-red);
  font-size: fontSize(fs-200);
  line-height: lineHeight(lh-reset);
  font-weight: 400;
}
.close-button {
  outline: none;
  margin-left: 5px;
  border: none;
  padding: 0;
  background: transparent;
}
.page-wrapper {
  border: 1px solid #ddd;
}
.page {
  display: flex;
  flex-direction: column;
  padding: 40px;
}
.header {
  display: flex;
  margin-bottom: 20px;
}
.title {
  color: colorVodafone(black);
  font-size: fontSize(fs-200);
  line-height: lineHeight(lh-reset);
}
.sub-title {
  color: colorVodafone(grey);
  font-size: fontSize(fs-100);
  line-height: lineHeight(lh-reset);
  margin-top: 5px;
}
.logo {
  margin-left: auto;
  width: 65px;
}
.divider {
  width: 100%;
  height: 3px;
  background-color: #ddd;
}
.info {
  margin: 20px 0 20px 0;
  display: flex;
}
.maintenance {
  width: 35%;
}
.info-items {
  display: flex;
  flex-wrap: wrap;
}
.device {
  width: 65%;
}
.check-points {
  margin: 20px 0 20px 0;
}
.theader {
  font-size: 12px;
  line-height: lineHeight(lh-reset);
  color: colorVodafone(vodafone-red);
}
.modal-footer {
  text-align: right;
  margin-top: 30px;
}
.download {
  margin-left: 10px;
}
</style>
