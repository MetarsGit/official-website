<template>
  <div class="vote-time" v-if="$route.name=='Artwork'||$route.name=='Artist'||$route.name=='Artlist'">
      Voting close <span class="day">{{day}}</span>D
      <span class="hr">{{hour}}</span>H
      <span class="min">{{min}}</span>M
      <span class="sec">{{sec}}</span>S
  </div>
  <div class="navbar">
    <a-row class="container" type="flex" justify="space-between" align="middle">
      <a-col class="left">
        <img src="../assets/img/logo.jpg" alt="" class="logo">
      </a-col>
      <a-dropdown v-if="device === 'mobile'">
        <MenuOutlined :style="{fontSize: '20px'}"/>
        <template #overlay>
          <a-menu @click="changeMenu" theme="dark" :selectedKeys="[currentRoute]">
            <a-menu-item key="Home">
              <span class="item" :class="{active: currentRoute === 'Home'}">Home</span>
            </a-menu-item>
            <a-menu-item key="Artlist">
              <span class="item" :class="{active: currentRoute === 'Artlist'}">Metars Palace</span>
            </a-menu-item>
            <a-menu-item>
              <span class="item">
                <a href="https://metars.gitbook.io/metars-white-paper/" target="_blank" style="color:inherit;">Gitbook</a>
              </span>
            </a-menu-item>
            <a-menu-item class="connect">
              <a-button ghost v-if="showMetamaskWarning" @click="startOnboarding">Add MetaMask</a-button>
              <a-button ghost v-else-if="!defaultAccount" @click="connectMetamask">connect wallet</a-button>
              <a-button ghost v-else>{{ shortAccount }}</a-button>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <a-col class="right" v-else>
        <div class="menu">
          <span class="item" :class="{active: currentRoute === 'Home'}" @click="changeMenu('Home')">Home</span>
          <span class="item" :class="{active: currentRoute === 'Artlist'}"
                @click="changeMenu('Artlist')">Metars Palace</span>
          <span class="item soon" :class="{active: currentRoute === 'Result'}">Meta Church NFT</span>
          <span class="item soon" :class="{active: currentRoute === 'Donate'}">Donate</span>
          <span class="item">
            <a href="https://metars.gitbook.io/metars-white-paper/" target="_blank" style="color:inherit;">Gitbook</a>
          </span>
        </div>
        <div class="connect">
          <a-button ghost v-if="showMetamaskWarning" @click="startOnboarding">Add MetaMask</a-button>
          <a-button ghost v-else-if="!defaultAccount" @click="connectMetamask">connect wallet</a-button>
          <a-button ghost v-else>{{ shortAccount }}</a-button>
        </div>
      </a-col>
    </a-row>
    <a-modal v-model:visible="walletDialogVisible"
             :footer="null"
             :title="`Please switch to ${chainName}`"
             @ok="closeWalletDialog">
      <a-row type="flex" justify="space-between" align="middle">
        <div>
          <img src="../assets/img/metamask.png" alt="" width="30">
          <span style="margin-left: 10px">MetaMask</span>
        </div>
        <div class="connect">
          <a-button type="primary" v-if="showMetamaskWarning" @click="startOnboarding">add</a-button>
          <a-button type="primary" v-else-if="!defaultAccount" @click="connectMetamask">connect</a-button>
          <a-button type="primary" v-else>{{ shortAccount }}</a-button>
        </div>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import _ from 'lodash';
import MetaMaskOnboarding from "@metamask/onboarding";
import {shortString} from "@/utils"
import {MenuOutlined} from '@ant-design/icons-vue';
import eventBus from "vue3-eventbus";

