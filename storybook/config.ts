import container from '@/bootstrap';
import './styles/main.scss';
import { addDecorator, addParameters, configure } from '@storybook/vue';
import { startCase, trim } from 'lodash';
import { backgroundColors } from '@/styles/export.scss';
import frame from './util/frame-decorator';
import injectContainer from './util/inject-container';

function* parseBackgrounds(backgrounds: string): Iterable<object> {
  let def = true;

  for (const background of backgrounds.slice(2, -2).split(',')) {
    const [name, value] = background.split(':').map(trim);
    yield { name: startCase(name), value, default: def };

    def = false;
  }
}

// TODO cant use storybook theming: https://github.com/storybookjs/storybook/issues/7379

addParameters({
  options: {},
  backgroundColors,
  backgrounds: [...parseBackgrounds(backgroundColors)],
});
addDecorator(injectContainer(container));
addDecorator(frame());

configure(() => {
  const src = require.context('../src', true, /\.stories\.ts$/);
  src.keys().forEach((filename) => src(filename));

  const storybook = require.context('../storybook', true, /\.stories\.ts$/);
  storybook.keys().forEach((filename) => storybook(filename));
}, module);
