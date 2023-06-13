import storage from '@/utils/storage'
import metamask from '@/utils/wallet/metamask'
import store from '@/store'

/**
 * 连接钱包
 * @returns {Promise<void>}
 */
export async function walletConnect() {
    storage.set('logged_out', false)
    await metamask.connect()
    await store.dispatch('web3/initialize')
}

/**
 * 切换链, 连接到指定的链
 * @returns {Promise<void>}
 */
export async function walletConnectToNetwork(networkSetting) {
    await metamask.connectToNetwork(networkSetting)
    await store.dispatch('web3/initialize')
}

/**
 * 静默连接钱包
 * @returns {Promise<void>}
 */
export async function walletConnectTry() {
    const disconnect = storage.get('logged_out')
    if (disconnect) {
        return
    }
    const accounts = await metamask.getAccounts()
    if (accounts.length) {
        await walletConnect()
    }
}

/**
 * 登出
 * @returns {Promise<void>}
 */
export async function walletLogout() {
    storage.set('logged_out', true)
    await store.dispatch('web3/disconnect')
}
