<template>
    <div class="comp-partner">
        <div class="container">
            <h3 class="title">Investors and Partners</h3>
            <p class="desc">
                United with our investors and partners, we're committed to
                excellence, building powerful products and a robust community
                through the evolution of AIGC.
            </p>
            <ul class="list">
                <li v-for="item in partners" :key="item">
                    <div class="logo-wrap">
                        <img
                            class="logo"
                            :src="require('@/assets/img/partner/' + item)"
                        />
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { partners } from '../const'
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
        padding-top: 67px;
        padding-bottom: 97px;
        background-position: center top;
        background-size: 100%;
        text-align: center;
        background-color: #ffffff;
        .title {
            margin-bottom: 20px;
            font-size: 60px;
            font-weight: 600;
        }
        .desc {
            margin: 0 auto;
            margin-bottom: 60px;
            width: 90%;
        }
        .list {
            display: grid;
            grid-gap: 42px 26px;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
            .logo-wrap {
                background: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 108px;
                border: 1px solid #000000;
            }
            .logo {
                display: inline-block;
                max-width: 70%;
                max-height: 60%;
                object-fit: contain;
            }
        }
        @media (max-width: 992px) {
            padding-top: 72px;
            .title {
                font-size: 48px;
            }
            .list {
                grid-template-columns: 1fr 1fr 1fr;
                .logo {
                    max-width: 70%;
                    max-height: 70%;
                }
            }
        }
        @media (max-width: 764px) {
            .list {
                grid-template-columns: 1fr 1fr;
                .logo {
                    max-width: 80%;
                    max-height: 80%;
                }
            }
        }
    }
</style>