export default {
  name: "Navbar",
  data() {
    return {
      day: 0,
      hour: 0,
      min: 0,
      sec: 0,
      walletDialogVisible: false
    }
  },
  components: {
    MenuOutlined
  },
  computed: {
    ...mapState(['device', 'defaultAccount', 'currentNetworkId']),
    showMetamaskWarning() {
      return !this.web3.currentProvider;
    },
    shortAccount() {
      return shortString(this.defaultAccount)
    },
    currentRoute() {
      return this.$route.name
    },
    chainName() {
      return this.$networkConfig.chainName
    }
  },
  created() {
    this.connect()

    this.initVoteTime()

    eventBus.on('showWalletDialog', () => {
      this.walletDialogVisible = true
    })
    eventBus.on('web3Changed', () => {
      this.walletDialogVisible = false
    })
  },
  methods: {
    ...mapActions({initializeStore: 'initialize', getVoteTime: 'getVoteTime'}),
    async startOnboarding() {
      const onboarding = new MetaMaskOnboarding();
      onboarding.startOnboarding();
    },
    verifyNetworkId () {
      return this.currentNetworkId === this.$networkConfig.expectedNetworkId
    },
    handleError(error) {
      if (error.code === -32002) {
        this.$notification.warning({
          message: 'Request already pending. Please wait.',
          description: ''
        });
      }
    },
    async connect() {
      const web3 = this.web3.currentProvider;
      if (!web3) {
        return
      }
      const networkId = await this.web3.eth.net.getId();
      if (networkId.toString() !== this.$networkConfig.expectedNetworkId) {
        return
      }
      // 如果能获取到节点控制的帐户，就连接钱包
      const accounts = await this.web3.eth.getAccounts();
      if (accounts.length) {
        web3
          .request({method: 'eth_requestAccounts'})
          .then(() => {
            this.initializeStore()
          })
          .catch((requestError) => {
            console.error('requestError:: ', requestError);
            this.handleError(requestError)
          });
      }
    },
    async connectMetamask() {
      const web3 = this.web3.currentProvider;
      if (!web3) {
        return
      }
      const networkId = await this.web3.eth.net.getId()
      if (networkId.toString() !== this.$networkConfig.expectedNetworkId) {
        await this.configureMetaMask()
      }
      // 如果此时网络正确，才拉起metamask
      const networkId2 = await this.web3.eth.net.getId()
      if (networkId2.toString() === this.$networkConfig.expectedNetworkId) {
        web3
          .request({method: 'eth_requestAccounts'})
          .then(() => {
            this.initializeStore()
          })
          .catch((requestError) => {
            console.error('requestError:: ', requestError);
            this.handleError(requestError)
          });
      }
    },
    async configureMetaMask() {
      const web3 = this.web3.currentProvider;
      if (!web3) {
        return
      }

      const {
        chainId, chainName, rpcUrls, blockExplorerUrls, currencyName, currencySymbol, currencyDecimals
      } = this.$networkConfig
      try {
        await web3.request({
          method: 'wallet_switchEthereumChain',
          params: [{chainId}],
        });
      } catch (switchError) {
        if (switchError.code === 4902) {
          // 检测用户没有添加当前链
          try {
            await web3.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId,
                  chainName,
                  nativeCurrency: {
                    name: currencyName,
                    symbol: currencySymbol,
                    decimals: currencyDecimals,
                  },
                  rpcUrls,
                  blockExplorerUrls
                },
              ],
            });
          } catch (addError) {
            this.handleError(addError)
            console.error('addError:: ', addError);
            // this.$notification.error({
            //   message: addError.message,
            //   description: ''
            // });
          }
        } else {
          this.handleError(switchError)
          console.error('switchError:: ', switchError);
        }
      }
    },
    async initVoteTime () {
      const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;
      var voteTime = await this.getVoteTime(),
        interval = setInterval(() => {
          const now = new Date().getTime(),
            timeDistance = voteTime.endTime * 1000 - now;
          if(timeDistance< 0) {
            this.day = this.hour = this.min = this.sec = 0;
            clearInterval(interval);
            return;
          }
          this.day = Math.floor(timeDistance / (day));
          this.hour = Math.floor((timeDistance % (day)) / (hour));
          this.min =  Math.floor((timeDistance % (hour)) / (minute));
          this.sec = Math.floor((timeDistance % (minute)) / (second));
        }, 1000);
    },
    closeWalletDialog() {
      this.walletDialogVisible = false
    },
    changeMenu(item) {
      let key = item
      if (_.isObject(item)) {
        key = item.key
      }
      this.$router.push({
        name: key
      })
    }
  }
}
</script>

<style scoped lang="less">
.vote-time {
  height: 70px;
  line-height: 70px;
  width: 100%;
  background-color: #15ACFB;
  color: #fff;
  font-size: 18px;
  span {
    display: inline-block;
    width: 38px;
    height: 38px;
    line-height: 38px;
    font-size: 20px;
    color: #333;
    background: #fff;
    border-radius: 5px;
    margin-left: 20px;
    margin-right: 10px;
    text-align: center;
    font-weight: 500;
  }
}
@media (max-width: 576px) {
  .vote-time span {
    margin-left: 8px;
    margin-right: 4px;
  }
}

.navbar {
  height: 100px;
  display: flex;
  align-items: center;
  line-height: 64px;
  color: #fff;
  background-size: 100% 100%;
  background-color: #101027;
  box-shadow: inset 0px -1px 0px 0px #0A2A3B;

  .left {
    .logo {
      width: 125px;
    }
  }

  .right {
    display: flex;
    align-items: center;

    .menu {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      font-size: 14px;

      .item {
        position: relative;
        &.soon {
          //cursor: text !important;
          cursor: image-set(url(../assets/img/eyeemoji.png) 1x,url(../assets/img/eyeemoji.png) 2x) 15 15,pointer !important;
          &:before {
            content: 'soon';
            position: absolute;
            top: 12px;
            right: -6px;
            transform: translate(50%, -50%);
            transform-origin: 100% 0%;
            z-index: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            min-width: 20px;
            height: 20px;
            padding: 0 6px;
            color: #fff;
            font-size: 12px;
            white-space: nowrap;
            background: #101027;
            border-radius: 10px;
            box-shadow: 0 0 0 1px #fff;
          }
        }
        &:not(:last-child) {
          margin-right: 60px;
        }

        &:not(&.active) {
          cursor: pointer;
        }

        &.active {
          color: @primary-color;
        }
      }
    }

    .connect {
      margin-left: 80px;

      .ant-btn {
        width: 150px;
        height: 40px;
        border-radius: 30px;
      }
    }
  }
}
</style>