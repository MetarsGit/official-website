<template>
    <div class="comp-details comp-step">
        <div class="section">
            <div class="title">
                <i class="icon icon-name"></i>
                <span class="label">Name of artwork</span>
                <a-spin :spinning="likeLoading">
                    <span class="like">
                        <!-- 已点赞 -->
                        <i class="icon icon-like" v-if="artInfo.isLike"></i>
                        <!-- 未点赞，已生成图片 -->
                        <i
                            class="icon icon-cantlike"
                            @click="showTip"
                            v-else-if="isGenerated"
                        ></i>
                        <!-- 未点赞，未生成图片 -->
                        <i class="icon icon-unlike" @click="like" v-else></i>
                        <span class="count" v-if="artInfo.likeCount">
                            {{ artInfo.likeCount }}
                        </span>
                    </span>
                </a-spin>
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
                <i class="icon icon-link"></i>
                <span class="label">Invite link</span>
            </div>
            <invitelink type="publish" />
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
                            The creator of the virtual artwork received a total
                            of {{ artInfo.likeCount }} likes, would you like to
                            generate and finalize a virtual artwork using the
                            above description?
                        </div>
                    </div>

                    <a-spin :spinning="loadingImg" v-else>
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
    import { mapState, mapActions, mapMutations } from 'vuex'
    import {
        generateImage,
        findNftImages,
        getGrecaptchaToken,
        queryCanMint,
        likeArt
    } from '@/api'
    import { rpcConfig, defaultNetwork, defaultNetworkId } from '@/config/web3'
    import { walletConnectToNetwork } from '@/utils/wallet'
    import eventBus from '@/utils/eventBus'
    import MintConfirm from './mintConfirm.vue'
    import invitelink from './invitelink.vue'
    export default {
        components: { MintConfirm, invitelink },
        data() {
            return {
                imgs: [],
                loading: false,
                isShowMintConfirm: false,
                isGenerated: false,
                loadingImg: false,
                likeLoading: false,
                accountChangeEvent: null
            }
        },
        computed: {
            ...mapState('art', ['artId', 'artInfo', 'displayStatus']),
            ...mapState('web3', [
                'defaultAccount',
                'contracts',
                'currentNetworkId'
            ]),
            name() {
                return this.artInfo?.DETAILS?.name || ''
            },
            description() {
                return this.artInfo?.DETAILS?.description || ''
            },
            isMinted() {
                return this.artInfo?.isAlreadyMint || false
            }
        },
        created() {
            this.loadImg(false)
            this.accountChangeEvent = eventBus.onEvent('accountChanged', () => {
                this.fetchArtDetail()
            })
        },
        beforeUnmount() {
            eventBus.offEvent('accountChanged', this.accountChangeEvent)
        },
        methods: {
            ...mapActions('art', ['sign', 'fetchArtDetail']),
            ...mapMutations('art', ['setIsAlreadyMint', 'setLikeStatus']),

            // 生成图片
            async generateImage() {
                if (!this.defaultAccount) {
                    this.$message.warn('Please connect the wallet.')
                    return
                }
                this.loading = true
                let recaptchaToken = await getGrecaptchaToken('generate')
                let param = {
                    artId: this.artId,
                    recaptchaToken,
                    address: this.defaultAccount
                }
                generateImage(param)
                    .then((res) => {
                        if (res.code === 1) {
                            this.isGenerated = true
                            this.$message.success('generate success!')
                            this.loadImg()
                        } else if (res.code === 106) {
                            this.$store.dispatch('user/login').then((res) => {
                                if (res.code === 1) {
                                    this.generateImage()
                                }
                            })
                        }
                    })
                    .finally(() => {
                        this.loading = false
                    })
            },

            // 点击mint
            async onClickMint() {
                if (!this.defaultAccount) {
                    this.$message.warn('Please connect the wallet.')
                    return
                }
                this.loading = true
                // 查询是否具备mint条件
                const res = await queryCanMint({
                    artId: this.artId,
                    mintAddress: this.defaultAccount
                })
                if (res.code === 1) {
                    if (res.data?.status) {
                        let { artName, ownerList, v, r, s } = res.data
                        if (this.currentNetworkId != defaultNetworkId) {
                            let connected = await this.switchNetWork()
                            if (!connected) {
                                this.loading = false
                                return
                            }
                        }
                        const mintRes = await this.contracts
                            .CyberHarborMembership(defaultNetworkId)
                            .methods.generateAndMint(
                                artName,
                                ownerList,
                                v,
                                r,
                                s
                            )
                            .send({ from: this.defaultAccount })
                            .catch((err) => {
                                console.log(err)
                                this.$message.error('fail')
                            })
                        if (mintRes) {
                            this.isShowMintConfirm = true
                            this.setIsAlreadyMint(true)
                        }
                    } else {
                        // 不满足mint条件
                        this.$message.error(
                            res?.data?.message || 'not satisfy the conditions'
                        )
                    }
                } else if (res.code === 106) {
                    // 未登录
                    this.loading = true
                    this.$store.dispatch('user/login').then((res) => {
                        if (res?.code === 1) {
                            this.onClickMint()
                        }
                    })
                }
                this.loading = false
            },

            // 切换网络
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
                    } else {
                        this.loadingImg = false
                    }
                })
            },

            // 点赞
            like() {
                if (!this.defaultAccount) {
                    this.$message.warn('Please connect the wallet.')
                    return
                }
                this.likeLoading = true
                let param = {
                    artId: this.artId,
                    address: this.defaultAccount
                }

                likeArt(param)
                    .then((res) => {
                        if (res.code === 1) {
                            this.$message.success('like success')
                            return this.fetchArtDetail() // 更新点赞状态、点赞数
                        } else if (res.code === 106) {
                            this.likeLoading = true
                            this.$store.dispatch('user/login').then((res) => {
                                if (res?.code === 1) {
                                    this.like()
                                }
                            })
                        } else if (res.code === 113) {
                            // 已经like过
                            this.setLikeStatus(true)
                            this.$message.warn(res.msg)
                        }
                    })
                    .finally(() => {
                        this.likeLoading = false
                    })
            },

            // 已生成图片后不可再点赞
            showTip() {
                this.$message.warn(`Artwork already generate, can't like it.`)
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
