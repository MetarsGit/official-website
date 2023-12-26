<template>
    <div class="page-home">
        <navbar />
        <div class="a1">
            <div class="text container">
                <p class="p1">Unleash the power of</p>
                <p class="p2">collective creativity</p>
                <p class="p3">with METARS!</p>
                <p class="p4">
                    We believe that everyone is an artist, and everyone can
                    generate self-owned unique art. Unlike traditional NFT
                    creation platforms, METARS utilizes AI deep learning to
                    provide you with a more seamless, engaging and personalized
                    user experience.
                </p>
                <span class="btn-launch" @click="launchApp">
                    Launch Application
                </span>
            </div>
        </div>

        <div class="a2" id="metars">
            <div class="bg"></div>
            <p class="title container">
                <span class="text1">What is</span>
                <span class="text2">METARS</span>
            </p>
            <div class="content container">
                <a-row align="middle" justify="space-between">
                    <a-col :lg="12">
                        <div>
                            <span class="number">01</span>
                            <p class="desc">
                                METARS is a NFT creation platform that users can
                                collectively create virtual art using Generative
                                Artificial Intelligence technology.
                            </p>
                        </div>
                    </a-col>
                    <a-col :lg="12">
                        <img
                            class="img"
                            src="../../assets/img/home/a2-img1.png"
                            alt=""
                        />
                    </a-col>
                </a-row>
                <a-row align="middle" justify="space-between">
                    <a-col :lg="12" :order="device === 'mobile' ? 1 : 0">
                        <img
                            class="img"
                            src="../../assets/img/home/a2-img2.png"
                            alt=""
                        />
                    </a-col>
                    <a-col :lg="12" :order="device === 'mobile' ? 0 : 1">
                        <div class="">
                            <span class="number">02</span>
                            <p class="desc">
                                A cool platform where you and your friends can
                                use Artificial Intelligence to create amazing
                                virtual art together. It's a place where you can
                                let your imagination run wild and bring your
                                unique artistic vision to life!
                            </p>
                        </div>
                    </a-col>
                </a-row>
            </div>
        </div>

        <div class="a3" id="generative">
            <generative />
        </div>

        <div class="a4" id="collective">
            <div class="container">
                <a-row justify="space-between">
                    <a-col :lg="12">
                        <div class="header">
                            <p class="title">Collective Creation</p>
                            <p class="sub-title">x Token</p>
                        </div>
                        <div class="content">
                            <ul class="list">
                                <transition name="slide-fade">
                                    <li
                                        class="item"
                                        v-if="collectiveIndex === 0"
                                    >
                                        <p class="item-title">
                                            Collective Creation
                                        </p>
                                        <p class="item-desc">
                                            Collaborating on virtual art at
                                            METARS brings people together,
                                            fosters growth, and creates a sense
                                            of community. Join forces with
                                            others to bring your unique ideas to
                                            life and see the amazing things you
                                            can achieve together.
                                        </p>
                                    </li>
                                </transition>
                                <transition name="slide-fade">
                                    <li
                                        class="item"
                                        v-if="collectiveIndex === 1"
                                    >
                                        <p class="item-title">
                                            Community-Driven
                                        </p>
                                        <p class="item-desc">
                                            METARS is a community-driven
                                            platform that offers opportunities
                                            for creative expression,
                                            collaboration, skill development,
                                            and fun. By bringing users together
                                            and fostering a sense of community,
                                            METARS provides a unique and
                                            rewarding experience.
                                        </p>
                                    </li>
                                </transition>
                                <transition name="slide-fade">
                                    <li
                                        class="item"
                                        v-if="collectiveIndex === 2"
                                    >
                                        <p class="item-title">
                                            Token-based Ecosystem
                                        </p>
                                        <p class="item-desc">
                                            At METARS, we reward users with
                                            tokens for their contributions to
                                            our virtual art community. This
                                            creates a fun and engaging
                                            experience, fostering collaboration
                                            and creativity. Join us and unleash
                                            your imagination!
                                        </p>
                                    </li>
                                </transition>
                            </ul>
                        </div>
                        <div class="icon">
                            <i
                                :class="[
                                    'icon-left',
                                    collectiveIndex === 0 && 'icon-left-disable'
                                ]"
                                @click="collectivePrevious"
                            ></i>
                            <i
                                :class="[
                                    'icon-right',
                                    collectiveIndex === 2 &&
                                        'icon-right-disable'
                                ]"
                                @click="collectiveNext"
                            ></i>
                        </div>
                    </a-col>
                    <a-col :lg="10">
                        <img
                            class="img"
                            src="../../assets/img/home/a4-img1.png"
                            alt=""
                        />
                    </a-col>
                </a-row>
            </div>
        </div>

        <div class="a5" id="tokenomics">
            <div class="content container">
                <p class="title">Tokenomics</p>
                <p class="p1">
                    METARS aims to revolutionize the NFT creation process by
                    empowering anyone to bring their artistic vision to life.
                </p>

                <div class="bg">
                    <i class="icon-logo-l"></i>
                    <p class="p2">
                        $MRS is the governance token of METARS ecosystem, with a
                        fixed supply of 1 billion tokens.
                    </p>
                </div>

                <a-row align="middle" justify="space-around">
                    <a-col :lg="10">
                        <img
                            class="pie"
                            src="../../assets/img/home/a5-pie.png"
                            alt=""
                        />
                    </a-col>
                    <a-col :lg="10">
                        <div class="legend">
                            <p class="label">
                                <i class="icon-logo-s"></i>
                                <span>Symbol:</span>
                                <span class="em">$MRS</span>
                            </p>
                            <ul class="list">
                                <li
                                    class="item"
                                    v-for="item in tokenList"
                                    :key="item.name"
                                >
                                    <i class="icon-point"></i>
                                    <span class="item-name">
                                        {{ item.name }}:
                                    </span>
                                    <span class="item-value">
                                        {{ item.value }}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </a-col>
                </a-row>
            </div>
        </div>

        <div class="a6" id="roadmap">
            <p class="title">Roadmap</p>
            <div class="content container">
                <ul class="list">
                    <li class="item" v-for="(item, idx) in roadmap" :key="idx">
                        <p class="text">{{ item }}</p>
                        <i class="icon"></i>
                        <p class="text-block"></p>
                    </li>
                </ul>
            </div>
        </div>

        <home-footer />
        <announcement />
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Navbar from './navbar.vue'
    import HomeFooter from './footer.vue'
    import Generative from './generative.vue'
    import Announcement from './Announcement.vue'
    import { tokenList, roadmap } from './const'
    export default {
        name: 'index',
        components: { Navbar, HomeFooter, Generative, Announcement },
        data() {
            return {
                collectiveIndex: 0,
                tokenList,
                roadmap
            }
        },
        computed: {
            ...mapGetters({
                device: 'settings/device'
            })
        },
        methods: {
            collectivePrevious() {
                if (this.collectiveIndex === 0) return
                this.collectiveIndex--
            },
            collectiveNext() {
                if (this.collectiveIndex === 2) return
                this.collectiveIndex++
            },
            launchApp() {
                this.$router.push('/artList')
            }
        }
    }
