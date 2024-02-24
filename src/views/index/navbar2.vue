<template>
    <nav class="light">
        <header class="cd-header container">
            <div class="header-wrapper">
                <div class="logo-wrap">
                    <a href="#">
                        <img
                            class="logo"
                            src="../../assets/logo.png"
                            alt="metars"
                        />
                    </a>
                </div>
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
                <div class="nav-but-wrap">
                    <div class="menu-icon">
                        <span
                            class="menu-icon__line menu-icon__line-left"
                        ></span>
                        <span class="menu-icon__line"></span>
                        <span
                            class="menu-icon__line menu-icon__line-right"
                        ></span>
                    </div>
                </div>
                <span class="nav-btn" @click="launchApp">
                    Launch Application
                </span>
            </div>
        </header>

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
                        <a v-if="item.href" :href="item.href" target="_blank">
                            {{ item.label }}
                        </a>
                        <a v-else href="#">
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
    @media (max-width: 992px) {
        .header-wrapper {
            .nav-list-wrap {
                display: none;
            }
            .nav-but-wrap {
                display: inline-block;
            }
            .nav-btn {
                display: none;
            }
        }
    }
    .cd-header {
        position: relative;
        top: 0;
        left: 0;
        z-index: 100;
        height: 80px;
    }
    .header-wrapper {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
    }
    .nav-btn {
        width: 197px;
        height: 39px;
        line-height: 39px;
        background: #14171f;
        border-radius: 100px;
        color: #fff;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
        &:hover {
            background: #515151;
        }
    }
    .nav-list-wrap {
        display: flex;
        gap: 16px;
        font-weight: 600;
    }
    .logo-wrap {
        display: block;
        cursor: pointer;
    }
    .logo-wrap a {
        cursor: pointer;
    }
    .logo-wrap a:hover {
        opacity: 0.9;
    }
    .logo-wrap a .logo {
        width: 160px;
        height: 40px;
    }
    .nav-but-wrap {
        position: relative;
        display: none;
        transition: all 0.3s ease-out;
    }
    .menu-icon {
        height: 30px;
        width: 30px;
        position: relative;
        z-index: 2;
        cursor: pointer;
        display: block;
    }
    .menu-icon__line {
        height: 2px;
        width: 30px;
        display: block;
        background-color: #fff;
        margin-bottom: 7px;
        cursor: pointer;
        -webkit-transition: background-color 0.5s ease,
            -webkit-transform 0.2s ease;
        transition: background-color 0.5s ease, -webkit-transform 0.2s ease;
        transition: transform 0.2s ease, background-color 0.5s ease;
        transition: transform 0.2s ease, background-color 0.5s ease,
            -webkit-transform 0.2s ease;
    }
    .menu-icon__line-left {
        width: 16.5px;
        -webkit-transition: all 200ms linear;
        transition: all 200ms linear;
    }
    .menu-icon__line-right {
        width: 16.5px;
        float: right;
        -webkit-transition: all 200ms linear;
        -moz-transition: all 200ms linear;
        -o-transition: all 200ms linear;
        -ms-transition: all 200ms linear;
        transition: all 200ms linear;
    }
    .menu-icon:hover .menu-icon__line-left,
    .menu-icon:hover .menu-icon__line-right {
        width: 30px;
    }
    .nav {
        position: fixed;
        z-index: 98;
    }
    .nav:before,
    .nav:after {
        content: '';
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        background: rgba(20, 21, 26, 0.6);
        border-bottom-left-radius: 200%;
        z-index: -1;
        -webkit-transition: -webkit-transform cubic-bezier(0.77, 0, 0.175, 1)
                0.6s,
            border-radius linear 0.8s;
        transition: -webkit-transform cubic-bezier(0.77, 0, 0.175, 1) 0.6s,
            border-radius linear 0.8s;
        transition: transform cubic-bezier(0.77, 0, 0.175, 1) 0.6s,
            border-radius linear 0.8s;
        transition: transform cubic-bezier(0.77, 0, 0.175, 1) 0.6s,
            -webkit-transform cubic-bezier(0.77, 0, 0.175, 1) 0.6s,
            border-radius linear 0.8s;
        -webkit-transform: translateX(100%) translateY(-100%);
        transform: translateX(100%) translateY(-100%);
    }
    .nav:after {
        background: rgba(9, 9, 12, 1);
        -webkit-transition-delay: 0s;
        transition-delay: 0s;
    }
    .nav:before {
        -webkit-transition-delay: 0.2s;
        transition-delay: 0.2s;
    }
    .nav__content {
        position: fixed;
        visibility: hidden;
        top: 50%;
        margin-top: 20px;
        -webkit-transform: translate(0%, -50%);
        transform: translate(0%, -50%);
        width: 100%;
        text-align: center;
    }
    .nav__list {
        position: relative;
        padding: 0;
        margin: 0;
        z-index: 2;
        .nav__list-item {
            position: relative;
            display: block;
            -webkit-transition-delay: 0.8s;
            transition-delay: 0.8s;
            opacity: 0;
            text-align: center;
            color: #fff;
            overflow: hidden;
            font-size: 5vh;
            font-weight: 900;
            line-height: 1.15;
            letter-spacing: 3px;
            -webkit-transform: translate(100px, 0%);
            transform: translate(100px, 0%);
            -webkit-transition: opacity 0.2s ease, -webkit-transform 0.3s ease;
            transition: opacity 0.2s ease, -webkit-transform 0.3s ease;
            transition: opacity 0.2s ease, transform 0.3s ease;
            transition: opacity 0.2s ease, transform 0.3s ease,
                -webkit-transform 0.3s ease;
            margin-top: 0;
            margin-bottom: 0;
            a {
                position: relative;
                text-decoration: none;
                color: rgba(255, 255, 255, 0.6);
                overflow: hidden;
                cursor: pointer;
                padding-left: 5px;
                padding-right: 5px;
                font-weight: 900;
                z-index: 2;
                display: inline-block;
                text-transform: uppercase;
                -webkit-transition: all 200ms linear;
                transition: all 200ms linear;
                &:after {
                    position: absolute;
                    content: '';
                    top: 50%;
                    margin-top: -2px;
                    left: 50%;
                    width: 0;
                    height: 0;
                    opacity: 0;
                    background-color: #8167a9;
                    z-index: 1;
                    -webkit-transition: all 200ms linear;
                    transition: all 200ms linear;
                }
                &:hover:after {
                    height: 4px;
                    opacity: 1;
                    left: 0;
                    width: 100%;
                }
                &:hover {
                    color: rgba(255, 255, 255, 1);
                }
            }
            &.active-nav a {
                color: rgba(255, 255, 255, 1);
                &:after {
                    height: 4px;
                    opacity: 1;
                    left: 0;
                    width: 100%;
                }
            }
        }
    }

    body.nav-active .nav__content {
        visibility: visible;
    }
    body.nav-active .menu-icon__line {
        background-color: #fff;
        -webkit-transform: translate(0px, 0px) rotate(-45deg);
        transform: translate(0px, 0px) rotate(-45deg);
    }
    body.nav-active .menu-icon__line-left {
        width: 15px;
        -webkit-transform: translate(2px, 4px) rotate(45deg);
        transform: translate(2px, 4px) rotate(45deg);
    }
    body.nav-active .menu-icon__line-right {
        width: 15px;
        float: right;
        -webkit-transform: translate(-3px, -3.5px) rotate(45deg);
        transform: translate(-3px, -3.5px) rotate(45deg);
    }
    body.nav-active .menu-icon:hover .menu-icon__line-left,
    body.nav-active .menu-icon:hover .menu-icon__line-right {
        width: 15px;
    }
    body.nav-active .nav {
        visibility: visible;
    }
    body.nav-active .nav:before,
    body.nav-active .nav:after {
        -webkit-transform: translateX(0%) translateY(0%);
        transform: translateX(0%) translateY(0%);
        border-radius: 0;
    }
    body.nav-active .nav:after {
        -webkit-transition-delay: 0.1s;
        transition-delay: 0.1s;
    }
    body.nav-active .nav:before {
        -webkit-transition-delay: 0s;
        transition-delay: 0s;
    }
    body.nav-active .nav__list-item {
        opacity: 1;
        -webkit-transform: translateX(0%);
        transform: translateX(0%);
        -webkit-transition: opacity 0.3s ease, color 0.3s ease,
            -webkit-transform 0.3s ease;
        transition: opacity 0.3s ease, color 0.3s ease,
            -webkit-transform 0.3s ease;
        transition: opacity 0.3s ease, transform 0.3s ease, color 0.3s ease;
        transition: opacity 0.3s ease, transform 0.3s ease, color 0.3s ease,
            -webkit-transform 0.3s ease;
        &:nth-child(0) {
            -webkit-transition-delay: 0.7s;
            transition-delay: 0.7s;
        }
        &:nth-child(1) {
            -webkit-transition-delay: 0.8s;
            transition-delay: 0.8s;
        }
        &:nth-child(2) {
            -webkit-transition-delay: 0.9s;
            transition-delay: 0.9s;
        }
        &:nth-child(3) {
            -webkit-transition-delay: 1s;
            transition-delay: 1s;
        }
        &:nth-child(4) {
            -webkit-transition-delay: 1.1s;
            transition-delay: 1.1s;
        }
        &:nth-child(5) {
            -webkit-transition-delay: 1.2s;
            transition-delay: 1.2s;
        }
        &:nth-child(6) {
            -webkit-transition-delay: 1.3s;
            transition-delay: 1.3s;
        }
        &:nth-child(7) {
            -webkit-transition-delay: 1.4s;
            transition-delay: 1.4s;
        }
        &:nth-child(8) {
            -webkit-transition-delay: 1.5s;
            transition-delay: 1.5s;
        }
        &:nth-child(9) {
            -webkit-transition-delay: 1.6s;
            transition-delay: 1.6s;
        }
        &:nth-child(10) {
            -webkit-transition-delay: 1.7s;
            transition-delay: 1.7s;
        }
    }

    /* #Light
    ================================================== */

    nav.light .cd-header {
        //background: #fff;
    }
    nav.light .logo-wrap a {
        color: #1f2029;
    }
    nav.light .menu-icon__line {
        background-color: #1f2029;
    }
    nav.light .nav:before {
        background: rgba(235, 235, 235, 0.6);
    }
    nav.light .nav:after {
        background: rgba(250, 250, 250, 1);
        //background: #ffffff;
    }
    nav.light .nav__list-item {
        a {
            color: rgba(0, 0, 0, 0.6);
            &:hover {
                color: #1f2029;
            }
        }
        &.active-nav a {
            color: #1f2029;
        }
    }

    /* #Link to page
    ================================================== */

    .link-to-portfolio {
        position: fixed;
        bottom: 40px;
        right: 50px;
        z-index: 200;
        cursor: pointer;
        width: 50px;
        height: 50px;
        text-align: center;
        border-radius: 3px;
        background-position: center center;
        background-size: 65%;
        background-repeat: no-repeat;
        background-image: url('https://assets.codepen.io/1462889/fcy.png');
        box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
        transition: opacity 0.2s, border-radius 0.2s, box-shadow 0.2s;
        transition-timing-function: ease-out;
    }
    .link-to-portfolio:hover {
        opacity: 0.8;
        border-radius: 50%;
        box-shadow: 0 0 0 20px rgba(255, 255, 255, 0.1);
    }
</style>
