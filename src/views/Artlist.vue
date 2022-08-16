<template>
  <div class="artlist">
      <div class="banner">
        <div class="container">
          <a-row class="banner-content" type="flex" style="flex-direction: column;">
            <a-col :lg="14" :xs="24" class="title">Metars Palace will eventually display the greatest artworks with the most religious, divine and human enlightenment values in history. Here, let us join in the creation, vote, and You think the most representative artworks are uploaded and shared, and we will finally select the part with the most likes to negotiate copyright authorization and display them in our common place of belief, civilization, and enlightenment - Metars Palace.</a-col>
<!--            <a-col :lg="12" :xs="24">A source of faith, freedom, and an open world built by all.A source of faith, freedom, and an open world built by all.</a-col>-->
          </a-row>
        </div>
      </div>
      <div class="artworks container">
        <div class="dropdown">
          <a-dropdown>
            <template #overlay>
              <a-menu @click="changeSort" :selectedKeys="[sortBy]">
                <a-menu-item key="voteNumber">
                  Vote Number
                </a-menu-item>
                <a-menu-item key="createTime">
                  Newest
                </a-menu-item>
              </a-menu>
            </template>
            <a-button>
              Sort by
              <DownOutlined />
            </a-button>
          </a-dropdown>

          <a-dropdown>
            <template #overlay>
              <a-menu @click="changeOrder" :selectedKeys="[orderBy]">
                <a-menu-item key="DESC">
                  DESC
                </a-menu-item>
                <a-menu-item key="ASC">
                  ASC
                </a-menu-item>
              </a-menu>
            </template>
            <a-button>
              Order by
              <DownOutlined />
            </a-button>
          </a-dropdown>
        </div>

        <a-row :gutter="[20,50]" class="artworks-list" type="flex" v-if="loading">
          <a-col :lg="8" :md="12" :sm="12" :xs="24" v-for="i in 3" :key="i" class="skeleton">
            <div style="margin-bottom: 20px;" class="cover"></div>
            <p class="line active" style="width: 100%;"></p>
            <a-row type="flex" justify="space-between" align="middle">
              <a-col class="avatar">
                <span class="logo active" style=""></span>
                <span class="line active" style="width: 100px;"></span>
              </a-col>
              <a-col class="line active" style="width: 80px;"></a-col>
            </a-row>
          </a-col>
        </a-row>
        <a-row :gutter="[20,50]" class="artworks-list" type="flex" v-else>
          <a-col :lg="8" :md="12" :sm="12" :xs="24" v-for="work in artistWorks" :key="work.id">
            <div class="art-card" @click="gotoArtwork(work.id)">
              <div class="card-img">
                <img :src="work.image" alt="">
              </div>
              <div class="card-name">{{work.name}}</div>
              <div class="card-artist">
                <a-popover placement="topLeft">
                  <template #content>
                    <div style="text-align: center">
                      <a-avatar :src="work.artist.avatar" :size="50">
                        <template #icon><UserOutlined /></template>
                      </a-avatar>
                      <p class="name">{{ work.artist.nickname }}</p>
                      <p class="desc" v-if="work.artist.description">{{ work.artist.description }}</p>
                    </div>
                  </template>
                  <div class="info" @click="gotoArtist(work.artist.id)" @click.stop>
                    <a-avatar :src="work.artist.avatar" :size="30">
                      <template #icon><UserOutlined /></template>
                    </a-avatar>
                    <span class="name">{{work.artist.nickname}}</span>
                  </div>
                </a-popover>
                <div class="fav">
                  <svg-icon icon-class="heart-fill" class="heart-fill" v-if="work.voteNumber > 0"></svg-icon>
                  <svg-icon icon-class="heart" class="heart" v-else></svg-icon>
                  {{ work.voteNumber }}
                </div>
              </div>
            </div>
          </a-col>
        </a-row>

        <a-pagination :current='current' :total="totalItem" :defaultPageSize="defaultSize" 
          hideOnSinglePage :disabled="disabled" @change="pageChange"/>
      </div>
  </div>
