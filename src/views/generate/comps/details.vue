<template>
    <div class="comp-details comp-step">
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
                        v-model.trim="details"
                        type="text"
                        placeholder="Please input additional details about the subject, be specific. (no more than 20 words)"
                        :disabled="isComplete"
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
                    <i class="icon icon-link"></i>
                    <span class="label">Invite link</span>
                    <i
                        v-show="currProgress > 0"
                        :class="['icon-arrow', show[1] && 'icon-arrow-down']"
                        @click="show[1] = !show[1]"
                    ></i>
                </div>
                <invitelink v-show="show[1]" />
            </div>

            <!-- <div class="section" v-if="isComplete">
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
                            {{ signedMessage }}
                        </div>
                    </div>
                </div>
            </div> -->

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
    import { submitArtDetails, getGrecaptchaToken } from '@/api'
    import shareConfirm from './shareConfirm.vue'
    import invitelink from './invitelink.vue'
    import { DETAILS_PATTERN } from '../const'
    export default {
        components: {
            shareConfirm,
            invitelink
        },
        data() {
            return {
                details: '',
                // twitterUrl: '',
                // signedMessage: '',
                // isVerifyed: false,
                show: [true, false],
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
                    this.details !== '' //&&
                    // this.twitterUrl !== '' &&
                    // this.isVerifyed
                )
            }
        },
        watch: {
            isComplete: {
                immediate: true,
                handler: function (newVal) {
                    if (newVal) {
                        this.details = this.displayStep.details
                        // this.twitterUrl = this.displayStep.twitterUrl
                        // this.signedMessage = this.displayStep.signedMessage

                        this.currProgress = this.show?.length - 1
                        this.show = [true, true, true]
                    }
                }
            }
        },
        methods: {
            ...mapActions('art', ['verifyTwitter', 'sign', 'fetchArtDetail']),

            // 展开下一项 进行填写
            updateProgress(index) {
                if (index === 1 && !DETAILS_PATTERN.test(this.details)) {
                    this.$message.warn(
                        'Please use letters, numbers, underscores, commas, periods and no more then 20 words.'
                    )
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

            // verifyTweet() {
            //     if (!this.twitterUrl) {
            //         this.$message.warn('Please input Tweet URL')
            //         return
            //     }
            //     this.loading = true
            //     this.verifyTwitter(this.twitterUrl)
            //         .then((res) => {
            //             if (res.code === 1) {
            //                 this.updateProgress(2)
            //                 this.isVerifyed = true
            //                 this.$message.success(res.data)
            //             }
            //         })
            //         .finally(() => {
            //             this.loading = false
            //         })
            // },

            async submit() {
                this.loading = true
                let recaptchaToken = await getGrecaptchaToken('details')
                let signature = await this.sign(this.details)

                let param = {
                    artId: this.artId,
                    creatorAddress: this.defaultAccount,
                    details: this.details,
                    recaptchaToken,
                    signature
                    // twitterUrl: this.twitterUrl,
                    // verifyText: this.verifyText
                }

                submitArtDetails(param)
                    .then((res) => {
                        if (res.code === 1) {
                            this.$message.success('submit success')
                            this.fetchArtDetail()
                        } else if (res.code === 106) {
                            this.loading = true
                            this.$store.dispatch('user/login').then((res) => {
                                if (res.code === 1) {
                                    this.submit()
                                }
                            })
                        }
                    })
                    .finally(() => {
                        this.loading = false
                    })
            }
        }
    }
</script>
