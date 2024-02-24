<template>
    <div class="comp-generative container" id="wrapper">
        <a-row justify="space-between">
            <a-col :lg="8">
                <div class="left">
                    <div class="slide">
                        <img
                            class="img-bottom"
                            src="../../assets/img/home/a3-img-b.png"
                        />
                        <div class="imgs">
                            <img
                                class="img-item"
                                id="img-1"
                                src="../../assets/img/home/a3-img-1.png"
                                alt=""
                            />
                            <img
                                class="img-item"
                                id="img-2"
                                src="../../assets/img/home/a3-img-2.png"
                                alt=""
                            />
                            <img
                                class="img-item"
                                id="img-3"
                                src="../../assets/img/home/a3-img-3.png"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </a-col>
            <a-col :lg="16">
                <div class="right">
                    <div class="header" id="header">
                        <p class="p1">Generative</p>
                        <p class="p2">AI x NFT</p>
                    </div>
                    <div class="content">
                        <div class="divider" id="divider">
                            <div
                                class="divider-slider"
                                id="dividerSlider"
                            ></div>
                        </div>
                        <ul class="detail">
                            <li class="detail-item" id="detail-1">
                                <p class="item-title">
                                    Using generative AI technology to turn your
                                    vision into reality
                                </p>
                                <p class="item-desc">
                                    Do you have a creative vision that you want
                                    to bring to life? Whether you want to
                                    cyberpunk and futuristic art with a sci-fi
                                    twist, digital paintings, 3D art and
                                    sculptures, or even realism human portraits,
                                    METARS’s generative AI can help you achieve
                                    your goals quickly and easily. So why wait?
                                    Unleash your creativity and turn your vision
                                    into reality with the power of METARS
                                    generative AI!
                                </p>
                            </li>
                            <li class="detail-item" id="detail-2">
                                <p class="item-title">
                                    Decentralized creation flow with full NFT
                                    ownership
                                </p>
                                <p class="item-desc">
                                    METARS provide a game-changer in the world
                                    of creative art. In METARS creators can now
                                    create, share and monetize their work in a
                                    secure and transparent way, without the need
                                    for intermediaries. With METARS creation
                                    flow, the power is back in the hands of the
                                    creators, giving them the freedom to unleash
                                    their creativity.
                                </p>
                            </li>
                            <li class="detail-item" id="detail-3">
                                <p class="item-title">
                                    AI customizations and expression engines for
                                    unique creations
                                </p>
                                <p class="item-desc">
                                    With METARS’s AI customizations and
                                    expression engines, you can take your unique
                                    ideas and turn them into something truly
                                    one-of-a-kind. By leveraging the power of
                                    METARS generative AI, you have limitless
                                    possibilities and could discover innovative
                                    expression. Let’s try it out and see how it
                                    can transform your work!
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    import gsap from 'gsap'
    import { ScrollTrigger } from 'gsap/ScrollTrigger'
    import debounce from '@/utils/debounce'
    gsap.registerPlugin(ScrollTrigger)
    export default {
        data() {
            return {}
        },
        mounted() {
            setTimeout(() => {
                this.setAnimation()
            }, 1000)

            window.addEventListener('resize', this.onResize)
        },

        unmounted() {
            window.removeEventListener('resize', this.onResize)
        },

        methods: {
            onResize: debounce(function () {
                this.setAnimation()
            }, 100),
            setAnimation() {
                // init
                ScrollTrigger.killAll()

                const images = gsap.utils.toArray('.img-item')
                images.forEach((_, index) => {
                    let idx = index + 1
                    // 右侧字体透明度
                    this.tl1 = gsap.timeline({
                        scrollTrigger: {
                            trigger: `#detail-${idx}`,
                            start: `top 500px`,
                            end: `bottom 250px`,
                            scrub: true
                        }
                    })
                    this.tl1
                        .fromTo(
                            `#detail-${idx}`,
                            {
                                autoAlpha: index === 0 ? 1 : 0.1
                            },
                            {
                                autoAlpha: 1,
                                ease: 'power3.out'
                            }
                        )
                        .to(`#detail-${idx}`, {
                            autoAlpha: 0.5,
                            ease: 'power3.in'
                        })

                    // 左侧图片
                    this.tl2 = gsap.timeline({
                        scrollTrigger: {
                            trigger: `#detail-${idx}`,
                            start: `top 600px`,
                            end: `bottom 400px`,
                            scrub: true
                        }
                    })
                    this.tl2
                        .fromTo(
                            `#img-${idx}`,
                            {
                                xPercent: index === 0 ? -50 : 150
                            },
                            {
                                xPercent: -50,
                                ease: 'power3.out'
                            }
                        )
                        .to(`#img-${idx}`, {
                            xPercent: index === images.length - 1 ? -50 : -200,
                            ease: 'power3.in'
                        })
                })

                // 固定slider
                // const details = gsap.utils.toArray(".detail-item");
                let end = this.getPinEnd()
                ScrollTrigger.create({
                    trigger: '#divider',
                    start: 'top top+=300',
                    end: () => `bottom ${end}`,
                    pin: '.slide',
                    scrub: true
                    // snap: {
                    //     snapTo: 1 / (details.length - 1),
                    //     inertia: false,
                    //     duration: 0.5,
                    //     delay: 0.1
                    // },
                })

                // divider
                ScrollTrigger.create({
                    trigger: '#divider',
                    start: 'top top+=300',
                    end: () => `bottom ${end}`,
                    pin: '.divider-slider',
                    scrub: true
                })
            },

            getPinEnd() {
                const width = window.innerWidth
                let marginBottom = 150
                let tileHeight = 366
                let pinOffset = 250
                if (width <= 1440) {
                    marginBottom = 0.10417 * width
                    tileHeight = 0.25417 * width
                }
                if (width <= 750) {
                    marginBottom = 0.14648 * width
                    tileHeight = 0.35742 * width
                    pinOffset = 310
                }
                return marginBottom + tileHeight + pinOffset
            }
        }
    }
