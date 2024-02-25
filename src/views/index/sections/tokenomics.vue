<template>
    <div class="section section-tokenomics" id="tokenomics">
        <div class="container">
            <scroll
                inClass="animate__animated animate__fadeInUp animate__delay"
            >
                <h3 class="title">Tokenomics</h3>
                <p class="secondary-title">
                    METARS aims to revolutionize the NFT creation process by
                    empowering anyone to bring their artistic vision to life.
                    $MRS is the governance token of METARS ecosystem, with a
                    fixed supply of 1 billion tokens.
                </p>
            </scroll>
            <scroll
                inClass="animate__animated animate__fadeInUp animate__delay"
            >
                <figure class="highcharts-figure">
                    <div id="container"></div>
                </figure>
                <img src="@/assets/img/index/pie.png" alt="" class="m-pie" />
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
        mounted() {
            this.initChart()
        },
        methods: {
            initChart() {
                window.Highcharts.chart('container', {
                    chart: {
                        type: 'variablepie'
                    },
                    title: { text: '' },
                    exporting: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    },
                    tooltip: {
                        enabled: false
                    },
                    series: [
                        {
                            minPointSize: 10,
                            innerSize: '20%',
                            zMin: 0,
                            name: 'countries',
                            borderRadius: 5,
                            dataLabels: [
                                {
                                    style: {
                                        fontSize: '16px',
                                        fontWeight: 300,
                                        fontFamily: 'Roboto Mono, sans-serif'
                                    }
                                }
                            ],
                            data: [
                                {
                                    name: 'Backer Airdrop: 5%',
                                    y: 41284,
                                    z: 120
                                },
                                {
                                    name: 'Creative rewards: 20%',
                                    y: 505992,
                                    z: 92
                                },
                                {
                                    name: 'Ecosystem Fund: 20%',
                                    y: 551695,
                                    z: 119
                                },
                                {
                                    name: 'AI Partnership Funding: 30%',
                                    y: 312679,
                                    z: 121
                                },
                                {
                                    name: 'Marketing: 2%',
                                    y: 78865,
                                    z: 136
                                },
                                {
                                    name: 'Foundation: 3%',
                                    y: 301336,
                                    z: 200
                                },
                                {
                                    name: 'Community activity: 5%',
                                    y: 41284,
                                    z: 213
                                },

                                {
                                    name: 'Team: 15%',
                                    y: 357114,
                                    z: 235
                                }
                            ],
                            colors: [
                                {
                                    radialGradient: {
                                        cx: 0.4,
                                        cy: 0.3,
                                        r: 0.7
                                    },
                                    stops: [
                                        [0, '#0F72EA'],
                                        [1, '#529DEA']
                                    ]
                                },
                                {
                                    radialGradient: {
                                        cx: 0.4,
                                        cy: 0.3,
                                        r: 0.7
                                    },
                                    stops: [
                                        [0, '#208DEA'],
                                        [1, '#53B9F8']
                                    ]
                                },
                                {
                                    radialGradient: {
                                        cx: 0.4,
                                        cy: 0.3,
                                        r: 0.7
                                    },
                                    stops: [
                                        [0, '#53B2FA'],
                                        [1, '#95CFFE']
                                    ]
                                },
                                {
                                    radialGradient: {
                                        cx: 0.4,
                                        cy: 0.3,
                                        r: 0.7
                                    },
                                    stops: [
                                        [0, '#4ECDF2'],
                                        [1, '#A2E3F8']
                                    ]
                                },
                                {
                                    radialGradient: {
                                        cx: 0.4,
                                        cy: 0.3,
                                        r: 0.7
                                    },
                                    stops: [
                                        [0, '#34A1E8'],
                                        [1, '#66C2FA']
                                    ]
                                },
                                {
                                    radialGradient: {
                                        cx: 0.4,
                                        cy: 0.3,
                                        r: 0.7
                                    },
                                    stops: [
                                        [0, '#62BAFE'],
                                        [1, '#B0DDFA']
                                    ]
                                },
                                {
                                    radialGradient: {
                                        cx: 0.4,
                                        cy: 0.3,
                                        r: 0.7
                                    },
                                    stops: [
                                        [0, '#1DA3E9'],
                                        [1, '#67C1FF']
                                    ]
                                },
                                {
                                    radialGradient: {
                                        cx: 0.4,
                                        cy: 0.3,
                                        r: 0.7
                                    },
                                    stops: [
                                        [0, '#0D5BC3'],
                                        [1, '#429AFF']
                                    ]
                                }
                            ]
                        }
                    ]
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .section-tokenomics {
        padding-top: 0 !important;
        .title {
            margin-bottom: 20px;
            text-align: center;
        }
        .secondary-title {
            margin: 0 auto;
            margin-bottom: 48px;
            width: 90%;
            text-align: center;
        }
        .icon {
            margin: 0 auto;
            max-width: 100%;
            width: 930px;
            > img {
                width: 100%;
            }
        }
        .highcharts-figure {
            display: block;
            #container {
                height: 500px;
            }
        }
        .m-pie {
            display: none;
        }
    }
    @media screen and (max-width: 768px) {
        .section-tokenomics {
            .highcharts-figure {
                display: none;
            }
            .secondary-title {
                margin-bottom: 48px;
            }
            .m-pie {
                display: block;
                width: 100%;
            }
        }
    }
</style>
