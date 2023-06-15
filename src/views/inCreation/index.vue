<template>
    <div class="inCreation">
        <div class="banner">
            <div class="slogan">Unleash the power of collective creativity</div>
        </div>
        <div class="list container">
            <in-creation-list></in-creation-list>
        </div>
    </div>
</template>

<script>
    import InCreationList from '@/components/InCreationList/index.vue'
    export default {
        name: 'index',
        components: { InCreationList }
    }
</script>

<style scoped lang="less">
    .inCreation {
        .banner {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 320px;
            background: url('../../assets/img/inCreation/banner.png') center
                no-repeat;
            background-size: 100% 100%;
            .slogan {
                margin-top: -68px;
                font-size: 48px;
                font-family: Inter-Semi Bold, Inter;
            }
        }
        .list {
            margin-top: -68px;
        }
    }
</style>
