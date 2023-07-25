<template>
    <div class="content">
        <input
            class="input"
            v-model="verifyText"
            type="text"
            ref="inviteLink"
            :readonly="true"
        />
        <div class="detail">
            <div class="note">
                {{ note }}
            </div>
            <span class="btn" @click="copy">Copy</span>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        props: ['type'],
        computed: {
            ...mapGetters('art', ['verifyText']),
            note() {
                if (this.type === 'publish') {
                    return 'Get more likes to get generate permissions.'
                } else {
                    return 'Invite others to collaborate on production together.'
                }
            }
        },
        data() {
            return {
                copyText: ''
            }
        },
        methods: {
            copy() {
                let input = this.$refs.inviteLink
                setTimeout(() => {
                    input.select()
                    document.execCommand('copy')
                    this.$message.success('copy success')
                }, 20)
            }
        }
    }
</script>

<style lang="less"></style>
