<template>
    <div class="artList container">
        <div class="title">Explore collaborative artworks.</div>
        <div class="list-wrapper">
            <div class="search-wrapper">
                <a-row :gutter="12">
                    <a-col :lg="18">
                        <debounce-input
                            placeholder="Search by name or creator address"
                            @inputChange="inputChange"
                            @keyup.enter="searchAll"
                            @blur=""
                        >
                            <template v-slot:suffix>
                                <svg-icon
                                    icon-class="search"
                                    class-name="search-icon"
                                    @click="searchAll"
                                ></svg-icon>
                            </template>
                        </debounce-input>
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
            <div class="search-addr">
                <div class="addr">
                    0xa0aa93ac72d19588485E8E5a2348398fC32143B4
                </div>
                <div>
                    Created 19 virtual artworks and recevied a total of
                    239,238,119 views
                </div>
            </div>
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
        </div>
    </div>
</template>

<script>
    import DebounceInput from '@/components/common/DebounceInput'
    const selectConfig = [
        {
            title: 'Recently Created',
            key: 'RecentlyCreated'
        },
        {
            title: 'Most Viewed',
            key: 'MostViewed'
        },
        {
            title: 'Oldest',
            key: 'Oldest'
        }
    ]

    export default {
        name: 'index',
        components: { DebounceInput },
        data() {
            return {
                loading: false,
                searchData: [],
                searchKey: '',
                selectConfig: selectConfig,
                selectKey: selectConfig[0].key
            }
        },
        methods: {
            selectChange(option) {
                this.selectKey = option.key
                this.searchArtList()
            },
            searchArtList() {},
            inputChange(value) {
                this.searchKey = value
                this.searchAll()
            },
            async searchAll() {
                if (this.searchKey.length < 3) {
                    return
                }
                this.loading = true
                const res = await searchCollections({
                    collectionName: this.searchKey
                })
                console.log(res)
                if (!res.data) {
                    return
                }
                this.searchData = res.data
                setTimeout(() => {
                    this.loading = false
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
                .search-icon {
                    cursor: pointer;
                    font-size: 18px;
                    color: @primary-color;
                }
            }
        }
    }
</style>
