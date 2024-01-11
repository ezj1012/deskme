import { createApp } from "vue";
import { createPinia } from 'pinia'

import "./styles.css";
import App from "./App.vue";
import dmApp from "./app/deskme";

createApp(App)
    .use(createPinia())
    .use(dmApp)
    .mount("#app");
