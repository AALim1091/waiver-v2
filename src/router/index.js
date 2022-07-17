import { createRouter, createWebHistory } from 'vue-router'
import WaiverFormView from '../views/WaiverForm.vue'
import NotFound from '@/components/NotFound.vue'

const routes = [
  {
    path: '/',
    redirect: { name: 'WaiverForm' },
    component: WaiverFormView
  },
  {
    path: '/WaiverForm',
    name: 'WaiverForm',
    component: WaiverFormView
  },
  {
    path: '/WaiverList',
    name: 'waiverList',
    // route level code-splitting
    // this generates a separate chunk (waiverList.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/waiverList.vue')
  },
  ///////////////////////////////////////////////
  //////WAIVER FORM SELECTION BOX PATHS//////////
  ///////////////////////////////////////////////
  // {
  //   path: '/Golf"',
  //   name: 'WaiverForm',
  //   component: 
  // },
  // {
  //   path: '/Spa',
  //   name: 'WaiverForm',
  //   component: 
  // },
  // {
  //   path: '/Casino',
  //   name: 'WaiverForm',
  //   component: 
  // },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
