<template>
    <a-spin :spinning="loading">
        <div class="comp-start">
            <img class="img" src="../img/start-img.png" />
            <div class="detail">
                <p class="title">GM</p>
                <div class="desc">
                    Welcome to METARS, the NFT creation platform that makes it
                    easy for you to create and share your unique virtual art on
                    the blockchain. Whether you are an artist, collector, or
                    enthusiast, METARS offers you an opportunity to create
                    stunning graph NFTs without any technical knowledge or prior
                    experience. We are thrilled to have you join our community
                    and can't wait to see the amazing creations you come up
                    with. So come on in, let your imagination run wild, and let
                    METARS be your gateway to the exciting world of crypto art!
                </div>
                <span class="btn-start" @click="start">Start</span>
            </div>
        </div>
    </a-spin>
</template>

<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex'
    import { getGrecaptchaToken, submitArtStart } from '@/api/index'
    export default {
        computed: {
            ...mapGetters({
                defaultAccount: 'web3/defaultAccount'
            })
        },
        data() {
            return {
                loading: false
            }
        },
        methods: {
            ...mapActions('art', ['fetchArtDetail']),
            ...mapMutations('art', ['setArtId']),
            async start() {
                let creatorAddress = this.defaultAccount
                if (!creatorAddress) {
                    this.$message.warn('Please connect the wallet')
                    return
                }
                this.loading = true
                let recaptchaToken = await getGrecaptchaToken('start')
                let param = {
                    creatorAddress,
                    recaptchaToken
                }
                const res = await submitArtStart(param).catch(() => {
                    this.loading = false
                })
                if (res?.code === 1) {
                    this.setArtId(res?.data?.id)
                    // url改变会自动请求详情
                    this.$router.replace({
                        query: {
                            id: res?.data?.id
                        }
                    })
                } else if (res.code === 106) {
                    await this.$store.dispatch('user/login').catch(() => {
                        this.loading = false
                    })
                    await this.start()
                }
                this.loading = false
            }
        }
    }
</script>

<style lang="less" scoped>
    .comp-start {
        display: flex;
        padding-top: 98px;
        .img {
            flex: 0 0 480px;
            width: 480px;
            height: 480px;
            border-radius: 16px;
            margin-right: 130px;
        }
        .detail {
            color: #14171f;
            .title {
                font-size: 48px;
                line-height: 50px;
            }
            .desc {
                font-size: 20px;
                line-height: 32px;
                margin-top: 28px;
            }
            .btn-start {
                float: right;
                width: 200px;
                height: 56px;
                line-height: 56px;
                margin-top: 58px;
                font-size: 16px;
                font-weight: bold;
                font-family: Inter-Semi Bold, Inter;
                background: #14171f;
                color: #fff;
                border-radius: 60px;
                text-align: center;
                cursor: pointer;
            }
            .btn-disable {
                background: #f2f4f7;
                color: #9ba2b0;
                cursor: default;
            }
        }
    }
</style>
