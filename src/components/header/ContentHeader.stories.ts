import { booleanProp, textProp, objectProp } from '@@/storybook/util';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import BreadcrumbItem from './BreadcrumbItem.global.vue';
import ContentHeader from './ContentHeader.global.vue';
import { FRAME } from '@@/storybook/util/frame-decorator';
import { actions } from '@storybook/addon-actions';

storiesOf('Visual|Content Header', module)
  .addDecorator(withKnobs)

  .add(
    'Showcase',
    () => ({
      components: {
        BreadcrumbItem,
        ContentHeader,
      },
      data() {
        return {
          items: [
            { label: '63165 Mühlheim am Main' },
            { label: 'Seewiese 6' },
            { label: 'Staffelgeschoss' },
            { label: 'Wohnung 35' },
            { label: 'Flur' },
          ],
        };
      },
      template: `
        <ui-flex>
          <ui-cell :basis="1">
            <content-header headline="Without back link">
              <template v-for="{ label } of items">
                <breadcrumb-item @click="onBreadcrumbClick(label, ...arguments)">{{ label }}</breadcrumb-item>{{ ' ' }}
              </template>
            </content-header>
          </ui-cell>
          <ui-cell :basis="1">
            <content-header headline="With back link" back-link @backClick="onBackClick">
              <template v-for="{ label } of items">
                <breadcrumb-item @click="onBreadcrumbClick(label, ...arguments)">{{ label }}</breadcrumb-item>{{ ' ' }}
              </template>
            </content-header>
          </ui-cell>
        </ui-flex>
      `,
      methods: {
        ...actions('onBackClick', 'onBreadcrumbClick'),
      },
    }),
    {
      [FRAME]: { size: 0 },
    },
  )

  .add(
    'Sandbox',
    () => ({
      props: {
        headline: textProp('Headline', 'Wohnung 35'),
        backLink: booleanProp('Back Link', true),
        items: objectProp(
          'Items',
          [
            { label: '63165 Mühlheim am Main' },
            { label: 'Seewiese 6' },
            { label: 'Staffelgeschoss' },
            { label: 'Wohnung 35' },
            { label: 'Flur' },
          ],
          true,
        ),
      },
      components: {
        BreadcrumbItem,
        ContentHeader,
      },
      template: `
      <content-header v-bind="$props" @backClick="onBackClick">
        <template v-for="{ label } of items">
          <breadcrumb-item @click="onBreadcrumbClick(label, ...arguments)">{{ label }}</breadcrumb-item>{{ ' ' }}
        </template>
      </content-header>
    `,
      methods: {
        ...actions('onBackClick', 'onBreadcrumbClick'),
      },
    }),
    {
      [FRAME]: { size: 0 },
    },
  )

  .add(
    'Dev',
    () => ({
      components: {
        BreadcrumbItem,
        ContentHeader,
      },
      template: `
        <content-header headline="Wohnung 35" back-link>
          <breadcrumb-item>63165 Mühlheim am Main</breadcrumb-item>
          <breadcrumb-item>Seewiese 6</breadcrumb-item>
          <breadcrumb-item>Staffelgeschoss</breadcrumb-item>
          <breadcrumb-item>Wohnung 35</breadcrumb-item>
          <breadcrumb-item>Flur</breadcrumb-item>
        </content-header>
      `,
    }),
    {
      [FRAME]: true,
    },
  );
