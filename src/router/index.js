import Vue from 'vue';
import Rooter from 'vue-router';

Vue.use(Rooter);
const router =  new Rooter({
  mode: 'history',
  routes: [
    {
      path: '/dashboard',
      redirect: '/dashboard/1'
    },
    {
      path: '/dashboard/add',
      redirect: '/dashboard/1'
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../page/PageHome')
    },
    {
      path: '/dashboard/:page',
      name: 'dashboard',
      component: () => import('../page/PageDashboard')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../page/PageAbout')
    },
    {
      path: '*',
      name: 'notFound',
      component: () => import('../page/PageNotFound')
    }
  ]
});

export default router;