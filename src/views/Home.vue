<template>
  <div class="home">
    <section class="banner">
      <div class="container title">
        <h1>A source of faith, freedom, and an open world built by all.</h1>
      </div>
    </section>
    <section class="universe block">
      <div class="container">
        <h2 class="header">META Universe</h2>
        <a-row type="flex" justify="center">
          <a-col :xl="18" class="info" v-animate="'fadeInUp'">
            In the boundless metaverse, there is a place where the echo of human destiny wafts, the light of human
            thought shines, and the power of human creation is released. It reads "Metars". "Metars" is an open world
            built freely and jointly by all Metars residents. Starting from Metars gallery, every resident builds
            together and gradually develops into a completely free open world.
          </a-col>
        </a-row>
      </div>
    </section>
    <section class="welfare block">
      <div class="container">
        <h2 class="header">Genesis Resident Welfare</h2>
        <div style="max-width: 1070px">
          <a-row type="flex" align="middle" justify="space-between" class="welfare-content">
            <a-col flex="472px" v-animate="'fadeInUp'">
              <p>Limited low price Metars (token).</p>
              <p>Metars Limited Creation Avatar.</p>
              <p>Metars Limited Genesis Bricks.</p>
              <p>Metars will be used to stimulate economic, social growth, explore new worlds, level up and participate in
                NFT markets.</p>
              <p>The Metars metaverse is controlled by defi tools (i.e. smart contracts) in financial centers throughout
                the game, which brings many advantages to NFT holders, circulated by Metars(token).</p>
              <p>Built on OKC, BNB Chain and Ethereum with perfect governance models, players have the
                highest control over NFTs and tokens.</p>
              <p>The meta church of Metars is built with Genesis bricks.</p>
              <p>Metars limited genesis avatar owners have a limited whitelist for subsequent NFT sales.</p>
            </a-col>
            <a-col  flex="472px">
              <img src="../assets/img/home/bg3.png" alt="" style="width: 100%">
            </a-col>
          </a-row>
        </div>
      </div>
    </section>
    <section class="roadmap block">
      <div class="container">
        <h2 class="header">RoadMap</h2>
        <a-timeline :mode="device === 'mobile'? '': 'alternate'" class="stage">
          <a-timeline-item>
            <template #dot>
              <span class="line line-right" style="border-top-color: #F1985B">
                <i class="arrow" style="border-left-color: #F1985B"></i>
              </span>
            </template>
            <div v-animate="'fadeInUp'">
              <div class="stage-title" >The first stage</div>
              <p>1. Product launch: support official and official partners to sell digital art collection, support users to like and vote, vote for auction collections.</p>
              <p>2. Cooperate with 20 world-renowned artists and introduce their works into "Metars" for sale or auction.</p>
              <p>3. The platform currency will be IDO on multiple platforms.</p>
            </div>
          </a-timeline-item>
          <a-timeline-item>
            <template #dot>
              <span class="line line-left" style="border-top-color: #409ACA">
                <i class="arrow" style="border-right-color: #409ACA"></i>
              </span>
            </template>
            <div v-animate="'fadeInUp'">
              <div class="stage-title">The second stage</div>
              <p>1. Product update: support the three-dimensional display and interaction of art collections.</p>
              <p>2. Cooperate with 50 artists, institutions and galleries around the world to introduce a variety of excellent digital art works for sale.</p>
              <p>3. The platform currency is listed on the CEX.</p>
            </div>
          </a-timeline-item>
          <a-timeline-item>
            <template #dot>
              <span class="line line-right" style="border-top-color: #EC6B5C">
                <i class="arrow" style="border-left-color: #EC6B5C"></i>
              </span>
            </template>
            <div v-animate="'fadeInUp'">
            <div class="stage-title">The third phase</div>
            <p>1. Product update: support users to freely trade digital collections, online community functions.</p>
            <p>2. Cooperate with 100 artists, institutions and galleries around the world to introduce a variety of excellent digital art works for sale.</p>
            </div>
          </a-timeline-item>
          <a-timeline-item>
            <template #dot>
              <span class="line line-left" style="border-top-color: #45617A">
                <i class="arrow arrow-left" style="border-right-color: #45617A"></i>
              </span>
            </template>
            <div v-animate="'fadeInUp'">
            <div class="stage-title">The fourth stage</div>
            <p>1. Product update: establish a metaverse world, users can move freely in the metaverse world.</p>
            <p>2. Cooperation with 300 artists, institutions and galleries around the world.</p>
            </div>
          </a-timeline-item>
        </a-timeline>
      </div>
    </section>
    <section class="team block">
      <div class="container">
        <h2 class="header">Team</h2>
        <a-row type="flex" justify="center" align="middle" class="team-row">
          <a-col class="item">
            <div class="avatar"><img src="../assets/img/home/team4.png" alt=""></div>
            <div class="name">Christian</div>
            <div class="work">Web Dev</div>
            <div class="intro">Christian has experienced all positions in the software development process throughout his career. He is committed to cultivating the developer community, and in this role, he has extensive leadership experience and a strong technical background.</div>
          </a-col>
          <a-col class="item">
            <div class="avatar"><img src="../assets/img/home/team2.png" alt=""></div>
            <div class="name">Daniel</div>
            <div class="work">Co-founder/BlockChain DEV</div>
            <div class="intro">Daniel is the co-founder of Metars who entered the cryptocurrency industry in 2016. Daniel's contribution is in smart contracts, and with his presence, we guarantee that the smart contracts we design will guarantee a higher level. At the same time, Daniel is also an avid NFT collector.</div>
          </a-col>
          <a-col class="item">
            <div class="avatar"><img src="../assets/img/home/team1.png" alt=""></div>
            <div class="name">Smith</div>
            <div class="work">Co-founder/Content Manger</div>
            <div class="intro">Smith is the co-founder of Metars, he is a great cryptocurrency enthusiast who has invested heavily in the primary market. Later entered the blockchain industry, focusing on blockchain research.</div>
          </a-col>
          <a-col class="item">
            <div class="avatar"><img src="../assets/img/home/team3.png" alt=""></div>
            <div class="name">Lauren</div>
            <div class="work">Community Lead</div>
            <div class="intro">Lauren is the co-founder of Metars. She entered the blockchain industry in 2017 and is committed to building blockchain communities, overseas marketing, strategy and financial research. At Metars, Lauren focuses primarily on NFT research as well as project marketing and user growth.</div>
          </a-col>

          <a-col class="item">
            <div class="avatar"><img src="../assets/img/home/team5.png" alt=""></div>
            <div class="name">Grace</div>
            <div class="work">Art Leader</div>
            <div class="intro">Grace, who joined the blockchain industry in 2017, is an avid fan of GameFi and NFTs, and he believes that NFTs can change our lives. At Metars, she is mainly responsible for UI/UE design.</div>
          </a-col>
        </a-row>
      </div>
    </section>
    <section class="economic block">
      <div class="container">
        <h2 class="header">Tokenomics</h2>
        <img src="../assets/img/home/economic.png" alt="" style="width: 93%">
      </div>
    </section>
    <section class="graph block" style="margin-bottom: -60px; padding-bottom: 0">
      <div class="container">
        <h2 class="header" style="margin-bottom: 20px">Token</h2>
        <div>
          <img src="../assets/img/home/graph.png" alt="" style="width: 100%; max-width: 630px">
        </div>
      </div>
    </section>
    <section class="partner block">
      <div class="container">
        <h2 class="header">Partner</h2>
        <div style="margin: 0 auto; max-width: 1110px">
          <a-row type="flex" :gutter="[10,10]" class="partner-row">
            <a-col :lg="6" :md="8" :sm="12" :xs="12"><a href="https://www.okx.com/oec" target="_blank"><img src="../assets/img/partner/5.png" alt="" style="width: 70%"></a></a-col>
            <a-col :lg="6" :md="8" :sm="12" :xs="12"><a href="https://tapfantasy.io/" target="_blank"><img src="../assets/img/partner/2.png" alt=""></a></a-col>
            <a-col :lg="6" :md="8" :sm="12" :xs="12"><a href="https://anglecapital.vc/" target="_blank"><img src="../assets/img/partner/3.png" alt=""></a></a-col>
            <a-col :lg="6" :md="8" :sm="12" :xs="12"><a href="https://www.coinspeaker.com/" target="_blank"><img src="../assets/img/partner/4.png" alt=""></a></a-col>
          </a-row>
        </div>
      </div>
    </section>
    <a-back-top />
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      dailyRecruitLimit: ''
    }
  },
  computed: {
    ...mapState(['device']),
  }
}
</script>
<style lang="less" scoped>
.home {
  .banner {
    position: relative;
    width: 100%;
    height: calc(100vh - @nav-height);
    background: url("../assets/img/home/banner.png") center no-repeat;
    background-size: 120% 120%;
    background-color: #0F132A;
    display: flex;
    justify-content: center;
    align-items: center;

    .title {
      font-weight: 500;
      >h1 {
        margin: 0 auto;
        width: 80%;
        color: #FFFFFF;
      }
    }
  }

  .block {
    padding: 150px 0;

    .header {
      margin-bottom: 100px;
      line-height: 1.4;
    }
  }

  .universe {
    padding-bottom: 466px;
    //padding: 146px 0 470px;
    width: 100%;
    background: url("../assets/img/home/bg2.png") center no-repeat;
    background-size: cover;

    .header {
      margin-bottom: 50px;
    }
  }

  .welfare {
    &-content {
      margin: 0 auto;
      width: 472px;
      max-width: 100%;
      p {
        text-align: left;
      }
    }
  }

  .roadmap {
    background-color: #F8F8F8;
    .stage-title {
      font-family: DINCondensed-Bold, DINCondensed;
      font-weight: bold;
      font-size: 34px;
      color: #333333;
      .status {
        margin-left: 40px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-size: 18px;
      }
    }
  }

  .team {
    .team-row {
      .item {
        display: flex;
        flex-direction: column;
        margin: 10px;
        padding: 36px 22px 24px;
        width: 300px;
        height: 440px;
        font-weight: 500;
        background: #FFFFFF;
        box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        .avatar {
          margin: 0 auto;
          margin-bottom: 16px;
          width: 108px;
          height: 108px;
          border-radius: 50%;
          background-color: #ccc;
          overflow: hidden;
          flex-shrink: 0;
          >img {
            width: 100%;
            height: 100%;
          }
        }
        .intro {
          margin-top: 8px;
          display: flex;
          //align-items: center;
          flex-grow: 1;
          text-align: left;
          font-size: 14px;
        }
      }
    }
  }

  .economic {
    background-color: #F8F8F8;
  }

  .partner {
    &-row {
        a{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            background: #000;
            > img {
                width: 100%;
            }
        }
    }
  }

  /deep/.ant-timeline {
    .ant-timeline-item-tail {
      top: 0;
      height: 100%;
    }
    .ant-timeline-item-last > .ant-timeline-item-tail {
      display: block;
    }
    .ant-timeline-item-head {
      margin-left: -5px;
      border-radius: 50%;
      top: 50%;
      width: 14px;
      height: 14px;
      transform: translateY(-7px);
      border: 3px solid transparent;
    }
    .ant-timeline-item-content {
      text-align: left;
    }
    &.ant-timeline-alternate {
      .line {
        position: absolute;
        width: 80px;
        height: 1px;
        border-top: 2px solid;
        .arrow {
          position: absolute;
          top: -7px;
          width: 8px;
          height: 8px;
        }
        &-right {
          left: 8px;
          .arrow {
            right: -12px;
            border-top: 6px solid transparent;
            border-bottom: 6px solid transparent;
            border-left: 12px solid;
          }
        }
        &-left {
          left: -80px;
          .arrow {
            left: -12px;
            border-top: 6px solid transparent;
            border-bottom: 6px solid transparent;
            border-right: 12px solid;
          }
        }
      }
    }
    &.ant-timeline-alternate .ant-timeline-item-left .ant-timeline-item-content,
    &.ant-timeline-right .ant-timeline-item-left .ant-timeline-item-content {
      left: calc(50% + 92px);
      width: calc(50% - 92px);
    }
    &.ant-timeline-alternate .ant-timeline-item-right .ant-timeline-item-content,
    &.ant-timeline-right .ant-timeline-item-right .ant-timeline-item-content {
      width: calc(50% - 92px);
      text-align: left;
    }
    &.ant-timeline-alternate .ant-timeline-item-head-custom,
    &.ant-timeline-right .ant-timeline-item-head-custom {
      margin-left: -4px;
    }
    .ant-timeline-item:first-child {
      > .ant-timeline-item-tail {
        border-left: 6px solid #F1985B;
      }
      > .ant-timeline-item-head {
        border-color: #F1985B;
      }
    }
    .ant-timeline-item:nth-child(2) {
      > .ant-timeline-item-tail {
        border-left: 6px solid #409ACA;
      }
      > .ant-timeline-item-head {
        border-color: #409ACA;
      }
    }
    .ant-timeline-item:nth-child(3) {
      > .ant-timeline-item-tail {
        border-left: 6px solid #EC6B5C;
      }
      > .ant-timeline-item-head {
        border-color: #EC6B5C;
      }
    }
    .ant-timeline-item:last-child {
      > .ant-timeline-item-tail {
        border-left: 6px solid #45617A;
      }
      > .ant-timeline-item-head {
        border-color: #45617A;
      }
    }
  }
}

