import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入vant组件
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

// 自动设置rem基准值(html标签字体大小)
import 'amfe-flexible';
// 加载全局样式(最后引入避免样式被覆盖,权重问题)
import './styles/index.less'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')