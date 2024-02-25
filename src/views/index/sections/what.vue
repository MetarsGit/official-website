<template>
    <div class="container section section-what">
        <div class="bg"></div>
        <h3 class="title">What is METARS</h3>
        <div class="content container">
            <a-row align="middle" justify="space-between" class="row">
                <a-col :lg="12" :md="12" :sm="24" :xs="24">
                    <img
                        class="img"
                        src="../../../assets/img/index/what-img-1.png"
                        alt=""
                    />
                </a-col>
                <a-col :lg="10" :md="10" :sm="24" :xs="24">
                    <div class="detail">
                        <span class="number">01</span>
                        <p class="desc">
                            METARS is a NFT creation platform that users can
                            collectively create virtual art using Generative
                            Artificial Intelligence technology.
                        </p>
                    </div>
                </a-col>
            </a-row>
            <a-row align="middle" justify="space-between" class="row">
                <a-col
                    :lg="12"
                    :md="12"
                    :sm="24"
                    :xs="24"
                    :order="device === 'mobile' ? 0 : 1"
                >
                    <img
                        class="img"
                        src="../../../assets/img/home/a2-img2.png"
                        alt=""
                    />
                </a-col>
                <a-col
                    :lg="10"
                    :md="10"
                    :sm="24"
                    :xs="24"
                    :order="device === 'mobile' ? 1 : 0"
                >
                    <div class="detail">
                        <span class="number">02</span>
                        <p class="desc">
                            A cool platform where you and your friends can use
                            Artificial Intelligence to create amazing virtual
                            art together. It's a place where you can let your
                            imagination run wild and bring your unique artistic
                            vision to life!
                        </p>
                    </div>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        computed: {
            ...mapGetters({
                device: 'settings/device'
            })
        },
        data() {
            return {}
        }
    }
</script>

<style lang="less" scoped>
    .section-what {
        position: relative;
        margin-top: 80px;
        .bg {
            position: absolute;
            width: 100%;
            height: 200px;
            background: url(../../../assets/img/home/a2-word.png);
            background-size: 1200px 200px;
            background-position-x: 0;
            animation: bgmove 50s linear infinite;
        }
        @keyframes bgmove {
            0% {
                background-position-x: 0px;
            }
            100% {
                background-position-x: -3600px;
            }
        }
        .title {
            position: relative;
            padding-top: 108px;
        }
        .content {
            margin-top: 36px;
            .number {
                font-size: 48px;
                font-weight: 600;
                line-height: 1.2;
            }
            .desc {
                margin-top: 18px;
                font-size: 20px;
                line-height: 1.6;
                color: #14171f;
            }
            .img {
                width: 100%;
                height: auto;
            }
        }
        @media (max-width: 768px) {
            margin-top: 32px;
            .bg {
                position: absolute;
                width: 100%;
                height: 55px;
                background: url(../../../assets/img/index/what-bg-mobile.png);
                background-size: 355px 55px;
                background-position-x: 0;
                background-repeat: no-repeat;
                animation: none;
            }
            .title {
                position: relative;
                padding-top: 20px;
            }
            .content {
                margin-top: 24px;
                padding: 0;
                .row {
                    margin-top: 24px;
                    flex-direction: column-reverse;
                    .detail {
                        display: flex;
                        .number {
                            font-size: 24px;
                            margin-right: 12px;
                        }
                        .desc {
                            margin-top: 0;
                            font-size: 12px;
                        }
                    }
                    .img {
                        margin-top: 8px;
                    }
                }
            }
        }
    }
</style>
