<template>
    <div class="comp-details comp-step">
        isComplete: {{ isComplete }}
        <a-spin :spinning="loading">
            <div class="section">
                <div class="title">
                    <i class="icon icon-text"></i>
                    <span class="label">Details</span>
                    <i
                        :class="['icon-arrow', show[0] && 'icon-arrow-down']"
                        @click="show[0] = !show[0]"
                    ></i>
                </div>
                <div class="content" v-show="show[0]">
                    <input
                        class="input"
                        v-model="details"
                        type="text"
                        placeholder="Please input additional details about the subject, be specific. (no more than 20 words)"
                    />
                    <div class="detail">
                        <div class="note">
                            Please provide additional details about the subject.
                            These details could resemble photographs taken with
                            specific equipment such as the Sony Alpha α7,
                            ISO1900, or Leica M,such as the shooting device, or
                            include specific aspects such as the color palette,
                            lighting, textures, and the overall mood or
                            atmosphere you would like to convey, or describe
                            different levels of detail and realism such as
                            photorealistic , ultra photoreal , ultra detailed,
                            intricate details.
                        </div>
                        <span class="btn" @click="updateProgress(1)">
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
                        v-show="currProgress > 0"
                        :class="['icon-arrow', show[1] && 'icon-arrow-down']"
                        @click="show[1] = !show[1]"
                    ></i>
                </div>
                <div class="content" v-show="show[1]">
                    <input
                        class="input"
                        v-model="tweet"
                        type="text"
                        placeholder="Tweet URL"
                        :disabled="isVerifyed"
                    />
                    <div class="detail">
                        <span class="share">
                            Generate a tweet for me and I’ll share!
                        </span>
                        <span
                            v-if="!isVerifyed && !isComplete"
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
                        v-show="currProgress > 1"
                        :class="['icon-arrow', show[2] && 'icon-arrow-down']"
                        @click="show[2] = !show[2]"
                    ></i>
                </div>
                <div class="content" v-show="show[2]">
                    <div class="detail">
                        <div class="note">
                            I will create a virutal art with prompts “a little
                            girl with light brown short wavy curly hair and blue
                            eyes floating in space” on METARS with my wallet
                            address 994xyz
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
    import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
    import { submitArtDetails, getGrecaptchaToken } from '@/api'
    export default {
        data() {
            return {
                details: '',
                tweet: '',
                signedMessage: '',
                isVerifyed: false,
                show: [true, false, false],
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
                    this.details !== '' && this.tweet !== '' && this.isVerifyed
                )
            }
        },
        watch: {
            isComplete: {
                immediate: true,
                handler: function (newVal, oldVal) {
                    if (newVal) {
                        console.log(this.displayStep)
                        this.details = this.displayStep.details
                        this.tweet = this.displayStep.twitterUrl
                        this.signedMessage = this.displayStep.signedMessage
                    }
                }
            }
        },
        methods: {
            ...mapActions('art', ['verifyTwitter', 'sign', 'fetchArtDetail']),

            // 更新创作进度
            updateProgress(index) {
                if (index === 1 && this.details === '') {
                    this.$message.warn('please input details')
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
                if (!this.tweet) {
                    this.$message.warn('please input tweet')
                    return
                }
                // api verify
                this.loading = true
                this.verifyTwitter(this.tweet)
                    .then((res) => {
                        if (res.code === 1) {
                            this.updateProgress(2)
                            this.isVerifyed = true
                            this.$message.success(res.data)
                        }
                    })
                    .finally(() => {
                        this.loading = false
                    })
            },

            async submit() {
                this.loading = true
                let recaptchaToken = await getGrecaptchaToken('details')
                let signature = await this.sign(this.details)

                let param = {
                    artId: this.artId,
                    creatorAddress: this.defaultAccount,
                    details: this.details,
                    recaptchaToken,
                    signature,
                    twitterUrl: this.tweet,
                    verifyText: this.verifyText
                }

                console.log('details param', param)

                submitArtDetails(param)
                    .then((res) => {
                        if (res.code === 1) {
                            console.log(res)
                            this.$message.success('submit success')
                            this.fetchArtDetail()
                        }
                    })
                    .finally(() => {
                        this.loading = false
                    })
            }
        }
    }
</script>
