import { configure } from '@/util/container';

export default configure(() => import(/* webpackMode: "eager" */ 'vue-json-csv/dist/vue-json-csv.css'));
