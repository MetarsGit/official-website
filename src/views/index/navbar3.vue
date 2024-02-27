<template>
    <nav class="light">
        <header class="header">
            <a href="#" class="logo-wrap">
                <img class="logo" src="../../assets/logo.png" alt="metars" />
                <img
                    class="logo logo-mobile"
                    src="../../assets/logo-white.png"
                    alt="metars"
                />
            </a>
            <!--web端-->
            <ul class="nav-list-wrap">
                <li
                    v-for="item in navList"
                    :key="item.key"
                    :class="{
                        'active-nav': activeKey === item.key
                    }"
                    class="nav__list-item"
                    @click="scrollTo(item)"
                >
                    <a v-if="item.href" :href="item.href" target="_blank">
                        {{ item.label }}
                    </a>
                    <a v-else href="#">
                        {{ item.label }}
                    </a>
                </li>
            </ul>
            <div class="menu-icon">
                <span class="menu-icon__line menu-icon__line-left"></span>
                <span class="menu-icon__line"></span>
                <span class="menu-icon__line menu-icon__line-right"></span>
            </div>
        </header>

        <!--移动端-->
        <div class="nav">
            <div class="nav__content">
                <ul class="nav__list">
                    <li
                        v-for="item in navList"
                        :key="item.key"
                        :class="{ 'active-nav': activeKey === item.key }"
                        class="nav__list-item"
                        @click="target(item)"
                    >
                        <a
                            class="link"
                            v-if="item.href"
                            :href="item.href"
                            target="_blank"
                        >
                            {{ item.label }}
                        </a>
                        <a class="link" v-else href="#">
                            {{ item.label }}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>
    export default {
        data() {
            return {
                activeKey: 'metars',
                navList: [
                    {
                        key: 'metars',
                        label: 'Home'
                    },
                    {
                        key: 'generative',
                        label: 'Solutions'
                    },
                    {
                        key: 'tokenomics',
                        label: 'Tokenomics'
                    },
                    {
                        key: 'partners',
                        label: 'Partners'
                    },
                    {
                        key: 'roadmap',
                        label: 'Roadmap'
                    },
                    {
                        key: 'docs',
                        label: 'Docs',
                        href: 'https://metars-1.gitbook.io/metars-whitepaper/'
                    }
                ]
            }
        },
        mounted() {
            this.initData()
        },
        methods: {
            initData() {
                const body = document.querySelector('body')
                const menu = document.querySelector('.menu-icon')
                menu.addEventListener('click', () => {
                    this.toggleClass(body, 'nav-active')
                })
            },
            toggleClass(element, stringClass) {
                if (element.classList.contains(stringClass))
                    element.classList.remove(stringClass)
                else element.classList.add(stringClass)
            },
            scrollTo(item) {
                const { key, href } = item
                if (href) {
                    return
                }
                window.document
                    .getElementById(key)
                    ?.scrollIntoView({ block: 'start', behavior: 'smooth' })
            },
            target(item) {
                const body = document.querySelector('body')
                this.toggleClass(body, 'nav-active')
                this.scrollTo(item)
            },
            launchApp() {
                this.$router.push('/artList')
            }
        }
    }
</script>
<style lang="less">
    body.nav-active {
        overflow: hidden;
    }
</style>
<style scoped lang="less">
    .header {
        position: absolute;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 80px;
        width: 100%;
        padding: 0 48px;
        z-index: 100;
        background-color: rgba(255, 255, 255, 1);
    }

    .nav-list-wrap {
        display: flex;
        gap: 48px;
        font-family: Amiri;
        font-weight: 600;
    }
    .logo-wrap {
        cursor: pointer;
        .logo {
            width: 160px;
            height: 40px;
        }
        .logo-mobile {
            display: none;
            width: 108px;
            height: 33px;
        }
    }

    .menu-icon {
        position: relative;
        display: none;
        height: 20px;
        width: 20px;
        cursor: pointer;
        z-index: 2;
    }
    .menu-icon__line {
        display: block;
        height: 2px;
        width: 20px;
        margin-bottom: 5px;
        background-color: #fff;
        transition: transform 0.2s ease;
    }

    @media (max-width: 992px) {
        .header {
            position: absolute;
            padding: 0 24px;
            background-color: rgba(255, 255, 255, 0);
            .logo {
                display: none;
            }
            .logo-mobile {
                display: inline-block;
            }
            .nav-list-wrap {
                display: none;
            }
            .menu-icon {
                display: inline-block;
            }
        }
    }

    .nav {
        position: fixed;
        z-index: 98;
    }
    .nav:before {
        content: '';
        position: fixed;
        width: 100vw;
        height: 360px;
        top: 0;
        background: rgb(0, 0, 0);
        border-bottom-left-radius: 200%;
        z-index: -1;
        transition: transform cubic-bezier(0.77, 0, 0.175, 1) 0.5s,
            border-radius linear 0.5s;
        transform: translateX(100%) translateY(-100%);
    }

    .nav__content {
        position: fixed;
        top: 0;
        margin-top: 80px;
        width: 100%;
        visibility: hidden;
        text-align: center;
    }
    .nav__list {
        padding: 0;
        margin: 0;
        z-index: 2;
        .nav__list-item {
            display: block;
            opacity: 0;
            color: #fff;
            font-size: 16px;
            line-height: 2.4;
            transition: opacity 0.2s ease;
            .link {
                color: rgba(255, 255, 255, 0.8);
                font-weight: 500;
            }

            &.active-nav .link {
                color: rgba(255, 255, 255, 1);
            }
        }
    }

    .nav-active {
        .menu-icon__line {
            transform: translate(0px, 0px) rotate(-45deg);
        }
        .menu-icon__line-left {
            transform: translate(0, 7px) rotate(45deg);
        }
        .menu-icon__line-right {
            transform: translate(0, -6.5px) rotate(45deg);
        }

        .nav {
            &::before {
                background: rgba(0, 0, 0, 0.9);
                transform: translateX(0%) translateY(0%);
                border-radius: 0;
                transition-delay: 0s;
            }
            .nav__content {
                visibility: visible;
            }
            .nav__list-item {
                opacity: 1;
                transform: translateX(0%);
                transition: opacity 0.3s ease, color 0.3s ease;
                transition-delay: 0.4s;
            }
        }
    }
</style>
