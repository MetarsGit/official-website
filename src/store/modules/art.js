import { findArtInProgress, verifyTwitter, getGrecaptchaToken, findArtComplete } from '@/api'
import { shareUrlPrefix, STEP_SORT } from '@/views/generate/const'
import { message } from 'ant-design-vue'

const state = () => ({
    artId: '',
    currentStatus: '',
    displayStatus: '',
    artInfo: {
        MAIN_IDEA: {},
        STYLE: {},
        ENVIRONMENT: {},
        DETAILS: {},
    },
})
const getters = {
    displayStep(state) {
        let idxDis = STEP_SORT.indexOf(state.displayStatus)
        return state.artInfo?.[STEP_SORT[idxDis + 1]] || {}
    },
    verifyText(state) {
        return `${shareUrlPrefix}?id=${state.artId}`
    },
    isComplete(state) {
        let idxCurr = STEP_SORT.indexOf(state.currentStatus)
        let idxDis = STEP_SORT.indexOf(state.displayStatus)
        return idxCurr > idxDis
    }
}

const actions = {
    async sign({ rootState }, prompt = '') {
        const { defaultAccount } = rootState.web3
        if (!defaultAccount) {
            message.warn('Please connect the wallet.')
            return
        }
        const msg = `I will create a virutal art with prompts '${prompt}' on METARS with my wallet address ${defaultAccount?.slice(-6) || ''}`
        const signature = await window.web3?.eth?.personal?.sign(
            msg,
            defaultAccount
        )
        return signature
    },

    //拉取进行中的作品详情
    fetchArtDetail({ state, commit, dispatch }, syncStatus = false) {
        let { artId } = state
        if (!artId) return
        return findArtInProgress({ artId }).then((res) => {
            console.log(res)
            if (res.code === 1) {
                commit('setArtDetail', res.data)
                // 同步展示状态（进入下一步）
                if (syncStatus) {
                    dispatch('synchronizeStatus')
                }
            } else if (res.code === 112) { // 作品已创作完成 跳转作品详情
                // 获取mint后的详情
                return findArtComplete({ artId }).then((res) => {
                    if (res.code === 1) {
                        return res.data
                    }
                })
            }
        })
    },

    async verifyTwitter({ state, getters }, tweet) {
        let artId = state.artId
        let recaptchaToken = await getGrecaptchaToken('verify')
        let param = {
            artId,
            recaptchaToken,
            twitterUrl: tweet,
            verifyText: getters.verifyText
        }
        return verifyTwitter(param)
    },

    // 同步displayStatus
    synchronizeStatus({ state, commit }) {
        commit('setDisplayStatus', state.currentStatus)
    },
}

const mutations = {
    setArtId(state, id) {
        state.artId = id
    },
    setArtDetail(state, payload = {}) {
        state.currentStatus = payload.currentStatus
        state.artInfo = payload
    },
    setDisplayStatus(state, status) {
        state.displayStatus = status
    },
    resetArtInfo(state) {
        state.artId = ''
        state.currentStatus = ''
        state.displayStatus = ''
        state.artInfo = {
            MAIN_IDEA: {},
            STYLE: {},
            ENVIRONMENT: {},
            DETAILS: {},
        }
    }
}

export default { state, getters, mutations, actions }
