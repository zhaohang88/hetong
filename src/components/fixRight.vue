<template>
  <div class="fix-right">
    <div class="sider-wrap flex column align justify cursor">
      <img src="@/assets/lishi.png" alt="" />
      <div class="sider-item">我看过的</div>
    </div>
    <div class="sider-wrap flex column align justify cursor">
      <img src="@/assets/kefu.png" alt="" />
      <div class="sider-item">联系客服</div>
      <div class="mui-more-wrap flex align justify column">
        <div style="margin-bottom: 10px">请添加客服企业微信</div>
        <img src="@/assets/qrcode.png" alt="" />
      </div>
    </div>
    <div class="sider-wrap flex column align justify cursor">
      <img src="@/assets/fankui.png" alt="" />
      <div class="sider-item">需求反馈</div>
    </div>
    <div class="sider-wrap flex column align justify cursor">
      <img src="@/assets/back.png" alt="" />
      <div class="sider-item" @click="back">回到顶部</div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  mounted() {},
  methods: {
    back() {
      // document.body.scrollTop = document.documentElement.scrollTop = 0
      scrollTo(0, 0)
    }
  },
  destroyed() {}
}
</script>

<style scoped lang="less">
.fix-right {
  position: fixed;
  right: 0;
  top: 52%;
  z-index: 999 !important;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  .sider-wrap {
    padding-top: 10px;
    width: 44px;
    background-color: #fff;
    border-bottom: 1px solid #f4f4f4;
    &:first-child {
      border-radius: 4px 4px 0 0;
    }
    &:last-child {
      border-radius: 0 0 4px 4px;
    }
    &:hover {
      .mui-more-wrap {
        visibility: visible;
      }
    }
    .sider-item {
      padding: 11px 10px;
      display: block;
      position: relative;
      font-size: 12px;
      color: #666;
      line-height: 15px;
      text-align: center;
      word-break: break-all;
      overflow: auto;
      position: relative;

      font-family: PingFang;
      font-weight: 800;
      color: #000000;
    }

    .mui-more-wrap {
      visibility: hidden;
      position: absolute;
      width: 200px;
      height: 150px;
      background: #98a4c6;
      right: 30px;
      margin-right: 24px;
      border-radius: 8px;
      img {
        width: 100px;
        height: 100px;
      }

      &::after {
        content: '';
        width: 0px;
        height: 0px;
        border-left: 10px solid #98a4c6;
        border-right: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-top: 10px solid transparent;
        position: absolute;
        top: 75px;
        right: -18px;
      }
    }
  }
}
</style>
