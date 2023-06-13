import BigNumber from 'bignumber.js'

export function $ether(n) {
    if (!n) {
        return n
    }
    let utils = window.web3.utils
    const bn = new utils.BN(utils.toWei(n, 'ether'))
    return bn.toString()
}

// 默认保留小数点后两位
export function $etherToNumber(n) {
    if (!n) {
        return n
    }
    let utils = window.web3.utils
    return BigNumber(utils.fromWei(n.toString(), 'ether').toString()).toFixed(
        2,
        1
    )
}

// 全部返回
export function $etherToValue(n) {
    if (!n) {
        return n
    }
    let utils = window.web3.utils
    return utils.fromWei(n.toString(), 'ether').toString()
}
