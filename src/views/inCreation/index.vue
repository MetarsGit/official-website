<template>
    <div class="inCreation">
        <div class="banner">
            <div class="slogan">Unleash the power of collective creativity</div>
        </div>
        <div class="list container">
            <a-table
                :columns="columns"
                :data-source="artList"
                :loading="loading"
                :pagination="pagination"
                @change="handleTableChange"
                class="inCreation-list"
            >
                <template #bodyCell="{ column, record }">
                    <template v-if="column.dataIndex === 'name'">
                        <div @click="toGenerate(record)" class="name">
                            {{ record.name }}
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
                    <template v-if="column.dataIndex === 'retweets'">
                        <span>
                            {{ converterNum(record.totalRetweetsCount) }}
                        </span>
                    </template>
                    <template v-if="column.dataIndex === 'progress'">
                        <a-progress
                            type="circle"
                            :percent="record.percent"
                            strokeColor="#14171F"
                            :strokeWidth="2"
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
            <div class="desc">
                Everyday only the top 3 artworks that have the highest retweets
                get the chance to be minted and claim the rewards. Once the
                artwork is minted, it will be removed from this list.
            </div>
        </div>
    </div>
</template>

<script>
    import { inCreationListColumns } from './config'
    import { converterNum, shortString } from '@/utils'
    // import InCreationList from '@/components/InCreationList/index.vue'
    import { queryInCreationArt } from '@/api'
    // import SvgIcon from '@/components/common/SvgIcon/index.vue'

    export default {
        name: 'index',
        // components: { SvgIcon, InCreationList },
        data() {
            return {
                converterNum,
                shortString,
                columns: inCreationListColumns,
                loading: false,
                artList: [],
                page: 0,
                pagination: {
                    pageSize: 10,
                    total: 0
                }
            }
        },
        created() {
            this.getInCreationArtList()
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
            async getInCreationArtList() {
                if (this.loading) {
                    return
                }
                this.loading = true
                const res = await queryInCreationArt({
                    page: this.page,
                    size: this.pagination.pageSize
                })
                this.loading = false
                if (res.code === 1) {
                    this.artList = res.data.content
                    this.pagination.total = res.data.totalElements
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
                font-family: Inter-Semi Bold, Inter;
                font-size: 48px;
            }
        }
        .list {
            display: flex;
            flex-direction: column;
            margin-top: -68px;
            min-height: calc(100vh - 400px);
            .inCreation-list {
                flex: 1;
            }
            .desc {
                color: #515151;
            }
        }
    }
</style>
