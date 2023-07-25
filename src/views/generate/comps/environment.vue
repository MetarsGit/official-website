<template>
    <div class="comp-environment comp-step">
        <a-spin :spinning="loading">
            <div class="section">
                <div class="title">
                    <i class="icon icon-text"></i>
                    <span class="label">Environment</span>
                    <i
                        :class="['icon-arrow', show[0] && 'icon-arrow-down']"
                        @click="show[0] = !show[0]"
                    ></i>
                </div>
                <div class="content" v-show="show[0]">
                    <input
                        class="input"
                        v-model.trim="environment"
                        type="text"
                        placeholder="Please input the environment of the subject, be specific. (no more than 20 words)"
                        :disabled="isComplete"
                    />
                    <div class="detail">
                        <div class="note">
                            Notes, by considering the environment, the result
                            can better appreciate the unique qualities and
                            significance of the artwork. The “environment” could
                            involve analyzing the physical and contextual
                            factors that surround the piece, such as the
                            lighting, the surrounding space, the angle from
                            which it is viewed, and the historical or cultural
                            context in which it was created.
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
    import { submitArtEnvironment, getGrecaptchaToken } from '@/api'
    import shareConfirm from './shareConfirm.vue'
    import invitelink from './invitelink.vue'
    import { ENVIRONMENT_PATTERN } from '../const'
    export default {
        components: {
            shareConfirm,
            invitelink
        },
        data() {
            return {
                environment: '',
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
                    this.environment !== '' // &&
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
                        this.environment = this.displayStep.environment
                        // this.twitterUrl = this.displayStep.twitterUrl
                        // this.signedMessage = this.displayStep.signedMessage

                        this.currProgress = this.show?.length - 1
                        this.show = [true, true]
                    }
                }
            }
        },
        methods: {
            ...mapActions('art', ['verifyTwitter', 'sign', 'fetchArtDetail']),

            // 展开下一项 进行填写
            updateProgress(index) {
                if (
                    index === 1 &&
                    !ENVIRONMENT_PATTERN.test(this.environment)
                ) {
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
            //     // api verify
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
                let recaptchaToken = await getGrecaptchaToken('environment')
                let signature = await this.sign(this.environment)

                let param = {
                    artId: this.artId,
                    creatorAddress: this.defaultAccount,
                    environment: this.environment,
                    recaptchaToken,
                    signature
                    // twitterUrl: this.twitterUrl,
                    // verifyText: this.verifyText
                }

                submitArtEnvironment(param)
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
