<template>
  <div class="artwork container">
      <div class="artwork-info">
        <div class="image">
          <video v-if="artwork.artType==='VIDEO'" muted="true" autoplay controls loop playsinline :poster="artwork.image" preload="metadata" style="border-radius: initial;"><source :src="artwork.video" type="video/mp4"></video>
          <div class="thumbnail" v-else>
            <a-image :src="artwork.image" v-if="artwork.image">
              <template #placeholder>
                <div class="loader-wrapper">
                  <div class="loader"></div>
                </div>
              </template>
            </a-image>
            <div class="wrapper" v-else></div>
          </div>
        </div>
        <div class="info">
          <a-skeleton :loading="!artwork.artistId" :paragraph="{ rows: 0 }" active>
           <h4>{{artwork.name}}</h4>
          </a-skeleton>
          <a-skeleton avatar :loading="!artwork.artistId" :paragraph="{ rows: 1, width: 100 }" active>
            <div class="artist" @click="gotoArtist(artwork.artistId)">
              <p>
                <a-avatar :src="artwork.artist.avatar" :size="40">
                  <template #icon><UserOutlined /></template>
                </a-avatar>
              </p>

              <p>
                <b>{{artwork.artist.nickname}}</b><br>
                <span>Artist</span>
              </p>
            </div>
          </a-skeleton>

          <dl class=desc>
            <dt>Description</dt>
            <a-skeleton :loading="!artwork.artistId" :title="false" :paragraph="{ rows: 4 }" active>
              <dd>{{artwork.description}}<br><br>{{artwork.recommendedReason}}</dd>
            </a-skeleton>
          </dl>

          <dl class=detail>
            <dt>Additional Details</dt>
            <dd>
              <a-skeleton :loading="!artwork.artistId" :title="false" :paragraph="{ rows: 2 }" active>
                <p>Size: {{artwork.size}}</p>
                <p>Type: {{artwork.artType}}</p>
              </a-skeleton>
            </dd>
          </dl>

          <h3 @click="favVisible=true" class="favorites">{{artwork.voteNumber}} favorites</h3>
          <a-modal v-model:visible="favVisible" :centered="true" width="1000px" :footer="null" title="Favorited by" class="fav-list">
            <p v-for="vote in voteList" v-bind:key="vote.id">
              <!-- <img :src="vote.user.avatar" :alt="vote.user.nickname"> -->
              {{vote.userAddress}}
              <span>{{ formatTime(vote.createTime)}}</span>
            </p>
              <a-pagination :current='voteListCurrent' :total="artwork.voteLogList.length" :defaultPageSize="defaultSize" 
          hideOnSinglePage @change="voteListChange"/>
          </a-modal>
          <div class="voteBtn">
            <a-button type="primary" :disabled='voteDisabled' @click="setVoteVisible()" :loading="voteLoading">Vote</a-button>
          </div>
          <a-modal v-model:visible="voteVisbale" :centered="true" :footer="null" width="650px" title="" class="vote-modal">
              <h2 style="margin: 20px 0">The remaining Votes: {{remainVote}}</h2>
              <a-alert message="You can vote multiple times or one vote at a time" type="info" />
              <p class="number">
                Number of voting
                <b><a-input-number id="inputNumber" v-model:value="voteNumber" :min="1" :max="remainVote>0?remainVote:1" /></b>
              </p>
              <p class="voteBtn"><a-button type="primary" size="large" :loading="voteLoading" :disabled="!this.remainVote" @click="voteClick">Vote</a-button></p>
          </a-modal>
        </div>
      </div>

      <div class="artist-artwork">
        <a-skeleton :loading="!artwork.artist.nickname" :paragraph="{ rows: 0 }" active>
          <h4>{{ artwork.artist.nickname }}'s Artworks <span @click="gotoArtist(artwork.artistId)">MORE <em style="color:#15ACFB">></em></span></h4>
        </a-skeleton>
        <a-row :gutter="[16,16]" class="artist-artwork-list" type="flex" v-if="!artistWorks.length">
          <a-col :lg="8" :md="12" :sm="12" :xs="24" v-for="i in 3" :key="i" class="skeleton">
            <div style="margin-bottom: 20px;" class="cover"></div>
            <p class="line active" style="width: 100%;"></p>
          </a-col>
        </a-row>
        <a-row :gutter="[20,50]" class="artist-artwork-list" v-else>
          <a-col :lg="8" :md="12" :sm="12" :xs="24" v-for="work in artistWorks" :key="work.id">
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
import * as api from '@/api/statistics'
import { UserOutlined } from '@ant-design/icons-vue';
import { timeago } from '@/utils/index';
import {mapState, mapGetters} from 'vuex';
import eventBus from 'vue3-eventbus';

