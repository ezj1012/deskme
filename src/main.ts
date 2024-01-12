import { createApp } from "vue";
import { createPinia } from 'pinia'

import "./styles.css";
import '@/assets/iconfont/iconfont.css'
import App from "./App.vue";
import dmApp from "./app/deskme";
import FIcon from './components/comm/FIcon.vue';

const app = createApp(App);
app.component('FIcon', FIcon);
app.use(createPinia())
    .use(dmApp)
    .mount("#app");
