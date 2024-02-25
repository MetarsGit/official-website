<template>
    <div class="page-home">
        <navbar />
        <home />
        <what />
        <explore />
        <generative />
        <collective />
        <tokenomics />
        <roadmap />
        <partner />

        <home-footer />
        <!-- <announcement /> -->
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Navbar from './navbar3.vue'
    import HomeFooter from './footer.vue'
    import Announcement from './announcement.vue'
    import Home from './sections/home.vue'
    import What from './sections/what.vue'
    import Explore from './sections/explore.vue'
    import Generative from './sections/generative.vue'
    import Collective from './sections/collective.vue'
    import Tokenomics from './sections/tokenomics.vue'
    import Roadmap from './sections/roadmap.vue'
    import Partner from './sections/partner.vue'
    export default {
        name: 'index',
        components: {
            Navbar,
            HomeFooter,
            Announcement,
            Home,
            What,
            Explore,
            Generative,
            Collective,
            Tokenomics,
            Roadmap,
            Partner
        },
        data() {
            return {}
        },
        computed: {
            ...mapGetters({
                device: 'settings/device'
            })
        },
        methods: {
            launchApp() {
                this.$router.push('/artList')
            }
        }
    }
</script>

<style lang="less">
    .page-home {
        overflow: hidden;
        .section {
            padding-top: 120px;
            padding-bottom: 120px;
        }
        .title {
            font-size: 60px;
            font-weight: 600;
        }
        .secondary-title {
            font-size: 16px;
        }
        p.desc {
            font-size: 16px;
        }

        @media (max-width: 768px) {
            .section {
                padding-top: 48px;
                padding-bottom: 48px;
            }
            .title {
                font-size: 30px;
            }
            .secondary-title {
                font-size: 12px;
            }
            p.desc {
                font-size: 12px;
            }
        }
    }
</style>
