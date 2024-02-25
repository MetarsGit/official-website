<template>
    <div class="section-home">
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
                <span class="btn-launch" @click="launchApp">
                    Launch Application
                </span>
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
        height: calc(100vh - 80px);
        max-height: 944px;
        background-color: #666;
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
        .btn-launch {
            display: inline-block;
            margin-top: 48px;
            font-size: 20px;
            line-height: 1em;
            padding: 20px 84px;
            border: 1px solid #fff;
            cursor: pointer;
            transition: all 0.3s;
            &:hover {
                background: rgba(255, 255, 255, 0.05);
            }
        }

        @media (max-width: 768px) {
            height: auto;
            padding: 56px 0;
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
            .btn-launch {
                margin-top: 32px;
                font-size: 14px;
                padding: 16px 36px;
            }
        }
    }
</style>
