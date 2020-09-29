import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import Pagination from './Pagination.global.vue';

storiesOf('Components|Pagination', module)
  .addDecorator(withKnobs)

  .add('Showcase', () => ({
    components: {
      subject: Pagination,
    },
    data() {
      return {
        page: 1,
      };
    },
    template: `
      <div style="width: 100%; height: 100%; position: absolute; top: 50%;">
        <ui-panel>
          <subject :value="1" :total-pages="20" v-model="page" />
        </ui-panel>
        <p>Current page: {{ page }}</p>
      </div>
    `,
  }));
