<template>
    <a-modal
        :visible="isShow"
        width="509px"
        :footer="null"
        :closable="false"
        wrapClassName="mint-modal"
        :maskClosable="true"
    >
        <div class="modal-detail">
            <div class="header">Mint & Claim Success!</div>
            <div class="body">
                We just wanted to take a moment to say a huge thank you for
                using our platform to generate your awesome artwork! We're
                thrilled to have been a part of your creative journey and can't
                wait to see what you come up with next. Keep up the great work!
            </div>
            <div class="footer">
                <span class="btn" @click="hide">Return</span>
            </div>
        </div>
    </a-modal>
</template>

<script>
    export default {
        props: ['isShow'],
        methods: {
            hide() {
                this.$emit('update:isShow', false)
            }
        }
    }
</script>

<style lang="less">
    .mint-modal {
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
    }
</style>
