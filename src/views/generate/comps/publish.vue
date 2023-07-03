<template>
    <div class="comp-details comp-step">
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
        <a-spin :spinning="loading">
            <div class="section">
                <div class="title">
                    <i class="icon icon-img"></i>
                    <span class="label">The final artwork</span>
                    <span
                        class="btn"
                        @click="generateImage"
                        v-if="!isGenerated"
                    >
                        Generate
                    </span>
                </div>
                <div class="content">
                    <div class="detail" v-if="!isGenerated">
                        <div class="note">
                            The creators of a virtual artwork received a total
                            of {{ totalRetweetsCount }} retweets, as their
                            creation is gaining popularity and attention these
                            days. Would you like to generate and finalize the
                            virtual artwork using above description?
                        </div>
                    </div>

                    <a-spin :spinning="!imgs.length" v-else>
                        <div
                            :class="{
                                'img-list': true,
                                'img-list-bg': !imgs.length
                            }"
                        >
                            <img
                                class="img-item"
                                v-for="item in imgs"
                                :src="item"
                                :key="item"
                            />
                        </div>
                    </a-spin>
                </div>
            </div>

            <div class="section">
                <div class="title">
                    <i class="icon icon-mint"></i>
                    <span class="label">Mint & Claim</span>
                    <span class="btn" @click="onClickMint" v-if="!isMinted">
                        Mint & Claim
                    </span>
                    <span class="btn btn-disable" v-else>Mint & Claim</span>
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
    import { rpcConfig, defaultNetwork, defaultNetworkId } from '@/config/web3'
    import { walletConnectToNetwork } from '@/utils/wallet'
    import MintConfirm from './mintConfirm.vue'
    export default {
        components: { MintConfirm },
        data() {
            return {
                imgs: [],
                loading: false,
                isShowMintConfirm: false,
                isGenerated: false,
                loadingImg: false,
                isMinted: false
            }
        },
        computed: {
            ...mapState('art', ['artId', 'artInfo']),
            ...mapState('web3', [
                'defaultAccount',
                'contracts',
                'currentNetworkId'
            ]),
            name() {
                return this.artInfo.DETAILS?.name || ''
            },
            description() {
                return this.artInfo.DETAILS?.description || ''
            },
            totalRetweetsCount() {
                return this.artInfo.totalRetweetsCount
            }
        },
        created() {
            this.loadImg(false)
            this.isMinted = this.artInfo?.isAlreadyMint
        },
        methods: {
            ...mapActions('art', ['sign', 'fetchArtDetail']),

            // 生成图片
            async generateImage() {
                this.loading = true
                let recaptchaToken = await getGrecaptchaToken('generate')
                let param = {
                    artId: this.artId,
                    recaptchaToken
                }
                generateImage(param)
                    .then((res) => {
                        if (res.code === 1) {
                            this.isGenerated = true
                            this.$message.success('generate success!')
                            this.loadImg()
                        } else if (res.code === 106) {
                            this.$message.error('please login and try again!')
                            this.$store.dispatch('user/login')
                        }
                    })
                    .finally(() => {
                        this.loading = false
                    })
            },

            async onClickMint() {
                if (!this.defaultAccount) {
                    this.$message.warn('Please connect the wallet.')
                    return
                }
                this.loading = true
                const res = await queryCanMint({ artId: this.artId })
                if (res.code === 1 && res.data?.status) {
                    let { artName, ownerList, v, r, s } = res.data
                    console.log('this.contracts', this.contracts)
                    console.log('currentNetworkId', this.currentNetworkId)
                    if (this.currentNetworkId != defaultNetworkId) {
                        console.log('切换')
                        let connected = await this.switchNetWork()
                        console.log('网络', connected)
                        if (!connected) {
                            this.loading = false
                            return
                        }
                    }
                    const mintRes = await this.contracts
                        .CyberHarborMembership(defaultNetworkId)
                        .methods.generateAndMint(artName, ownerList, v, r, s)
                        .send({ from: this.defaultAccount })
                        .catch((err) => {
                            console.log(err)
                            this.$message.error('fail')
                        })
                    console.log('mint res', mintRes)
                    if (mintRes) {
                        this.isShowMintConfirm = true
                        this.isMinted = true
                    }
                } else if (res.code === 106) {
                    // 未登录
                    this.loading = true
                    this.$store.dispatch('user/login').then((res) => {
                        if (res?.code === 1) {
                            this.onClickMint()
                        }
                    })
                } else {
                    // 不满足mint条件
                    this.$message.error(
                        res?.msg || 'not satisfy the conditions'
                    )
                }
                this.loading = false
            },

            async switchNetWork() {
                let connected = false
                const {
                    expectedNetworkId,
                    chainName,
                    currencySymbol,
                    currencyDecimals,
                    rpcUrls,
                    blockExplorerUrls
                } = rpcConfig[defaultNetwork]
                const config = {
                    expectedNetworkId,
                    chainId: window.web3.utils.numberToHex(expectedNetworkId),
                    chainName,
                    currencySymbol,
                    currencyDecimals,
                    rpcUrls,
                    blockExplorerUrls
                }
                try {
                    await walletConnectToNetwork(config)
                    connected = true
                } catch (e) {
                    connected = false
                }
                return connected
            },

            // once:true 只请求一次  默认轮询
            loadImg(loop = true) {
                this.loadingImg = true
                findNftImages({ artId: this.artId }).then((res) => {
                    if (res.code === 1) {
                        this.imgs = res.data?.pictures || []
                        this.loadingImg = false
                        this.isGenerated = true
                    } else if (res.code === 111) {
                        // 图片正在生成中
                        if (loop) {
                            setTimeout(() => {
                                this.loadImg()
                            }, 5000)
                        }
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .comp-details {
        .img-list {
            background-image: url(../../../assets/img/screenshot.png);
            background-repeat: repeat;
            background-size: 25%;
            &-bg {
                padding-top: 12.5%;
                padding-bottom: 12.5%;
            }
            .img-item {
                display: inline-block;
                width: 25%;
                height: auto;
                object-fit: contain;
            }
        }
    }
</style>
