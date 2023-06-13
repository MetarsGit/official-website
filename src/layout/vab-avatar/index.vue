<template>
    <div class="vab-avatar" :class="tabActive">
        <div class="avatar-btn" v-if="showMetamaskWarning" @click="addMetamask">
            Add MetaMask
        </div>
        <div class="avatar-btn" v-else-if="!defaultAccount" @click="connect">
            Connect Wallet
        </div>
        <a-dropdown v-else overlayClassName="avatar-dropdown">
            <div class="avatar-btn">
                <span>
                    {{
                        defaultAccount.slice(0, 6) +
                        '...' +
                        defaultAccount.slice(-5)
                    }}
                </span>
            </div>
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
                return !window.web3.currentProvider
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
        .avatar-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 168px;
            height: 38px;
            line-height: 22px;
            border: 1px solid #000000;
            border-radius: 50px;
            font-family: Inter-Semi Bold;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            &:hover {
                background: #efeff1;
            }
        }
        &.Statistics .avatar-btn {
            border-color: #fff;
        }
        &.Statistics .avatar-btn:hover {
            color: #000000;
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
</style>