</template>

<script>
import * as api from '@/api/statistics'
import { DownOutlined, UserOutlined } from '@ant-design/icons-vue';

export default {
  name: 'Artlist',
  data() {
    return {
      loading: false,
      popstate: false,
      artistWorks: [],
      voteRankId: [],
      current: 0,
      totalItem: 0,
      defaultSize: 12,
      disabled: false,
      sortBy: 'voteNumber',
      orderBy: 'DESC'
    }
  },

  components: {
    DownOutlined,
    UserOutlined
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      setTimeout(() => {
        if(!vm.popstate) {
          vm.initData()
        }
      }, 200)
    })
  },

  beforeRouteLeave () {
    this.popstate = false
  },

  mounted() {
    window.addEventListener("popstate", () => {
      this.popstate = true
    })
  },

  methods: {
    async initData() {
      this.sortBy = 'voteNumber';
      this.orderBy='DESC';
      await this.fetchArtlist(0, this.defaultSize, this.sortBy, this.orderBy);
    },
    gotoArtist(id) {
      this.$router.push({
        name: 'Artist',
        params: {
          id
        }
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
    async fetchArtlist(page,size,sortField,sortDirection) {
      if (this.loading) {
        return
      }
      this.loading = true
      const res = await api.fetchArtist({
          page,
          size,
          sortField,
          sortDirection,
          saleStatus: 'COMING_SOON'
      })
      const data = res.data
      this.current = data.page + 1;
      this.totalItem = data.totalElements;
      this.defaultSize = data.size;
      this.artistWorks = data.content;
      this.disabled = false;
      this.loading = false
    },

    changeSort(item) {
      if(item.key == this.sortBy) return;
      this.sortBy = item.key;
      this.fetchArtlist(0, this.defaultSize, this.sortBy, this.orderBy);
    },

    changeOrder(item) {
      if(item.key == this.orderBy) return;
      this.orderBy = item.key;
      this.fetchArtlist(0, this.defaultSize, this.sortBy, this.orderBy);
    },

    pageChange(page) {
      this.disabled = true;
      this.fetchArtlist(page -1, this.defaultSize, this.sortBy, this.orderBy)
    }
  }
}
</script>
<style lang="less" scoped>
.ant-popover {
  .name {
    margin-top: 4px;
    font-weight: 500;
    font-size: 16px;
  }
  .desc {
    max-width: 320px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
}
.artlist {
  .banner {
    height: 460px;
    background-image: url(../assets/img/artlist/listbanner.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #101027;
    color: #fff;
    text-align: left;
    .container {
      position: relative;
      height: 100%;
    }
    &-content {
      position: absolute;
      top: 50%;
      width: 92%;
      transform: translateY(-50%);
      .title {
        color: #fff;
        font-size:24px;
      }
    }
}

  .artworks {
    margin-top: 100px;
    margin-bottom: 100px;
    text-align: left;
    h4 {
      font-size: 16px;
      font-weight: bolder;
      margin-bottom: 40px;
    }
    .dropdown {
      margin-bottom: 50px;
      >button {
        margin-right: 20px;
      }
    }

    &-list {
      .art-card {
        .card-artist {
          padding: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: -10px;
          position: relative;
          .info {
            display: flex;
            align-items: center;
            cursor: pointer;
            .name {
              margin-left: 8px;
            }
          }
          .fav {
            display: flex;
            align-items: center;
            .svg-icon {
              margin-right: 8px;
              font-size: 16px;
            }
          }
        }
      }
    }
    .ant-pagination {
      display: table;
      margin: 80px auto 0;
    }
  }
}
@media (max-width: 576px) {
  .artlist {
    .banner .title{
      font-size: 18px;
    }
  }
}
</style>
