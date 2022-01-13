import { createApp } from 'vue'
import App from './App.vue'

import * as icons from '@element-plus/icons-vue'

const app =  createApp(App);

for(let key in icons) {
    app.component(key, icons[key]);
}

app.mount('#app')
