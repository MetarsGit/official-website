<template>
    <div class="wallet-connect">
        <a-button
            type="primary"
            v-if="showMetamaskWarning"
            @click="addMetamask"
        >
            <span>Add MetaMask</span>
        </a-button>
        <a-button
            type="primary"
            v-else-if="!defaultAccount"
            :loading="connecting"
            @click="connect"
        >
            <span>Connect Wallet</span>
        </a-button>
        <a-button
            type="primary"
            block
            v-else-if="networkWarning"
            :loading="connecting"
            @click="connectToNetwork"
        >
            <span>
                Switch Chain
                <svg-icon
                    icon-class="arrow-right"
                    class-name="arrow-right"
                ></svg-icon>
            </span>
        </a-button>
        <slot v-else></slot>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import metamask from '@/utils/wallet/metamask'
    import { walletConnectToNetwork } from '@/utils/wallet'
    import storage from '@/utils/storage'
    import { rpcConfig, defaultNetwork } from '@/config/web3'

    export default {
        name: 'ConnectWalletBtn',
        data() {
            return {
                connecting: false
            }
        },
        computed: {
            ...mapGetters({
                defaultAccount: 'web3/defaultAccount',
                currentNetworkId: 'web3/currentNetworkId'
            }),
            rpcInfo() {
                return rpcConfig[defaultNetwork]
            },
            showMetamaskWarning() {
                return !window.web3.currentProvider
            },
            networkWarning() {
                const { expectedNetworkId = '' } = this.rpcInfo
                return (
                    this.currentNetworkId !== null &&
                    this.currentNetworkId !== expectedNetworkId.toString()
                )
            }
        },
        methods: {
            addMetamask() {
                metamask.add()
            },
            async connect() {
                storage.set('logged_out', false)
                await this.connectToNetwork()
            },
            async connectToNetwork() {
                const {
                    expectedNetworkId,
                    chainName,
                    currencySymbol,
                    currencyDecimals,
                    rpcUrls,
                    blockExplorerUrls
                } = this.rpcInfo
                const config = {
                    expectedNetworkId: expectedNetworkId,
                    chainId: window.web3.utils.numberToHex(expectedNetworkId),
                    chainName: chainName,
                    currencySymbol: currencySymbol,
                    currencyDecimals: currencyDecimals,
                    rpcUrls: rpcUrls,
                    blockExplorerUrls: blockExplorerUrls
                }
                this.connecting = true
                try {
                    await walletConnectToNetwork(config)
                    this.connecting = false
                } catch (e) {
                    this.connecting = false
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .wallet-connect {
        display: flex;
        width: 100%;
        .ant-btn {
            width: 100%;
            height: 100%;
        }
    }
</style>
