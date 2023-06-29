<template>
    <a-modal
        v-model:visible="visible"
        width="100%"
        :footer="null"
        wrap-class-name="art-modal"
        @cancel="close"
    >
        <template #title>
            <span>
                <img src="../assets/logo.png" alt="" width="160" />
            </span>
        </template>
        <div class="art-detail container">
            <div class="header">{{ detail.name }}</div>
            <a-row :gutter="126">
                <a-col :lg="6" :md="8" :sm="24" :xs="24">
                    <div class="addr-container">
                        <div class="title">In collaboration with</div>
                        <a-row>
                            <a-col
                                :lg="24"
                                :md="24"
                                :sm="12"
                                :xs="12"
                                class="addr"
                                v-for="(url, addr) in detail.creatorImageMap"
                                :key="addr"
                            >
                                {{ shortString(addr) }}
                            </a-col>
                        </a-row>
                    </div>
                </a-col>
                <a-col :lg="12" :md="12" :sm="24" :xs="24">
                    <div class="img-container">
                        <div class="card-wrapper">
                            <a-row>
                                <a-col
                                    v-for="(
                                        url, addr
                                    ) in detail.creatorImageMap"
                                    :key="addr"
                                    :lg="12"
                                    :md="12"
                                    :sm="12"
                                    :xs="12"
                                >
                                    <a-image
                                        class="card"
                                        :preview="false"
                                        :src="url"
                                        :fallback="
                                            require(`@/assets/img/screenshot.png`)
                                        "
                                    />
                                </a-col>
                            </a-row>
                        </div>
                    </div>
                </a-col>
                <a-col :lg="6" :md="24" :sm="24" :xs="24">
                    <a-row class="views-container">
                        <a-col class="title" :lg="24">Views</a-col>
                        <a-col class="amount" :lg="24">
                            {{ converterNum(detail.viewsCount) }}
                        </a-col>
                    </a-row>
                </a-col>
            </a-row>
            <div class="footer">
                Minted at
                {{ parseTime(detail.mintTime * 1000, 'yyyy-MM-dd') }}
                by tx
                <a style="color: #6a57e3" :href="txHref" target="_blank">
                    {{ shortString(detail.trxHash, 7, 0) }}
                </a>
            </div>
        </div>
    </a-modal>
</template>
<script>
    import { mapGetters } from 'vuex'
    import { shortString, converterNum, parseTime } from '@/utils'
    import { rpcConfig, defaultNetwork } from '@/config/web3'

    export default {
        name: 'artModal',
        props: {
            isShow: {
                type: Boolean,
                default: false
            },
            detail: {
                type: Object,
                default: () => {}
            }
        },
        computed: {
            ...mapGetters({
                defaultAccount: 'web3/defaultAccount'
            }),
            txHref() {
                const explorerUrl =
                    rpcConfig[defaultNetwork]['blockExplorerUrls'][0]
                return `${explorerUrl}/tx/${this.detail.trxHash}`
            }
        },
        watch: {
            isShow(newVal) {
                this.visible = newVal
            }
        },
        data() {
            return {
                parseTime,
                converterNum,
                shortString,
                visible: false
            }
        },
        methods: {
            close() {
                this.$emit('close')
            }
        }
    }
</script>

<style lang="less">
    .art-modal {
        .ant-modal {
            max-width: 100%;
            top: 0;
            padding-bottom: 0;
            margin: 0;
        }
        .ant-modal-content {
            display: flex;
            flex-direction: column;
            height: calc(100vh);
            overflow-y: scroll;
        }
        .ant-modal-header {
            border-bottom: none;
        }
        .ant-modal-body {
            flex: 1;
        }
        .ant-modal-close-x {
            font-size: 22px;
        }
        .art-detail {
            .header {
                margin-bottom: 32px;
                text-align: center;
                font-size: 36px;
            }
            .footer {
                text-align: center;
            }
            .addr-container {
                text-align: right;
                .title {
                    margin-bottom: 8px;
                    font-family: Inter-Semi Bold, Inter;
                }
                .addr {
                    padding: 8px 0;
                    color: #6a57e3;
                }
            }
            .img-container {
                .card-wrapper {
                    margin-bottom: 32px;
                    .ant-image {
                        width: 100%;
                        background-color: @background-color-light;
                    }
                    .card {
                        width: 100%;
                        height: auto;
                    }
                }
            }
            .views-container {
                .title {
                    margin-bottom: 4px;
                    color: #9ba2b0;
                }
                .amount {
                    margin-bottom: 24px;
                    font-family: Inter-Semi Bold, Inter;
                }
            }
        }
    }
</style>
