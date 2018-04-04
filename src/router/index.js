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
      path: '/',
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
      path: '/Signin',
      name: 'Signin',
      component: Signin
    }
  ]
})
