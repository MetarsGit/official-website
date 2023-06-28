<template>
    <div class="page-generate">
        <p class="banner">
            Make virtual art effortlessly by a few simple steps
        </p>
        <div class="comp-generate container">
            <a-spin :spinning="loading">
                <start v-if="!displayStatus" />
                <div v-else class="steps">
                    <p class="title">Virtual Art Creation</p>
                    <ul class="progress-bar">
                        <li
                            :class="{
                                'bar-item': true,
                                'bar-item-complete': item.isComplete,
                                'bar-item-active': displayStatus === item.status
                            }"
                            v-for="item in stepList"
                            :key="item.status"
                            @click="changeDisplayStep(item)"
                        >
                            <check-circle-filled
                                v-if="item.isComplete"
                                :style="{
                                    fontSize: '28px',
                                    marginRight: '16px',
                                    color:
                                        displayStatus === item.status
                                            ? '#ffffff'
                                            : '#0b2866'
                                }"
                            />
                            {{ item.label }}
                        </li>
                    </ul>
                    <main-idea v-if="displayStatus === 'START'" />
                    <style-prompt v-if="displayStatus === 'MAIN_IDEA'" />
                    <environment v-if="displayStatus === 'STYLE'" />
                    <details-prompt v-if="displayStatus === 'ENVIRONMENT'" />
                    <publish v-if="displayStatus === 'DETAILS'" />
                </div>
            </a-spin>
        </div>
        <art-modal
            :is-show="isShowDetail"
            :detail="artDetail"
            @close="hideDetail"
        ></art-modal>
    </div>
</template>

<script>
    import { mapState, mapActions, mapMutations } from 'vuex'
    import Start from './comps/start.vue'
    import MainIdea from './comps/mainIdea.vue'
    import StylePrompt from './comps/style.vue'
    import Environment from './comps/environment.vue'
    import DetailsPrompt from './comps/details.vue'
    import Publish from './comps/publish.vue'
    import artModal from '../../components/artModal.vue'
    import { CheckCircleFilled } from '@ant-design/icons-vue'
    import { stepList, STEP_SORT } from './const'
    import './style.less'

    export default {
        name: 'Generate',
        components: {
            Start,
            MainIdea,
            StylePrompt,
            Environment,
            DetailsPrompt,
            Publish,
            CheckCircleFilled,
            artModal
        },
        computed: {
            ...mapState('art', ['currentStatus', 'displayStatus']),
            stepList() {
                let currentStatusSort =
                    STEP_SORT.indexOf(this.currentStatus) || 0
                return stepList.map((item) => {
                    item.isComplete = item.sort <= currentStatusSort
                    return item
                })
            }
        },
        watch: {
            // 切换路由时根据url id进行展示
            '$route.query.id'(newVal) {
                if (!newVal) {
                    this.resetArtInfo()
                } else {
                    this.init()
                }
            }
        },
        data() {
            return {
                loading: false,
                isShowDetail: false,
                artDetail: null
            }
        },

        created() {
            this.init()
        },
        methods: {
            ...mapActions('art', ['fetchArtDetail']),
            ...mapMutations('art', [
                'setArtId',
                'setDisplayStatus',
                'resetArtInfo'
            ]),

            async init() {
                let artId = this.$route.query.id
                if (artId) {
                    this.loading = true
                    this.setArtId(artId)

                    const artDetail = await this.fetchArtDetail(true)
                    // 如果作品已mint 展示作品详情
                    this.showDetail(artDetail)

                    this.loading = false
                }
            },

            changeDisplayStep({ status, isComplete }) {
                // 未完成 && 不是当前该填写的步骤 不能点击
                if (!isComplete && status !== this.currentStatus) {
                    return
                }
                this.setDisplayStatus(status)
            },

            showDetail(artDetail) {
                if (!artDetail) return
                this.artDetail = artDetail || {}
                this.isShowDetail = true
            },
            hideDetail() {
                this.isShowDetail = false
                this.$router.replace({
                    query: {}
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .page-generate {
        background: linear-gradient(
                360deg,
                #fafafb 0%,
                rgba(250, 250, 251, 0.37) 100%
            ),
            url('./img/start-bg.png') 100% 320px no-repeat;
        background-position: center, center 0;
        padding-bottom: 100px;
        .banner {
            padding: 98px 0 100px;
            text-align: center;
            font-size: 48px;
            font-family: Inter-Medium, Inter;
            font-weight: 500;
            color: #14171f;
            line-height: 56px;
        }
    }
    .comp-generate {
        margin: 0 auto;
        padding: 0 98px 98px 98px;
        border-radius: 30px;
        background: #fff;
    }

    .steps {
        padding-top: 68px;
        .title {
            font-size: 48px;
            font-family: Inter-Semi Bold, Inter;
            font-weight: bold;
            text-align: center;
        }
        .progress-bar {
            margin-top: 58px;
            height: 63px;
            display: flex;
            align-items: center;
            overflow: hidden;
            .bar-item {
                flex: 1;
                position: relative;
                font-size: 16px;
                line-height: 63px;
                font-family: Inter-Semi Bold, Inter;
                color: #0b2866;
                background-color: #ecf1fc;
                display: flex;
                align-items: center;
                justify-content: center;
                &::after {
                    position: absolute;
                    right: -22px;
                    top: 7px;
                    content: '';
                    width: 49px;
                    height: 49px;
                    border-right: 4px solid #fff;
                    border-bottom: 4px solid #fff;
                    transform: rotate(-45deg);
                    background-color: #ecf1fc;
                    z-index: 2;
                }
                &:last-child::after {
                    display: none;
                }
                &-active {
                    background: #0b2866;
                    color: #ffffff;
                    z-index: 1;
                    &::after {
                        background: #0b2866;
                    }
                }
                &-complete {
                    cursor: pointer;
                }
            }
        }
    }
</style>
