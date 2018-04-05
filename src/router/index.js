import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/Main';
import Axis from '@/components/Axis';
import MsgBoard from '@/components/msgBoard/MsgBoard';
import Signin from '@/components/signin/signin';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/main',
      name: 'Main',
      component: Main
    },
    {
      path: '/axis',
      name: 'Axis',
      component: Axis
    },
    {
      path: '/Msg',
      name: 'Msg',
      component: MsgBoard
    },
    {
      path: '/',
      name: 'Signin',
      component: Signin
    }
  ]
})
