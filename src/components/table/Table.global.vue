<template lang="pug">
  .table-wrapper(:class="{ striped }")
    ui-flex(v-if="exportable" align="flex-start")
      ui-cell(:basis="0" :max="70")
        ui-button(@click="downloadPDF")
          | PDF
      ui-cell(:basis="0" :max="70")
        vue-json-csv(:data="textData" name="table.csv" :labels="labels")
          ui-button
            | CSV
    table.table(ref="table")
      thead
        tr
          th.header-cell.cell(
            v-for="column in shownColumns"
            :class="{ sortable: column.sortable }"
            :style="{ 'text-align': column.align, width: column.width }"
            @click="toggleSortKey(column)"
          )
            slot(:name="`${column.name}.label`" :column="column")
              .header(:class="{ [getSortDirection(column)]: column.sortable }")
                | {{ column.label }}
          th.column-filter(v-if="hideableColumns")
            ui-tooltip(:hide-delay="0" placement="bottom" trigger="click")
              template(#default)
                ui-clickable
                  img.column-filter-icon(:src="columnIcon")
              template(#content)
                .hideable-column(v-for="column in normalizedColumns.filter(({ hideable }) => hideable)")
                  ui-list-check-box(v-model="shownColumnIndexes" :value="column.index")
                    | {{ column.label }}
      tbody
        tr.row(v-for="(row, index) in data")
          td.cell(v-for="column in shownColumns" :style="{ 'text-align': column.align, width: column.width }")
            slot(
              :name="column.name"
              :row="row"
              :index="index"
              :first="row === 0"
              :last="row === data.length - 1"
              :column="column"
              :value="get(row, column.field)"
            )
              | {{ get(row, column.field) }}
          td(v-if="hideableColumns")
</template>

<script lang="ts">
import UiClickable from '@/components/clickables/Clickable.global.vue';
import { Order } from '@/types/iot-portal';
import { toLength } from '@/util/css-length';
import { isString } from '@/util/lang';
import { ArrayProp, BooleanProp, EnumProp, LengthProp } from '@/util/prop-decorators';
import { get, startCase } from 'lodash';
import { Component, Vue } from 'vue-property-decorator';
import columnIcon from './assets/column-icon.svg';
import { Column, SortKey, TextTransformer, NormalizedColumnOptions } from './model';
import html2pdf from 'html2pdf.js';
import VueJsonCsv from 'vue-json-csv';

const DEFAULT_TEXT_TRANSFORMER: TextTransformer = (row, column, value) => String(value);

@Component({ components: { UiClickable, VueJsonCsv } })
export default class Table extends Vue {
  @ArrayProp(true)
  private readonly data!: object[];
  @ArrayProp(true)
  private readonly columns!: Column[];
  @EnumProp('left', 'center', 'right')
  private readonly align!: 'left' | 'center' | 'right';
  @LengthProp()
  private readonly width?: number | string;
  @BooleanProp()
  private readonly striped!: boolean;
  @ArrayProp(() => [])
  private readonly sortKeys!: SortKey[];
  @BooleanProp()
  private readonly exportable!: boolean;

  private shownColumnIndexes = new Array<number>();

  private readonly get = get;
  private readonly columnIcon = columnIcon;

  private get normalizedColumns(): NormalizedColumnOptions[] {
    return this.columns
      .map((column) => (isString(column) ? { name: column } : column))
      .map(({ name, field, label, align, sortable, hideable, width, textTransformer, exportable }, index) => ({
        name,
        field: field || name,
        label: label === undefined ? startCase(name) : label,
        sortable: sortable === true ? name : sortable || undefined,
        align: align || this.align,
        hideable: hideable || false,
        index,
        width: toLength(width === undefined ? this.width : width),
        exportable: exportable === undefined ? true : exportable,
        textTransformer: textTransformer || DEFAULT_TEXT_TRANSFORMER,
      }));
  }

  private get shownColumns(): NormalizedColumnOptions[] {
    return this.normalizedColumns.filter(({ hideable, index }) => !hideable || this.shownColumnIndexes.includes(index));
  }

  private get exportableColumns(): NormalizedColumnOptions[] {
    return this.shownColumns.filter(({ exportable }) => exportable);
  }

  private get hideableColumns(): boolean {
    return this.normalizedColumns.some(({ hideable }) => hideable);
  }

  private get labels(): Record<string, string> {
    const entries = this.normalizedColumns.map(({ name, label }) => [name, label]);

    return Object.fromEntries(entries);
  }

  private get textData(): Record<string, string>[] {
    return this.data.map((row) => {
      const entries = this.exportableColumns.map((column) => {
        const value = get(row, column.field);

        return [column.name, column.textTransformer(row, column, value)];
      });

      return Object.fromEntries(entries);
    });
  }

  private created(): void {
    this.shownColumnIndexes = this.normalizedColumns.map((column, index) => index);
  }

  private downloadPDF(): void {
    const page = this.$refs.table;
    const opt = {
      margin: [10, 0],
      filename: 'table.pdf',
      html2canvas: { scale: 2 },
    };
    html2pdf()
      .set(opt)
      .from(page)
      .save();
  }

  private getSortDirection({ sortable }: NormalizedColumnOptions): Order {
    const { direction } = this.sortKeys.find(({ key }) => key === sortable) || { direction: Order.ASC };

    return direction;
  }

  private toggleSortKey(column: NormalizedColumnOptions): void {
    if (!column.sortable) {
      return;
    }

    const sortKeys = this.sortKeys.filter(({ key }) => key !== column.sortable);

    sortKeys.unshift({
      key: column.sortable,
      direction: this.getSortDirection(column) === Order.ASC ? Order.DESC : Order.ASC,
    });

    this.$emit('update:sortKeys', sortKeys);
  }
}
</script>

<style lang="scss" scoped>
.table-wrapper {
  overflow-y: auto;
  max-width: 100%;
}
.table {
  width: 100%;
  color: colorVodafone(black);
  border-collapse: collapse;
  font-size: fontSize(fs-100);
}
th.sortable {
  cursor: pointer;
  user-select: none;
}
.header-cell {
  font-size: fontSize(fs-base);
}
.header {
  @include textOverflow();
  font-weight: 400;
  color: colorVodafone(vodafone-red);
}
.header::after {
  display: inline-block;
  position: relative;
  margin-left: 0.5ch;
  bottom: 1px;
  width: 8px;
  height: 6px;
}
.header.ASC::after {
  content: url(./assets/arrow-asc.svg);
}
.header.DESC::after {
  content: url(./assets/arrow-desc.svg);
}
.column-filter {
  width: 16px;
}
.column-filter-icon {
  margin-top: 6px;
}
.hideable-column {
  padding: 3px;
}
.striped .row:nth-child(odd) {
  background-color: colorVodafone(lighter);
}
.cell {
  padding: 15px 20px 15px 20px;
}
</style>
