import '@/bootstrap';
import Vue from 'vue';
import Loader from '@/features/core/components/Loader.vue';

new Vue({ render: (h) => h(Loader) }).$mount('#app');
