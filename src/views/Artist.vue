<template>
  <div class="artist container">
      <div class="artist-info">
        <p class="avatar">
          <a-avatar :src="artistInfo.avatar" :alt="artistInfo.nickname" :size="90">
            <template #icon><UserOutlined /></template>
          </a-avatar>
        </p>
        <p class="name">{{artistInfo.nickname}}</p>
        <dl>
          <dt>Description</dt>
          <dd>{{artistInfo.description}}</dd>
        </dl>
      </div>
      <div class="artist-artwork">
        <h4>Artworks</h4>
        <a-row :gutter="[16,16]" class="artist-artwork-list" type="flex" v-if="!artistWorks.length">
          <a-col :lg="8" :md="12" :sm="12" :xs="24" v-for="i in 3" :key="i" class="skeleton">
            <div style="margin-bottom: 20px;" class="cover"></div>
            <p class="line active" style="width: 100%;"></p>
          </a-col>
        </a-row>
        <a-row :gutter="[16,16]" class="artist-artwork-list" v-else>
          <a-col :span="8" v-for="work in artistWorks" :key="work.id">
            <div class="art-card" @click="gotoArtwork(work.id)">
              <div class="card-img">
                <img :src="work.image">
              </div>
              <div class="card-name">{{work.name}}</div>
            </div>
          </a-col>
        </a-row>

        <a-pagination :current='current' :total="totalItem" :defaultPageSize="defaultSize" 
          hideOnSinglePage :disabled="disabled" @change="pageChange"/>
      </div>
    
  </div>
</template>

<script>
import { UserOutlined } from '@ant-design/icons-vue';
import * as api from '@/api/statistics'

export default {
  name: 'Artist',
  data() {
    return {
      artistInfo: {},
      artistWorks: [],
      current: 0,
      totalItem: 0,
      defaultSize: 6,
      disabled: false
    }
  },
  components: {
    UserOutlined
  },

  created() {
    window.scrollTo(0,0);
    this.fetchArtist(0);
  },

  methods: {
    fetchArtist(page) {
      api.fetchArtist({
          artistId: this.$route.params.id,
          page
      }).then(res => {
        console.log(res)
        var data = res.data
        this.current = data.page + 1;
        this.totalItem = data.totalElements;
        this.defaultSize = data.size;
        this.artistInfo = data.content[0].artist
        this.artistWorks = data.content;
        this.disabled = false;
      })
    },

    gotoArtwork(id) {
      this.$router.push({
        name: 'Artwork',
        params: {
          id
        }
      })
    },

    pageChange(page) {
      this.disabled = true;
      this.fetchArtist(page -1)
    }
  }
}
</script>
<style lang="less" scoped>
.artist {
  padding-top: 60px;
  padding-bottom: 60px;
  &-info {
    max-width: 100%;
    width: 620px;
    margin: 0 auto;
    .avatar {
      width: 90px;
      height: 90px;
      margin: 0 auto;
      border-radius: 50%;
      overflow: hidden;
      background-color: @skeleton-color;
      img {
        width: 100%;
      }
    }
    .name {
      font-size: 16px;
      font-weight: bolder;
      margin-top: 24px;
      color: #333;
    }
    dl {
      margin-top: 40px;
      dt {
        font-size: 16px;
        font-weight: bolder;
      }
      dd {
        margin-top: 20px;
      }
    }
  }

  &-artwork {
    text-align: left;
    margin-top: 80px;
    h4 {
      font-size: 16px;
      font-weight: bolder;
      margin-bottom: 40px;
    }

    .ant-pagination {
      display: table;
      margin: 50px auto 0;
    }
  }
}
</style>
