import Axios from './axios'

/**
 * collection-controller
 * @param params
 * @returns {Promise<unknown>}
 */
// 查询项目详情
export function queryCollections(params) {
    return Axios.get(`/api/collection/collections`, params)
}

export function searchCollections(params) {
    return Axios.get(`/api/collection/getSearch`, params)
}

export function queryCollectionDetail(params) {
    return Axios.get(`/api/collection/detail`, params)
}

export function queryUpcomingMint(params) {
    return Axios.get(`/api/collection/upcomingMint`, params)
}

export function queryUpcomingNft(params) {
    return Axios.get(`/api/collection/upcomingNft`, params)
}

// 地板价涨跌幅排行榜 type 上涨传0 下跌传1
export function queryFpChange(params) {
    return Axios.get(`/api/collection/fp_change`, params)
}

// 查询AgeOfAssets图表
export function queryAgeOfAssets(params) {
    return Axios.get(`/api/collection/findAgeOfAssets`, params)
}

// 查询FloorWall图表
export function queryFloorWall(params) {
    return Axios.get(`/api/collection/findFloorWall`, params)
}

// 查询profits和losses图表
export function queryProfitsAndLosses(params) {
    return Axios.get(`/api/collection/findProfitsAndLosses`, params)
}

// 查询collections图表
export function queryTransactions(params) {
    return Axios.get(`/api/collection/findTransactions`, params)
}

/**
 * user controller
 * @param params
 * @returns {Promise<unknown>}
 */
export function getUserInfo(params) {
    return Axios.get('/api/user/account', params)
}

export function login(params) {
    return Axios.post('/api/user/login', params)
}

export function userAdd(params) {
    return Axios.post('/api/user/add', params)
}

export function userDelete(params) {
    return Axios.post('/api/user/delete', params)
}

// rename myArts
export function userUpdate(params) {
    return Axios.post('/api/user/update', params)
}

export function userGroupUpdateName(params) {
    return Axios.post('/api/accountgroup/updateName', params)
}

export function userGroupUpdateImage(params) {
    return Axios.post('/api/accountgroup/updateImage', params)
}

export function uploadImage(url, params) {
    return Axios.post(url, params)
}

/**
 * assets-controller
 * @param params
 * @returns {Promise<unknown>}
 */
export function fetchAssetsListView(params) {
    return Axios.get('/api/assets/listview', params)
}

export function fetchAssetsAccountView(params) {
    return Axios.get('/api/assets/accountview', params)
}

export function fetchAssetsNft(params) {
    return Axios.get('/api/assets/nfts', params)
}

/**
 * crypto-controller
 * @param params
 * @returns {Promise<unknown>}
 */
// 查询新建流动性池
export function getNewLiquidityPool(params) {
    return Axios.get(`/api/crypto/findNewLiquidityPool`, params)
}

export function getNewLiquidityPoolDetail(params) {
    return Axios.get(`/api/crypto/findNewLiquidityPoolDetail`, params)
}

export function getFearGreedIndex(params) {
    return Axios.get('/api/crypto/findFearGreedIndex', params)
}

export function getAhr999Index(params) {
    return Axios.get(`/api/crypto/findAhr999`, params)
}

export function getEscapeIndex(params) {
    return Axios.get('/api/crypto/findEscapeIndex', params)
}
