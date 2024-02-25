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
    import Navbar from './navbar2.vue'
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
        .section {
        }
        .title {
            font-size: 60px;
            font-weight: 600;
        }

        @media (max-width: 768px) {
            .title {
                font-size: 30px;
            }
        }
    }
</style>
