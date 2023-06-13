import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout'

export const asyncRoutes = [
    {
        path: '/',
        redirect: '/home',
        meta: {
            title: 'Home'
        },
        children: [
            {
                path: 'index',
                name: 'Home',
                component: () => import('@/views/home'),
                meta: {
                    title: 'Home'
                }
            }
        ],
        hidden: true
    },
    {
        path: '/myArts',
        name: 'MyArts',
        component: Layout,
        children: [
            {
                path: '',
                name: 'MyArts',
                component: () => import('@/views/myArts'),
                meta: {
                    title: 'My Artworks',
                }
            }
        ]
    },
]

export const constantRoutes = []

const router = createRouter({
    history: createWebHistory(),
    routes: asyncRoutes
})

export default router
