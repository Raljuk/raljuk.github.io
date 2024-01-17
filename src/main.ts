import { createApp } from 'vue';
import Tooltip from '@/directives/person-tooltip';
import App from './App.vue';

const app = createApp(App);

app.directive('person-tooltip', Tooltip);
app.mount('#app');
