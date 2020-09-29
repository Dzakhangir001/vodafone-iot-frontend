import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import centered from '@storybook/addon-centered/dist/vue';
import Emblem from '@/components/images/Emblem.vue';
import bathroom from '@/assets/images/rooms/bathroom.svg';

storiesOf('Utility | Emblem', module)
  .addDecorator(centered)
  .addDecorator(withKnobs)
  .add('Showcase', () => ({
    components: {
      Emblem,
    },
    data() {
      return {
        bathroom,
        firstEmblemSelect: false,
        secondEmblemSelect: false,
      };
    },
    template: `
        <div>
          <emblem
            :src="bathroom"
            label="image"
            :border-color="firstEmblemSelect ? 'blue' : undefined"
            @click.native="firstEmblemSelect = !firstEmblemSelect"
           />
          <emblem
            label="DIV"
            border-color="red"
            :border-color="secondEmblemSelect ? 'red' : undefined"
            @click.native="secondEmblemSelect = !secondEmblemSelect"
          />
        </div>
      `,
  }));
