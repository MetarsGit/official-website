import Axios from './axios'

/**
 * collaborative-art-work-controller
 * @param params
 * @returns {Promise<unknown>}
 */
export function queryArtSortAll(params) {
    return Axios.get(`/api/collaborativeartwork/sort/all`, params)
}

export function queryArtSortAddress(params) {
    return Axios.get(`/api/collaborativeartwork/sort/${params.address}`, params)
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

export function queryMyArtInprogress(params) {
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
