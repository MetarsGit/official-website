<template>
    <div class="vab-avatar" :class="tabActive">
        <a-button
            type="primary"
            shape="round"
            v-if="showMetamaskWarning"
            @click="addMetamask"
        >
            Add MetaMask
        </a-button>
        <a-button
            type="primary"
            shape="round"
            v-else-if="!defaultAccount"
            @click="connect"
        >
            Connect Wallet
        </a-button>
        <a-dropdown v-else overlayClassName="avatar-dropdown">
            <a-button type="primary" ghost shape="round">
                <span>
                    {{
                        defaultAccount.slice(0, 6) +
                        '...' +
                        defaultAccount.slice(-5)
                    }}
                </span>
            </a-button>
            <template v-slot:overlay>
                <a-menu>
                    <a-menu-item @click="logout">Disconnect</a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import metamask from '@/utils/wallet/metamask'
    import {
        walletConnectTry,
        walletConnect,
        walletLogout
    } from '@/utils/wallet'

    export default {
        name: 'VabAvatar',
        data() {
            return {
                tabActive: this.$route.name
            }
        },
        watch: {
            $route(to) {
                this.tabActive = to.name
            }
        },
        computed: {
            ...mapGetters({
                defaultAccount: 'web3/defaultAccount'
            }),
            showMetamaskWarning() {
                return !window.web3?.currentProvider
            }
        },
        created() {
            walletConnectTry()
        },
        methods: {
            addMetamask() {
                metamask.add()
            },
            async connect() {
                await walletConnect()
            },
            async logout() {
                await walletLogout()
            },
            toMember() {
                this.$router.push({
                    name: 'Member'
                })
            }
        }
    }
</script>
<style lang="less">
    .vab-avatar {
        display: flex;
        align-items: center;
        .ant-btn {
            padding: 0 30px;
            height: 48px;
            font-weight: 600;
            &.ant-btn-background-ghost {
                border-width: 2px;
            }
        }
    }
    .avatar-dropdown {
        .ant-dropdown-menu {
            padding: 0;
            background: rgba(255, 255, 255);
            box-shadow: 0px 2px 9px 0px rgba(6, 7, 32, 0.3);
            border-radius: 18px 18px 18px 18px;
            border: 1px solid rgba(126, 144, 160, 0.5);
            .ant-dropdown-menu-item {
                text-align: center;
                font-weight: 500;
                &:not(:last-child) {
                    border-bottom: 1px solid rgba(126, 144, 160, 0.6);
                }
            }
        }
    }
    @media (max-width: 992px) {
        .vab-avatar {
            .ant-btn {
                padding: 0 16px;
                height: 36px;
                font-size: 14px;
            }
        }
    }
</style>
