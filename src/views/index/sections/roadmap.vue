<template>
    <div class="section section-roadmap" id="roadmap">
        <div class="container">
            <scroll inClass="animate__animated animate__fadeInUp">
                <h3 class="title">Roadmap</h3>
                <p class="secondary-title">
                    METARS has an exciting roadmap that outlines key milestones
                    to achieve in the coming years.
                </p>
            </scroll>
            <scroll
                inClass="animate__animated animate__fadeInUp animate__delay"
            >
                <div class="roadmap-wrapper">
                    <div class="roadmap-wrap">
                        <div class="roadmap-item">
                            <span>Phase1:</span>
                            <p class="desc">
                                Launch Metars platform, igniting a new era of
                                creation! Artist and AI unite on this AIGC
                                platform, weaving imagination into reality.
                                (Completed)
                            </p>
                        </div>
                        <div class="roadmap-item">
                            <span>Phase2:</span>
                            <p class="desc">
                                Expand themes from contemporary art and
                                religious to popular art. Evolve art from the
                                abstract to life in the pulse of everyday.
                                (Completed)
                            </p>
                        </div>
                        <div class="roadmap-item">
                            <span>Phase3:</span>
                            <p class="desc">
                                Token Generation Event launch. The Token MRS
                                list on multiple CEX. Be prepare to expose your
                                creation to a global audience. (Completed)
                            </p>
                        </div>
                        <div class="roadmap-item">
                            <span>Phase4:</span>
                            <p class="desc">
                                Offer customizable templates for users to create
                                their NFTs, allowing users to easily create
                                unique and personalized works of digital art.
                                (2024 Q2)
                            </p>
                        </div>
                    </div>
                    <div class="roadmap-wrap">
                        <div class="roadmap-item">
                            <span>Phase5:</span>
                            <p class="desc">
                                Integrating the platform with popular social
                                media platforms to enable users to easily share
                                their NFTs with their followers. (2024 Q3)
                            </p>
                        </div>
                        <div class="roadmap-item">
                            <span>Phase6:</span>
                            <p class="desc">
                                Expanding to more blockchains, such as opBNB or
                                Ethereum to make it easier for users to manage
                                and trade their NFTs. (2025 Q1)
                            </p>
                        </div>
                        <div class="roadmap-item">
                            <span>Phase7:</span>
                            <p class="desc">
                                Expanding to more blockchains, such as opBNB or
                                Ethereum to make it easier for users to manage
                                and trade their NFTs. (2025 Q1)
                            </p>
                        </div>
                        <div class="roadmap-item">
                            <span>Phase8:</span>
                            <p class="desc">
                                Integrate with a marketplace where users can
                                showcase and sell their NFTs to a wider
                                audience, and where collectors can discover new
                                works to collect. (2025 Q2)
                            </p>
                        </div>
                    </div>
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
        }
    }
</script>

<style lang="less" scoped>
    .section-roadmap {
        padding: 120px 0 120px;
        background: url('../../../assets/img/index/roadmap-bg.png') center
            no-repeat;
        background-size: cover;
        .title {
            margin-bottom: 10px;
        }
        .secondary-title {
            margin-bottom: 48px;
        }
        .roadmap-wrapper {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 124px;
            .roadmap-wrap {
                display: grid;
                grid-template-columns: 1fr;
                grid-gap: 48px;
                .roadmap-item {
                    display: flex;
                    > span {
                        margin-right: 20px;
                        white-space: nowrap;
                        font-weight: 700;
                        font-size: 20px;
                    }
                }
            }
        }
    }
    @media (max-width: 764px) {
        .section-roadmap {
            .title {
                margin-bottom: 12px;
            }
            .secondary-title {
                margin-bottom: 12px;
            }
            .roadmap-wrapper {
                grid-template-columns: 1fr;
                grid-gap: 12px;
                .roadmap-wrap {
                    grid-gap: 12px;
                    .roadmap-item {
                        flex-direction: column;
                        > span {
                            font-size: 16px;
                        }
                    }
                }
            }
        }
    }
</style>
