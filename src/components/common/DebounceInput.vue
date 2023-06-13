<template>
    <a-input v-bind="$attrs" v-model:value="value" @input="debounceInput">
        <template #suffix>
            <slot name="suffix"></slot>
        </template>
    </a-input>
</template>

<script>
    export default {
        name: 'debounce-input',
        data() {
            return {
                value: '',
                timeout: null
            }
        },
        methods: {
            debounceInput() {
                if (this.timeout !== null) clearTimeout(this.timeout)
                this.timeout = setTimeout(() => {
                    this.$emit('inputChange', this.value)
                }, 500)
            }
        }
    }
</script>

<style scoped></style>
