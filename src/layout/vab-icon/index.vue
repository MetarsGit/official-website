<template>
    <svg-icon :icon-class="icon" :class-name="icon"></svg-icon>
</template>

<script>
    export default {
        name: 'VabIcon',
        props: {
            icon: {
                type: String,
                required: true
            }
        }
    }
</script>

<style lang="less" scoped>
    .svg-icon {
        font-size: 18px;
        vertical-align: -1px;
    }
</style>
