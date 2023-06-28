<template>
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
                    <div class="card-item" @click="showArt(nft)">
                        <div class="card-img">
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
                                {{ converterNum(nft.viewsCount) }}
                                Views
                            </div>
                        </div>
                    </div>
                </a-col>
                <Observer @intersect="loadMore" />
            </a-row>
        </div>
        <art-modal
            :is-show="showDetail"
            :detail="artDetail"
            @close="showDetail = false"
        ></art-modal>
    </result>
</template>

<script>
    import { mapGetters } from 'vuex'
    import eventBus from '@/utils/eventBus'
    import { converterNum, shortString } from '@/utils'
    import Result from '@/components/Result.vue'
    import Observer from '@/components/common/Observer'
    import artModal from '@/components/artModal.vue'
    import { queryMyArtCompleted } from '@/api'

    export default {
        name: 'index',
        components: { Result, Observer, artModal },
        data() {
            return {
                converterNum,
                shortString,
                showDetail: false,
                artDetail: {},
                artList: [],
                loading: false,
                page: 0,
                pageSize: 12,
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
            showArt(nft) {
                this.showDetail = true
                this.artDetail = nft
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
                const res = await queryMyArtCompleted({
                    address: this.defaultAccount,
                    page: this.page,
                    size: this.pageSize
                })
                if (res.code === 1) {
                    this.totalElements = res.data.totalElements
                    const list = res.data.content || []
                    this.artList = this.artList.concat(list)
                }
            }
        }
    }
</script>

<style scoped lang="less"></style>
