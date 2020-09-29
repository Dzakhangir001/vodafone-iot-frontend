<template lang="pug">
  ui-panel
    ui-table(:columns="columns" :data="files.items" striped)
      template(#createdAt="{ value }")
        ui-date(:date="value")
      template(#context="{ row, value }")
        | {{ value[value.length - 1].name }}
      template(#devices="{ value }")
        | {{ value.length }}
      template(#preview="{ row, value }")
        ui-clickable(@click="onPreview(row)")
          img(:src="previewIcon" alt="preview")
      template(#export="{ row, last }")
        .export
          ui-button.button(@click="onExportAsPdf(row)")
            img.arrow(src="./export.svg" alt="Export")
            | PDF
          | {{ ' \xa0 ' }}
          vue-json-csv.button(:data="compileExportData(row)" :name="generateExportFilename(row)")
            ui-button
              img.arrow(src="./export.svg" alt="Export")
              | CSV
    ui-pagination(:total-pages="totalPages" :value="currentPage" @input="$emit('update:currentPage', $event)")
    ui-modal(ref="modal" :visible="previewOpen" no-close-on-backdrop)
      preview-panel(:data="previewData" @close="previewOpen = false")
    preview-panel(
      ref="preview"
      v-if="files.items.length > 0"
      :style="{ display: 'none' }"
      :data="previewData || files.items[0]"
      @close="previewOpen = false"
    )
</template>

<script lang="ts">
import { ObjectProp, NumberProp } from '@/util/prop-decorators';
import { kebabCase, last } from 'lodash';
import moment from 'moment';
import html2pdf from 'html2pdf.js';
import VueJsonCsv from 'vue-json-csv';
import { Component, Vue } from 'vue-property-decorator';
import { AppSmokeDetectorFilesFragment } from './__generated__/AppSmokeDetectorFilesFragment';
import PreviewPanel from './PreviewPanel.vue';
import exportIcon from './export.svg';
import previewIcon from './preview.svg';

const TAKE = 30;

@Component({
  components: { VueJsonCsv, PreviewPanel },
  data() {
    return { previewData: undefined };
  },
})
export default class FilesPanel extends Vue {
  @ObjectProp()
  private readonly files!: AppSmokeDetectorFilesFragment['files'];
  @NumberProp()
  private readonly count!: number;
  @NumberProp()
  private readonly currentPage!: number;

  private previewOpen: boolean = false;
  private previewData?: AppSmokeDetectorFilesFragment['files']['items'][number];

  private readonly columns = [
    { name: 'createdAt', label: 'Datum', width: 70 },
    { name: 'context', label: 'Datei' },
    { name: 'devices', label: 'Anzahl der Geräte', align: 'right', width: 160 },
    { name: 'preview', label: 'Vorschau', align: 'center', width: 68 },
    { name: 'export', label: 'Export', align: 'right', width: 100 },
  ];

  private readonly exportIcon = exportIcon;
  private readonly previewIcon = previewIcon;

  private get totalPages(): number {
    return this.files ? Math.ceil(this.files.count / TAKE) : 0;
  }

  private compileExportData(file: AppSmokeDetectorFilesFragment['files']['items'][number]): Record<string, string>[] {
    const keys: Record<string, string> = {
      battery: 'Energieversorgung',
      connection: 'Verbindung',
      pollution: 'Verschmutzung',
      montage: 'Demontage Erkennung',
      radio: 'Funkmodul',
    };

    return file.devices.map((device) => {
      const item: Record<string, string> = {
        Raum: device.site.name,
        Seriennummer: device.serial,
        Verbindung: 'Unbekannt',
        Energieversorgung: 'Unbekannt',
        Verschmutzung: 'Unbekannt',
        'Demontage Erkennung': 'Unbekannt',
        Funkmodul: 'Unbekannt',
      };

      for (const { name, ok } of device.checks) {
        if (keys[name]) {
          item[keys[name]] = ok ? 'OK' : 'Problem!';
        }
      }

      return item;
    });
  }

  private generateExportFilename(file: AppSmokeDetectorFilesFragment['files']['items'][number]): string {
    const context = last(file.context);
    const date = moment(file.createdAt).format('YYYY-MM-DD--HH-mm-ss');

    if (!context) {
      return `rauchwarnmelder-protokoll--${date}.csv`;
    }

    return `rauchwarnmelder-protokoll-${kebabCase(context.name)}--${date}.csv`;
  }

  private onPreview(data: AppSmokeDetectorFilesFragment['files']['items'][number]) {
    this.previewData = data;
    this.previewOpen = true;
  }

  private onExportAsPdf(data: AppSmokeDetectorFilesFragment['files']['items'][number]): void {
    this.previewData = data;

    const preview = this.$refs.preview as Vue;
    const page = preview.$refs.page;
    const opt = {
      margin: 0,
      filename: 'Wartungsprotokoll ' + moment(data.createdAt).format('YYYY') + '.pdf',
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
.export {
  display: flex;
}
.button:nth-child(n + 1) {
  margin-left: 1ch;
}
.arrow {
  width: 9px;
  height: 7px;
  margin-right: 6px;
  margin-bottom: 1px;
}
</style>
