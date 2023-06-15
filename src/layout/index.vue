<template>
    <a-layout class="vab-layout-wrap">
        <a-layout class="vab-layout">
            <a-layout-header class="vab-header" v-if="device === 'mobile'">
                <a-row>
                    <a-col flex="auto">
                        <menu-unfold-outlined
                            v-if="collapse"
                            class="trigger"
                            @click="toggleCollapse"
                        />
                        <menu-fold-outlined
                            v-else
                            class="trigger"
                            @click="toggleCollapse"
                        />
                    </a-col>
                    <a-col flex="156px">
                        <vab-avatar />
                    </a-col>
                </a-row>
            </a-layout-header>
            <a-layout-header v-if="device === 'desktop'">
                <a-row class="container" align="middle">
                    <a-col flex="160px">
                        <img
                            src="../assets/logo.png"
                            alt=""
                            style="width: 100%"
                        />
                    </a-col>
                    <a-col flex="auto" class="vab-menu-container">
                        <a-menu class="vab-menu" mode="horizontal">
                            <a-menu-item
                                v-for="route in routeList"
                                :key="route.key"
                                :class="{ active: currentRoute === route.key }"
                                @click.capture="handleLink(route)"
                            >
                                <span>{{ route.label }}</span>
                            </a-menu-item>
                        </a-menu>
                    </a-col>
                    <a-col flex="156px">
                        <vab-avatar />
                    </a-col>
                </a-row>
            </a-layout-header>
            <vab-content />
        </a-layout>
        <a-layout-sider
            v-if="device === 'mobile'"
            collapsible
            class="vab-sider"
            width="250"
            v-model:collapsed="collapse"
            :class="classObj"
            :trigger="null"
        >
            <div class="logo">
                <img src="../assets/logo.png" alt="" />
            </div>
            <a-menu class="vab-menu" mode="inline">
                <a-menu-item
                    v-for="route in routeList"
                    :key="route.key"
                    @click.capture="handleLink(route)"
                >
                    <span>{{ route.label }}</span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <div
            v-if="device === 'mobile' && !collapse"
            class="vab-mask"
            @click="handleFoldSideBar"
        ></div>
    </a-layout>
</template>
<script>
import { filterRoutes } from '@/utils/routes'
import VabAvatar from './vab-avatar'
import VabContent from './vab-content'
import { mapActions, mapGetters } from 'vuex'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { constantRoutes } from '@/router'

export default {
    components: {
        VabAvatar,
        VabContent,
        MenuUnfoldOutlined,
        MenuFoldOutlined
    },
    data() {
        return {
            selectedKeys: [],
            openKeys: [],
            routes: filterRoutes(constantRoutes),
            routeList: [
                {
                    type: 'route',
                    label: 'Collaborative Artworks',
                    key: 'ArtList'
                },
                {
                    type: 'route',
                    label: 'In Creation',
                    key: 'InCreation'
                },
                {
                    type: 'route',
                    label: 'My Artworks',
                    key: 'MyArts'
                },
                {
                    type: 'target',
                    label: 'Gitbook',
                    key: 'Gitbook',
                    target:
                        'https://github-56.gitbook.io/diamond-launch-whitepaper/'
                }
            ]
        }
    },
    computed: {
        ...mapGetters({
            collapse: 'settings/collapse',
            device: 'settings/device'
        }),
        currentRoute() {
            return this.$route.name
        },
        classObj() {
            return {
                'vab-mobile': this.device === 'mobile',
                'vab-collapse': this.collapse
            }
        }
    },
    watch: {
        $route: {
            handler({ path, matched }) {
                matched[0].children.length > 1
                    ? (this.selectedKeys = [path])
                    : (this.selectedKeys = [matched[0].path])
                this.openKeys = [matched[0].path]
            },
            immediate: true
        }
    },
    methods: {
        ...mapActions({
            toggleDevice: 'settings/toggleDevice',
            handleFoldSideBar: 'settings/foldSideBar',
            toggleCollapse: 'settings/toggleCollapse'
        }),
        handleLink(route) {
            if (route.type === 'target') {
                window.open(route.target)
                return
            }
            this.$router.push({
                name: route.key
            })
        }
    }
}
</script>
<style lang="less">
.vab-layout-wrap {
    .vab-sider {
        // 移动端侧边栏
        position: fixed;
        left: 0;
        height: 100vh;
        overflow: auto;
        background-color: #FFFFFF;
        .vab-menu {
            border-right: none;
        }
        .logo {
            margin: 30px 0;
            text-align: center;
            > img {
                width: 60%;
            }
        }
    }
    .vab-menu-container {
        display: flex;
        justify-content: center;
        .vab-menu {
            width: max-content;
            border-bottom: none;
            .ant-menu-item-selected {
                color: inherit;
                //border-bottom: 2px solid transparent;
            }
            .ant-menu-item {
                margin: 0 10px;
                font-family: Inter-Semi Bold, Inter;
                &.active {
                    color: @primary-color;
                    &::after {
                        border-bottom:  2px solid @primary-color;
                    }
                }
            }
        }
    }
    .vab-layout {
        transition: all 0.2s;
    }
    .vab-collapse {
        .vab-logo .anticon + span {
            display: inline-block;
            max-width: 0;
            opacity: 0;
            transition: all 0.2s;
        }
        & + .vab-layout {
            padding-left: 81px;
            transition: all 0.2s;
        }
    }
    .vab-mask {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 998;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        background: #000;
        opacity: 0.5;
    }
    .vab-mobile {
        position: fixed !important;
        top: 0;
        z-index: 999;
        &.vab-collapse {
            width: 0 !important;
            min-width: 0 !important;
            max-width: 0 !important;
            * {
                display: none !important;
                width: 0 !important;
                min-width: 0 !important;
                max-width: 0 !important;
            }
            .ant-menu-item,
            .ant-menu-submenu {
                display: none !important;
                width: 0 !important;
                min-width: 0 !important;
                max-width: 0 !important;
            }
            & + .vab-layout {
                padding-left: 0px !important;
                transition: all 0.2s;
            }
        }
    }
    .vab-header {
        padding: 0;
        .ant-col + .ant-col {
            display: flex;
            justify-content: flex-end;
            padding: 0 @vab-padding;
        }
        .trigger {
            height: @vab-header-height;
            padding: 0 @vab-padding;
            font-size: 18px;
            line-height: @vab-header-height;
            cursor: pointer;
            transition: color 0.3s;
            &:hover {
                color: #1890ff;
            }
        }
    }
    footer {
        text-align: center;
        line-height: 200px;
        color: rgba(206, 216, 244, 0.4);
        font-size: 16px;
    }
}
</style>