</script>

<style lang="less" scoped>
    .comp-generative {
        .left {
            margin-top: 380px;
            .slide {
                position: relative;
                width: 398px;
                height: 388px;
                z-index: 10;
                border-radius: 15px;
                background-color: #1f2331;
                .img-bottom {
                    position: absolute;
                    width: 473px;
                    height: 126px;
                    bottom: -44px;
                    left: 50%;
                    transform: translateX(-50%);
                }

                .imgs {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    z-index: 10;

                    .img-item {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        display: block;

                        width: 304px;
                        height: 295px;
                    }
                }
            }
        }
        .right {
            .header {
                padding-top: 120px;
                margin-left: 102px;
                font-size: 90px;
                line-height: 108px;
                color: #ffffff;
                .p1 {
                    font-weight: 600;
                }
                .p2 {
                    margin-top: 16px;
                    font-family: Roboto Serif-Regular, Roboto Serif;
                    font-weight: 400;
                }
            }
            .content {
                display: flex;
                margin-top: 40px;
                padding-bottom: 210px;
                .divider {
                    position: relative;
                    z-index: 2;
                    border-left: 1px dashed #9ba2b0;
                    width: 1px;
                    margin: 0 51px;
                    .divider-slider {
                        background-color: #6a57e3;
                        transform: translateX(-50%);
                        width: 4px;
                        height: 310px;
                    }
                }
                .detail {
                    flex: 1;
                    .detail-item {
                        .item-title {
                            margin-top: 90px;
                            font-size: 48px;
                            font-weight: 500;
                            line-height: 58px;
                            color: #ffffff;
                        }
                        .item-desc {
                            margin-top: 38px;
                            font-size: 22px;
                            line-height: 35px;
                            color: rgba(255, 255, 255, 0.6);
                        }
                        &:first-child {
                            .item-title {
                                margin-top: 20px;
                            }
                        }
                    }
                }
            }
        }

        @media (max-width: 1200px) {
            .left {
                .slide {
                    width: 350px;
                    height: 340px;
                    .img-bottom {
                        width: 420px;
                        height: 110px;
                    }
                }
            }
        }

        @media (max-width: 992px) {
            .left {
                display: none;
            }
            .right {
                .header {
                    padding-top: 72px;
                    margin-left: 0;
                    font-size: 48px;
                }
                .content {
                    padding-bottom: 80px;
                    .divider {
                        margin: 0 24px 0 0;
                    }
                    .detail {
                        .detail-item {
                            .item-title {
                                font-size: 28px;
                                margin-top: 16px;
                                line-height: 44px;
                            }
                            .item-desc {
                                font-size: 16px;
                                margin-top: 8px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
