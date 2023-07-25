import Axios from './axios'

/**
 * collaborative-art-work-controller
 * @param params
 * @returns {Promise<unknown>}
 */
export function queryArtList(params) {
    return Axios.get(`/api/collaborativeartwork/search`, params)
}

/**
 * InCreation-art-work-controller
 * @param params
 * @returns {Promise<unknown>}
 */
export function queryInCreationArt(params) {
    return Axios.get(`/api/increation/all`, params)
}

/**
 * my-art-work-controller
 * @param params
 * @returns {Promise<unknown>}
 */
export function queryMyArtCompleted(params) {
    return Axios.get(`/api/myartwork/completed`, params)
}

export function queryMyArtInProgress(params) {
    return Axios.get(`/api/myartwork/inprogress`, params)
}

export function queryMyArtStat(params) {
    return Axios.get(`/api/myartwork/stat`, params)
}

/**
 * user controller
 * @param params
 * @returns {Promise<unknown>}
 */
export function getUserInfo(params) {
    return Axios.get('/api/user/info', params)
}

export function login(params) {
    return Axios.post('/api/user/login', params)
}

// 获取recapture
export async function getGrecaptchaToken(action) {
    return new Promise((resolve, reject) => {
        grecaptcha.ready(() => {
            grecaptcha
                .execute('6LdIFAsbAAAAAA5RZb4SK0cCzHdp9YbltsLZDRNi', {
                    action
                })
                .then((token) => {
                    resolve(token)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    })
}

// 创作
export function submitArtStart(params) {
    return Axios.post('/api/art/start', params)
}
export function submitView(params) {
    return Axios.post(`/api/art/view/${params.artId}`, params)
}
export function submitArtMainIdea(params) {
    return Axios.post('/api/art/mainIdea', params)
}
export function submitArtStyle(params) {
    return Axios.post('/api/art/style', params)
}
export function submitArtEnvironment(params) {
    return Axios.post('/api/art/environment', params)
}
export function submitArtDetails(params) {
    return Axios.post('/api/art/details', params)
}
// 生成图片
export function generateImage(params) {
    return Axios.post('/api/art/generate', params)
}
// 查询是否满足mint条件
export function queryCanMint(params) {
    return Axios.get(`/api/art/queryCanMint/${params.artId}/${params.mintAddress}`)
}
// 查询正在创作中的作品
export function findArtInProgress(params) {
    return Axios.get(`/api/art/findArtInProgress`, params)
}

export function findNftImages(params) {
    return Axios.get(`/api/art/findNftImages/${params.artId}`)
}

// 点赞作品
export function likeArt(params) {
    return Axios.post(`/api/art/like`, params)
}

// 验证Twitter
export function verifyTwitter(params) {
    return Axios.post(`/api/twitter/verify`, params)
}
// 获取作品详情
export function findArtComplete(params) {
    return Axios.get(`/api/nft/detailed/${params.artId}`)
}