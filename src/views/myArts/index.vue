<template>
    <div class="myArts">
        <div class="banner">
            <div class="slogan">
                Creations stemming from my lively imagination
            </div>
        </div>
        <a-row class="statistics container">
            <a-col class="item" :lg="8">
                <div>{{ converterNum(stat.totalArtists) }}</div>
                <span>My Artworks</span>
            </a-col>
            <a-col class="item" :lg="8">
                <div>{{ converterNum(stat.totalViews) }}</div>
                <span>Total Views of My Artworks</span>
            </a-col>
            <a-col class="item" :lg="7">
                <div>{{ stat.name || '--' }}</div>
                <span>Most Viewed Artwork</span>
            </a-col>
        </a-row>
        <div class="list-wrapper container">
            <div class="title">My Artworks</div>
            <a-tabs v-model:activeKey="activeKey" @change="tabChange">
                <a-tab-pane key="Completed" tab="Completed" force-render>
                    <result
                        :isLoading="completedListLoading"
                        :isEmpty="!completedList.length"
                    >
                        <div class="list">
                            <a-row :gutter="24">
                                <a-col
                                    :lg="8"
                                    :md="8"
                                    :sm="12"
                                    :xs="12"
                                    v-for="nft in completedList"
                                    :key="nft.artId"
                                >
                                    <div class="card-item">
                                        <div class="card-img">
                                            <a-image
                                                :preview="false"
                                                :src="'@/assets/img/nft.png'"
                                                :fallback="
                                                    require(`@/assets/img/screenshot.png`)
                                                "
                                            />
                                        </div>
                                        <div class="desc">
                                            <div class="name">
                                                {{ nft.name }}
                                            </div>
                                            <div class="views">
                                                {{ nft.viewsCount }} Views
                                            </div>
                                        </div>
                                    </div>
                                </a-col>
                                <Observer @intersect="loadMore" />
                            </a-row>
                        </div>
                    </result>
                </a-tab-pane>
                <a-tab-pane key="InProgress" tab="In Progress" force-render>
                    <div class="list container">
                        <in-creation-list
                            :list="inProgressList"
                            :isLoading="inProgressListLoading"
                        ></in-creation-list>
                    </div>
                </a-tab-pane>
            </a-tabs>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import eventBus from '@/utils/eventBus'
    import InCreationList from '@/components/InCreationList/index.vue'
    import {
        queryMyArtCompleted,
        queryMyArtInProgress,
        queryMyArtStat
    } from '@/api'
    import { converterNum } from '@/utils'
    import Result from '@/components/Result.vue'
    import Observer from '@/components/common/Observer'

    export default {
        name: 'index',
        components: { Result, Observer, InCreationList },
        data() {
            return {
                converterNum,
                stat: {},
                completedList: [],
                inProgressList: [],
                completedListLoading: false,
                inProgressListLoading: false,
                activeKey: 'Completed',
                accountChangeEvent: null
            }
        },
        created() {
            this.getMyArtStat()
            this.getMyArtList()
            this.accountChangeEvent = eventBus.onEvent('accountChanged', () => {
                this.getMyArtStat()
                this.getMyArtList()
            })
        },
        beforeRouteLeave(to, from, next) {
            eventBus.offEvent('accountChanged', this.accountChangeEvent)
            next()
        },
        computed: {
            ...mapGetters({
                defaultAccount: 'web3/defaultAccount'
            })
        },
        methods: {
            loadMore() {},
            async getMyArtList() {
                if (this.activeKey === 'InProgress') {
                    await this.getMyArtInProgress()
                }
                if (this.activeKey === 'Completed') {
                    await this.getMyArtCompleted()
                }
            },
            async getMyArtStat() {
                if (!this.defaultAccount) {
                    this.stat = {}
                    return
                }
                const res = await queryMyArtStat({
                    address: this.defaultAccount
                })
                if (res.code === 1) {
                    this.stat = res.data || {}
                }
            },
            async getMyArtInProgress() {
                if (!this.defaultAccount) {
                    this.inProgressList = []
                    return
                }
                if (this.inProgressListLoading) {
                    return
                }
                this.inProgressListLoading = true
                const res = await queryMyArtInProgress({
                    address: this.defaultAccount
                })
                this.inProgressListLoading = false
                if (res.code === 1) {
                    this.inProgressList = res.data
                }
            },
            async getMyArtCompleted() {
                if (!this.defaultAccount) {
                    this.completedList = []
                    return
                }
                if (this.completedListLoading) {
                    return
                }
                this.completedListLoading = true
                const res = await queryMyArtCompleted({
                    address: this.defaultAccount
                })
                this.completedListLoading = false
                if (res.code === 1) {
                    this.completedList = res.data
                }
            },
            tabChange() {
                this.getMyArtList()
            }
        }
    }
</script>

<style scoped lang="less">
    .myArts {
        .banner {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 320px;
            background: url('../../assets/img/myArts/banner.png') center
                no-repeat;
            background-size: 100% 100%;
            .slogan {
                margin-top: -68px;
                font-size: 48px;
                font-family: Inter-Semi Bold, Inter;
            }
        }
        .statistics {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: -68px;
            padding: 48px 32px;
            border-radius: 16px;
            background: #ffffff;
            .item {
                > div {
                    margin-bottom: 16px;
                    line-height: 1.2;
                    font-family: Inter-Semi Bold, Inter;
                    font-size: 48px;
                    color: #6a57e3;
                }
                > span {
                    font-family: Montserrat-SemiBold, Montserrat;
                    font-size: 18px;
                    color: #9ba2b0;
                }
            }
        }
        .list-wrapper {
            margin-top: 60px;
            .title {
                padding: 30px 0;
                text-align: center;
                line-height: 1.2;
                font-family: Inter-Semi Bold, Inter;
                font-size: 48px;
                border-bottom: 1px solid #d0d4dc;
            }
            :deep(.ant-tabs-top > .ant-tabs-nav::before) {
                display: none;
            }
        }
    }
</style>
