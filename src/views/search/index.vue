<template>
  <div class="app-container">
    <cus-header />
    <main class="flex column align">
      <!-- 搜索栏 -->
      <div class="search-container flex align justify" style="height: 120px">
        <div class="input-content flex">
          <el-select
            v-model="value"
            filterable
            placeholder="搜索精品模板"
            @blur="selectBlur"
            @change="getResult(value)"
            @keyup.enter.native="enterEvent"
          >
            <el-option v-for="item in searchRelate" :key="item" :label="item" :value="item" />
          </el-select>
          <div class="cus-button cursor" @click="searchClick">搜索</div>
        </div>
      </div>
      <!-- alter -->
      <div class="alter flex">
        <div class="left">你要找的是不是：</div>
        <div class="f1 right flex-warp">
          <span v-for="item in recommend" :key="item" class="recommend-detail">
            {{ item }}
          </span>
        </div>
      </div>

      <!-- 筛选 -->
      <div class="screen-out">
        <span :class="clickType === 1 ? 'active' : ''" @click="getResult(lastQueryParam, 1)"
          >综合排序</span
        >
        <span :class="clickType === 2 ? 'active' : ''" @click="getResult(lastQueryParam, 2)"
          >热门下载</span
        >
        <span :class="clickType === 3 ? 'active' : ''" @click="getResult(lastQueryParam, 3)"
          >最新上线</span
        >
      </div>

      <!-- 遍历合同 -->
      <div class="contract-container">
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
      </div>

      <el-pagination
        background
        style="margin-bottom: 20px"
        layout="prev, pager, next"
        :total="pagination.total"
        :page-size="pagination.pageSize"
        :current-page.sync="pagination.currentPage"
        @current-change="onPageChange"
      />
    </main>
    <cus-footer />
    <fix-right />
  </div>
</template>

<script>
import cusHeader from '@/components/header'
import cusFooter from '@/components/footer'
import fixRight from '@/components/fixRight'
import { contracts, search } from '@/api/api'
export default {
  name: 'Search',
  components: { cusHeader, cusFooter, fixRight },
  data() {
    return {
      imagePrefix: 'http://www.97284.com/',
      recommend: [], // 推荐
      searchRelate: [], // 下拉菜单
      contractsList: [], // 遍历合同合集
      value: '', // 搜索框值
      pagination: {
        // pageSize: 1,
        pageSize: 40,
        currentPage: 1,
        total: 0
      },
      lastQueryParam: '', // 上次查询参数
      clickType: 1 // 点击的查询类型
    }
  },
  mounted() {
    this.getContracts()
    this.value = this.$route.query.value
    this.getResult(this.value)
  },
  methods: {
    fileEdit() {
      console.log('fileEdit')
    },
    fileDown(id) {
      console.log('fileDown', id)
    },
    // 获取下拉菜单栏内容
    async getContracts() {
      const {
        data: { data }
      } = await contracts()
      this.searchRelate = data.search_below
    },

    async getResult(value, sort = 1, page = 1) {
      let queryParams = { value, sort, page }
      this.lastQueryParam = value
      this.clickType = sort
      let {
        data: { data }
      } = await search(queryParams)
      // this.recommend = data.search_below
      this.contractsList = data.list
      this.pagination.currentPage = data.page
      this.pagination.total = data.total
    },

    onPageChange(page) {
      this.getResult(this.lastQueryParam, this.clickType, page)
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
      this.getResult(this.value)
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .el-input__inner {
  height: 62px;
  line-height: 62px;
  width: 700px;
  border-radius: 4px 0 0 4px;
}
/deep/ .el-input__suffix {
  display: none;
}

.active {
  font-weight: 700;
  color: #ebab4b !important;
}
.search-container {
  background: url('~@/assets/deatil_search_bg.png') no-repeat;
  background-size: 100% 100%;
}
.alter {
  width: 1200px;
  padding: 0 30px;
  padding-top: 20px;
  box-sizing: border-box;
  // padding-bottom: 10px;
  color: #999;
  background: #fff;
  font-size: 14px;
  .left {
    padding-top: 6px;
  }
  .recommend-detail {
    display: inline-block;
    padding: 6px 9px;
    background: #f2f4f7;
    font-size: 14px;
    margin-right: 19px;
    margin-bottom: 15px;
    cursor: pointer;
    color: #999;
  }
}

.screen-out {
  width: 1200px;
  font-size: 14px;
  color: #666;
  margin: 26px 0 25px;
  justify-content: flex-start;
  span {
    display: inline-block;
    width: 100px;
    cursor: pointer;
    &:hover {
      color: #ebb061;
    }

    &:nth-child(1) {
      text-align: left;
    }
    &:nth-child(2) {
      text-align: center;
      border: 1px solid #ccc;
      border-top: none;
      border-bottom: none;
    }
    &:nth-child(3) {
      text-align: right;
    }
  }
  .active {
    font-weight: 700;
    color: #ebb061;
  }
}
</style>
