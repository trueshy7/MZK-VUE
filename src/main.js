import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import axios from 'axios';
import App from './App.vue'
import router from './router/index.js'

// 防止更新页面大小出错
const debounce = (fn, delay) => {
    let timer = null;
    return function () {
        let context = this;
        let args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    }
}

const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver{
    constructor(callback) {
        callback = debounce(callback, 16);
        super(callback);
    }
}

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

axios.defaults.baseURL = 'http://localhost:80'
app.config.globalProperties.$axios = axios
axios.interceptors.request.use(config => {
    let token = localStorage.getItem('token')
    console.log("-----------------------" +token);
    if (token) {
        config.headers['token'] = token;
    }
    return config;
})
app.use(ElementPlus)
app.use(router)
app.mount('#app')