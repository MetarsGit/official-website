<template>
    <div class="section section-partner">
        <div class="container">
            <scroll inClass="animate__animated animate__fadeInUp">
                <h3 class="title">Investors and Partners</h3>
                <p class="secondary-title">
                    United with our investors and partners, we're committed to
                    excellence, building powerful products and a robust
                    community through the evolution of AIGC.
                </p>
            </scroll>
            <scroll
                inClass="animate__animated animate__fadeInUp animate__delay"
            >
                <ul class="list">
                    <li v-for="item in partners" :key="item" class="item">
                        <div class="logo-wrap">
                            <img
                                class="logo"
                                :src="require('@/assets/img/partners/' + item)"
                            />
                        </div>
                    </li>
                </ul>
            </scroll>
        </div>
    </div>
</template>

<script>
    import { partners } from '../const'
    import Scroll from '@/components/common/Scroll.vue'
    export default {
        components: { Scroll },
        data() {
            return {
                partners
            }
        }
    }
</script>

<style lang="less" scoped>
    .section-partner {
        padding-top: 120px;
        padding-bottom: 120px;
        background-position: center top;
        background-size: 100%;
        text-align: center;
        background-color: #ffffff;
        .title {
            margin-bottom: 20px;
        }
        .secondary-title {
            margin: 0 auto;
            margin-bottom: 48px;
            width: 90%;
        }
        .list {
            display: grid;
            grid-gap: 42px 26px;
            grid-template-columns: repeat(5, 1fr);
            .logo-wrap {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 108px;
                background: #fff;
                border: 1px solid #000000;
                .logo {
                    position: absolute;
                    transform: scale(0.5);
                    transition: 0.38s ease-in-out;
                }
                &:hover {
                    .logo {
                        transform: scale(0.55);
                    }
                }
            }
        }
        @media (max-width: 1280px) {
            .list {
                .logo-wrap {
                    .logo {
                        transform: scale(0.4);
                    }
                    &:hover {
                        .logo {
                            transform: scale(0.45);
                        }
                    }
                }
            }
        }
        @media (max-width: 992px) {
            padding-top: 72px;
            .list {
                grid-template-columns: repeat(3, 1fr);
                .logo-wrap {
                    .logo {
                        transform: scale(0.45);
                    }
                    &:hover {
                        .logo {
                            transform: scale(0.5);
                        }
                    }
                }
            }
        }
        @media (max-width: 764px) {
            .title {
                margin-bottom: 12px;
            }
            .secondary-title {
                margin-bottom: 24px;
                width: 100%;
            }
            .list {
                grid-template-columns: repeat(3, 1fr);
                grid-gap: 16px;
                .logo-wrap {
                    .logo {
                        transform: scale(0.4);
                    }
                    &:hover {
                        .logo {
                            transform: scale(0.45);
                        }
                    }
                }
            }
        }
        @media (max-width: 576px) {
            .list {
                grid-template-columns: repeat(3, 1fr);
                grid-gap: 16px;
                .logo-wrap {
                    height: 46px;
                    .logo {
                        transform: scale(0.26);
                    }
                    &:hover {
                        .logo {
                            transform: scale(0.28);
                        }
                    }
                }
            }
        }
    }
</style>
