import Vuex from 'vuex';
import _ from 'lodash';
import eventBus from 'vue3-eventbus'
import {setUpContracts} from '@/contract';
import * as statistics from "@/api/statistics";

export function createStore(web3, options) {
  const {networkConfig} = options
  return new Vuex.Store({
    state: {
      device: 'desktop',
      contracts: null,
      accounts: [],
      defaultAccount: null,
      currentNetworkId: null
    },
    getters: {
      contracts(state) {
        // our root component prevents the app from being active if contracts
        // are not set up, so we never need to worry about it being null anywhere else
        return _.isFunction(state.contracts) ? state.contracts() : null;
      }
    },

    mutations: {
      toggleDevice(state, device) {
        state.device = device
      },

      setNetworkId(state, payload) {
        state.currentNetworkId = payload;
      },

      setAccounts(state, payload) {
        state.accounts = payload.accounts;

        if (payload.accounts.length > 0) {
          state.defaultAccount = payload.accounts[0];
        } else {
          state.defaultAccount = null;
        }
      },

      setContracts(state, payload) {
        state.contracts = payload;
      },

      setVoteTime: (state, data) => {
        state.voteTime = data;
      }
    },
    actions: {
      toggleDevice({commit}, device) {
        commit('toggleDevice', device)
      },

      async initialize({dispatch}) {
        await dispatch('setUpContracts');

        await dispatch('setUpWb3Events');

        await dispatch('pollAccountsAndNetwork');
      },

      async pollAccountsAndNetwork({state, commit}) {
        let refreshUserDetails = false;
        const networkId = await web3.eth.net.getId();
        if (state.currentNetworkId !== networkId.toString()) {
          commit('setNetworkId', networkId.toString());
          refreshUserDetails = true;
        }

        let accounts = [] // 如果连接的链不对，账户置空
        if (networkConfig.expectedNetworkId === networkId.toString()) {
          accounts = await web3.eth.requestAccounts();
        }
        if (!_.isEqual(state.accounts, accounts)) {
          commit('setAccounts', {accounts});
          refreshUserDetails = true;
        }

        eventBus.emit('web3Changed')

        if (refreshUserDetails) {
          await Promise.all([
            // dispatch('fetchUserDetails')
          ]);
        }
      },

      setUpWb3Events({dispatch}) {
        web3.currentProvider.on("accountsChanged", async () => {
          await dispatch('pollAccountsAndNetwork')
        });
        web3.currentProvider.on("chainChanged", async () => {
          await dispatch('pollAccountsAndNetwork')
        });
      },

      async setUpContracts({commit}) {
        const contracts = await setUpContracts(web3);
        commit('setContracts', () => contracts);
      },

      async aggregate({state, getters}, contractCalls = []) {
        if (!contractCalls.length || !state.currentNetworkId) {
          return []
        }

        function findAbiMethod(abi, method) {
          return abi.find((m) => {
            if (m.name === method) {
              return m
            }
          })
        }

        const calls = [];
        for (const call of contractCalls) {
          const {abi = [], networks} = call.contract
          calls.push([networks[state.currentNetworkId].address, web3.eth.abi.encodeFunctionCall(findAbiMethod(abi, call.method), call.args)])
        }
        const res = await getters.contracts.MultiCall.methods.aggregate(calls).call()
        const result = [];
        for (let i = 0, l = contractCalls.length; i < l; ++i) {
          const call = contractCalls[i];
          const {abi} = call.contract
          const data = web3.eth.abi.decodeParameters(findAbiMethod(abi, call.method).outputs, res.returnData[i])
          data.method = call.method
          data.args = call.args
          result.push(data);
        }
        return result;
      },

      async getVoteTime ({commit}) {
        const result = await statistics.fetchVoteTime()
        const {data = {}} = result
        commit('setVoteTime', data)
        return data
      },

      // async fetchUserDetails({dispatch}) {
      //   const promises = [dispatch('fetchMCTBalance')];
      //
      //   await Promise.all([promises]);
      // },
    }
  })
}