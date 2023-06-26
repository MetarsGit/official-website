<template>
    <div class="comp-main-idea comp-step">
        <a-spin :spinning="loading">
            <div class="section">
                <div class="title">
                    <i class="icon icon-name"></i>
                    <span class="label">Name of artwork</span>
                    <i
                        :class="['icon-arrow', show[0] && 'icon-arrow-down']"
                        @click="show[0] = !show[0]"
                    ></i>
                </div>
                <div class="content" v-show="show[0]">
                    <div class="center-wrap">
                        <input
                            class="input input-short"
                            v-model="name"
                            type="text"
                            :disabled="isComplete"
                        />
                        <span
                            class="btn"
                            @click="updateProgress(1)"
                            v-if="!isComplete"
                        >
                            Continue
                        </span>
                    </div>
                </div>
            </div>

            <div class="section">
                <div class="title">
                    <i class="icon icon-text"></i>
                    <span class="label">Main Idea</span>
                    <i
                        v-show="currProgress > 0"
                        :class="['icon-arrow', show[1] && 'icon-arrow-down']"
                        @click="show[1] = !show[1]"
                    ></i>
                </div>
                <div class="content" v-show="show[1]">
                    <input
                        class="input"
                        v-model="mainIdea"
                        type="text"
                        placeholder="Please describe what the main subject of the art, be specific. (no more than 30 words)"
                        :disabled="isComplete"
                    />
                    <div class="detail">
                        <div class="note">
                            Notes, when describing the artwork in your mind,
                            please start with what is the main focus of the
                            image? Is it a person, an object, a landscape, or
                            something else entirely? Once you have identified
                            the subject matter, try to visualize it in as much
                            detail as possible. Think about the shapes, colors,
                            and textures that make up the subject, and try to
                            imagine it from different angles or perspectives. If
                            the subject is a person, consider their age, gender,
                            clothing, and facial expression. If the subject is
                            an object, think about its size, shape, and
                            material. Remember to be as specific as possible,
                            and don't be afraid to use adjectives to visualize
                            the subject matter more clearly.
                        </div>
                        <span
                            class="btn"
                            @click="updateProgress(2)"
                            v-if="!isComplete"
                        >
                            Continue
                        </span>
                    </div>
                </div>
            </div>

            <div class="section">
                <div class="title">
                    <i class="icon icon-tweet"></i>
                    <span class="label">Share a tweet</span>
                    <i
                        v-show="currProgress > 1"
                        :class="['icon-arrow', show[2] && 'icon-arrow-down']"
                        @click="show[2] = !show[2]"
                    ></i>
                </div>
                <div class="content" v-show="show[2]">
                    <input
                        class="input"
                        v-model="twitterUrl"
                        type="text"
                        placeholder="Tweet URL"
                        :disabled="isVerifyed || isComplete"
                    />
                    <div class="detail" v-if="!isComplete">
                        <share-confirm />
                        <span
                            v-if="!isVerifyed"
                            class="btn"
                            @click="verifyTweet"
                        >
                            Verify
                        </span>
                    </div>
                </div>
            </div>

            <div class="section" v-if="isComplete">
                <div class="title">
                    <i class="icon icon-signed"></i>
                    <span class="label">Signed message</span>
                    <i
                        v-show="currProgress > 2"
                        :class="['icon-arrow', show[3] && 'icon-arrow-down']"
                        @click="show[3] = !show[3]"
                    ></i>
                </div>
                <div class="content" v-show="show[3]">
                    <div class="detail">
                        <div class="note">
                            {{ signedMessage }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="section" v-if="!isComplete">
                <span
                    :class="['btn', 'btn-submit', !canSubmit && 'btn-disable']"
                    @click="submit"
                >
                    Submit
                </span>
            </div>
        </a-spin>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'
    import { submitArtMainIdea, getGrecaptchaToken } from '@/api'
    import shareConfirm from './shareConfirm.vue'
    export default {
        components: {
            shareConfirm
        },
        data() {
            return {
                name: '',
                mainIdea: '',
                twitterUrl: '',
                signedMessage: '',
                isVerifyed: false,
                show: [true, false, false, false],
                currProgress: 0,
                loading: false
            }
        },
        computed: {
            ...mapState('art', ['artId']),
            ...mapState('web3', ['defaultAccount']),
            ...mapGetters('art', ['verifyText', 'displayStep', 'isComplete']),
            canSubmit() {
                return (
                    this.name !== '' &&
                    this.mainIdea !== '' &&
                    this.twitterUrl !== '' &&
                    this.isVerifyed
                )
            }
        },
        watch: {
            isComplete: {
                immediate: true,
                handler: function (newVal) {
                    if (newVal) {
                        console.log(this.displayStep)
                        this.name = this.displayStep.name
                        this.mainIdea = this.displayStep.mainIdea
                        this.twitterUrl = this.displayStep.twitterUrl
                        this.signedMessage = this.displayStep.signedMessage

                        this.currProgress = this.show?.length - 1
                        this.show = [true, true, true, true]
                    }
                }
            }
        },
        methods: {
            ...mapActions('art', ['verifyTwitter', 'sign', 'fetchArtDetail']),

            // 展开下一项 进行填写
            updateProgress(index) {
                if (index === 1 && this.name === '') {
                    this.$message.warn('please input name')
                    return
                }
                if (index === 2 && this.mainIdea === '') {
                    this.$message.warn('please input main idea')
                    return
                }
                this.currProgress = index
                this.toggleShow(index)
            },

            toggleShow(index) {
                this.show = this.show.map((_, idx) =>
                    idx === index ? true : false
                )
            },

            verifyTweet() {
                if (!this.twitterUrl) {
                    this.$message.warn('please input tweet')
                    return
                }
                this.loading = true
                this.verifyTwitter(this.twitterUrl)
                    .then((res) => {
                        if (res.code === 1) {
                            this.updateProgress(3)
                            this.isVerifyed = true
                            this.$message.success(res.data)
                        } else {
                            this.$message.error(res.data)
                        }
                    })
                    .finally(() => {
                        this.loading = false
                    })
            },

            async submit() {
                this.loading = true
                let recaptchaToken = await getGrecaptchaToken('mainIdea')
                let signature = await this.sign(this.mainIdea)

                let param = {
                    artId: this.artId,
                    creatorAddress: this.defaultAccount,
                    mainIdea: this.mainIdea,
                    name: this.name,
                    recaptchaToken,
                    signature,
                    twitterUrl: this.twitterUrl,
                    verifyText: this.verifyText
                }

                console.log('mainidea param', param)

                submitArtMainIdea(param)
                    .then((res) => {
                        if (res.code === 1) {
                            this.$message.success('submit success')
                            this.fetchArtDetail()
                        } else {
                            this.$message.error('fail.')
                        }
                        console.log(res)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                    .finally(() => {
                        this.loading = false
                    })
            }
        }
    }
</script>
