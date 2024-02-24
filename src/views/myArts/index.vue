<template>
    <div class="myArts">
        <div class="banner">
            <div class="slogan">
                Creations stemming from my lively imagination
            </div>
        </div>
        <a-row class="statistics container">
            <a-col class="item" :lg="8">
                <div>{{ converterNum(stat.myArtCount) }}</div>
                <span>My Artworks</span>
            </a-col>
            <a-col class="item" :lg="8">
                <div>{{ converterNum(stat.totalViews) }}</div>
                <span>Total Views of My Artworks</span>
            </a-col>
            <a-col class="item" :lg="7">
                <div class="name" v-if="artMostView.name" @click="viewArt">
                    {{ artMostView.name }}
                </div>
                <div v-else>--</div>
                <span>Most Viewed Artwork</span>
            </a-col>
        </a-row>
        <div class="list-wrapper container">
            <div class="title">My Artworks</div>
            <a-tabs
                v-model:activeKey="activeKey"
                :destroyInactiveTabPane="true"
            >
                <a-tab-pane key="Completed" tab="Completed">
                    <completed-list></completed-list>
                </a-tab-pane>
                <a-tab-pane key="InProgress" tab="In Progress">
                    <progress-list></progress-list>
                </a-tab-pane>
            </a-tabs>
        </div>
        <art-modal
            :is-show="showDetail"
            :detail="artMostView"
            @close="showDetail = false"
        ></art-modal>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import eventBus from '@/utils/eventBus'
    import { converterNum } from '@/utils'
    import CompletedList from '@/views/myArts/completed.vue'
    import ProgressList from '@/views/myArts/progress.vue'
    import artModal from '@/components/artModal.vue'
    import { queryMyArtStat } from '@/api'

    export default {
        name: 'index',
        components: { artModal, CompletedList, ProgressList },
        data() {
            return {
                converterNum,
                stat: {},
                artMostView: {},
                showDetail: false,
                activeKey: 'Completed',
                accountChangeEvent: null
            }
        },
        created() {
            this.getMyArtStat()
            this.accountChangeEvent = eventBus.onEvent('accountChanged', () => {
                this.getMyArtStat()
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
            viewArt() {
                this.showDetail = true
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
                    this.stat.myArtCount = res.data.myArtCount || 0
                    this.stat.totalViews = res.data.totalViews || 0
                    this.artMostView = res.data.artCompletedResp || {}
                }
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
                font-weight: 600;
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
                    font-weight: 600;
                    font-size: 40px;
                    color: #6a57e3;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    &.name {
                        cursor: pointer;
                    }
                }
                > span {
                    font-weight: 600;
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
                font-weight: 600;
                font-size: 48px;
                border-bottom: 1px solid #d0d4dc;
            }
            :deep(.ant-tabs-top > .ant-tabs-nav::before) {
                display: none;
            }
        }
    }
    @media (max-width: 992px) {
        .myArts {
            .banner {
                height: auto;
                .slogan {
                    margin: 16px;
                    font-size: 28px;
                }
            }
            .statistics {
                margin: 16px auto;
                padding: 0 16px;
                .item {
                    > div {
                        font-size: 28px;
                        margin-bottom: 0;
                    }
                    > span {
                        font-size: 12px;
                    }
                }
            }
            .list-wrapper {
                margin: 24px auto;
                .title {
                    padding: 16px;
                    font-size: 28px;
                }
            }
        }
    }
</style>
