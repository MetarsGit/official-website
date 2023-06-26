<template>
    <div>
        <div class="artList container">
            <div class="title">Explore collaborative artworks.</div>
            <div class="list-wrapper">
                <div class="search-wrapper">
                    <a-row :gutter="12">
                        <a-col :lg="18">
                            <a-input
                                v-model:value="searchKey"
                                placeholder="Search by name or creator address"
                                @pressEnter="initArtList"
                            >
                                <template #suffix>
                                    <svg-icon
                                        v-if="searchKey"
                                        icon-class="close"
                                        class-name="close-icon"
                                        @click="searchKey = ''"
                                    ></svg-icon>
                                    <svg-icon
                                        icon-class="search"
                                        class-name="search-icon"
                                        @click="initArtList"
                                    ></svg-icon>
                                </template>
                            </a-input>
                        </a-col>
                        <a-col :lg="6">
                            <a-select
                                ref="select"
                                v-model:value="selectKey"
                                :disabled="loading"
                                @change="selectChange"
                            >
                                <a-select-option
                                    v-for="item in selectConfig"
                                    :key="item.key"
                                    :value="item.key"
                                >
                                    {{ item.title }}
                                </a-select-option>
                            </a-select>
                        </a-col>
                    </a-row>
                </div>
                <!--            <div class="search-desc">“Girls” artwork</div>-->
                <!--                <div class="search-addr">-->
                <!--                    <div class="addr">-->
                <!--                        0xa0aa93ac72d19588485E8E5a2348398fC32143B4-->
                <!--                    </div>-->
                <!--                    <div>-->
                <!--                        Created 19 virtual artworks and recevied a total of-->
                <!--                        239,238,119 views-->
                <!--                    </div>-->
                <!--                </div>-->
                <result :isLoading="loading" :isEmpty="!artList.length">
                    <div class="list">
                        <a-row :gutter="24">
                            <a-col
                                :lg="8"
                                :md="8"
                                :sm="12"
                                :xs="12"
                                v-for="nft in artList"
                                :key="nft.artId"
                            >
                                <div class="card-item" @click="viewCard(nft)">
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
            </div>
        </div>
        <a-modal
            v-model:visible="showDetail"
            width="100%"
            :footer="null"
            wrap-class-name="art-modal"
        >
            <template #title>
                <span>
                    <img src="../../assets/logo.png" alt="" width="160" />
                </span>
            </template>
            <div class="art-detail container">
                <div class="header">Name of the artwork collection</div>
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
                                    v-for="i in 4"
                                    :key="i"
                                >
                                    0xabcd...abcd
                                </a-col>
                            </a-row>
                        </div>
                    </a-col>
                    <a-col :lg="12" :md="12" :sm="24" :xs="24">
                        <div class="img-container">
                            <div class="card-wrapper">
                                <a-row>
                                    <a-col
                                        v-for="i in 4"
                                        :key="i"
                                        :lg="12"
                                        :md="12"
                                        :sm="12"
                                        :xs="12"
                                    >
                                        <img
                                            src="../../assets/img/nft.png"
                                            alt=""
                                            class="card"
                                        />
                                    </a-col>
                                </a-row>
                            </div>
                        </div>
                    </a-col>
                    <a-col :lg="6" :md="24" :sm="24" :xs="24">
                        <a-row class="views-container">
                            <a-col class="title" :lg="24">Views</a-col>
                            <a-col class="amount" :lg="24">123,128,329</a-col>
                        </a-row>
                    </a-col>
                </a-row>
                <div class="footer">
                    Minted at 2023-02-23 by tx
                    <span style="color: #6a57e3">0x2b2ce...</span>
                </div>
            </div>
        </a-modal>
    </div>
</template>

<script>
    import { queryArtAll } from '@/api'
    import Observer from '@/components/common/Observer.vue'
    import Result from '@/components/Result.vue'
    const selectConfig = [
        {
            title: 'Recently Created',
            key: 'RECENTLY'
        },
        {
            title: 'Most Viewed',
            key: 'VIEWED'
        },
        {
            title: 'Oldest',
            key: 'OLDEST'
        }
    ]

    export default {
        name: 'index',
        components: { Result, Observer },
        data() {
            return {
                loading: false,
                artList: [],
                page: 0,
                pageSize: 12,
                totalElements: 0,
                searchKey: '',
                selectConfig,
                selectKey: selectConfig[0].key,
                showDetail: false
            }
        },
        computed: {
            totalPages() {
                return Math.ceil(this.totalElements / this.pageSize)
            }
        },
        created() {
            this.initArtList()
        },
        methods: {
            async initArtList() {
                this.page = 0
                this.totalElements = 0
                this.artList = []
                this.loading = true
                await this.getArtList()
                this.loading = false
            },
            async getArtList() {
                if (this.totalPages < this.page) {
                    return
                }
                const res = await queryArtAll({
                    page: this.page,
                    size: this.pageSize,
                    searchKey: this.searchKey,
                    status: this.selectKey
                })
                console.log(res)
                if (res.data) {
                    this.totalElements = res.data.totalElements
                    const list = res.data || []
                    this.artList = this.artList.concat(list)
                }
            },
            loadMore() {
                if (this.totalPages <= this.page + 1) {
                    return
                }
                this.page = this.page + 1
                this.getArtList()
            },
            selectChange(option) {
                this.selectKey = option.key
                this.initArtList()
            },
            viewCard() {
                this.showDetail = true
            }
        }
    }
</script>

<style scoped lang="less">
    .artList {
        padding-top: 40px;
        .title {
            margin: 32px;
            text-align: center;
            font-family: Inter-Semi Bold, Inter;
            font-size: 36px;
        }
        .search-desc {
            font-size: 24px;
        }
        .search-addr {
            text-align: center;
            .addr {
                margin-bottom: 10px;
                font-size: 24px;
            }
        }
        .list {
            padding-top: 40px;
        }
        .search-wrapper {
            margin: 0 auto;
            margin-bottom: 40px;
            width: 80%;
            :deep(.ant-select) {
                width: 100%;
                .ant-select-selector {
                    padding: 0 24px;
                    height: 48px;
                    border-radius: 38px;
                }
            }
            :deep(.ant-input-affix-wrapper) {
                width: 100%;
                height: 48px;
                padding: 6px 20px;
                border-radius: 38px;
                .close-icon {
                    margin-right: 24px;
                    font-size: 14px;
                    cursor: pointer;
                }
                .search-icon {
                    cursor: pointer;
                    font-size: 16px;
                    color: @primary-color;
                }
            }
        }
    }
</style>
