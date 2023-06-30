<template>
    <div class="list container">
        <a-table
            :columns="inCreationListColumns"
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
</template>

<script>
    import { mapGetters } from 'vuex'
    import eventBus from '@/utils/eventBus'
    import { converterNum, shortString } from '@/utils'
    import { queryMyArtInProgress } from '@/api'
    import { inCreationListColumns } from '@/views/myArts/config'

    export default {
        name: 'index',
        data() {
            return {
                converterNum,
                shortString,
                inCreationListColumns,
                artList: [],
                loading: false,
                page: 0,
                pagination: {
                    showQuickJumper: true,
                    showSizeChanger: false,
                    showLessItems: true,
                    pageSize: 10,
                    total: 0
                },
                totalElements: 0,
                accountChangeEvent: null
            }
        },
        created() {
            this.initList()
            this.accountChangeEvent = eventBus.onEvent('accountChanged', () => {
                this.initList()
            })
        },
        beforeUnmount() {
            eventBus.offEvent('accountChanged', this.accountChangeEvent)
        },
        computed: {
            ...mapGetters({
                defaultAccount: 'web3/defaultAccount'
            }),
            totalPages() {
                return Math.ceil(this.totalElements / this.pageSize)
            }
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
            async initList() {
                this.page = 0
                this.totalElements = 0
                this.artList = []
                this.loading = true
                await this.getArtList()
                this.loading = false
            },
            loadMore() {
                if (this.totalPages <= this.page + 1) {
                    return
                }
                this.page = this.page + 1
                this.getArtList()
            },
            async getArtList() {
                if (!this.defaultAccount) {
                    this.artList = []
                    return
                }
                const res = await queryMyArtInProgress({
                    address: this.defaultAccount,
                    page: this.page,
                    size: this.pagination.pageSize
                })
                if (res.code === 1) {
                    const list = res.data.content || []
                    this.artList = this.artList.concat(list)
                }
            },
            handleTableChange(pag) {
                this.page = pag.current - 1
                this.pagination.pageSize = pag.pageSize
                this.getArtList()
            }
        }
    }
</script>

<style scoped lang="less"></style>
