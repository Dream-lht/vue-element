import { createApp } from "vue";
import App from "./App.vue";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const app = createApp(App);

//全局注册Element
app.use(ElementPlus);

app.mount("#app");
