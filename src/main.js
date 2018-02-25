import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

// register globally
// import Mutliselect from 'vue-multiselect';

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(Buefy)


// register globally
// Vue.component('multiselect',Mutliselect);

// Set up routing and match routes to components
export var router = new VueRouter({
  hashbang: false,
  linkActiveClass: 'active',
  mode: 'history',
  base: __dirname,
  routes:[{
    path: '/posts',
    name: 'posts', 
    component: require('./components/Post.vue')
  },{
    path: '/login',
    name: 'login', 
    component: require('./components/Login.vue'),
    meta: { auth: false }
  },{
    path: '/about', 
    name: 'about',
    component: require('./components/About.vue')
  },{
    path: '/contact', 
    name: 'contact',
    component: require('./components/Contact.vue')
  },{
    path: '/account', 
    name: 'account',
    component: require('./components/Account.vue'),
    meta: { auth: true}
  }
]
});

// remember to set vue.router before plugin
Vue.router = router
Vue.http.options.root = 'http://localhost:8082/';

// Set plugin vue-auth
Vue.use(require('@websanova/vue-auth'),{
  auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/vue-resource.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  rolesVar: 'role'
  
});
App.router = Vue.router;

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
