import { builder } from '@/util/container';
import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { API_CLIENT, ROOT_COMPONENT, ROUTER, STORE, VUE } from '.';
import App from '../components/App.vue';

export default builder(({ provide }) => {
  provide(VUE, async () => Vue);

  provide(ROOT_COMPONENT, async (get) => {
    const vue = await get(VUE);
    const router = await get(ROUTER);
    const store = await get(STORE);

    vue.use(VueApollo);
    const apolloProvider = new VueApollo({
      defaultClient: await get(API_CLIENT),
    });

    return vue.extend({
      name: 'Container',
      router,
      store,
      apolloProvider,
      render: (h) => h(App),
    });
  });
});
