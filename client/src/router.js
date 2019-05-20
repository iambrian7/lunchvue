import Vue from 'vue'
import Router from 'vue-router'
// import Home from './components/Home.vue'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/example',
      name: 'example',
      component: () => import(/* webpackChunkName: "about" */ './views/Example.vue')
    },
    {
      path: '/detail',
      name: 'lunchdetail',
      component: () => import(/* webpackChunkName: "about" */ './views/LunchDetail.vue'),
      props: true
    },
    {
      path: '/editall',
      name: 'editall',
      component: () => import(/* webpackChunkName: "about" */ './views/EditAllLunches.vue'),
      props: true
    },
    {
      path: '/creategroup',
      name: 'creategroup',
      component: () => import(/* webpackChunkName: "about" */ './views/CreateGroup.vue')
    },
    {
      path: '/groups',
      name: 'groups',
      component: () => import(/* webpackChunkName: "about" */ './views/Groups.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
// import Home from '@/components/Home'
// import About from '@/components/About'
// import CreateGroup from '@/components/CreateGroup'
// import Example from '@/components/Example'
// import Groups from '@/components/Groups'
// import Login from '@/components/auth/Login.vue';
// import Register from '@/components/auth/Register.vue';
// import CssMenu from '@/components/CssMenu.vue';

// export const routes = [
// 	{path: '/', component: Home, name: 'home'},
//   {path: '/about',name: 'About',component: About},
//   {path: '/example',name: 'Example',component: Example},
//   {path: '/groups',name: 'Groups',component: Groups},
//   {path: '/cssmenu',name: 'CssMenu',component: CssMenu},
//   {path: '/creategroup',name: 'CreateGroup',component: CreateGroup},
// 	{path: '/login', component: Login, name: 'login', onlyGuest: true },
// 	{path: '/register', component: Register, name: 'register', onlyGuest: true},
// 	{path: '*', redirect: '/' }
// ];