</script>

<style lang="less" scoped>
    .page-home {
        background: url(../../assets/img/home/a1-img1.png) no-repeat;
        background-position: right top;
        background-size: 50%;
        color: #14171f;
        @media (max-width: 992px) {
            background-position: right 80px;
            background-size: 434px 460px;
        }
        .a1 {
            margin-top: 110px;
            .p1 {
                font-size: 60px;
                font-family: Inter-Medium, Inter;
                font-weight: 500;
                line-height: 72px;
            }
            .p2 {
                margin-top: 20px;
                font-size: 110px;
                font-family: Inter-Medium, Inter;
                font-weight: 500;
                line-height: 132px;
            }
            .p3 {
                margin-top: 20px;
                font-size: 100px;
                font-family: Roboto Serif-Regular, Roboto Serif;
                font-weight: 400;
                line-height: 120px;
            }
            .p4 {
                max-width: 657px;
                margin-top: 64px;
                font-size: 24px;
                font-family: Inter-Regular, Inter;
                font-weight: 400;
                line-height: 38px;
            }
            .btn-launch {
                display: none;
            }

            @media (max-width: 992px) {
                margin-top: 40px;
                .p1,
                .p3 {
                    font-size: 32px;
                    line-height: 32px;
                }
                .p2 {
                    font-size: 48px;
                    line-height: 48px;
                }
                .p4 {
                    margin-top: 24px;
                    font-size: 18px;
                }
                .btn-launch {
                    display: inline-flex;
                    margin: 16px auto;
                    padding: 8px 16px;
                    text-align: center;
                    background: #14171f;
                    border-radius: 100px;
                    color: #fff;
                    font-weight: bold;
                }
            }
        }
        .a2 {
            position: relative;
            margin-top: 107px;
            .bg {
                position: absolute;
                width: 100%;
                height: 242px;
                background: url(../../assets/img/home/a2-word.png);
                background-size: 1587px 242px;
                background-position-x: 0;
                animation: bgmove 50s linear infinite;
            }
            @keyframes bgmove {
                0% {
                    background-position-x: 0px;
                }
                100% {
                    background-position-x: -4761px;
                }
            }
            .title {
                position: relative;
                padding-top: 121px;
                font-size: 90px;
                .text1 {
                    font-family: Inter-Semi Bold, Inter;
                    margin-right: 18px;
                }
                .text2 {
                    font-family: Roboto Serif-Regular, Roboto Serif;
                    font-weight: 400;
                }
            }
            .content {
                margin-top: 36px;
                .number {
                    font-size: 48px;
                    font-family: Inter-Semi Bold, Inter;
                    line-height: 58px;
                }
                .desc {
                    margin-top: 48px;
                    font-size: 24px;
                    font-family: Inter-Regular, Inter;
                    font-weight: 400;
                    color: #14171f;
                    line-height: 38px;
                }
                .img {
                    width: 100%;
                    height: auto;
                }
            }
            @media (max-width: 992px) {
                margin-top: 72px;
                .bg {
                    height: 121px;
                    background-size: 798px 121px;
                }
                .title {
                    font-size: 48px;
                    padding-top: 48px;
                    .text1 {
                        display: block;
                    }
                }
                .content {
                    .number {
                        display: inline-block;
                        font-size: 32px;
                    }
                    .desc {
                        margin-top: 8px;
                    }
                }
            }
        }
    }

    .a3 {
        margin-top: 100px;
        background: #14171f;
        border-radius: 38px 38px 0px 0px;
        @media (max-width: 992px) {
            border-radius: 24px 24px 0px 0px;
        }
    }
    .a4 {
        background: #d6e9eb;
        padding: 138px 0;

        .img {
            width: 95%;
            max-width: 600px;
            height: auto;
            margin-top: 90px;
        }
        .header {
            font-size: 90px;
            .title {
                font-family: Inter-Semi Bold, Inter;
                white-space: nowrap;
            }
            .sub-title {
                margin-top: 16px;
                font-family: Roboto Serif-Regular, Roboto Serif;
            }
        }
        .content {
            margin-top: 60px;

            .item {
                &-title {
                    font-size: 48px;
                    font-family: Inter-Semi Bold, Inter;
                    font-weight: bold;
                }
                &-desc {
                    margin-top: 32px;
                    font-size: 22px;
                    line-height: 35px;
                }
            }
        }
        .icon {
            margin-top: 60px;
            i {
                display: inline-block;
                width: 51px;
                height: 17px;
                background-size: 100%;
                cursor: pointer;
            }
            .icon-left {
                background-image: url('../../assets/img/home/a4-ic-n.png');
                &-disable {
                    cursor: auto;
                    background-image: url('../../assets/img/home/a4-ic-d.png');
                }
            }
            .icon-right {
                margin-left: 55px;
                transform: rotate(180deg);
                background-image: url('../../assets/img/home/a4-ic-n.png');
                &-disable {
                    cursor: auto;
                    background-image: url('../../assets/img/home/a4-ic-d.png');
                }
            }
        }

        .slide-fade-enter-active {
            transition: all 0.3s ease-out;
        }
        .slide-fade-enter-from {
            transform: translateX(20px);
            opacity: 0;
        }
        .slide-fade-leave-active,
        .slide-fade-leave-to {
            display: none;
        }

        @media (max-width: 992px) {
            padding: 72px 0;
            .img {
                display: none;
            }
            .header {
                .title,
                .sub-title {
                    white-space: normal;
                    font-size: 48px;
                }
            }
            .content {
                .item-title {
                    font-size: 32px;
                }
            }
        }
    }

    .a5 {
        padding-top: 105px;
        padding-bottom: 99px;
        background: url(../../assets/img/home/a5-bg@2x.png) no-repeat;
        background-position: center top;
        background-size: 100%;
        text-align: center;

        .title {
            font-size: 90px;
            font-family: Inter-Semi Bold, Inter;
        }
        .p1 {
            margin-top: 16px;
            font-size: 22px;
            font-family: Inter-Regular, Inter;
            font-weight: 400;
        }

        .bg {
            margin-top: 70px;
            width: 100%;
            height: 174px;
            background: #ffffff;
            border-radius: 15px;
            border-top: 4px solid #ebf1fd;
            display: flex;
            align-items: center;
            justify-content: center;
            .icon-logo-l {
                flex: 0 0 81px;
                width: 81px;
                height: 81px;
                background: url(../../assets/img/home/a5-ic-logo-l@2x.png)
                    no-repeat;
                background-size: 100%;
            }
            .p2 {
                font-size: 22px;
                font-family: Inter-Regular, Inter;
                margin-left: 16px;
            }
        }
        .pie {
            width: 100%;
        }
        .legend {
            border-radius: 16px;
            border: 1px solid #e5e7eb;
            padding: 32px 80px;
            .label {
                font-size: 16px;
                font-family: Inter-Regular, Inter;
                font-weight: 400;
                display: flex;
                align-items: center;
                .icon-logo-s {
                    width: 36px;
                    height: 36px;
                    background: url(../../assets/img/home/a5-ic-logo-s@2x.png);
                    background-size: 100%;
                    margin-right: 8px;
                }
                .em {
                    font-weight: bold;
                    font-family: Inter-Semi Bold, Inter;
                }
            }
            .list {
                margin-top: 40px;
                .item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    text-align: left;
                    font-size: 16px;
                    padding: 6px 0;
                    .icon-point {
                        width: 24px;
                        height: 24px;
                        background-size: 100%;
                        background-repeat: no-repeat;
                        margin-right: 10px;
                    }
                    .item-name {
                        flex: 1;
                    }
                    .item-value {
                        width: 130px;
                        font-family: Inter-Bold, Inter;
                        font-weight: bold;
                    }
                }
                .icon-point-bg(@n) when (@n < 9) {
                    .item:nth-child(@{n}) {
                        .icon-point {
                            background-image: url('../../assets/img/home/a5-ic-p-@{n}@2x.png');
                        }
                    }
                    .icon-point-bg(@n + 1);
                }
                .icon-point-bg(1);
            }
        }
        @media (max-width: 992px) {
            .title {
                font-size: 48px;
            }
            .p1 {
                line-height: 32px;
            }
            .bg {
                margin-top: 40px;
                .p2 {
                    text-align: left;
                    font-size: 18px;
                }
            }
            .legend {
                padding: 32px;
                .list .item .item-value {
                    width: 50px;
                    text-align: right;
                }
                .list {
                    margin-top: 16px;
                }
            }
        }
    }

    .a6 {
        padding-top: 100px;
        padding-bottom: 93px;
        background: #14171f;
        .title {
            color: #fff;
            font-size: 90px;
            font-family: Inter-Semi Bold, Inter;
            text-align: center;
        }
        .content {
            position: relative;
            margin-top: 150px;
            &::before {
                position: absolute;
                left: 50%;
                top: 50%;
                content: '';
                height: 55%;
                border-left: 1px dashed #9ba2b0;
                transform: scaleY(2) translateY(-30%);
            }
            .list {
                margin: 0 100px;
                .item {
                    color: #fff;
                    font-size: 22px;
                    display: flex;
                    align-items: self-start;
                    justify-content: space-between;
                    margin-top: 8px;
                    .text {
                        position: relative;
                        width: 390px;
                        line-height: 35px;
                        &::before {
                            position: absolute;
                            left: -20px;
                            top: 16px;
                            content: '';
                            display: inline-block;
                            width: 6px;
                            height: 6px;
                            background: #fff;
                            border-radius: 50%;
                        }
                        &-block {
                            width: 390px;
                        }
                    }
                    .icon {
                        width: 77px;
                        height: 44px;
                        background: url(../../assets/img/home/a6-img@2x.png)
                            no-repeat;
                        background-size: 100%;
                    }
                    &:nth-child(2n) {
                        flex-direction: row-reverse;
                    }
                }
            }
        }
        @media (max-width: 992px) {
            .title {
                font-size: 48px;
            }
            .content {
                margin-top: 48px;
                &::before {
                    left: 8vw;
                    transform: scaleY(2) translateY(-25%);
                }
                .list {
                    margin: 0;
                    text-align: left;
                    .item {
                        &:nth-child(n) {
                            flex-direction: row-reverse;
                        }
                        font-size: 16px;
                        .icon {
                            flex: 0 0 61px;
                            width: 61px;
                            height: 35px;
                            background-size: 7.7vw 4.4vw;
                            background-position: left center;
                        }
                        .text {
                            width: 75vw;
                        }
                        .text-block {
                            display: none;
                        }
                    }
                }
            }
        }
    }
</style>
