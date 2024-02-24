<template>
    <a-table
        :columns="columns"
        :data-source="list"
        :loading="isLoading"
        :pagination="pagination"
        @change="handleTableChange"
        class="inCreation-list"
    >
        <template #bodyCell="{ column, record }">
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
</template>

<script>
    import { inCreationListColumns } from './config'
    import { converterNum, shortString } from '@/utils'
    import SvgIcon from '../common/SvgIcon/index.vue'

    export default {
        name: 'index',
        components: { SvgIcon },
        props: {
            isLoading: {
                type: Boolean,
                default: false
            },
            list: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                converterNum,
                shortString,
                page: 0,
                pagination: {
                    pageSize: 10,
                    total: 0
                },
                columns: inCreationListColumns
            }
        },
        methods: {
            handleTableChange(pag) {
                // console.log('======>', pag, filters, sorter)
                this.page = pag.current - 1
                this.pagination.pageSize = pag.pageSize
                this.getArtList()
            },
            getArtList() {}
        }
    }
</script>

<style scoped lang="less">
    .inCreation-list {
        .creators {
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 120px;
            .addr {
                padding: 2px 0;
                line-height: 26px;
                font-weight: 400;
                color: #6a57e3;
            }
        }
        :deep(.ant-progress) {
            .ant-progress-text {
                .svg-icon.completed {
                    font-size: 24px;
                    color: #14171f;
                }
                .svg-icon.progress {
                    font-size: 28px;
                    color: #e5e7eb;
                }
            }
        }
    }
</style>
