<template>
    <div class="comp-details comp-step">
        <a-spin :spinning="loading">
            <div class="section">
                <div class="title">
                    <i class="icon icon-name"></i>
                    <span class="label">Name of artwork</span>
                </div>
                <div class="content">
                    <div class="center-wrap">
                        <input
                            class="input input-short"
                            v-model="name"
                            disabled
                            type="text"
                        />
                    </div>
                </div>
            </div>

            <div class="section">
                <div class="title">
                    <i class="icon icon-text"></i>
                    <span class="label">Description of the artwork</span>
                </div>
                <div class="content">
                    <input
                        class="input"
                        v-model="description"
                        type="text"
                        disabled
                    />
                </div>
            </div>

            <div class="section">
                <div class="title">
                    <i class="icon icon-img"></i>
                    <span class="label">The final artwork</span>
                    <span class="btn" @click="generateImage">Generate</span>
                    <span class="btn" @click="loadImg">查图</span>
                </div>
                <div class="content">
                    <div class="detail" v-if="!imgs.length">
                        <div class="note">
                            The creators of a virtual artwork received a total
                            of 193 retweets, as their creation is gaining
                            popularity and attention these days. Would you like
                            to generate and finalize the virtual artwork using
                            above description?
                        </div>
                    </div>
                    <div class="img-list" v-else>
                        <img
                            class="img-item"
                            :src="item"
                            v-for="item in imgs"
                            :key="item"
                        />
                    </div>
                </div>
            </div>

            <div class="section">
                <div class="title">
                    <i class="icon icon-mint"></i>
                    <span class="label">Mint & Claim</span>
                    <span class="btn" @click="mint">Mint & Claim</span>
                </div>
                <div class="content">
                    <div class="detail">
                        <div class="note">
                            Each of the four creators will receive one NFT
                            through the minting process. Enjoy your journey on
                            METARS!
                        </div>
                    </div>
                </div>
            </div>
        </a-spin>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import {
        generateImage,
        findNftImages,
        getGrecaptchaToken,
        queryCanMint
    } from '@/api'
    export default {
        data() {
            return {
                // name: '',
                // description: '',
                imgs: [
                    'https://test.a1pha.win/art/Nahida/4.png',
                    'https://test.a1pha.win/art/Nahida/3.png',
                    'https://test.a1pha.win/art/Nahida/1.png',
                    'https://test.a1pha.win/art/Nahida/2.png'
                ],
                loading: false
            }
        },
        computed: {
            ...mapState('art', ['artId', 'artInfo']),
            ...mapState('web3', ['defaultAccount', 'displayStep']),
            canSubmit() {
                return (
                    this.details !== '' && this.tweet !== '' && this.isVerifyed
                )
            },
            name() {
                return this.artInfo.DETAILS.name
            },
            description() {
                return this.artInfo.DETAILS.description
            }
        },
        methods: {
            ...mapActions('art', ['sign', 'fetchArtDetail']),

            async generateImage() {
                let recaptchaToken = await getGrecaptchaToken('generate')
                let param = {
                    artId: this.artId,
                    recaptchaToken
                }
                generateImage(param).then((res) => {
                    console.log(res)
                })
            },

            mint() {
                queryCanMint({ artId: this.artId }).then((res) => {
                    if (res.code === 1) {
                        if (res.data?.status) {
                            // 满足条件
                        } else {
                            // 不满足mint条件
                        }
                    }
                })
            },

            loadImg() {
                findNftImages({ artId: this.artId }).then((res) => {
                    if (res.code === 1) {
                        this.imgs = res.data?.pictures || []
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .comp-details {
        .img-list {
            .img-item {
                display: inline-block;
                width: 25%;
                height: auto;
                object-fit: contain;
            }
        }
    }
</style>
