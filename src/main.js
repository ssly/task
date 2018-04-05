// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import event from './assets/js/event';
import { signout } from './assets/interface/base';
import { Cookies } from './assets/js/utils';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

Vue.use(ElementUI, { size: 'small' });

// signout
event.on('signout', () => {
  signout().then(res => {
    Cookies.removeItem('session');
    router.push({ path: '/' });
  });
});

// router intercept
router.beforeEach((to, from, next) => {
  let session = Cookies.getItem('session');
  console.log(typeof session + session);

  if (to.path === '/') {
    if (session) {
      router.push({ name: 'Main' });
    } else {
      next();
    }
    return;
  }

  if (!session) {
    event.emit('signout');
    return;
  }

  next();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
