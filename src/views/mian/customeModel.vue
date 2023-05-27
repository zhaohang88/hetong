<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :before-close="handleClose"
    :append-to-body="true"
    :modal-append-to-body="false"
    custom-class="Law-dialog"
  >
    <div class="law-title">合同定制</div>
    <div class="law-main f1 flex">
      <div class="law-left">
        <img src="@/assets/custome_info.jpg" alt="" />
      </div>
      <div class="law-right f1 flex column">
        <div class="law-type">服务类型</div>
        <img class="custome-png" src="@/assets/custome.png" alt="" />
        <div class="law-type">联系方式</div>

        <el-form ref="form" :model="form" :rules="rules" label-width="90px">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="微信号" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-form>

        <div class="law-type">事项描述</div>
        <el-input
          :rows="5"
          type="textarea"
          :autosize="false"
          v-model="form.name"
          style="margin-top: 10px"
          placeholder="例如：员工不想买社保，怕到时候出现什么问题，要跟 员工签一个什么样的用工合同，员工不想买社保，怕到 时候出现什么问题，要跟员工"
        >
        </el-input>

        <div class="pay-container f1 flex column align">
          <div class="pay-qrcode-container">
            <img class="pay-qrcode" src="@/assets/qrcode.png" alt="微信二维码" title="微信二维码" />
            <!-- TODO -->
            <iframe ref="zfb" width="200px" height="200px"></iframe>
          </div>
          <div class="alter">支付定金会优先安排律师</div>
          <div class="pay-alter">支付金额：<span class="pay">￥ 199.99</span></div>

          <div class="f1 file-item-mask flex column">
            <div class="file-operate flex justify-around">
              <span class="operate file-edit" @click.stop="fileEdit">定制合同</span>
              <span class="operate file-down">立即下载</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import Vue from 'vue';

export default {
  name: '',
  data() {
    return {
      dialogVisible: false,
      form: {},
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
      }
    }
  },
  mounted() { },
  methods: {
    async getZfb() {
      console.log(this.$refs.zfb);
      console.log(this.$refs.zfb.contentWindow.document.body);
      this.$refs.zfb.contentWindow.document.body.innerHTML = `
        <form id='alipaysubmit' name='alipaysubmit' action='https://openapi.alipay.com/gateway.do?charset=utf-8' method='post'>
          <input type='hidden' name='app_id' value='2021003182683809' /><input type='hidden' name='charset' value='utf-8' />
          <input type='hidden' name='format' value='JSON' />
          <input type='hidden' name='version' value='1.0' />
          <input type='hidden' name='sign_type' value='RSA2' />
          <input type='hidden' name='timestamp' value='2023-05-19 22:16:21' />
          <input type='hidden' name='notify_url' value='http://www.97284.com/api/Ailnotify/index' />
          <input type='hidden' name='return_url' value='http://www.97284.com/web/' />
          <input type='hidden' name='method' value='alipay.trade.page.pay' />
          <input type='hidden' name='biz_content' value='{"product_code":"FAST_INSTANT_TRADE_PAY","out_trade_no":"646784b500b02","total_amount":"0.01","subject":"支付订单描述","qr_pay_mode":4}' />
          <input type='hidden' name='sign' value='H3Fyf8MQlyzvKPNbOcV982e6yWRHqXMOWuIEqHgyRSuQUZ+z5qU9ru3alSwGouVho0uXriXkfjkztVShZ6g3omuOLM83g7B53DDG305HFxVShg11RAkm/LHXC8Cy2kkJXwDjZHlYuRrt/LgUIWY6msIdLwovosutTxvgnqxWPFCQWjU9pwiqqjdVDYs9NUkUdF+ILKRC4FhPAgvyDCy3zu2/Z6WHD79Fl0Q0LwoBJf0LeJsxyqBLrZK/GQJbVf6FvveRbefjLO0VJbt9SU1qh2aMLt8f5TliXx06ZcJSwDWH55MmY5FL3xwwigkEoRmivOqoxWK2f/SupNVgyiYbgg==' />
          <input type='submit' value='ok' style='display:none;'>
        </form>
      `;
      this.$refs.zfb.contentWindow.document.getElementById('alipaysubmit').submit();
    },
    
    show() {
      this.dialogVisible = true
    },

    handleClose(done) {
      this.dialogVisible = false
    }
  },
  destroyed() {}
}
</script>

<style lang="less" scoped>
/deep/ .el-form-item {
  margin-bottom: 10px;
}
/deep/ .el-form-item__label {
  padding-left: 10px;
  text-align: justify;
  text-align-last: justify;
}
/deep/ .el-input__inner {
  height: 32px !important;
  line-height: 32px !important;
  width: 210px !important;
}

/deep/ .el-dialog__header {
  padding: 0;
}
/deep/ .el-dialog__body {
  flex: 1;
  padding: 0;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
}
/deep/ .el-dialog {
  height: 760px;
  width: 1100px;
  border-radius: 5px;
  display: flex;
}

.Law-dialog {
  .law-title {
    width: 100%;
    height: 46px;
    line-height: 46px;
    text-align: center;
    color: #fff;
    background: #04034b;
    border-radius: 4px 4px 0 0;
    font-size: 16px;
  }
  .law-main {
    .law-left {
      width: 780px;
      height: 700px;
      text-align: center;
      padding-top: 10px;
      border-right: 1px solid #e5e5e5;
      overflow-y: scroll;
    }
    .law-right {
      padding: 20px 10px 16px 10px;

      .law-type {
        font-size: 14px;
        font-family: PingFang;
        font-weight: 500;
        color: #000000;

        border-left: 4px solid #214fd8;
        border-radius: 3px;
        padding-left: 4px;
      }

      .custome-png {
        margin: 8px 0 20px 0;
      }

      .pay-container {
        margin-top: 36px;
        text-align: center;
        font-weight: 500;
        color: #000000;

        // .pay-qrcode-container {
        //   height: 200px;
        //   display: flex;
        // }

        .pay-qrcode {
          width: 200px;
          height: 200px;
          border: 1px solid #000125;
          border-radius: 4px;
        }
        .alter {
          margin-top: 5px;
          font-size: 12px;
        }
        .pay-alter {
          margin-top: 5px;
          font-size: 14px;
        }
        .pay {
          font-size: 20px;
          font-weight: 800;
          color: #f10000;
        }

        .file-item-mask {
          width: 100%;
          justify-content: flex-end;

          .file-operate {
            .operate {
              width: 125px;
              height: 40px;
              line-height: 40px;
              border-radius: 20px;
              text-align: center;
              cursor: pointer;
              box-sizing: border-box;
            }
            .file-edit {
              color: #ebab4b;
              background: #fff;
              border: 1px solid #ebab4b;
            }
            .file-down {
              background: #ebab4b;
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>
