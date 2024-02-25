<template>
    <div class="section section-explore">
        <div class="container">
            <scroll inClass="animate__animated animate__fadeInUp">
                <h3 class="title">Discover the Best of collaboration</h3>
                <p class="desc">
                    Collaborative art adapt to cultural and technological
                    shifts, with AI notably enriching the creative process. This
                    fusion of technology and human creativity heralds a new era
                    of artistic expression.
                </p>
            </scroll>
        </div>
        <scroll inClass="animate__animated animate__fadeInUp animate__delay">
            <div class="gallery">
                <ul class="list">
                    <li
                        class="list-item"
                        v-for="item in artList"
                        :key="item.name"
                    >
                        <img
                            class="item-img"
                            :src="require('@/assets/img/index/' + item.img)"
                        />
                        <p class="item-name">{{ item.name }}</p>
                    </li>
                    <li
                        class="list-item"
                        v-for="item in artList"
                        :key="item.name"
                    >
                        <img
                            class="item-img"
                            :src="require('@/assets/img/index/' + item.img)"
                        />
                        <p class="item-name">{{ item.name }}</p>
                    </li>
                </ul>
            </div>
        </scroll>
    </div>
</template>

<script>
    import Scroll from '@/components/common/Scroll.vue'
    import { artList } from '../const'
    export default {
        components: { Scroll },
        data() {
            return {
                artList
            }
        }
    }
</script>

<style lang="less" scoped>
    @width: 300px;
    @height: 300px;
    @marginRight: 48px;

    .section-explore {
        margin-top: 142px;
        margin-bottom: 142px;
        .title {
            text-align: center;
        }
        .desc {
            width: 90%;
            margin: 0 auto;
            margin-top: 16px;
            font-size: 16px;
            line-height: 1.5em;
            text-align: center;
        }
        .gallery {
            width: 100%;
            overflow: hidden;
            .list {
                padding: 0 16px;
                display: flex;
                flex-wrap: nowrap;
                margin-top: 44px;
                transition: all 0.2s;
                animation: flow 40s linear 1s infinite;
                @keyframes flow {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-@marginRight * 7 - @width * 7);
                    }
                }
                // &:hover {
                //     animation-play-state: paused;
                // }
                .list-item {
                    margin-right: @marginRight;
                    .item-img {
                        width: @width;
                        height: @height;
                    }
                    .item-name {
                        margin-top: 24px;
                        font-size: 14px;
                    }
                }
            }
        }

        @media (max-width: 768px) {
            @width: 150px;
            @height: 150px;
            @marginRight: 12px;
            margin-top: 56px;
            margin-bottom: 56px;

            .desc {
                width: 100%;
                margin-top: 16px;
                font-size: 12px;
            }
            .gallery {
                .list {
                    padding: 0;
                    margin-top: 16px;
                    @keyframes flow {
                        0% {
                            transform: translateX(0);
                        }
                        100% {
                            transform: translateX(
                                -@marginRight * 7 - @width * 7
                            );
                        }
                    }
                    .list-item {
                        margin-right: @marginRight;
                        .item-img {
                            width: @width;
                            height: @height;
                        }
                        .item-name {
                            margin-top: 12px;
                            font-size: 12px;
                        }
                    }
                }
            }
        }
    }
</style>
