import * as VueRouter from 'vue-router';
import GithubUserProfile from './pages/GithubUserProfile.vue';
import GithubBrowserPage from './pages/GithubBrowserPage.vue';

const routes = [
  { name: 'index', path: '/', redirect: { name: 'users' } },
  { name: 'users', path: '/users', component: GithubBrowserPage },
  {
    name: 'user-profile',
    path: '/users/:username',
    component: GithubUserProfile,
  },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

export default router;
