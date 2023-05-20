<template>
  <header class="flex justify">
    <div class="contract-header flex align justify-between">
      <div class="left flex">
        <div class="logo-container flex align cursor" @click="jumpTargetPage('/')">
          <img src="https://pic.iask.com.cn/8Sl2tDh9j2Ym.png" alt="" />
        </div>

        <div id="classified" class="classified flex align cursor">
          <i class="el-icon-document"></i> 全部分类
        </div>

        <div id="classification" class="classification-container">
          <div
            v-for="(item, index) in classificationsList"
            :key="index"
            class="classification flex"
          >
            <div class="left">
              <div class="title cursor" @click="jumpClassify(item.title, 1)">{{ item.title }}</div>
            </div>
            <div class="right f1 flex">
              <div
                v-for="iterator in item.titles"
                :key="iterator"
                class="content cursor"
                @click="jumpClassify(iterator, 2)"
              >
                {{ iterator }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 搜索栏 -->
      <div v-if="showTopSearch" class="input-content flex align">
        <el-select
          v-model="value"
          filterable
          placeholder="搜索精品模板"
          @blur="selectBlur"
          @change="selectChage(value)"
          @keyup.enter.native="enterEvent"
        >
          <el-option v-for="item in searchRelate" :key="item" :label="item" :value="item" />
        </el-select>
        <div class="cus-button cursor" @click="searchClick">搜索</div>
      </div>
      <div class="right flex align cursor" v-if="!isLogin">
        <i class="el-icon-circle-close"></i>
        <div class="context" @click="dialogVisible = true">未登录</div>
      </div>
      <div class="right flex align cursor" v-if="isLogin">
        <img src="@/assets/touxiang.png" alt="" />
        <span class="userName">登录用户111111111111111</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="jumpUserInfo('orderList')">我的订单</el-dropdown-item>
            <el-dropdown-item @click.native="jumpUserInfo('userInfo')">个人信息</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :append-to-body="true"
      :modal-append-to-body="false"
      custom-class="m-login-layer"
    >
      <div class="layer-left"></div>
      <div class="layer-right flex column">
        <div class="layer-right-header">
          <img src="@/assets/logo.png" alt="" />
        </div>

        <div class="phone-container f1 flex column">
          <div class="form-wrap f1 flex column align">
            <div class="tab-title-container">
              <div class="tab-title" v-if="passwordLogin">
                <i class="el-icon-mobile-phone"></i>验证码登录
              </div>
              <div class="tab-title" v-else><i class="el-icon-key"></i> 密码登录</div>
            </div>
            <!-- 验证码 -->

            <el-form class="login-form" ref="login-form" :model="form" :rules="formRules">
              <el-form-item prop="mobile">
                <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item prop="code" v-if="!passwordLogin">
                <el-input v-model="form.password" placeholder="请输入密码"></el-input>
              </el-form-item>

              <el-row v-else :gutter="18">
                <el-col :span="14">
                  <el-form-item prop="code">
                    <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <!-- <el-button class="verification" :disabled="true">获取验证码</el-button> -->
                  <el-button class="verification" :disabled="true">60s后重新获取</el-button>
                </el-col>
              </el-row>

              <el-button class="login-btn" type="primary" :loading="loginLoading" @click="onLogin">
                登录
              </el-button>
            </el-form>
          </div>

          <div class="agreement-container">
            登录即代表已阅读并同意 <a class="theme-color1-hover">《服务协议》</a> 与
            <a class="theme-color1-hover">《隐私政策》</a>
          </div>
          <div class="tab-container">
            <div></div>
            <div>
              <div class="tab-btn" v-if="!passwordLogin" @click="passwordLogin = !passwordLogin">
                验证码登录
              </div>
              <div class="tab-btn" v-else @click="passwordLogin = !passwordLogin">密码登录</div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </header>
</template>

<script>
import { classifications, searchBelow } from '@/api/api'
export default {
  name: '',
  props: {
    showTopSearch: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      // showDropDown: false,
      classificationsList: [],
      searchRelate: [],
      value: '',

      isLogin: false,
      dialogVisible: false,
      passwordLogin: false,

      form: {
        mobile: '', // 手机号
        password: '', // 验证码
        code: '' // 验证码
      },
      formRules: {
        mobile: [{ required: true, message: '手机号不能为空', trigger: 'change' }]
      },
      loginLoading: false
    }
  },
  mounted() {
    const el = document.getElementById('classified')
    const dom = document.getElementById('classification')
    el.addEventListener('mouseenter', function () {
      dom.style.visibility = 'visible'
    })

    dom.addEventListener('mouseleave', function () {
      dom.style.visibility = 'hidden'
    })

    this.getClassification()
    this.getSearchBelow()
  },
  destroyed() {},
  methods: {
    jumpTargetPage(target) {
      this.$router.push(target)
    },

    // 获取全部分类
    async getClassification() {
      const {
        data: { data }
      } = await classifications()
      this.classificationsList = data
    },
    // 获取下拉菜单
    async getSearchBelow() {
      const {
        data: { data }
      } = await searchBelow()
      this.searchRelate = data
    },

    // 跳转classify 页面 并且区分类型
    jumpClassify(params, type) {
      if (this.$route.path == '/classify') {
        this.$emit('toClassify', params, type)
      } else {
        this.$router.push({ path: '/classify', query: { value: params, type } })
      }
    },

    // * =========== 搜索框逻辑开始 ===========
    selectChage(params) {
      this.$router.push({ path: '/search', query: { value: params } })
    },

    selectBlur(e) {
      let target = e.target.value
      if (target) {
        this.value = target
      }
    },

    enterEvent(e) {
      let target = e.target.value
      if (target) {
        this.value = target
        this.searchClick()
      }
    },

    searchClick() {
      if (this.value == '') {
        this.$message.error('请输入要搜索的内容')
        return
      }
      this.$router.push({ path: '/search', query: { value: this.value } })
    },

    // * =========== 搜索框逻辑结束 ===========

    // * =========== 跳转详情页 =================

    jumpUserInfo(type) {
      this.$router.push({ path: '/userinfo', query: { type } })
    },

    handleClose(done) {
      this.dialogVisible = false
    },

    onLogin() {
      this.loginLoading = true

      setTimeout(() => {
        this.isLogin = true
        this.dialogVisible = false
        this.loginLoading = false
      }, 2000)
    }
  }
}
</script>

