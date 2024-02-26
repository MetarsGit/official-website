<template>
    <div class="section-home" id="metars">
        <div class="container">
            <scroll inClass="animate__animated animate__fadeInUp">
                <p class="p1">Unleash the power of</p>
                <p class="p2">collective creativity</p>
                <p class="p2">with METARS!</p>
            </scroll>
            <scroll
                inClass="animate__animated animate__fadeInUp animate__delay"
            >
                <p class="p3">
                    We believe that everyone is an artist, and everyone can
                    generate self-owned unique art. Unlike traditional NFT
                    creation platforms, METARS utilizes AI deep learning to
                    provide you with a more seamless, engaging and personalized
                    user experience.
                </p>
            </scroll>
            <scroll
                inClass="animate__animated animate__fadeInUp animate__delay"
            >
                <div class="btn-wrap" @click="launchApp">
                    <i class="line"></i>
                    <i class="line line-long line-right"></i>
                    <span class="btn-launch">Launch Application</span>
                    <i class="line line-bottom line-long"></i>
                    <i class="line line-bottom line-right"></i>
                </div>
            </scroll>
        </div>
    </div>
</template>

<script>
    import Scroll from '@/components/common/Scroll.vue'
    export default {
        components: { Scroll },
        data() {
            return {}
        },
        methods: {
            launchApp() {
                this.$router.push('/artList')
            }
        }
    }
</script>

<style lang="less" scoped>
    .section-home {
        display: flex;
        align-items: center;
        height: 100vh;
        max-height: 1024px;
        padding-top: 80px;
        background-color: #171c1c;
        background-image: url('../../../assets/img/index/home-bg.png');
        background-position: center center;
        background-size: cover;
        color: #fff;
        text-align: center;
        line-height: 1.2em;
        h2 {
            color: #ffffff;
        }
        .p1 {
            font-size: 60px;
        }
        .p2 {
            font-size: 100px;
        }
        .p1,
        .p2 {
            font-family: Amiri, sans-serif;
            line-height: 1.2em;
        }
        .p3 {
            margin-top: 16px;
            font-size: 18px;
            line-height: 2em;
        }
        .btn-wrap {
            display: inline-block;
            margin-top: 48px;
            font-size: 20px;
            line-height: 1em;
            padding: 20px 60px;
            border-left: 1px solid #fff;
            border-right: 1px solid #fff;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            color: #fff;
            font-family: Amiri, Times, serif;
            letter-spacing: 1px;
            .line {
                position: absolute;
                top: 0;
                left: 0;
                height: 1px;
                background: #fff;
                width: 5%;
                transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);

                &-long {
                    width: 85%;
                }
                &-right {
                    left: auto;
                    right: 0;
                }
                &-bottom {
                    top: auto;
                    bottom: 0;
                }
            }

            &:hover {
                .line {
                    width: 20%;
                    &-long {
                        width: 85%;
                    }
                }
            }
        }

        @media (max-width: 1440px) {
            .p1 {
                font-size: 56px;
            }
            .p2 {
                font-size: 72px;
            }
            .p3 {
                margin-top: 16px;
                font-size: 16px;
                line-height: 1.6em;
            }
            .btn-wrap {
                font-size: 18px;
                line-height: 1em;
                padding: 18px 56px;
            }
        }
        @media (max-width: 768px) {
            height: auto;
            padding: 96px 0 56px 0;
            .p1 {
                font-size: 30px;
            }
            .p2 {
                font-size: 40px;
            }
            .p3 {
                margin-top: 8px;
                font-size: 14px;
                line-height: 1.5em;
            }
            .btn-wrap {
                margin-top: 32px;
                font-size: 14px;
                padding: 16px 36px;
            }
        }
    }
</style>
