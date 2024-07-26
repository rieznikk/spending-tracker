import Vue from 'vue';
import Rooter from 'vue-router';

import PageDashboard from '../page/PageDashboard';
import PageAbout from '../page/PageAbout';
import Page404 from '../page/PageNotFound';

Vue.use(Rooter);
const router =  new Rooter({
  mode: 'history',
  routes: [
    {
      path: '/dashboard',
      redirect: '/dashboard/1'
    },
    {
      path: '/dashboard/:page',
      name: 'dashboard',
      component: PageDashboard
    },
    {
      path: '/about',
      name: 'about',
      component: PageAbout
    },
    {
      path: '*',
      name: 'notFound',
      component: Page404
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   console.log('🚔🚨next --->', next);
//   console.log('🚔🚨from --->', from);
//   console.log('🚔🚨to --->', to);
//   // ?
// });

// router.afterEach(() => {
//   // ?
// });

export default router;