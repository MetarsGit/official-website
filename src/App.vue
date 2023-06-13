<template>
    <router-view />
</template>
<script>
    import { mapActions } from 'vuex'

    export default {
        beforeMount() {
            window.addEventListener('resize', this.handleLayouts)
        },
        beforeUnmount() {
            window.removeEventListener('resize', this.handleLayouts)
        },
        mounted() {
            this.handleLayouts()
        },
        methods: {
            ...mapActions({
                toggleDevice: 'settings/toggleDevice'
            }),
            handleLayouts() {
                const width = document.body.getBoundingClientRect().width
                if (this.width !== width) {
                    const isMobile = width - 1 < 992
                    this.toggleDevice(isMobile ? 'mobile' : 'desktop')
                    this.width = width
                }
            }
        }
    }
</script>
<style lang="less">
    .chart-tooltip {
        position: absolute;
        font-size: 14px;
        color: #000;
        font-weight: 900;
        height: auto;
        width: auto;
    }
</style>
