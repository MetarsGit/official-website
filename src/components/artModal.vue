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
                                v-for="addr in detail.creatorList"
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
                                    v-for="url in detail.imageUrlList"
                                    :key="url"
                                    :lg="imgSpan"
                                    :md="imgSpan"
                                    :sm="imgSpan"
                                    :xs="imgSpan"
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
                Minted at 2023-02-23 by tx
                <span style="color: #6a57e3">0x2b2ce...</span>
            </div>
        </div>
    </a-modal>
</template>
<script>
    import { shortString, converterNum } from '@/utils'
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
            imgSpan() {
                return this.detail.imageUrlList.length === 1 ? 24 : 12
            }
        },
        watch: {
            isShow(newVal) {
                this.visible = newVal
            }
        },
        data() {
            return {
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
        .ant-modal-content {
            overflow-y: scroll;
        }
        .card-wrapper {
            .ant-image {
                background-color: @background-color-light;
            }
        }
    }
</style>
