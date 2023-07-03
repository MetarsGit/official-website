<template>
    <nav class="navbar container">
        <a href="#" class="navbar-brand">
            <img class="logo" src="../../assets/logo.png" alt="metars" />
        </a>
        <div class="navbar-cont">
            <div class="navbar-toggle" @click="slideDown">
                <div class="navbar-toggle-icon"></div>
                <div class="navbar-toggle-icon"></div>
                <div class="navbar-toggle-icon"></div>
            </div>
            <div class="navbar-collapse" :class="{ slideDown: navSlideDown }">
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
                            href="https://metars-1.gitbook.io/metars-whitepaper/"
                            target="_blank"
                        >
                            Docs
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <span class="btn-launch" @click="launchApp">Launch Application</span>
    </nav>
</template>

<script>
    export default {
        name: 'navbar',

        data() {
            return {
                navSlideDown: false
            }
        },

        methods: {
            scrollTarget(id) {
                window.document
                    .getElementById(id)
                    ?.scrollIntoView({ block: 'start', behavior: 'smooth' })
            },
            slideDown() {
                this.navSlideDown = !this.navSlideDown
            },
            launchApp() {
                this.$router.push('/artList')
            }
        }
    }
</script>

<style scoped lang="less">
    .navbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 80px;
        transition: all 0.3s ease;
        .navbar-brand .logo {
            width: 160px;
            height: 40px;
        }
        .navbar-cont {
        }

        .navbar-toggle {
            display: none;
        }
        .navbar-collapse {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .list-inline {
            display: flex;
            align-items: center;
            .list-item {
                cursor: pointer;
                margin-right: 32px;
                font-size: 16px;
                font-family: Inter-Semi Bold, Inter;

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

        .btn-launch {
            width: 197px;
            height: 39px;
            line-height: 39px;
            background: #14171f;
            border-radius: 100px;
            color: #fff;
            text-align: center;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            &:hover {
                background: #515151;
            }
        }
    }
    @media (max-width: 992px) {
        .navbar {
            .navbar-cont {
                padding: 0 15px;
            }
            .navbar-toggle {
                display: block;
                width: 36px;
                height: 36px;
                padding: 8px;
                border: 1px solid @primary-color;
                border-radius: 5px;
                position: relative;
                cursor: pointer;
                transition: all 0.3s ease;
                &:hover {
                    background: @primary-color;
                    .navbar-toggle-icon {
                        background: #fff;
                    }
                }
                .navbar-toggle-icon {
                    width: 100%;
                    height: 3px;
                    background: @primary-color;
                    transition: all 0.3s ease;
                    &:not(:last-child) {
                        margin-bottom: 3px;
                    }
                }
            }
            .navbar-collapse {
                flex-basis: 100%;
                display: none;
                background: #f8f9fa;
                &.slideDown {
                    display: block;
                    position: absolute;
                    right: 0;
                    top: 60px;
                }
                .list-inline {
                    display: flex;
                    flex-direction: column;
                    .list-item {
                        padding: 6px 8px;
                        margin-right: 0;
                    }
                }
            }
        }
    }
</style>