export default {
  name: 'Artist',
  data() {
    return {
      artwork: {artist: {}, voteLogList:[]},
      artistWorks: [],
      current: 0,
      totalItem: 0,
      defaultSize: 6,
      disabled: false,
      favVisible: false,
      ctime: Date.now(),
      voteDisabled: true,
      voteVisbale: false,
      remainVote: 10,
      voteNumber: 1,
      voteLoading: false,
      voteListCurrent: 0,
      voteList: []
    }
  },

  components: {
    UserOutlined
  },

  created() {
    window.scrollTo(0, 0)
    api.fetchArt(this.$route.params.id).then(res => {
      this.artwork = res.data;
      this.fetchArtist(this.artwork.artistId, 0);
      this.getVoteList(0);
      this.fetchRemainVote();
      this.setBtnDisabled();
    });
    eventBus.on('web3Changed', () => {
      this.initData();
    })
  },

  computed: {
    ...mapState(['voteTime', 'defaultAccount']),
    ...mapGetters(['contracts']),
  },

  watch: {
    '$route'(to) {
      if(to.name == 'Artwork') {
        this.artwork = {artist: {}};
        api.fetchArt(this.$route.params.id).then(res => {
          this.artwork = res.data;
          this.fetchArtist(this.artwork.artistId, 0);
          this.getVoteList(0);
        });
      }
    }
  },

  methods: {
    initData(){
      this.fetchRemainVote();
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
      window.scrollTo(0, 0)
      this.$router.push({
        name: 'Artwork',
        params: {
          id
        }
      })
    },

    fetchArtist(id, page) {
      api.fetchArtist({
          artistId: id,
          page
      }).then(res => {
        var data = res.data
        this.current = data.page + 1;
        this.totalItem = data.totalElements;
        this.defaultSize = data.size;
        this.artistWorks = data.content;
        this.disabled = false;
      })
    },

    fetchRemainVote() {
        if(!this.defaultAccount) return;
        api.fetchRemainVote(this.defaultAccount).then(res=>{
          var data = res.data;
          this.remainVote = data.remainingVoteCount;
        }).catch((err) => {
          this.remainVote = 10;
          console.log('err', err)
        });
    },

    getVoteList(page){
      this.voteList = this.artwork.voteLogList.slice(page*this.defaultSize, (page+1)*this.defaultSize);
      this.voteListCurrent = page+1;
    },

    formatTime(time) {
      return timeago(time, this.ctime) + ' ago';
    },

    pageChange(page) {
      this.disabled = true;
      this.fetchArtist(this.artwork.artistId, page -1);
    },

    voteListChange(page) {
      this.getVoteList(page -1);
    },

    setBtnDisabled() {
        if(!this.voteTime) return;
        var interval = setInterval(()=>{
          const now = new Date().getTime();
          if(this.voteTime.endTime * 1000 - now < 0) {
            this.voteDisabled = true;
            clearInterval(interval);
          } else {
            this.voteDisabled = false;
          }
        }, 1000);
    },

    setVoteVisible(){
      if(!this.defaultAccount) eventBus.emit('showWalletDialog');
      else this.voteVisbale=true
    },

    voteClick() {
      if(this.voteNumber !== +this.voteNumber || !/^[1-9]\d*$/.test(this.voteNumber)) {
        this.voteNumber = 1;
        this.$notification.error({
          message: 'Invalid Number format'
        });
        return;
      }
       this.voteLoading  = true;
        this.contracts.Yuangu.methods.like( this.voteTime.termId, this.artwork.id, this.voteNumber )
          .send({from: this.defaultAccount})
          .then(res => {
            if(!res.status) return;
            var voteNumber = this.artwork.voteNumber;
            var interval = setInterval(()=>{
              api.fetchArt(this.$route.params.id).then(res => {
                this.artwork = res.data;
                this.fetchRemainVote();
                this.getVoteList(0);
                if(this.artwork.voteNumber > voteNumber) {
                  this.voteLoading = false;
                  clearInterval(interval);
                }
              });
            }, 2000);
          })
          .catch((error) => {
            this.voteLoading = false;
            this.$notification.error({
              message: 'Error',
              description: error.message
            });
          });
    }

  }
}
</script>
<style lang="less" scoped>
.artwork {
  padding: 60px 0;

  /deep/.ant-skeleton {
    &.ant-skeleton-with-avatar .ant-skeleton-content .ant-skeleton-title + .ant-skeleton-paragraph {
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &-info {
    display: flex;
    .image {
      flex: 1;
      width: 600px;
      // height: 600px;
      margin-right: 40px;
      // background-color: @skeleton-color;
      video {
        width: 100%;
        height: 100%;
      }
      .thumbnail {
        position: relative;
        cursor: pointer;
        width: 100%;
        height: 100%;
        .wrapper {
          width: 100%;
          height: 100%;
          background-color: @skeleton-color;
        }
        /deep/.ant-image {
          position: relative;
          width: 100%; /* The size you want */
          // height: 100%;
          &:after {
            content: "";
            display: block;
            padding-bottom: 100%; /* The padding depends on the width, not on the height, so with a padding-bottom of 100% you will get a square */
          }
          >img {
            position: absolute; /* Take your picture out of the flow */
            top: 0;
            bottom: 0;
            left: 0;
            right: 0; /* Make the picture taking the size of it's parent */
            width: 100%; /* This if for the object-fit */
            height: 100%; /* This if for the object-fit */
            object-fit: contain; /* Equivalent of the background-size: cover; of a background-image */
            object-position: center;
          }
        }
      }
    }

    .info {
      flex: 1;
      text-align: left;
      h4 {
        font-size: 20px;
        color: #333;
      }
      .artist {
        display: flex;
        cursor: pointer;
        height: 40px;
        >p {
         margin-bottom: 0;
        }
        p:first-child {
          margin-right: 10px;
        }
      }

      .desc {
        margin-top: 46px;
        dt {
          margin-bottom: 10px;
          font-size: 16px;
          color: #333;
        }
        dd {
          line-height: 2;
          max-width: 800px;
          padding-bottom: 24px;
          overflow: hidden;
          max-height: 170px;
          word-break: break-word;
          mask: linear-gradient(rgb(255, 255, 255) 80%, transparent);
          overflow-y: scroll;
        }
      }

      .detail {
        margin-top: 32px;
        dt {
          font-size: 16px;
          color: #333;
          margin-bottom: 10px;
        }
        dd p {
          margin-bottom: 0;
        }
      }

      .favorites {
        margin-top: 40px;
        cursor: pointer;
      }

      .voteBtn {
        margin-top: 20px;
        button {
          width: 200px;
          height: 32px;
        }
      }
    }
  }

  .artist-artwork {
    text-align: left;
    margin-top: 80px;
    h4 {
      font-size: 16px;
      font-weight: bolder;
      margin-bottom: 40px;
      position: relative;
      span {
        position: absolute;
        right: 0;
        top: 0;
        cursor: pointer;
      }
    }
    .ant-pagination {
      display: table;
      margin: 50px auto 0;
    }
  }
}

 .fav-list{
    .ant-modal-body p {
      position: relative;
      color: #828282;
      border-bottom: 1px solid #f0f0f0;
      line-height: 60px;
   
      span {
        position: absolute;
        right: 0;
        top: 0;
      }
    }
    .ant-pagination {
        display: table;
        margin: 50px auto 0;
      }
  }

  .vote-modal {
    .number {
      margin-top: 20px;
      line-height: 60px;
      border-bottom: 1px solid #f0f0f0;
      font-size: 20px;
      position: relative;
      b {
        position:absolute;
        right: 0;
        top:0;
      }
    }

    .voteBtn {
      width: 90%;
      margin: 40px auto 20px;
      button {
        width: 100%;
      }
    }
  }
</style>
