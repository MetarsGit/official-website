<template>
    <div class="vab-logo">
        <a @click="goHome">
            <img src="../../assets/logo.png" alt="" width="116" />
        </a>
        <!--        <img src="../../assets/logo@4x.png" alt="" width="48" />-->
        <!--        <span class="title">-->
        <!--            <img src="../../assets/img/home/logo-text.png" alt="" />-->
        <!--        </span>-->
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'VabLogo',
        computed: {
            ...mapGetters({
                logo: 'settings/logo',
                title: 'settings/title'
            })
        },
        methods: {
            goHome() {
                this.$router.push({
                    name: 'Index'
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    .vab-logo {
        display: flex;
        align-items: center;
        padding-left: @vab-padding;
        height: @vab-header-height;
        overflow: hidden;
        font-size: 15px;
        color: #fff;
        text-overflow: ellipsis;
        white-space: nowrap;
        background-color: @menu-bg;
        .title {
            margin-left: 8px;
            width: 80px;
            > img {
                width: 100%;
            }
        }
    }
</style>
