<template>
    <div class="comp-confirm" v-if="isShow">
        <div class="layer" @click="onHide"></div>
        <div class="content">
            <div class="header">
                <p class="cancel">
                    <img
                        src="../../assets/img/home/announce/ic-close.png"
                        class="icon"
                        @click="onHide"
                    />
                </p>
                <p class="title">
                    <i class="icon"></i>
                    <img
                        src="../../assets/img/home/announce/ic-an.png"
                        class="icon"
                        @click="onHide"
                    />
                    <span class="text">Announcement</span>
                </p>
            </div>
            <div class="body">
                The Metars platform is committed to complying with all relevant
                laws and regulations in various countries and regions. Due to
                the specific regulations on encrypted assets in certain
                countries, such as Afghanistan, Northern Mariana Islands, Puerto
                Rico, Guam, Syria, Mainland China, Democratic Republic of Congo,
                Cuba, Iran, Iraq, Japan, North Korea, Sudan, United States of
                America, and Zimbabwe, the platform is currently unable to
                provide services to users in these countries. We apologize for
                any inconvenience caused.
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        // props: ["isShow"],
        data() {
            return {
                isShow: false
            }
        },

        mounted() {
            setTimeout(() => {
                this.isShow = true
            }, 500)
        },

        methods: {
            onHide() {
                this.isShow = false
                // this.$emit("update:isShow", false);
            }
        }
    }
</script>

<style lang="less" scoped>
    .layer {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.4);
    }
    .comp-confirm {
        position: relative;
        z-index: 999;
        .content {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            width: 510px;
            background: #fff;
            border-radius: 16px;
            color: #14171f;
            background-image: url(../../assets/img/home/announce/img-bg.png);
            background-size: 386px 382px;
            background-position: 61px 5px;
            background-repeat: no-repeat;

            .header {
                .cancel {
                    padding-top: 20px;
                    padding-right: 20px;
                    text-align: right;
                    .icon {
                        display: inline-block;
                        width: 20px;
                        height: 20px;
                        cursor: pointer;
                    }
                }
                .title {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 38px;
                    margin-top: 8px;
                    .icon {
                        display: inline-block;
                        width: 28px;
                        height: 22px;
                        margin-right: 10px;
                    }
                    .text {
                        font-size: 24px;
                        line-height: 38px;
                        font-family: Inter-Semi Bold, Inter;
                        font-weight: bold;
                    }
                }
            }

            .body {
                margin: 24px 32px;
                font-size: 16px;
                font-family: Inter-Regular, Inter;
                line-height: 26px;
                text-align: center;
            }
        }
    }
</style>
