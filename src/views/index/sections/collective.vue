<template>
    <div class="section section-collective">
        <scroll inClass="animate__animated animate__fadeInUp animate__delay">
            <h3 class="title collective-title">Collective Creation x Token</h3>
            <div class="collective-swiper-wrapper">
                <div
                    class="swiper collective-swiper swiper-initialized swiper-horizontal swiper-backface-hidden"
                >
                    <div class="swiper-wrapper">
                        <div
                            class="swiper-slide swiper-slide-active"
                            role="group"
                            aria-label="1 / 3"
                            style="margin-right: 30px"
                        >
                            <div class="slider-text">
                                <p class="desc">
                                    Embrace the transformative power of
                                    collaborative virtual art at METARS. Unite
                                    with like-minded individuals to ignite
                                    creativity, foster growth, and create a
                                    sense of community. Join forces with others
                                    and see the amazing things you can achieve
                                    together.
                                </p>
                            </div>
                            <div class="slider-title">
                                <img
                                    src="@/assets/img/index/collective-icon1.png"
                                    alt=""
                                />
                                <h5>Collective Creation</h5>
                            </div>
                        </div>
                        <div
                            class="swiper-slide swiper-slide-next"
                            role="group"
                            aria-label="2 / 3"
                            style="margin-right: 30px"
                        >
                            <div class="slider-text">
                                <p class="desc">
                                    METARS is a community-driven platform that
                                    offers opportunities for creative
                                    expression, collaboration, skill
                                    development, and fun. By bringing users
                                    together and fostering a sense of community,
                                    METARS provides a unique and rewarding
                                    experience.
                                </p>
                            </div>
                            <div class="slider-title">
                                <img
                                    src="@/assets/img/index/collective-icon2.png"
                                    alt=""
                                />
                                <h5>Community-Driven</h5>
                            </div>
                        </div>
                        <div
                            class="swiper-slide"
                            role="group"
                            aria-label="3 / 3"
                            style="margin-right: 30px"
                        >
                            <div class="slider-text">
                                <p class="desc">
                                    At METARS, we reward users with tokens for
                                    their contributions to our virtual art
                                    community. This creates a fun and engaging
                                    experience, fostering collaboration and
                                    creativity. Join us and unleash your
                                    imagination!
                                </p>
                            </div>
                            <div class="slider-title">
                                <img
                                    src="@/assets/img/index/collective-icon3.png"
                                    alt=""
                                />
                                <h5>Token-based Ecosystem</h5>
                            </div>
                        </div>
                    </div>

                    <span
                        class="swiper-notification"
                        aria-live="assertive"
                        aria-atomic="true"
                    ></span>
                </div>
                <div class="swiper-button">
                    <div class="swiper-button-prev">
                        <svg-icon icon-class="long-arrow-left"></svg-icon>
                    </div>
                    <div class="swiper-button-next">
                        <svg-icon icon-class="long-arrow-right"></svg-icon>
                    </div>
                </div>
            </div>
        </scroll>
    </div>
</template>

<script>
    import SvgIcon from '@/components/common/SvgIcon/index.vue'
    import Scroll from '@/components/common/Scroll.vue'
    import { mapGetters } from 'vuex'
    let mySwiper = null

    export default {
        components: { Scroll, SvgIcon },
        data() {
            return {}
        },
        mounted() {
            const spaceBetween = this.device === 'mobile' ? 16 : 60
            mySwiper = new window.Swiper('.collective-swiper', {
                slidesPerView: 'auto',
                spaceBetween: spaceBetween,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            })
        },
        computed: {
            ...mapGetters({
                device: 'settings/device'
            })
        },
        watch: {
            device(newVal) {
                if (newVal === 'mobile') {
                    mySwiper.params.spaceBetween = 16
                } else if (newVal === 'desktop') {
                    mySwiper.params.spaceBetween = 60
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .section-collective {
        padding: 120px 0 80px;
        .title {
            margin-bottom: 40px;
        }
        .collective-swiper-wrapper {
            position: relative;
            padding-bottom: 60px;
        }
        .swiper-slide {
            .slider-text {
                padding: 40px 60px;
                border: 1px solid #000;
            }
            .slider-title {
                display: flex;
                align-items: center;
                margin-top: 28px;
                > img {
                    margin-right: 16px;
                    width: 62px;
                }
            }
        }
        .swiper-button {
            position: absolute;
            bottom: 0;
            left: 50%;
            display: flex;
            gap: 30px;
            transform: translateX(-50%);
            .swiper-button-next,
            .swiper-button-prev {
                position: initial;
                display: inline-flex;
                margin-top: 0;
                font-size: 30px;
                color: #cacaca;
                transition: all 0.3s;
                &:hover {
                    color: black;
                }
                &:after {
                    display: none;
                }
            }
            .swiper-button-prev {
                &:hover {
                    transform: translateX(-10%);
                }
            }
            .swiper-button-next {
                &:hover {
                    transform: translateX(10%);
                }
            }
        }
    }
    @media screen and (max-width: 768px) {
        .section-collective {
            .title {
                margin-bottom: 12px;
            }
            .collective-swiper-wrapper {
                padding-bottom: 0;
            }
            .swiper-slide {
                .slider-text {
                    padding: 20px;
                }
                .slider-title {
                    margin-top: 14px;
                    > img {
                        margin-right: 10px;
                        width: 32px;
                    }
                    h5 {
                        font-size: 14px;
                    }
                }
            }
            .swiper-button {
                display: none;
            }
        }
    }
    @media screen and (max-width: 576px) {
        .section-collective {
            padding-left: 15px;
            padding-right: 15px;
            .swiper-slide {
                width: 80%;
            }
            .collective-swiper,
            .collective-title {
                margin-left: 0;
            }
        }
    }
    @media screen and (min-width: 576px) {
        .section-collective {
            .swiper-slide {
                width: 80%;
            }
            .collective-swiper,
            .collective-title {
                margin-left: calc((100vw - 540px) / 2);
            }
        }
    }
    @media screen and (min-width: 768px) {
        .section-collective {
            .swiper-slide {
                width: 80%;
            }
            .collective-swiper,
            .collective-title {
                margin-left: calc((100vw - 740px) / 2);
            }
        }
    }
    @media screen and (min-width: 992px) {
        .section-collective {
            .swiper-slide {
                width: 80%;
            }
            .collective-swiper,
            .collective-title {
                margin-left: calc((100vw - 970px) / 2);
            }
        }
    }
    @media (min-width: 1280px) {
        .section-collective {
            .swiper-slide {
                width: 70%;
            }
            .collective-swiper,
            .collective-title {
                margin-left: calc((100vw - 1280px) / 2);
            }
        }
    }
</style>
