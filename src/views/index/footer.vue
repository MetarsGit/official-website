<template>
    <footer class="footer">
        <div class="nav">
            <img
                class="logo"
                src="@/assets/img/index/logo-w.png"
                alt="metars"
            />
            <div class="copyright">© METARS. {{ year }}</div>
        </div>
        <div class="contact">
            <ul class="list-inline">
                <li class="list-item" @click="scrollTarget('metars')">Home</li>
                <li class="list-item" @click="scrollTarget('generative')">
                    Solutions
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
                        href="https://metars-1.gitbook.io/metars-whitepaper/"
                        target="_blank"
                    >
                        Docs
                    </a>
                </li>
            </ul>
            <ul class="list">
                <li class="item">
                    <a href="https://medium.com/@MetarsGenesis" target="_blank">
                        <img
                            class="img"
                            src="../../assets/img/index/a7-ic-medium@2x.png"
                        />
                    </a>
                </li>
                <li class="item">
                    <a href="https://twitter.com/MetarsGenesis" target="_blank">
                        <img
                            class="img"
                            src="../../assets/img/index/a7-ic-tw@2x.png"
                        />
                    </a>
                </li>
                <li class="item">
                    <a href="https://t.me/MetarsGenesisGO" target="_blank">
                        <img
                            class="img"
                            src="../../assets/img/index/a7-ic-telegram@2x.png"
                        />
                    </a>
                </li>
                <li class="item">
                    <a href="mailto:hi@metars.io">
                        <img
                            class="img"
                            src="../../assets/img/index/a7-ic-em@2x.png"
                        />
                    </a>
                </li>
            </ul>
        </div>
    </footer>
    <a-back-top />
</template>

<script>
    export default {
        name: 'm-footer',

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
        display: flex;
        justify-content: space-between;
        padding: 60px 50px 120px;
        color: #ffffff;
        background: #000000;
        .nav {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 60px;
            .logo {
                width: 160px;
            }
        }

        .contact {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-end;
            .list-inline {
                display: flex;
                align-items: center;
                .list-item {
                    cursor: pointer;
                    margin-left: 32px;
                    font-size: 16px;
                    color: #ffffff;
                    transition: all 0.3s;
                    &.active,
                    &:not(.active):hover {
                        opacity: 0.7;
                    }
                    &:last-child {
                        margin-right: 0;
                    }
                }
            }
            .list {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                grid-gap: 36px;
                .item {
                    position: relative;
                    width: 40px;
                    height: 40px;
                    border: 1px solid #ffffff;
                    border-radius: 50%;
                    transition: all 0.3s;
                    &:last-child {
                        margin-right: 0;
                    }
                    &:hover {
                        opacity: 0.7;
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
            font-size: 14px;
        }
    }
    @media (max-width: 992px) {
        .footer {
            padding: 28px 40px 100px;
            .nav {
                gap: 30px;
                .logo {
                    width: 100px;
                }
            }
            .contact {
                .list-inline {
                    display: none;
                }
                .list {
                    gap: 16px;
                    .item {
                        width: 24px;
                        height: 24px;
                        .img {
                            width: 16px;
                            height: 14px;
                        }
                    }
                }
            }
            .copyright {
                font-size: 12px;
            }
        }
    }
</style>
