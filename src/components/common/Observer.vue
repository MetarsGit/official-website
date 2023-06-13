<template>
    <div class="observer" />
</template>

<script>
    export default {
        name: 'Observer',
        data() {
            return {
                observer: null
            }
        },
        mounted() {
            const options = this.options || {}
            this.observer = new IntersectionObserver(([entry]) => {
                if (entry && entry.isIntersecting) {
                    this.$emit('intersect')
                }
            }, options)
            this.observer.observe(this.$el)
        },
        unmounted() {
            this.observer.disconnect()
        }
    }
</script>

<style scoped>
    .observer {
        height: 1px;
    }
</style>
