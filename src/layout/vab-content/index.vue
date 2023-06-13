<template>
    <a-layout-content class="vab-content">
        <router-view v-slot="{ Component }">
            <transition mode="out-in" name="fade-transform">
                <component :is="Component" />
            </transition>
        </router-view>
    </a-layout-content>
</template>

<script>
    export default {
        name: 'VabContent',
        data() {
            return {}
        },
        watch: {
            $route: {
                handler() {
                    if ('mobile' === this.device) {
                        this.$store.dispatch('settings/foldSideBar')
                    }
                },
                immediate: true
            }
        }
    }
</script>

<style lang="less">
    .fade-transform-leave-active,
    .fade-transform-enter-active {
        transition: all 0.2s;
    }

    .fade-transform-enter {
        opacity: 0;
        transform: translateX(30px);
    }

    .fade-transform-leave-to {
        opacity: 0;
        transform: translateX(-30px);
    }

    .vab-content {
        min-height: calc(100vh - @vab-header-height - @vab-padding) !important;
        padding: 0 @vab-padding;
        padding-bottom: 40px;
        margin: @vab-margin;
        background: #fff;
        &.Statistics {
            background: #1a1a20;
            color: #626262;
        }
        .error-container {
            height: calc(
                100vh - @vab-header-height - @vab-padding - @vab-padding -
                    @vab-padding - @vab-padding - @vab-padding - @vab-margin
            ) !important;
        }
    }
</style>
