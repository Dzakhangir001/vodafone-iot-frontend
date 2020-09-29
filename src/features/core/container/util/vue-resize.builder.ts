import { configure } from '@/util/container';

// Only the style is loaded here.
// The ResizeObserver component may be imported locally where needed:
// import { ResizeObserver } from 'vue-resize';
// @Component({ components: { ResizeObserver } })

export default configure(() => import(/* webpackMode: "eager" */ 'vue-resize/dist/vue-resize.css'));
