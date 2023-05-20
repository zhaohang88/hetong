<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :before-close="handleClose"
    :append-to-body="true"
    :modal-append-to-body="false"
    custom-class="Law-dialog"
  >
    <div class="law-title">合同审核</div>
    <div class="law-main f1 flex">
      <div class="law-left">
        <img src="@/assets/examine_info.jpg" alt="" />
      </div>
      <div class="law-right f1 flex column">
        <div class="law-type">服务类型</div>
        <img class="custome-png" src="@/assets/examine.png" alt="" />
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
          :rows="2"
          type="textarea"
          :autosize="false"
          v-model="form.name"
          style="margin-top: 10px; margin-bottom: 10px"
          placeholder="例如：员工不想买社保，怕到时候出现什么问题，要跟员工签一个什么样的用工合同"
        >
        </el-input>

        <div class="law-type">上传文件</div>
        <el-upload class="upload-demo" drag multiple>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>

        <div class="pay-container f1 flex column align">
          <img class="pay-qrcode" src="@/assets/qrcode.png" alt="" />
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
  mounted() {},
  methods: {
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
/deep/ .el-upload-dragger {
  width: 302px;
  height: 80px;
  line-height: 80px;
  margin-top: 10px;
}
/deep/ .el-form-item {
  margin-bottom: 5px;
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
        text-align: center;
        font-weight: 500;
        color: #000000;

        .pay-qrcode {
          margin-top: 5px;
          width: 92px;
          height: 92px;
          border: 1px solid #000125;
          border-radius: 4px;
        }
        .alter {
          margin-top: 5px;
          font-size: 12px;
        }
        .pay-alter {
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
