<template>
    <div>
        <div class="artList container">
            <h3 class="title">Explore collaborative artworks.</h3>
            <div class="list-wrapper">
                <div class="search-wrapper">
                    <a-row :gutter="12">
                        <a-col :lg="18" :md="14" :sm="24" :xs="24">
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
                        <a-col :lg="6" :md="10" :sm="24" :xs="24">
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
                <div class="search-desc" v-if="searchType === 'keyword'">
                    “{{ currentSearchKey }}” artwork
                </div>
                <div class="search-addr" v-if="searchType === 'address'">
                    <div class="addr">
                        {{ currentSearchKey }}
                    </div>
                    <div>
                        Created {{ totalElements }} virtual artworks and
                        recevied a total of
                        {{ toThousandFilter(totalView) }} views
                    </div>
                </div>
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
                                <div class="card-item">
                                    <div
                                        class="card-img"
                                        @click="viewCard(nft)"
                                    >
                                        <a-image
                                            :preview="false"
                                            :src="nft.imageUrlList[0] || ''"
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
                                            {{
                                                toThousandFilter(nft.viewsCount)
                                            }}
                                            Views
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
        <art-modal
            :is-show="showDetail"
            :detail="artDetail"
            @close="showDetail = false"
        ></art-modal>
    </div>
</template>

<script>
    import { queryArtList, submitView } from '@/api'
    import { shortString, toThousandFilter } from '@/utils'
    import Observer from '@/components/common/Observer.vue'
    import Result from '@/components/Result.vue'
    import artModal from '@/components/artModal.vue'

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
        components: { artModal, Result, Observer },
        data() {
            return {
                shortString,
                toThousandFilter,
                loading: false,
                artList: [],
                page: 0,
                pageSize: 12,
                totalElements: 0,
                totalView: 0,
                searchKey: '',
                currentSearchKey: '',
                searchType: '',
                selectConfig,
                selectKey: selectConfig[0].key,
                showDetail: false,
                artDetail: {}
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
                this.totalView = 0
                this.searchType = ''
                this.currentSearchKey = this.searchKey
                this.artList = []
                this.loading = true
                await this.getArtList()
                if (this.currentSearchKey) {
                    if (this.currentSearchKey.match(/^0x[a-fA-f0-9]{40}$/)) {
                        this.searchType = 'address'
                    } else {
                        this.searchType = 'keyword'
                    }
                }
                this.loading = false
            },
            async getArtList() {
                if (this.totalPages < this.page) {
                    return
                }
                const res = await queryArtList({
                    page: this.page,
                    size: this.pageSize,
                    searchWord: this.currentSearchKey,
                    status: this.selectKey
                })
                if (res.code !== 1) {
                    return
                }
                const { totalElements, totalView, content = [] } = res.data
                this.totalElements = totalElements
                this.totalView = totalView
                const list = content
                list.forEach((item) => {
                    item.imageUrlList = []
                    for (let key in item.creatorImageMap) {
                        item.imageUrlList.push(item.creatorImageMap[key])
                    }
                })
                this.artList = this.artList.concat(list)
            },
            loadMore() {
                if (this.totalPages <= this.page + 1) {
                    return
                }
                this.page = this.page + 1
                this.getArtList()
            },
            selectChange() {
                this.initArtList()
            },
            async viewCard(nft) {
                this.showDetail = true
                this.artDetail = nft
                submitView({
                    artId: nft.artId
                }).then((res) => {
                    if (res.code === 1) {
                        const art = this.artList.find((item) => {
                            return item.artId === nft.artId
                        })
                        art.viewsCount = art.viewsCount + 1
                    }
                })
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
            font-family: Amiri, sans-serif;
            font-weight: 700;
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
    @media (max-width: 768px) {
        .artList {
            padding-top: 20px;
            .search-wrapper {
                .ant-row > .ant-col:first-child {
                    margin-bottom: 10px;
                }
            }
            .title {
                font-size: 20px;
                margin: 16px auto;
            }
            .list {
                padding-top: 0;
            }
        }
    }
</style>
