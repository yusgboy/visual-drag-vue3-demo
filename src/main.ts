import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
import router from './router'
import '@/style/reset.css'
import './assets/iconfont/iconfont'
import { createPinia } from 'pinia'
import { registerCompoent } from './customComponent/index'

const app = createApp(App)
registerCompoent(app)
const pinia = createPinia()
app.use(router).use(ElementPlus).use(pinia).mount('#app')
