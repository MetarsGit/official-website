<template>
    <div class="section section-generate">
        <div class="container">
            <a-row align="middle" justify="space-between">
                <a-col :lg="12" :md="12" :sm="24" :xs="24">
                    <img
                        class="img"
                        src="../../../assets/img/index/generative-img.png"
                        alt=""
                    />
                </a-col>
                <a-col :lg="12" :md="12" :sm="24" :xs="24">
                    <div class="content">
                        <h3 class="title">Generative AI x NFT</h3>
                        <scroll inClass="animate__animated animate__fadeInUp">
                            <a-carousel arrows class="carousel" :dots="false">
                                <template #prevArrow>
                                    <div class="custom-slick-arrow left">
                                        <!-- <img
                            style="width: 100%"
                            src="../../../assets/img/icon/left-circle.png"
                            alt=""
                        /> -->
                                    </div>
                                </template>
                                <template #nextArrow>
                                    <div class="custom-slick-arrow right">
                                        <!-- <img
                            style="width: 100%"
                            src="../../../assets/img/icon/right-circle.png"
                            alt=""
                        /> -->
                                    </div>
                                </template>
                                <div
                                    class="item"
                                    v-for="item in generativeList"
                                    :key="item.title"
                                >
                                    <div
                                        inClass="animate__animated animate__fadeIn"
                                    >
                                        <h1 class="item-title">
                                            {{ item.title }}
                                        </h1>
                                    </div>
                                    <div
                                        inClass="animate__animated animate__fadeIn"
                                    >
                                        <p class="item-desc">
                                            {{ item.desc }}
                                        </p>
                                    </div>
                                </div>
                            </a-carousel>
                        </scroll>
                    </div>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
    import Scroll from '@/components/common/Scroll.vue'
    import { generativeList } from '../const'
    export default {
        components: { Scroll },
        data() {
            return {
                generativeList
            }
        }
    }
</script>

<style lang="less" scoped>
    .section-generate {
        padding: 142px 0;
        background: #f7f7f7;
        .img {
            display: inline-block;
            width: 100%;
            padding-right: 30px;
        }
        .content {
            padding-left: 30px;
            margin-bottom: 24px;
            .carousel {
                margin-top: 18px;
                .custom-slick-arrow {
                    width: 31px;
                    height: 21px;
                    top: auto;
                    bottom: -32px;
                    background-size: 100%;
                    transition: all 0.3s;
                }
                .left {
                    left: 0;
                    background-image: url('../../../assets/img/index/ic-arrow-left.png');
                    &:hover {
                        transform: translateX(-10%);
                    }
                }
                .right {
                    left: 60px;
                    background-image: url('../../../assets/img/index/ic-arrow-right.png');
                    &:hover {
                        transform: translateX(10%);
                    }
                }
                .item {
                    &-title {
                        font-size: 20px;
                    }
                    &-desc {
                        margin-top: 22px;
                        font-size: 16px;
                        line-height: 1.5em;
                    }
                }
            }
        }

        @media (max-width: 768px) {
            padding: 32px 0 48px 0;
            .img {
                padding: 0 12px;
            }
            .content {
                padding: 0;
                margin-top: 20px;
                margin-bottom: 0;
                text-align: center;
                .carousel {
                    margin-top: 8px;
                    .custom-slick-arrow {
                        width: 18px;
                        height: 12px;
                        bottom: -20px;
                        left: 50%;
                    }
                    .left {
                        transform: translateX(-130%);
                    }
                    .right {
                        transform: translateX(30%);
                    }
                    .item {
                        &-title {
                            font-size: 16px;
                        }
                        &-desc {
                            margin-top: 12px;
                            font-size: 12px;
                        }
                    }
                }
            }
        }
    }
</style>
