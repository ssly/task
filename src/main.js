// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import { signout } from './assets/interface/base';
import ElementUI from 'element-ui';
import event from './assets/js/event';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

Vue.use(ElementUI, { size: 'small' });

// 注销账号，回到登录页面
event.on('signout', () => {
  signout().then(res => {
    console.log('signout');
    router.push({name: 'Signin'});
    window.localStorage.removeItem('isSignin');
  });
});

// router intercept
router.beforeEach((to, from, next) => {
  let isSignin = window.localStorage.getItem('isSignin');
  if (to.name === 'Signin' || isSignin === 'true') {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
