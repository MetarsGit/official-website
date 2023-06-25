import { getUserInfo, login } from '@/api'
import { setAccessToken, removeAccessToken } from '@/utils/accessToken'
import { message } from 'ant-design-vue'

const state = () => ({
    totalAssets: undefined,
    userInfo: {
        accountGroup: {},
        users: []
    }
})
const getters = {
    group: (state) => {
        const { accountGroup = {} } = state.userInfo
        return accountGroup
    },
    userList: (state) => {
        const { users = [] } = state.userInfo
        return users
    },
    userInfo: (state) => {
        return state.userInfo
    },
    totalAssets: (state) => {
        return state.totalAssets
    }
}
const mutations = {
    setUserInfo(state, payload) {
        state.userInfo = payload ? payload : {}
    },
    setTotalAssets(state, value) {
        state.totalAssets = value
    },
    setGroupName(state, name) {
        state.userInfo.accountGroup.groupName = name
    },
    setUserName(state, payload = {}) {
        const { address, name } = payload
        state.userInfo.users.forEach((user) => {
            if (user.address === address) {
                user.name = name
            }
        })
    }
}
const actions = {
    async sign({ rootState, dispatch }) {
        const { defaultAccount } = rootState.web3
        const timestamp = Date.now()
        const msg =
            'Welcome:' +
            defaultAccount +
            '\nTimestamp:' +
            timestamp
        const signature = await window.web3.eth.personal.sign(
            msg,
            defaultAccount
        )
        const res = await login({
            address: defaultAccount,
            signature,
            timestamp
        })
        const { token } = res.data
        setAccessToken(token)
        // dispatch('fetchUserInfo')
        return res
    },
    async updateGroupName({ commit }, name) {
        commit('setGroupName', name)
    },
    async updateUserName({ commit }, payload = {}) {
        commit('setUserName', payload)
    },
    async updateUserTotalAssets({ commit }, value) {
        commit('setTotalAssets', value)
    },
    async fetchUserInfo({ commit }) {
        const res = await getUserInfo()
        if (res.code === 404) {
            removeAccessToken()
        }
        const data = res.data || {
            accountGroup: {},
            users: []
        }
        commit('setUserInfo', data)
        return res
    },
    async initData() {
        const promises = []
        await Promise.all([promises])
    },
    async removeData({ commit }) {
        commit('setUserInfo', {})
    }
}

export default { state, getters, mutations, actions }
