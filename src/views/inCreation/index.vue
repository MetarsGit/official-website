<template>
    <div class="inCreation">
        <div class="banner">
            <div class="slogan">Unleash the power of collective creativity</div>
        </div>
        <div class="list container">
            <in-creation-list
                :list="artList"
                :isLoading="loading"
            ></in-creation-list>
            <div class="desc">
                Everyday only the top 3 artworks that have the highest retweets
                get the chance to be minted and claim the rewards. Once the
                artwork is minted, it will be removed from this list.
            </div>
        </div>
    </div>
</template>

<script>
    import InCreationList from '@/components/InCreationList/index.vue'
    import { queryInCreationArt } from '@/api'
    export default {
        name: 'index',
        components: { InCreationList },
        data() {
            return {
                loading: false,
                artList: []
            }
        },
        created() {
            this.getInCreationArtList()
        },
        methods: {
            async getInCreationArtList() {
                if (this.loading) {
                    return
                }
                this.loading = true
                const res = await queryInCreationArt({})
                console.log('res===>', res)
                this.loading = false
                if (res.code === 1) {
                    this.artList = res.data
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
