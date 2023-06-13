import path from 'path'
import { isExternal } from '@/utils/validate'

/**
 * @description 根据roles数组拦截路由
 * @param routes
 * @param baseUrl
 * @returns {[]}
 */
export function filterRoutes(routes, baseUrl = '/') {
    return routes.map((route) => {
        if (route.path !== '*' && !isExternal(route.path))
            route.path = path.resolve(baseUrl, route.path)
        route.fullPath = route.path
        if (route.children)
            route.children = filterRoutes(route.children, route.fullPath)
        return route
    })
}
