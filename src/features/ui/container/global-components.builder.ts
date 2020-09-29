import { configure } from '@/util/container';
import registerComponents from '@/util/component-loader';
import { VUE } from '@/features/core/container';

export default configure(async (get) => {
  const vue = await get(VUE);

  registerComponents(vue, require.context('..', true, /\.global\.vue$/), 'ui-');
  registerComponents(vue, require.context('../../../components', true, /\.global\.vue$/), 'ui-');
});
