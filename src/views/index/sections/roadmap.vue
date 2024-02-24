<template>
    <div class="comp-roadmap">
        <div class="container">
            <h3 class="title">Roadmap</h3>
            <p class="desc">
                METARS has an exciting roadmap that outlines key milestones to
                achieve in the coming years.
            </p>
            <div class="roadmap-wrapper">
                <div class="roadmap-wrap">
                    <div class="roadmap-item">
                        <span>Phase1:</span>
                        <p>
                            Launch Metars platform, igniting a new era of
                            creation! Artist and AI unite on this AIGC platform,
                            weaving imagination into reality. (Completed)
                        </p>
                    </div>
                    <div class="roadmap-item">
                        <span>Phase2:</span>
                        Expand themes from contemporary art and religious to
                        popular art. Evolve art from the abstract to life in the
                        pulse of everyday. (Completed)
                    </div>
                    <div class="roadmap-item">
                        <span>Phase3:</span>
                        Token Generation Event launch. The Token MRS list on
                        multiple CEX. Be prepare to expose your creation to a
                        global audience. (Completed)
                    </div>
                    <div class="roadmap-item">
                        <span>Phase4:</span>
                        Offer customizable templates for users to create their
                        NFTs, allowing users to easily create unique and
                        personalized works of digital art. (2024 Q2)
                    </div>
                </div>
                <div class="roadmap-wrap">
                    <div class="roadmap-item">
                        <span>Phase5:</span>
                        Integrating the platform with popular social media
                        platforms to enable users to easily share their NFTs
                        with their followers. (2024 Q3)
                    </div>
                    <div class="roadmap-item">
                        <span>Phase6:</span>
                        Expanding to more blockchains, such as opBNB or Ethereum
                        to make it easier for users to manage and trade their
                        NFTs. (2025 Q1)
                    </div>
                    <div class="roadmap-item">
                        <span>Phase7:</span>
                        Expanding to more blockchains, such as opBNB or Ethereum
                        to make it easier for users to manage and trade their
                        NFTs. (2025 Q1)
                    </div>
                    <div class="roadmap-item">
                        <span>Phase8:</span>
                        Phase 8:Integrate with a marketplace where users can
                        showcase and sell their NFTs to a wider audience, and
                        where collectors can discover new works to collect.
                        (2025 Q2)
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        }
    }
</script>

<style lang="less" scoped>
    .comp-roadmap {
        padding: 90px 0 102px;
        background: url('../../../assets/img/index/roadmap-bg.jpeg') center
            no-repeat;
        background-size: cover;
        .title {
            margin-bottom: 10px;
            font-size: 60px;
            font-weight: 600;
        }
        .desc {
            margin-bottom: 48px;
            font-size: 20px;
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
        @media (max-width: 764px) {
            .roadmap-wrapper {
                grid-template-columns: 1fr;
                grid-gap: 48px;
                .roadmap-item {
                    flex-direction: column;
                }
            }
        }
    }
</style>
