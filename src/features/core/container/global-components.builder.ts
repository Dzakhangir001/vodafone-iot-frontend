import { builder } from '@/util/container';
import registerComponents from '@/util/component-loader';
import { VUE } from '.';

export default builder(({ configure }) => {
  configure(async (get) => {
    const vue = await get(VUE);

    registerComponents(vue, require.context('..', true, /\.global\.vue$/), 'core-');
  });
});