@media (max-width: 576px) {
  .home {
    h1 {
      font-size: 40px;
    }

    h2 {
      font-size: 32px;
    }

    .block {
      padding: 100px 0;
      .header {
        margin-bottom: 60px;
      }
    }
  }
}

@media (min-width: 576px) {
  .home {
    h1 {
      font-size: 48px;
    }

    h2 {
      font-size: 32px;
    }
  }
}

@media (min-width: 768px) {
  .home {
    h1 {
      font-size: 56px;
    }

    h2 {
      font-size: 48px;
    }
  }
}

@media (min-width: 992px) {
  .home {
    h1 {
      font-size: 56px;
    }

    h2 {
      font-size: 48px;
    }
    .welfare {
      &-content {
        width: auto;
      }
    }
  }
}

@media (min-width: 1200px) {
  .home {
    h1 {
      font-size: 60px;
    }

    h2 {
      font-size: 48px;
    }
    .team {
      .team-row {
        .item {
          display: flex;
          flex-direction: column;
          margin: 0;
          font-weight: 500;
          background: #FFFFFF;
          box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
          border-radius: 5px;
          &:nth-child(3) {
            z-index: 3;
            margin-left: -10px;
            padding: 36px 22px;
            width: 300px;
            height: 420px;
            .avatar {
              margin-bottom: 16px;
              width: 108px;
              height: 108px;
            }
            .name {
              font-size: 19px;
            }
            .intro {
              //margin-top: 24px;
              font-size: 14px;
            }
          }
          &:nth-child(2), &:nth-child(4) {
            z-index: 2;
            margin-left: -10px;
            padding: 24px 18px;
            width: 250px;
            height: 386px;
            .avatar {
              margin-bottom: 14px;
              width: 90px;
              height: 90px;
            }
            .name {
              font-size: 16px;
            }
            .intro {
              //margin-top: 16px;
              font-size: 12px;
              //transform: scale(0.98);
            }
          }
          &:first-child, &:last-child {
            z-index: 1;
            padding: 18px 15px;
            width: 200px;
            height: 330px;
            .avatar {
              margin-bottom: 10px;
              width: 72px;
              height: 72px;
            }
            .name {
              font-size: 13px;
            }
            .work {
              transform: scale(0.95);
            }
            .intro {
              margin-top: 4px;
              font-size: 12px;
              transform: scale(0.95);
            }
          }
          &:nth-child(4), &:last-child {
            margin-left: -4px;
          }
        }
      }
    }
  }
}

</style>
