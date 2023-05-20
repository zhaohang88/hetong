<template>
  <div class="app-container">
    <cus-header :show-top-search="true" />
    <main class="flex column align">
      <div class="userInfoHeader flex column align justify">
        <img src="@/assets/touxiang.png" alt="" />
        <div class="nikeName">is_135245</div>
        <div class="user-id">账号：6406e88984ae9bb0cb84c091</div>
      </div>

      <el-tabs v-model="activeName" @tab-click="handleClick" class="f1 tabs-wrap">
        <el-tab-pane label="我的订单" name="orderList">
          <div class="order-item">
            <div class="order-item-no">订单号：B2023031623310468630247513</div>
            <div class="order-item-content flex justify-between">
              <span>合同名称</span> <span>下载时间: 2023-03-16</span>
              <el-button size="small">下载</el-button>
            </div>
          </div>
          <div class="order-item">
            <div class="order-item-no">订单号：B2023031623310468630247513</div>
            <div class="order-item-content flex justify-between">
              <span>合同名称</span> <span>下载时间: 2023-03-16</span>
              <el-button size="small">下载</el-button>
            </div>
          </div>
          <div class="order-item">
            <div class="order-item-no">订单号：B2023031623310468630247513</div>
            <div class="order-item-content flex justify-between">
              <span>合同名称</span> <span>下载时间: 2023-03-16</span>
              <el-button size="small">下载</el-button>
            </div>
          </div>
          <div class="order-item">
            <div class="order-item-no">订单号：B2023031623310468630247513</div>
            <div class="order-item-content flex justify-between">
              <span>合同名称</span> <span>下载时间: 2023-03-16</span>
              <el-button size="small">下载</el-button>
            </div>
          </div>
          <div class="order-item">
            <div class="order-item-no">订单号：B2023031623310468630247513</div>
            <div class="order-item-content flex justify-between">
              <span>合同名称</span> <span>下载时间: 2023-03-16</span>
              <el-button size="small">下载</el-button>
            </div>
          </div>
          <div class="order-item">
            <div class="order-item-no">订单号：B2023031623310468630247513</div>
            <div class="order-item-content flex justify-between">
              <span>合同名称</span> <span>下载时间: 2023-03-16</span>
              <el-button size="small">下载</el-button>
            </div>
          </div>
          <div class="order-item">
            <div class="order-item-no">订单号：B2023031623310468630247513</div>
            <div class="order-item-content flex justify-between">
              <span>合同名称</span> <span>下载时间: 2023-03-16</span>
              <el-button size="small">下载</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="个人信息" name="userInfo">
          <div class="account-set">
            <div class="set-item">
              <div class="set-item-info">
                <i class="iconfont icon-shouji"></i>已绑定(152****9874)
              </div>
            </div>

            <div class="set-item">
              <div class="set-item-info"><i class="iconfont icon-mima"></i>账号密码</div>
              <div class="user-bind" @click="dialogVisible = true">设置密码</div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </main>
    <cus-footer />
    <fix-right />

    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      custom-class="password-Dialog"
    >
      <div class="set-title">修改密码</div>
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="手机号码" prop="user_phone">
          <el-input v-model="form.user_phone"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="repassword">
          <el-input v-model="form.repassword"></el-input>
        </el-form-item>
      </el-form>
      <div class="account-set-submit">确认修改</div>
    </el-dialog>
  </div>
</template>

<script>
import cusHeader from '@/components/header'
import cusFooter from '@/components/footer'
import fixRight from '@/components/fixRight'
// import { classifications, search2search } from '@/api/api'
export default {
  name: 'Search',
  components: { cusHeader, cusFooter, fixRight },
  data() {
    return {
      activeName: 'orderList',
      dialogVisible: false,
      form: {
        user_phone: '',
        password: '',
        repassword: ''
      },
      rules: {
        user_phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的号码格式', trigger: 'change' }
        ],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        repassword: [
          { required: true, message: '确认新密码不能为空', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              const form = this.form
              if (value && value !== form.password) {
                callback('两次输入的密码不一样！')
              } else {
                callback()
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  mounted() {
    this.activeName = this.$route.query.type
  },
  methods: {
    handleClick(tab, event) {},
    handleClose(done) {
      this.dialogVisible = false
    }
  },
  destroyed() {}
}
</script>

<style>
.password-Dialog {
  width: 428px;
  /* height: 315px; */
  position: relative;
  padding: 0 36px 30px;
  border-radius: 4px;
  background: #fff;
  box-sizing: border-box;
}
.el-dialog__body {
  padding: 0;
}
.set-title {
  font-size: 22px;
  text-align: center;
  padding: 0 0 30px 0;
}
.account-set-submit {
  width: 356px;
  height: 44px;
  line-height: 44px;
  text-align: center;
  background: #ebab4b;
  border-radius: 22px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}
</style>

<style scoped lang="less">
.userInfoHeader {
  width: 100%;
  height: 240px;
  background-image: url('~@/assets/userInfo_bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: #dbdbdb;

  img {
    width: 80px;
    height: 80px;
    border-radius: 80px;
  }
  .nikeName {
    font-size: 18px;
    margin-top: 10px;
    max-width: 141px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .user-id {
    font-size: 14px;
    margin-top: 10px;
  }
}

.tabs-wrap {
  width: 1322px;

  /deep/ .el-tabs__nav-scroll {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    margin: 20px 0 16px;

    .el-tabs__active-bar {
      background: #ebab4b;
    }

    .el-tabs__item:hover {
      color: #ebab4b;
    }
    .is-active {
      color: #ebab4b;
    }
  }
}

/deep/ .el-tabs__content {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 23px 30px 0;
  width: 100%;
  min-height: 420px;
  margin-bottom: 20px;
}

.order-item {
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  border: 1px solid #eee;
  margin-bottom: 10px;
  position: relative;

  .order-item-no {
    height: 44px;
    background-color: #f5f5f5;
    border-radius: 3px 3px 0 0;
    display: flex;
    align-items: center;
    padding-left: 26px;
  }

  .order-item-content {
    display: flex;
    align-items: center;
    height: 58px;
    padding: 0 26px;
  }

  /deep/ .el-button:hover {
    border: #ebab4b;
    background: #fcf6f0;
    color: #ebab4b;
  }
}

.account-set {
  padding-top: 20px;
  .set-item {
    width: 542px;
    height: 62px;
    padding: 0 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e2e2e2;
    margin-top: 10px;
    margin-left: 90px;
    font-size: 16px;
    color: #333;

    .set-item-info {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    .user-bind {
      cursor: pointer;
      font-size: 14px;
      color: #ebab4b;
    }
  }
}
</style>
