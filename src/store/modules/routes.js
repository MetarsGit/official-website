/**
 * @description 路由拦截状态管理，目前两种模式：all模式与intelligence模式，其中partialRoutes是菜单暂未使用
 */
import { asyncRoutes, constantRoutes } from '@/router'
import { filterRoutes } from '@/utils/routes'

const state = () => ({
    routes: []
})
const getters = {
    routes: (state) => state.routes
}
const mutations = {
    setRoutes(state, routes) {
        state.routes = routes
    }
}
const actions = {
    /**
     * @description intelligence模式设置路由
     * @param {*} { commit }
     * @returns
     */
    async setRoutes({ commit }) {
        const finallyRoutes = filterRoutes([...constantRoutes, ...asyncRoutes])
        commit('setRoutes', finallyRoutes)
        return [...asyncRoutes]
    }
}
export default { state, getters, mutations, actions }
