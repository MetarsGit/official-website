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
                    <span class="btn" @click="generateImage" v-if="!isComplete">
                        Generate
                    </span>
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
                    <span class="btn" @click="onClickMint" v-if="!isComplete">
                        Mint & Claim
                    </span>
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
        <mint-confirm v-model:isShow="isShowMintConfirm" />
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
    import { defaultNetworkId } from '@/config/web3'
    import MintConfirm from './mintConfirm.vue'
    export default {
        components: { MintConfirm },
        data() {
            return {
                imgs: [],
                loading: false,
                isShowMintConfirm: false,
                isComplete: false
            }
        },
        computed: {
            ...mapState('art', ['artId', 'artInfo']),
            ...mapState('web3', ['defaultAccount', 'contracts']),
            name() {
                return this.artInfo.DETAILS?.name || ''
            },
            description() {
                return this.artInfo.DETAILS?.description || ''
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

            onClickMint() {
                queryCanMint({ artId: this.artId }).then((res) => {
                    if (res.code === 1) {
                        if (res.data?.status) {
                            let { artName, ownerList, v, r, s } = res.data
                            try {
                                console.log('contracts', this.contracts)
                                this.contracts
                                    .CyberHarborMembership(defaultNetworkId)
                                    .methods.generateAndMint(
                                        artName,
                                        ownerList,
                                        v,
                                        r,
                                        s
                                    )
                                    .send({ from: this.defaultAccount })
                                    .then((res) => {
                                        this.isShowMintConfirm = true
                                        this.isComplete = true
                                        console.log('mint res', res)
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                        this.$message.error('fail')
                                    })
                            } catch (error) {
                                console.log('err', error)
                                if (error.code !== 4001) {
                                    // 用户取消操作不提示
                                    this.$message.error('fail')
                                }
                            }
                        } else {
                            // 不满足mint条件
                            this.$message.error(
                                res.data.message || 'not satisfy the conditions'
                            )
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
