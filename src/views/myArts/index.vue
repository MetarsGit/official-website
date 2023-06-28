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
                <div>{{ stat.name || '--' }}</div>
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
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import eventBus from '@/utils/eventBus'
    import { converterNum } from '@/utils'
    import CompletedList from '@/views/myArts/completed.vue'
    import ProgressList from '@/views/myArts/progress.vue'
    import { queryMyArtStat } from '@/api'

    export default {
        name: 'index',
        components: { CompletedList, ProgressList },
        data() {
            return {
                converterNum,
                stat: {},
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
