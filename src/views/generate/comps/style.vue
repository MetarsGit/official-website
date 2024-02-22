<template>
    <div class="comp-style comp-step">
        <a-spin :spinning="loading">
            <div class="section">
                <div class="title">
                    <i class="icon icon-text"></i>
                    <span class="label">Style</span>
                    <i
                        :class="['icon-arrow', show[0] && 'icon-arrow-down']"
                        @click="show[0] = !show[0]"
                    ></i>
                </div>
                <div class="content" v-show="show[0]">
                    <input
                        class="input"
                        v-model.trim="style"
                        type="text"
                        placeholder="Please input the style of the art, be specific. (no more than 15 words)"
                        :disabled="isComplete"
                    />
                    <div class="detail">
                        <div class="note">
                            Notes, when describing artwork, it is helpful to
                            consider various "styles" that can impact the final
                            output. These styles can be based on design and
                            genre, such as standard, Japanese anime, Pixar
                            movie, cyberpunk, steampunk, watercolor, Bloodborne,
                            grunge, and more. Alternatively, styles can be based
                            on the artist, such as Andy Warhol, Leonardo da
                            Vinci, Salvador Dali, Pablo Picasso, and others.
                            Another option is to consider the rendering and
                            lighting properties used, such as volumetric
                            lighting, cinematic lighting, Octane lighting,
                            softbox lighting, glowing lighting, blue lighting,
                            long exposure, fair lights, and more. It is
                            important to choose the right style to achieve the
                            desired effect in the artwork.
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
                <span v-if="canSubmit" class="btn btn-submit" @click="submit">
                    Submit
                </span>
                <span v-else class="btn btn-submit btn-disable">Submit</span>
            </div>
        </a-spin>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'
    import { submitArtStyle, getGrecaptchaToken } from '@/api'
    import shareConfirm from './shareConfirm.vue'
    import invitelink from './invitelink.vue'
    import { STYLE_PATTERN } from '../const'
    export default {
        components: {
            shareConfirm,
            invitelink
        },
        data() {
            return {
                style: '',
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
            ...mapGetters('art', ['verifyText', 'isComplete', 'displayStep']),
            canSubmit() {
                return (
                    this.style !== '' //&&
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
                        console.log(this.displayStep)
                        this.style = this.displayStep.style
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
                if (index === 1 && !STYLE_PATTERN.test(this.style)) {
                    this.$message.warn(
                        'Please use letters, numbers, underscores, commas, periods and no more then 15 words.'
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
                if (!this.defaultAccount) {
                    this.$message.warn('Please connect the wallet.')
                    return
                }
                this.loading = true
                let recaptchaToken = await getGrecaptchaToken('style')
                let signature = await this.sign(this.style)

                let param = {
                    artId: this.artId,
                    creatorAddress: this.defaultAccount,
                    style: this.style,
                    recaptchaToken,
                    signature
                    // twitterUrl: this.twitterUrl,
                    // verifyText: this.verifyText
                }

                submitArtStyle(param)
                    .then((res) => {
                        if (res.code === 1) {
                            this.$message.success('submit success')
                            this.fetchArtDetail()
                        } else if (res.code === 106) {
                            this.loading = true
                            this.$store.dispatch('user/login').then((res) => {
                                if (res?.code === 1) {
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