<style lang="less" scoped>
// .password-Dialog {
//   width: 428px;
//   /* height: 315px; */
//   position: relative;
//   padding: 0 36px 30px;
//   border-radius: 4px;
//   background: #fff;
//   box-sizing: border-box;
// }

/deep/ .el-input__inner {
  width: 100% !important;
}
/deep/ .el-dialog__header {
  padding: 0;
}
/deep/ .el-dialog__body {
  display: flex;
  padding: 0;
}
/deep/ .el-dialog {
  height: 472px;
  width: 715px;
  border-radius: 5px;
}

.m-login-layer {
  .layer-left {
    width: 273px;
    height: 472px;
    border-radius: 5px 0 0 5px;
    background: url('~@/assets/loginInfo.png') no-repeat;
    background-size: 100% 100%;
  }
  .layer-right {
    width: 442px;
    height: 472px;
    border-radius: 0 5px 5px 0;

    .layer-right-header {
      text-align: center;
      padding: 40px 0 28px;
      img {
        height: 100%;
        max-height: 46px;
      }
    }

    .phone-container {
      .form-wrap {
        .login-form {
          margin-top: 16px;
          width: 70%;
          .login-btn {
            width: 100%;
            margin-top: 20px;
          }
        }

        .verification {
          width: 100%;
          padding: 13px !important;
        }
      }

      .agreement-container {
        font-size: 13px;
        color: #999;
        text-align: center;
        margin-bottom: 24px;
        .theme-color1-hover:hover {
          color: #21346f;
          cursor: pointer;
        }
      }

      .tab-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 55px;
        line-height: 55px;
        border-top: 1px solid #eaeaea;
        box-sizing: border-box;
        margin: 0 19px;
        overflow: hidden;

        .tab-btn {
          cursor: pointer;
        }
      }
    }
  }
}
</style>

<style scoped lang="less">
/deep/ .el-input__inner {
  height: 42px;
  line-height: 42px;
  width: 340px;
  border-radius: 4px 0 0 4px;
}
/deep/.el-select .el-input__inner:focus {
  border-color: #ccc;
}

.cus-button {
  color: #fff;
  width: 132px;
  height: 42px;
  line-height: 42px;
  text-align: center;
  background: #224fd8;
  font-size: 18px;
  border-radius: 0 4px 4px 0;
}

header {
  position: fixed;
  top: 0;
  z-index: 9;
  width: 100%;
  background-color: #fff;
}

.contract-header {
  max-width: 1380px;
  min-width: 1200px;
  height: 66px;
  line-height: 66px;
  border-bottom: none;

  color: #666;
  font-family: sans-serif;
  // box-shadow: 0 2px 10px 0 rgb(0 0 0 / 5%);
  .left {
    .logo-container > img {
      width: 200px;
      height: 36px;
    }

    .classified {
      margin-left: 80px;
      i {
        margin-right: 5px;
      }
    }
  }

  .right {
    .context {
      margin-left: 5px;
    }
    .context:hover {
      color: #ecb158;
    }

    .userName {
      max-width: 91px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      display: block;
      font-size: 13px;
      line-height: 13px;
    }
    img {
      width: 30px;
    }
  }
}

.classification-container {
  visibility: hidden;
  position: fixed;
  left: 50%;
  top: 66px;
  margin-left: -600px;
  width: 1200px;
  line-height: 1;
  background: #fff;
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 22%);
  padding: 13px 50px;
  z-index: 9;
  .classification {
    // height: 30px;
    padding: auto;
    align-items: flex-start;
    border-bottom: 1px dashed #ccc;
    &:last-child {
      border: none;
    }
    .title {
      margin-top: 16px;
      margin-bottom: 16px;
      font-size: 16px;
      font-weight: 700;
      color: #222;
      padding-left: 6px;
      border-left: 4px solid #ebab4b;
    }

    .right {
      flex-wrap: wrap;
    }
    .content {
      margin: 8px 10px;
      padding: 8px 20px;
      &:hover {
        color: #ecb056;
        background: #fff3e2;
      }
    }
  }
}

// /deep/ .el-dropdown-menu__item:hover {
//   color: #ebab4b;
//   background: #fcf6f0;
// }
</style>
