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
                            :class="[
                                'bar-item',
                                displayStatus === item.status &&
                                    'bar-item-active'
                            ]"
                            v-for="item in stepList"
                            @click="setDisplayStatus(item.status)"
                            :key="item.status"
                        >
                            <!-- <i
                                class="icon icon-finish"
                                v-if="displayStatus"
                            ></i>
                            <i class="icon icon-current"></i> -->
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
    import { stepList } from './const'
    import './style.less'
    export default {
        name: 'Generate',
        components: {
            Start,
            MainIdea,
            StylePrompt,
            Environment,
            DetailsPrompt,
            Publish
        },
        computed: {
            ...mapState('art', ['currentStatus', 'displayStatus'])
        },
        data() {
            return {
                stepList,
                loading: false
            }
        },
        created() {
            this.init()
        },
        methods: {
            ...mapActions('art', ['fetchArtDetail', 'synchronizeStatus']),
            ...mapMutations('art', ['setArtId', 'setDisplayStatus']),

            async init() {
                let artId = this.$route.query.id
                if (artId) {
                    this.loading = true
                    this.setArtId(artId)
                    await this.fetchArtDetail()
                    await this.synchronizeStatus()
                    this.loading = false
                }
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
                text-align: center;
                font-size: 16px;
                line-height: 63px;
                font-family: Inter-Semi Bold, Inter;
                color: #0b2866;
                background-color: #ecf1fc;
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
                    color: #fff;
                    z-index: 1;
                    &::after {
                        background: #0b2866;
                    }
                }
            }
        }
    }
</style>