<template>
    <div class="vab-tabs" v-if="tabActive">
        <div class="vab-tabs-panel">
            {{ tabActive }}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'VabTabs',
        components: {},
        data() {
            return {
                affixTabs: [],
                tabActive: this.$route.meta.tab,
                created: false
            }
        },
        watch: {
            $route(to) {
                this.tabActive = to.meta.tab
            }
        }
    }
</script>
<style lang="less">
    .vab-tabs {
        padding: 0 @vab-padding;
        background: #ffffff;
        &-panel {
            display: flex;
            align-items: center;
            width: 100%;
            height: @vab-header-height;
            font-weight: 500;
            font-size: 24px;
        }
    }
</style>
