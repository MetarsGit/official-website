<template>
    <span class="share" @click="show">
        Generate a tweet for me and I’ll share!
    </span>
    <a-modal
        :visible="isShow"
        width="509px"
        :footer="null"
        :closable="true"
        wrapClassName="share-modal"
        :maskClosable="true"
        @cancel="hide"
    >
        <div class="modal-detail">
            <div class="header">Generate a tweet for me</div>
            <div class="body" id="shareContent">
                I'm looking to create a virtual art project on
                {{ verifyText }} with my wallet {{ account }} and I'd love for
                you to join me. Let's collaborate and create something amazing
                together. Retweet and let's get started! #virtualart
                #collaboration #ArtiFuse
            </div>
            <div class="footer">
                <span class="btn" @click="copyClick">Copy and share</span>
            </div>
            <input class="input" id="shareCopyText" v-model="copyText" />
        </div>
    </a-modal>
</template>

<script>
    import { mapState, mapGetters } from 'vuex'
    export default {
        computed: {
            ...mapState('art', ['artId']),
            ...mapGetters('web3', ['defaultAccount']),
            ...mapGetters('art', ['verifyText']),
            account() {
                return this.defaultAccount?.slice(-6) || ''
            }
        },
        data() {
            return {
                isShow: false,
                copyText: ''
            }
        },
        methods: {
            show() {
                if (!this.defaultAccount) {
                    this.$message.warn('Please connect the wallet.')
                    return
                }
                this.isShow = true
            },
            hide() {
                this.isShow = false
            },
            copyClick() {
                let text = document.getElementById('shareContent').innerText
                var input = document.getElementById('shareCopyText')
                this.copyText = text
                setTimeout(() => {
                    input.select()
                    document.execCommand('copy')
                    this.$message.success('copy success')
                    this.hide()
                }, 20)
            }
        }
    }
</script>

<style lang="less">
    .share {
        flex: 1;
        color: #6a57e3;
        cursor: pointer;
        &:hover {
            text-decoration: underline;
        }
    }
    .share-modal {
        .ant-modal {
            top: 25%;
        }
        .ant-modal-content {
            border-radius: 16px;
        }
        .ant-modal-body {
            padding: 32px;
        }
        .modal-detail {
            .header {
                text-align: center;
                font-size: 24px;
                font-family: Inter-Semi Bold, Inter;
                font-weight: normal;
                line-height: 38px;
            }
            .body {
                margin-top: 25px;
                font-size: 16px;
                font-family: Inter-Regular, Inter;
                font-weight: 400;
                color: #14171f;
                line-height: 26px;
            }
            .footer {
                text-align: center;
                margin-top: 43px;
                .btn {
                    display: inline-block;
                    width: 268px;
                    height: 48px;
                    line-height: 48px;
                    background: #14171f;
                    border-radius: 60px;
                    text-align: center;
                    color: #fff;
                    font-size: 16px;
                    font-weight: bold;
                    cursor: pointer;
                }
            }
        }
        .input {
            position: absolute;
            height: 0;
            border: none;
            opacity: 0;
        }
    }
</style>
