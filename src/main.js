import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import ReportList from './components/ReportList.vue'
import ReportWorkbench from './components/ReportWorkbench.vue'
import DepositionList from './components/DepositionList.vue'
import ContentWrapper from './components/ContentWrapper.vue'
import Login from './components/Login.vue'
import axios from 'axios'
import qs from 'qs';


Vue.use(ElementUI)
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(ReportWorkbench)
Vue.use(ReportList)
Vue.use(DepositionList)
Vue.use(ContentWrapper)
Vue.use(Login)

Vue.prototype.$axios = axios
Vue.prototype.$qs = qs

Vue.config.productionTip = false

const routes = [
                {path: '/', redirect: '/ContentWrapper', name: 'Home'},
                { path: '/ContentWrapper', component: ContentWrapper, name: "ContentWrapper",
                  children: [
                    { path: '/ReportList', component: ReportList, name: "ReportList" },
                    { path: '/ReportWorkbench', component: ReportWorkbench, name: "ReportWorkbench" , props: true },
                    { path: '/DepositionList', component: DepositionList, name: "DepositionList"  }
                  ]
                },
                { path: '/Login', component: Login, name: "Login" }
              ]

Vue.prototype.loginStatus = function (){
  localStorage.setItem("isLogin", true)
}

const router = new VueRouter({
 routes // （缩写）相当于 routes: routes
})

router.beforeEach((to, from, next) => {
  if (localStorage.getItem("isLogin")){
    if(to.path === '/Login'){
      next({ path: '/ContentWrapper' })
    } else {
      next();
    }
  } else {
    if(to.path != '/Login'){
      next({ path: '/Login' })
    } else {
      next();
    }
  }
})

axios.interceptors.request.use(
  config => {
      // if (store.state.token) {//判断是否存在token，如果存在的话，则每个http header都加上token
      //     config.headers.Authorization = `token ${store.state.token}`;
      // }
      return config;
  },
  err => {
      return Promise.reject(err);
  })

// http response 拦截器
axios.interceptors.response.use(
  response => {
      return response;
  },
  error => {
      if (error.response) {
          switch (error.response.status) {
              case 401:
                localStorage.setItem("isLogin", false)
                router.replace({path: '/Login'})
          }
      }
      return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  })

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
