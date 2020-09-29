import { configure } from '@/util/container';

export default configure(() => import(/* webpackMode: "eager" */ 'moment/locale/de'));
