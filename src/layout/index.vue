<template>
  <div class="layout">
    <Navbar />
    <div class="layout-content">
      <router-view v-slot="{ Component }">
        <!--      <transition mode="out-in" name="fade-transform">-->
        <keep-alive :include="keepAliveComponents">
          <component :is="Component" :key="$route.name"/>
        </keep-alive>
        <!--      </transition>-->
      </router-view>
    </div>
    <foot />
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import Navbar from "@/components/Navbar.vue";
import Foot from "@/components/Footer.vue";

export default {
  name: "index",
  data() {
    return {
      keepAliveComponents: ['Artlist']
    }
  },
  components: {
    Navbar,
    Foot
  },
  beforeMount() {
    window.addEventListener('resize', this.handleLayouts)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleLayouts)
  },
  mounted() {
    this.handleLayouts()
  },
  methods: {
    ...mapActions(['toggleDevice']),
    handleLayouts() {
      const width = document.body.getBoundingClientRect().width
      if (this.width !== width) {
        const isMobile = width - 1 < 992
        this.toggleDevice(isMobile ? 'mobile' : 'desktop')
        this.width = width
      }
    },
  }
}
</script>

<style scoped lang="less">
.layout {
  min-height: 100%;
  display: flex;
  flex: auto;
  flex-direction: column;
  &-content {
    flex: auto;
  }
}
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.2s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>