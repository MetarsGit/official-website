<template>
    <div class="myArts">
        <div class="banner">
            <div class="slogan">
                Creations stemming from my lively imagination
            </div>
        </div>
        <a-row class="statistics container">
            <a-col class="item" :lg="8">
                <div>123</div>
                <span>My Artworks</span>
            </a-col>
            <a-col class="item" :lg="8">
                <div>1023</div>
                <span>Auto Layout Vertical</span>
            </a-col>
            <a-col class="item" :lg="7">
                <div>Armed Girl</div>
                <span>Most Viewed Artwork</span>
            </a-col>
        </a-row>
        <div class="list-wrapper container">
            <div class="title">My Artworks</div>
            <a-tabs v-model:activeKey="activeKey" @change="tabChange">
                <a-tab-pane key="Completed" tab="Completed" force-render>
                    <div class="list">
                        <a-row :gutter="24">
                            <a-col
                                :lg="8"
                                :md="8"
                                :sm="12"
                                :xs="12"
                                v-for="nft in 20"
                                :key="nft"
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
                                            Name of the artwork collection
                                        </div>
                                        <div class="views">938 Views</div>
                                    </div>
                                </div>
                            </a-col>
                        </a-row>
                    </div>
                </a-tab-pane>
                <a-tab-pane key="InProgress" tab="In Progress" force-render>
                    <div class="list container">
                        <in-creation-list></in-creation-list>
                    </div>
                </a-tab-pane>
            </a-tabs>
        </div>
    </div>
</template>

<script>
    import InCreationList from '@/components/InCreationList/index.vue'
    export default {
        name: 'index',
        components: { InCreationList },
        data() {
            return {
                activeKey: 'Completed'
            }
        },
        methods: {
            tabChange(key) {}
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
