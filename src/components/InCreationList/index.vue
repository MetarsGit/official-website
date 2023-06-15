<template>
    <a-table
        :columns="columns"
        :data-source="list"
        :pagination="false"
        :loading="loading"
        class="inCreation-list"
    ></a-table>
</template>

<script>
    import { inCreationListColumns } from './config'
    export default {
        name: 'index',
        props: {
            // list: {
            //     type: Array,
            //     default: [
            //         {
            //             title: 'Name of the artwork',
            //             retweets: '132',
            //             creators: [
            //                 '0x2dF4535D2d03323827c6fD4307ecd75462cD1F24'
            //             ],
            //             progress: 80,
            //             readyMint: true
            //         }
            //     ]
            // }
        },
        data() {
            return {
                list: [
                    {
                        title: 'Name of the artwork',
                        retweets: '132',
                        creators: [
                            '0x2dF4535D2d03323827c6fD4307ecd75462cD1F24'
                        ],
                        progress: 100,
                        readyMint: true
                    },
                    {
                        title: 'Name of the artwork',
                        retweets: '132',
                        creators: [
                            '0x2dF4535D2d03323827c6fD4307ecd75462cD1F24'
                        ],
                        progress: 80,
                        readyMint: false
                    }
                ],
                loading: false,
                columns: inCreationListColumns
            }
        }
    }
</script>

<style scoped></style>
