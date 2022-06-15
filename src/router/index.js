import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        redirect:'home',
        meta: {}
      },
      {
        path: 'home',
        name: 'Home',
        component: Home,
        meta: {}
      },
      {
        path: 'result',
        name: 'Result',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "result" */ '../views/Result.vue'),
        meta: {}
      },
      {
        path: '/artist/:id',
        name: 'Artist',
        component: () => import(/* webpackChunkName: "artist" */ '../views/Artist.vue'),
        meta: {}
      },
      {
        path: '/artwork/:id',
        name: 'Artwork',
        component: () => import(/* webpackChunkName: "artwork" */ '../views/Artwork.vue'),
        meta: {}
      },
      {
        path: '/artlist',
        name: 'Artlist',
        component: () => import(/* webpackChunkName: "artwork" */ '../views/Artlist.vue'),
        meta: {
          keepAlive: true
        }
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
