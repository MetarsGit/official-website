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
        path: '/artList',
        component: Layout,
        children: [
            {
                path: '',
                name: 'ArtList',
                component: () => import('@/views/artList'),
                meta: {
                    title: 'Collaborative Artworks',
                }
            }
        ]
    },
    {
        path: '/inCreation',
        component: Layout,
        children: [
            {
                path: '',
                name: 'InCreation',
                component: () => import('@/views/inCreation'),
                meta: {
                    title: 'In Creation',
                }
            }
        ]
    },
    {
        path: '/myArts',
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
    {
        path: '/generate',
        component: Layout,
        children: [
            {
                path: '',
                name: 'Generate',
                component: () => import('@/views/generate'),
                meta: {
                    title: 'Generate Now',
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
