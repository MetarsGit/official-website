<template>
  <div class="footer">
    <a-row type="flex" justify="center" :wrap="true">
      <a-col class="contact" :wrap="true">
        <a-row type="flex" align="middle" justify="space-between" class="contact-row">
          <a-col class="item">
            <a href="https://twitter.com/MetarsGenesis" target="_blank">
              <img src="../assets/img/twitter@2x.png" alt="" width="36">
            </a>
          </a-col>
          <a-col class="item">
            <a href="mailto:hi@metars.io">
              <img src="../assets/img/email@2x.png" alt="" width="40">
            </a>
          </a-col>
          <a-col class="item">
            <a href="https://t.me/MetarsGenesisGO" target="_blank">
              <img src="../assets/img/telegram@2x.png" alt="" width="36">
            </a>
          </a-col>
          <a-col class="item">
            <a href="https://medium.com/@MetarsGenesis" target="_blank">
              <img src="../assets/img/medium@2x.png" alt="" width="36">
            </a>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: "Footer",
  methods: {}
}
</script>

<style scoped lang="less">
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 26px;
  width: 100%;
  min-height: 120px;
  color: #B6B5C7;
  background: #000000;
  >.ant-row {
    width: 100%;
    .ant-col {
      text-align: left;
    }
  }
  .contact {
    &-row {
      width: 430px;
      max-width: 100%;
    }
    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 15px;
    }
  }
}
</style>