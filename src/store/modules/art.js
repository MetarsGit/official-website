import { findArtInProgress, verifyTwitter, getGrecaptchaToken } from '@/api'
import { DETAILS, ENVIRONMENT, MAIN_IDEA, PUBLISH, START, STYLE, shareUrlPrefix, STEP_SORT } from '@/views/generate/const'

const state = () => ({
    artId: 0,
    currentStatus: '',
    displayStatus: '',
    artInfo: {
        MAIN_IDEA: {},
        STYLE: {},
        ENVIRONMENT: {},
        DETAILS: {},
    }
})
const getters = {
    displayStep(state) {
        let idxDis = STEP_SORT.indexOf(state.displayStatus)
        console.log(STEP_SORT[idxDis + 1])
        return state.artInfo?.[STEP_SORT[idxDis + 1]] || {}
    },
    verifyText(state) {
        return `${shareUrlPrefix}?id=${state.artId}`
    },
    isComplete(state) {
        let idxCurr = STEP_SORT.indexOf(state.currentStatus)
        let idxDis = STEP_SORT.indexOf(state.displayStatus)
        console.log(idxCurr, idxDis)
        return idxCurr > idxDis
    }
}

const actions = {
    async sign({ rootState }, prompt = '') {
        const { defaultAccount } = rootState.web3
        const msg = `I will create a virutal art with prompts '${prompt}' on METARS with my wallet address ${defaultAccount.slice(-6)}`
        const signature = await window.web3?.eth?.personal?.sign(
            msg,
            defaultAccount
        )
        return signature
    },

    fetchArtDetail({ state, commit }, init = false) {
        let { artId } = state
        if (!artId) return
        return findArtInProgress({ artId }).then((res) => {
            console.log(res)
            if (res.code === 1) {
                commit('setArtDetail', res.data)
            } else if (res.code === 112) { // 作品已创作完成
                // 跳转详情页
            } else {
                // 报错
            }
        }).catch((err) => {
            // 报错
            console.log(err)
        })

    },

    async verifyTwitter({ state }, tweet) {
        let artId = state.artId
        let recaptchaToken = await getGrecaptchaToken('verify')
        let param = {
            artId,
            recaptchaToken,
            twitterUrl: tweet,
            verifyText: `${shareUrlPrefix}?id=${artId}`

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
    }
}

export default { state, getters, mutations, actions }
