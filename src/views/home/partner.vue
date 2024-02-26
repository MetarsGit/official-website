<template>
    <div class="comp-partner">
        <div class="container">
            <p class="title">Investment and partners</p>
            <!--            <ul class="list">-->
            <!--                <li class="item" v-for="item in partners" :key="item">-->
            <!--                    <div class="logo-wrap">-->
            <!--                        <img-->
            <!--                            class="logo"-->
            <!--                            :src="require('@/assets/img/partner/' + item)"-->
            <!--                        />-->
            <!--                    </div>-->
            <!--                </li>-->
            <!--            </ul>-->
        </div>
    </div>
</template>

<script>
    import { partners } from './const'
    export default {
        data() {
            return {
                partners
            }
        }
    }
</script>

<style lang="less" scoped>
    .comp-partner {
        padding-top: 105px;
        padding-bottom: 99px;
        background: url(../../assets/img/home/a8-bg.png) no-repeat;
        background-position: center top;
        background-size: 100%;
        text-align: center;
        background-color: #f9f9f9;
        .title {
            font-size: 90px;
            font-weight: 600;
        }
        .list {
            margin-top: 48px;
            display: flex;
            flex-wrap: wrap;
            .item {
                width: 20%;
                margin-bottom: 48px;
                padding: 0 16px;
                .logo-wrap {
                    background: #fff;
                    box-shadow: 0px 2px 16px -1px rgba(0, 0, 0, 0.08);
                    border-radius: 16px 16px 16px 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 120px;
                }
                .logo {
                    display: inline-block;
                    max-width: 60%;
                    max-height: 60%;
                    object-fit: contain;
                }
            }
        }
        @media (max-width: 992px) {
            padding-top: 72px;
            .title {
                font-size: 48px;
            }
            .list {
                .item {
                    width: 25%;
                    margin-bottom: 24px;
                    padding: 0 12px;
                    .logo-wrap {
                        height: 100px;
                    }
                    .logo {
                        max-width: 70%;
                        max-height: 70%;
                    }
                }
            }
        }
        @media (max-width: 764px) {
            .list {
                .item {
                    width: 33%;
                    margin-bottom: 16px;
                    padding: 0 8px;
                    .logo-wrap {
                        height: 80px;
                    }
                    .logo {
                        max-width: 80%;
                        max-height: 80%;
                    }
                }
            }
        }
    }
</style>
