<template>
    <div class="inCreation">
        <div class="banner">
            <h3 class="slogan">Unleash the power of collective creativity</h3>
        </div>
        <div class="list container">
            <a-table
                :columns="columns"
                :data-source="artList"
                :loading="loading"
                :pagination="pagination"
                @change="handleTableChange"
                :scroll="{ x: '100%' }"
                class="inCreation-list"
            >
                <template #bodyCell="{ column, record }">
                    <template v-if="column.dataIndex === 'name'">
                        <div class="name">
                            <a-tooltip placement="topLeft" v-if="!record.ready">
                                <template #title>
                                    <span>
                                        Unfinished creation, can't like it
                                    </span>
                                </template>
                                <img
                                    src="@/assets/img/icon/tip.png"
                                    alt=""
                                    class="icon-tip"
                                />
                            </a-tooltip>
                            <div @click="toGenerate(record)">
                                {{ record.name }}
                            </div>
                        </div>
                    </template>
                    <template v-if="column.dataIndex === 'creators'">
                        <div class="creators">
                            <div
                                v-for="addr in record.creatorList"
                                :key="addr"
                                class="addr"
                            >
                                {{ shortString(addr) }}
                            </div>
                        </div>
                    </template>
                    <template v-if="column.dataIndex === 'likes'">
                        <div class="likes">
                            <a-spin :spinning="record.likeLoading">
                                <div class="icon">
                                    <img
                                        src="@/assets/img/icon/like.png"
                                        alt=""
                                        v-if="record.isLike"
                                    />
                                    <img
                                        src="@/assets/img/icon/unlike.png"
                                        alt=""
                                        style="cursor: pointer"
                                        @click="like(record)"
                                        v-else-if="record.likeEnable"
                                    />
                                    <img
                                        src="@/assets/img/icon/like-disable.png"
                                        alt=""
                                        v-else
                                    />
                                </div>
                            </a-spin>
                            <span class="likes-amount">
                                {{ converterNum(record.likeCount) }}
                            </span>
                        </div>
                    </template>
                    <template v-if="column.dataIndex === 'progress'">
                        <a-progress
                            type="circle"
                            :percent="record.percent"
                            strokeColor="#14171F"
                            :strokeWidth="3"
                            :width="54"
                        >
                            <template #format="percent">
                                <svg-icon
                                    icon-class="completed"
                                    class-name="completed"
                                    v-if="percent === 100"
                                ></svg-icon>
                                <svg-icon
                                    icon-class="progress"
                                    class-name="progress"
                                    v-else
                                ></svg-icon>
                            </template>
                        </a-progress>
                    </template>
                    <template v-if="column.dataIndex === 'readyMint'">
                        <div>
                            <span v-if="record.ready">Yes</span>
                            <span v-else>No</span>
                        </div>
                    </template>
                </template>
            </a-table>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import eventBus from '@/utils/eventBus'
    import { walletConnect } from '@/utils/wallet'
    import { converterNum, shortString } from '@/utils'
    import { queryInCreationArt, likeArt } from '@/api'
    import { inCreationListColumns } from './config'

    export default {
        name: 'index',
        data() {
            return {
                converterNum,
                shortString,
                columns: inCreationListColumns,
                loading: false,
                artList: [],
                page: 0,
                pagination: {
                    showQuickJumper: true,
                    showSizeChanger: false,
                    showLessItems: true,
                    showTotal: () => {
                        return 'Only the top 5 artworks with the highest likes will have the chance to mint and get rewards every day. Once an artwork is minted it will be removed from this list.'
                    },
                    pageSize: 10,
                    total: 0
                }
            }
        },
        computed: {
            ...mapGetters({
                defaultAccount: 'web3/defaultAccount'
            })
        },
        created() {
            this.getInCreationArtList()
            eventBus.onEvent('accountChanged', () => {
                // 用户地址变化
                console.log('accountChanged~~~~~~')
                this.getInCreationArtList()
            })
        },
        methods: {
            toGenerate(item) {
                this.$router.push({
                    name: 'Generate',
                    query: {
                        id: item.artId
                    }
                })
            },
            handleTableChange(pag) {
                this.page = pag.current - 1
                this.pagination.pageSize = pag.pageSize
                this.getInCreationArtList()
            },
            async like(art) {
                art.likeLoading = true
                if (!this.defaultAccount) {
                    await walletConnect()
                    return
                }
                try {
                    const res = await likeArt({
                        artId: art.artId,
                        address: this.defaultAccount
                    })
                    if (res.code === 106) {
                        const logRes = await this.$store.dispatch('user/login')
                        art.likeLoading = false
                        if (logRes?.code === 1) {
                            await this.like(art)
                        }
                        return
                    }
                    art.likeLoading = false
                    if (res.code === 1) {
                        art.likeCount = art.likeCount + 1
                    }
                    // if (res.code === 113) {
                    // 已经like过
                    // art.isLike = true
                    // }
                    art.isLike = true
                } catch (e) {
                    art.likeLoading = false
                }
            },
            async getInCreationArtList() {
                // if (this.loading) {
                //     return
                // }
                this.loading = true
                try {
                    const res = await queryInCreationArt({
                        address: this.defaultAccount,
                        page: this.page,
                        size: this.pagination.pageSize
                    })
                    this.loading = false
                    if (res.code === 1) {
                        const list = res.data.content
                        list.forEach((item) => {
                            item.likeLoading = false
                        })
                        this.artList = list
                        this.pagination.total = res.data.totalElements
                    }
                } catch (e) {
                    this.loading = false
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .inCreation {
        .banner {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 320px;
            background: url('../../assets/img/inCreation/banner.png') center
                no-repeat;
            background-size: 100% 100%;
            .slogan {
                margin-top: -68px;
                font-family: Amiri, sans-serif;
                font-weight: 700;
                font-size: 48px;
            }
        }
        .list {
            display: flex;
            flex-direction: column;
            margin-top: -68px;
            .inCreation-list {
                .name {
                    display: flex;
                    align-items: center;
                    > .icon-tip {
                        margin-right: 8px;
                        width: 20px;
                        height: 20px;
                    }
                }
                .likes {
                    display: flex;
                    align-items: center;
                    .icon {
                        width: 32px;
                        height: 32px;
                        //cursor: pointer;
                        > img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    &-amount {
                        margin-left: 10px;
                    }
                }
                :deep(.ant-pagination .ant-pagination-total-text) {
                    flex: 1;
                    margin-right: 56px;
                    line-height: 26px;
                }
            }
        }
        @media (max-width: 992px) {
            .banner {
                height: auto;
                .slogan {
                    margin: 16px auto;
                    padding: 0 16px;
                    font-size: 28px;
                }
            }
            .list {
                margin: 24px auto;
            }
        }
    }
</style>
