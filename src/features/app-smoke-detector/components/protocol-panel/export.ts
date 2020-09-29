import { kebabCase } from 'lodash';
import moment from 'moment';
import { Component, Vue } from 'vue-property-decorator';
import { AppSmokeDetectorProtocolFragment } from './__generated__/AppSmokeDetectorProtocolFragment';
import { resolveMetricState } from '../../util/metrics';

const STATE_LABELS = { GREEN: 'OK', RED: 'Problem!', GRAY: 'Unbekannt' };

export function compileExportData(apartments: AppSmokeDetectorProtocolFragment['apartments']): object[] {
  const data = [];

  for (const { name, devices } of apartments) {
    for (const device of devices) {
      data.push({
        Wohnung: name,
        Raum: device.room.name,
        Seriennummer: device.meta.serial,
        Verbindung: STATE_LABELS[resolveMetricState(device, 'connection')],
        Energieversorgung: STATE_LABELS[resolveMetricState(device, 'battery')],
        Verschmutzung: STATE_LABELS[resolveMetricState(device, 'pollution')],
        'Demontage Erkennung': STATE_LABELS[resolveMetricState(device, 'montage')],
        Funkmodul: STATE_LABELS[resolveMetricState(device, 'radio')],
        // 'Kontrolle des Warnsignals': STATE_LABELS[resolveMetricState(device, 'sounder')],
        // 'Kontrolle der Rauchkammer': STATE_LABELS[resolveMetricState(device, 'smokebox')],
      });
    }
  }

  return data;
}

export function generateExportFilename(apartments: AppSmokeDetectorProtocolFragment['apartments']): string {
  if (apartments.length !== 1) {
    return `rauchwarnmelder-protokoll--${moment().format('YYYY-MM-DD--HH-mm-ss')}.csv`;
  }

  const [apartment] = apartments;

  return `rauchwarnmelder-protokoll-${kebabCase(apartment.name)}--${moment().format('YYYY-MM-DD--HH-mm-ss')}.csv`;
}

@Component
export class ExportMixin extends Vue {
  protected readonly compileExportData = compileExportData;
  protected readonly generateExportFilename = generateExportFilename;
}
