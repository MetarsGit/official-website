<template>
    <div class="vab-result">
        <div v-if="isLoading" class="loading"><a-spin /></div>
        <div v-else-if="isEmpty" class="empty">
            <a-empty :image="simpleImage">
                <template #description>
                    <span>
                        {{ emptyText }}
                    </span>
                </template>
            </a-empty>
        </div>
        <slot v-else></slot>
    </div>
</template>

<script>
    import { Empty } from 'ant-design-vue'
    export default {
        name: 'Result',
        props: {
            isLoading: {
                type: Boolean,
                default: false
            },
            isEmpty: {
                type: Boolean,
                default: false
            },
            emptyText: {
                type: String,
                default: 'No Data'
            }
        },
        data() {
            return {
                simpleImage: Empty.PRESENTED_IMAGE_SIMPLE
            }
        }
    }
</script>

<style scoped lang="less">
    .vab-result {
        //display: flex;
        min-height: 200px;
        .loading,
        .empty {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 60px 0;
            width: 100%;
        }
        .empty {
            font-size: 16px;
        }
    }
</style>
