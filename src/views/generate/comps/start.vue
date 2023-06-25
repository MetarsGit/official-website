<template>
    <div class="comp-start">
        <img class="img" src="../img/start-img.png" />
        <div class="detail">
            <p class="title">GM</p>
            <div class="desc">
                Welcome to METARS, the NFT creation platform that makes it easy
                for you to create and share your unique virtual art on the
                blockchain. Whether you are an artist, collector, or enthusiast,
                METARS offers you an opportunity to create stunning graph NFTs
                without any technical knowledge or prior experience. We are
                thrilled to have you join our community and can't wait to see
                the amazing creations you come up with. So come on in, let your
                imagination run wild, and let METARS be your gateway to the
                exciting world of crypto art!
            </div>
            <!-- <span class="btn-start" @click="login">Login</span> -->
            <span class="btn-start" @click="start">Start</span>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapState } from 'vuex'
    import { getGrecaptchaToken, submitArtStart } from '@/api/index'
    import { getAccessToken } from '@/utils/accessToken'
    export default {
        computed: {
            ...mapGetters({
                defaultAccount: 'web3/defaultAccount'
            })
        },
        methods: {
            async start() {
                let creatorAddress = this.defaultAccount
                console.log('w', creatorAddress)
                console.log('t', getAccessToken())
                if (!creatorAddress) {
                    return
                }
  
                let recaptchaToken = await getGrecaptchaToken('start')
                let param = {
                    creatorAddress,
                    recaptchaToken
                }
                console.log('recaptchaToken', recaptchaToken)
                submitArtStart(param).then((res) => {
                    console.log(res)
                })
            },

            login(){
                this.$store.dispatch('user/sign')
            }
        }
    }
</script>

<style lang="less" scoped>
    .comp-start {
        display: flex;
        padding-top: 98px;
        .img {
            // flex-shrink: 480px;
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
        }
    }
</style>
