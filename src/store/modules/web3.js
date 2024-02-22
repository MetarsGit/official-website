import isEqual from 'lodash/isEqual'
import eventBus from '@/utils/eventBus'
import { setUpContracts } from '@/contracts'

let Web3EventsListener = false

const state = () => ({
    accounts: [],
    defaultAccount: null,
    currentNetworkId: null,
    contracts: null,
    balance: '0'
})
const getters = {
    defaultAccount: (state) => {
        return state.defaultAccount
    },
    currentNetworkId: (state) => {
        return state.currentNetworkId
    },
    balance: (state) => {
        return state.balance
    },
    contracts: (state) => {
        return state.contracts
    }
}
const mutations = {
    setNetworkId(state, payload) {
        state.currentNetworkId = payload
    },

    setAccounts(state, payload) {
        state.accounts = payload.accounts

        if (payload.accounts.length > 0) {
            state.defaultAccount = payload.accounts[0]
        } else {
            state.defaultAccount = null
        }
    },

    setAccountBalance(state, payload) {
        state.balance = payload
    },

    setContracts(state, payload) {
        state.contracts = payload
    }
}
const actions = {
    async initialize({ dispatch }) {
        await dispatch('setUpContracts')
        await dispatch('setUpWb3Events')
        await dispatch('pollAccountsAndNetwork')
    },

    async pollAccountsAndNetwork({ state, commit, dispatch }) {
        let refreshUserDetails = false
        let accounts = await window.web3.eth.requestAccounts()
        if (!isEqual(state.accounts, accounts)) {
            commit('setAccounts', { accounts })
            refreshUserDetails = true
            eventBus.emitEvent('accountChanged') // account 改变
        }

        const networkId = await window.web3.eth.net.getId()
        if (state.currentNetworkId !== networkId.toString()) {
            commit('setNetworkId', networkId.toString())
            refreshUserDetails = true
            eventBus.emitEvent('chainChanged') // chain 改变
        }
        console.log('pollAccountsAndNetwork end!')
        eventBus.emitEvent('web3Changed') // account 或 chain 其中一个改变

        if (refreshUserDetails) {
            await Promise.all([dispatch('fetchUserDetails')])
        }
    },

    /**
     * @description 设置账号
     */
    setAccounts({ commit }, accounts) {
        commit('setAccounts', { accounts })
    },

    disconnect({ commit, dispatch }) {
        commit('setAccounts', { accounts: [] })
        dispatch('user/removeData', {}, { root: true })
        eventBus.emitEvent('accountChanged')
    },

    setUpWb3Events({ dispatch }) {
        if (Web3EventsListener) {
            return
        }
        Web3EventsListener = true
        window.web3.currentProvider.on('accountsChanged', async () => {
            await dispatch('pollAccountsAndNetwork')
        })
        window.web3.currentProvider.on('chainChanged', async () => {
            await dispatch('pollAccountsAndNetwork')
        })
    },

    async setUpContracts({ commit }) {
        const contracts = await setUpContracts()
        commit('setContracts', contracts)
    },

    async fetchUserDetails() {
        const promises = []
        await Promise.all([promises])
    },

    async fetchBalance({ state, commit }) {
        const res = await window.web3.eth.getBalance(state.defaultAccount)
        commit('setAccountBalance', res.toString())
    }
}

export default { state, getters, mutations, actions }
