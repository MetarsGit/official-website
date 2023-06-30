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
                            v-model.trim="name"
                            type="text"
                            :disabled="isComplete"
                            placeholder="Please input name of the art. (no more than 10 words)"
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
                        v-model.trim="mainIdea"
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
                        v-model.trim="twitterUrl"
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
    import { submitArtMainIdea, getGrecaptchaToken } from '@/api'
    import shareConfirm from './shareConfirm.vue'
    import { ART_NAME_PATTERN, MAIN_IDEA_PATTERN } from '../const'
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
                if (index === 1 && !ART_NAME_PATTERN.test(this.name)) {
                    this.$message.warn(
                        'Please use letters, numbers, underscores, commas, periods and no more then 10 words.'
                    )
                    return
                }
                if (index === 2 && !MAIN_IDEA_PATTERN.test(this.mainIdea)) {
                    this.$message.warn(
                        'Please use letters, numbers, underscores, commas, periods and no more then 30 words.'
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

            verifyTweet() {
                if (!this.twitterUrl) {
                    this.$message.warn('Please input Tweet URL')
                    return
                }
                this.loading = true
                this.verifyTwitter(this.twitterUrl)
                    .then((res) => {
                        if (res.code === 1) {
                            this.updateProgress(3)
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

                submitArtMainIdea(param)
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
