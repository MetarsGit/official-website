/**
 * @description 导出自定义配置
 **/
const rpcDevConfig = require('./dev.config')
const rpcProdConfig = require('./prod.config')

let rpcConfig = rpcDevConfig
const isProd =
    location.search.indexOf('?isProd=1') > -1 ||
    (location.origin.indexOf('//dev') === -1 &&
        location.origin.indexOf('//test') === -1 &&
        location.origin.indexOf('//127.0.0.1') === -1)
if (isProd) {
    rpcConfig = rpcProdConfig
}
const defaultNetwork = 'BSC'

const config = {
    $MaxUint256:
        '115792089237316195423570985008687907853269984665640564039457584007913129639935',
    nullAddress: '0x0000000000000000000000000000000000000000',
    defaultNetwork,
    defaultNetworkId: rpcConfig[defaultNetwork]?.expectedNetworkId,
    rpcConfig
}
module.exports = config
