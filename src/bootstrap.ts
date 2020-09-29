import '@/styles/index.scss';
import { once } from 'lodash';
import Vue from 'vue';
import container from '@/util/container';

Vue.config.productionTip = false;

export default once(() => container(require.context('./features', true, /\.builder\.ts$/, 'lazy-once')));
