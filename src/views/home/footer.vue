<template>
    <footer class="footer container">
        <div class="nav">
            <img class="logo" src="../../assets/logo.png" alt="metars" />
            <ul class="list-inline">
                <li class="list-item" @click="scrollTarget('metars')">
                    What is METARS
                </li>
                <li class="list-item" @click="scrollTarget('generative')">
                    Generative AI x NFT
                </li>
                <li class="list-item" @click="scrollTarget('collective')">
                    Collective Creation x Token
                </li>
                <li class="list-item" @click="scrollTarget('tokenomics')">
                    Tokenomics
                </li>
                <li class="list-item" @click="scrollTarget('roadmap')">
                    Roadmap
                </li>
                <li class="list-item">
                    <a
                        class="list-item-link"
                        href="https://metars.gitbook.io/metars-white-paper/"
                        target="_blank"
                    >
                        Docs
                    </a>
                </li>
            </ul>
        </div>
        <div class="contact">
            <ul class="list">
                <li class="item">
                    <a href="https://medium.com/@MetarsGenesis" target="_blank">
                        <img
                            class="img"
                            src="../../assets/img/home/a7-ic-medium@2x.png"
                        />
                    </a>
                </li>
                <li class="item">
                    <a href="https://twitter.com/MetarsGenesis" target="_blank">
                        <img
                            class="img"
                            src="../../assets/img/home/a7-ic-tw@2x.png"
                        />
                    </a>
                </li>
                <li class="item">
                    <a href="https://t.me/MetarsGenesisGO" target="_blank">
                        <img
                            class="img"
                            src="../../assets/img/home/a7-ic-telegram@2x.png"
                        />
                    </a>
                </li>
                <li class="item">
                    <a href="mailto:hi@metars.io">
                        <img
                            class="img"
                            src="../../assets/img/home/a7-ic-em@2x.png"
                        />
                    </a>
                </li>
            </ul>
        </div>
        <div class="copyright">© METARS. {{ year }}</div>
    </footer>
    <a-back-top />
</template>

<script>
    export default {
        name: 'footer',

        methods: {
            scrollTarget(id) {
                window.document
                    .getElementById(id)
                    ?.scrollIntoView({ block: 'start', behavior: 'smooth' })
            }
        },
        data() {
            return {
                year: new Date().getFullYear()
            }
        }
    }
</script>

<style scoped lang="less">
    .footer {
        .nav {
            display: flex;
            justify-content: space-between;
            padding-top: 100px;
            padding-bottom: 64px;
            border-bottom: 1px solid #e5e7eb;
            .logo {
                width: 160px;
                height: 40px;
            }
            .list-inline {
                display: flex;
                align-items: center;
                .list-item {
                    cursor: pointer;
                    margin-right: 32px;
                    font-size: 16px;
                    font-family: Inter-Regular, Inter;

                    color: @text-color;
                    &.active,
                    &:not(.active):hover {
                        text-shadow: 0 0 0.65px #111;
                        color: #515151;
                    }
                    &:last-child {
                        margin-right: 0;
                    }
                }
            }
        }

        .contact {
            margin-top: 62px;
            .list {
                display: flex;
                align-items: center;
                justify-content: center;
                .item {
                    position: relative;
                    width: 40px;
                    height: 40px;
                    border: 1px solid #14171f;
                    border-radius: 50%;
                    margin-right: 36px;
                    &:last-child {
                        margin-right: 0;
                    }
                    .img {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 28px;
                        height: 24px;
                    }
                }
            }
        }
        .copyright {
            font-size: 15px;
            text-align: center;
            padding-top: 50px;
            padding-bottom: 94px;
        }
    }
</style>
