import Vue from 'vue';
import Router from 'vue-router';
import AuthService from './service/auth/authService';
import Dashboard from './views/Dashboard.vue';
import Home from './views/Home.vue';
import Login from './views/Login.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { guest: true },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { auth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.guest && AuthService.isLoggedIn()) return router.push(from.path);
  if (to.meta.auth && !AuthService.isLoggedIn()) return router.push('/login');
  return next();
});

export default router;
