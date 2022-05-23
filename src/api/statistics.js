import Axios from './axios'

/**
 * @description 获取艺术家信息
 */
export function fetchArtist(params={}) {
    return Axios.get('/api/art/findArtList', params)
}


/**
 * @description 获取艺术作品信息
 */
 export function fetchArt(id) {
    return Axios.get('/api/art/'+id)
}

/**
 * @description 获取投票倒计时
 */
 export function fetchVoteTime() {
    return Axios.get('/api/voteSetting/findNewVoteSetting')
}

/**
 * @description 获取用户剩余票数
 */
 export function fetchRemainVote(address) {
    return Axios.get('/api/user/'+address)
}