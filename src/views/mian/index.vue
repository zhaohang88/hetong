<template>
  <div class="app-container">
    <cus-header />
    <main class="flex column align">
      <!-- 搜索栏 -->
      <div class="search-container flex align justify">
        <div class="search-util flex column justify-between">
          <div class="input-content flex">
            <el-select
              v-model="value"
              filterable
              placeholder="搜索精品模板"
              @blur="selectBlur"
              @change="selectChage(value)"
              @keyup.enter.native="enterEvent"
            >
              <el-option v-for="item in searchRelate" :key="item" :value="item" />
            </el-select>
            <div class="cus-button cursor" @click="searchClick">搜索</div>
          </div>
          <div class="relate-content flex justify-around cursor">
            <span v-for="(item, index) in searchRelate" :key="index" @click="selectChage(item)">{{
              item
            }}</span>
          </div>
        </div>
      </div>

      <!-- banner -->
      <!-- <div class="recommend-container flex justify-between">
        <img src="@/assets/gerenhetong.png" @click="imgClick('个人合同', 1)" />
        <img src="@/assets/hunyinjiating.png" @click="imgClick('婚姻家庭', 1)" />
        <img src="@/assets/laodonghetong.png" @click="imgClick('劳动合同', 1)" />
        <img src="@/assets/touzimaimai.png" @click="imgClick('投资买卖', 1)" />
      </div> -->
      <div class="recommend-container flex justify-between">
        <img src="@/assets/hetongdingzhi.png" @click="showCustomeModel" />
        <img src="@/assets/fengxianshencha.png" @click="showExamineModel" />
        <img src="@/assets/zixunlvshi.png" />
        <img src="@/assets/hetongmuban.png" @click="imgClick" />
      </div>

      <!-- 精选推荐 -->
      <div class="contract-container">
        <div class="title">精选推荐</div>

        <div class="flex flex-wrap justify-between">
          <div
            v-for="item in contractsList"
            :key="item.id"
            class="contract-wrap"
            @click="fileDown(item)"
          >
            <!-- mask -->
            <div class="file-item-mask flex column">
              <div class="file-operate flex justify-around">
                <span class="operate file-edit" @click.stop="fileEdit">定制合同</span>
                <span class="operate file-down">立即下载</span>
              </div>
            </div>

            <img :src="imagePrefix + item.image" alt="" />
            <div class="contract-name" @click="fileDown(item)">
              {{ item.title }}
            </div>
          </div>

          <div class="card f1 flex justify align" v-if="contractsList.length == 0">
            这里暂时没有内容... 请联系管理员添加
          </div>
        </div>

        <!-- 下载图片 -->
        <div class="bom-banner-list flex justify">
          <img class="cursor" src="@/assets/download.png" alt="" />
        </div>
      </div>
    </main>
    <cus-footer />
    <fix-right />
    <custome-model ref="customeModel" />
    <examine-model ref="examineModel" />
  </div>
</template>

<script>
import cusHeader from '@/components/header'
import cusFooter from '@/components/footer'
import fixRight from '@/components/fixRight'
import customeModel from './customeModel'
import examineModel from './examineModel'
import { contracts, searchBelow } from '@/api/api'
export default {
  name: '',
  components: { cusHeader, cusFooter, fixRight, customeModel, examineModel },
  data() {
    return {
      value: '',
      imagePrefix: 'http://www.97284.com/',
      searchRelate: [],
      contractsList: []
    }
  },
  mounted() {
    this.getContracts()
    this.getSearchBelow()
  },
  methods: {
    async getContracts() {
      const {
        data: { data }
      } = await contracts()
      this.contractsList = data.list
    },

    // 获取下拉菜单
    async getSearchBelow() {
      const {
        data: { data }
      } = await searchBelow()
      this.searchRelate = data
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

    // *点击图片跳转
    imgClick(params, type) {
      this.$router.push({ path: '/classify', query: { value: params, type } })
    },

    fileEdit() {
      // TODO 弹窗
      console.log('fileEdit')
    },
    fileDown(params) {
      this.$router.push({ path: '/detail', query: { id: params.id } })
    },

    // dialog
    showCustomeModel() {
      this.$refs.customeModel.show()
    },

    showExamineModel() {
      this.$refs.examineModel.show()
    }
  }
}
</script>

<style scoped lang="less">
@import '../../styles/font';
/deep/ .el-input__inner {
  height: 62px;
  line-height: 62px;
  width: 700px;
  border-radius: 4px 0 0 4px;
}
/deep/ .el-input__suffix {
  display: none;
}
.app-container {
  .search-container {
    height: 275px;
    padding-top: 140px;
    position: relative;
    .btn {
      cursor: pointer;
      position: absolute;
      top: 0;
      left: 0;
      color: #fff;
    }
    .btn1 {
      cursor: pointer;
      position: absolute;
      top: 0;
      left: 50px;
      color: #fff;
    }
    .btn3 {
      cursor: pointer;
      position: absolute;
      top: 0;
      left: 100px;
      color: #fff;
    }
  }
  .recommend-container {
    width: 1200px;
    margin: 20px 0;
    img {
      width: 290px;
      height: 140px;
      cursor: pointer;
    }
  }

  .title {
    font-size: 20px;
    font-weight: 400;
    padding-left: 6px;
    border-left: 4px solid #224fd8;
    margin-bottom: 20px;

    font-size: 20px;
    font-family: AliHYAiHei;
    color: #000000;
  }

  .bom-banner-list > img {
    width: 220px;
    height: 87px;
    margin: 30px 0 50px 0;
  }
}
</style>
