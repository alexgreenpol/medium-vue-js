import Vue from 'vue';
import VueRouter from 'vue-router';
import GlobalFeed from '@/views/GlobalFeed';
import Register from '@/views/Register';
import Login from '@/views/Login';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'globalFeed',
    component: GlobalFeed
  },
  {
    path: '/yourFeed',
    name: 'yourFeed',
    component: GlobalFeed
  },
  {
    path: '/userProfile',
    name: 'userProfile',
    component: GlobalFeed
  },
  {
    path: '/article/:slug',
    name: 'article',
    component: GlobalFeed
  },
  {
    path: '/articles/new',
    name: 'createArticle',
    component: GlobalFeed
  },
  {
    path: '/article/:slug/edit',
    name: 'editArticle',
    component: GlobalFeed
  },
  {
    path: '/tags/:slug',
    name: 'tag',
    component: GlobalFeed
  },
  {
    path: '/settings',
    name: 'settings',
    component: GlobalFeed
  },
  {
    path: '/profiles/:slug',
    name: 'userProfile',
    component: GlobalFeed
  },
  {
    path: '/profiles/:slug/favorites',
    name: 'userProfileFavorites',
    component: GlobalFeed
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
];

const router = new VueRouter({
  routes
});

export default router;
