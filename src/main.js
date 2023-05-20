import Vue from 'vue' // 加载vue
import App from './App.vue' // 加载根组件
import router from './router' // 加载路由

import ElementUI from 'element-ui' // 加载 element 组件库

import 'element-ui/lib/theme-chalk/index.css' // 加载 element 组件库的样式

// 加载全局样式
import './styles/index.less'
import 'animate.css'

// 全局注册 element 组件库
Vue.use(ElementUI)

// 阻止显示生产模式的消息
Vue.config.productionTip = false

// 创建vue 根实例
// 把 router 配置到根实例中
// 通过 render方法把 App 根据组件渲染到 #app 入口节点

Vue.config.$imagePrefix = 'http://www.97284.com/'

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
