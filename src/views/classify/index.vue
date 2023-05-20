<template>
  <div class="app-container">
    <cus-header :show-top-search="true" @toClassify="toClassify" />
    <main class="flex column align">
      <div class="category-content">
        <div class="nav-items">
          <div
            class="nav-item"
            :class="firstChildClick == false ? 'active' : ''"
            @click="handleFirstChildClick"
          >
            全部
          </div>
          <div
            v-for="item in firstChildrenList"
            :key="item"
            class="nav-item"
            :class="firstChildren == item && firstChildClick == true ? 'active' : ''"
            @click="clickFilter(item)"
          >
            {{ item }}
          </div>
        </div>
        <div v-if="firstChildClick" class="category-items">
          <div
            class="category-item"
            :class="secondChildClick == false ? 'active' : ''"
            @click="handleSecondChildClick"
          >
            全部
          </div>
          <div
            v-for="item in secondChildrenList"
            :key="item"
            class="category-item"
            :class="secondChildren == item && secondChildClick == true ? 'active' : ''"
            @click="secondclickFilter(item)"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <!-- 筛选 -->
      <div class="screen-out">
        <span :class="clickType === 1 ? 'active' : ''" @click="querySelect(lastQueryParam, 1)"
          >综合排序</span
        >
        <span :class="clickType === 2 ? 'active' : ''" @click="querySelect(lastQueryParam, 2)"
          >热门下载</span
        >
        <span :class="clickType === 3 ? 'active' : ''" @click="querySelect(lastQueryParam, 3)"
          >最新上线</span
        >
      </div>

      <!-- 遍历合同 -->
      <div class="contract-container">
        <div class="flex flex-wrap justify-between">
          <div v-for="item in contractList" :key="item.id" class="contract-wrap" @click="fileDown">
            <!-- mask -->
            <div class="file-item-mask flex column">
              <div class="file-operate flex justify-around">
                <span class="operate file-edit" @click.stop="fileEdit">定制合同</span>
                <span class="operate file-down">立即下载</span>
              </div>
            </div>

            <img :src="imagePrefix + item.image" alt="" />
            <div class="contract-name" @click="fileDown">{{ item.title }}</div>
          </div>

          <div class="card f1 flex justify align" v-if="contractList.length == 0">
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
import { classifications, search2search } from '@/api/api'
export default {
  name: 'Search',
  components: { cusHeader, cusFooter, fixRight },
  data() {
    return {
      imagePrefix: 'http://www.97284.com/',
      // value: '',
      classificationsList: [], // 筛选栏
      firstChildClick: false, // 是否点击一级标签
      firstChildren: '', // 点击1级标签名称
      firstChildrenList: [], // 从筛选栏中获取1级标签列表
      secondChildClick: false, // 是否点击二级表亲啊
      secondChildren: '', // 点击2及标签名称
      secondChildrenList: [], // 从筛选列表中获取二级菜单
      contractList: [], // 合同列表
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
  async mounted() {
    await this.getClassification()
    if (this.$route.query.type === '1') {
      this.clickFilter(this.$route.query.value)
    } else {
      const notFetch = true
      this.getChildrenByName(this.$route.query.value)
      this.clickFilter(this.firstChildren, notFetch)
      this.secondclickFilter(this.secondChildren)
    }
    this.querySelect(this.$route.query.value)
  },
  destroyed() {},
  methods: {
    // 获取当前页面数据
    async getClassification() {
      const {
        data: { data }
      } = await classifications()
      this.classificationsList = data
      // 生成一级菜单
      this.firstChildrenList = this.classificationsList.map((item) => {
        return item.title
      })
    },
    // 点击一级菜单进行筛选时生成二级菜单
    clickFilter(target, notFetch) {
      this.firstChildClick = true // 打开点击标志 设置“全部”样式取消
      this.firstChildren = target // 设置点击到的元素样式

      let secondChildrenList = []
      this.secondChildrenList = []
      // ? this.secondChildren = ''
      this.secondChildClick = false
      if (target === '全部') return
      this.classificationsList.map((item) => {
        if (target === item.title) secondChildrenList = item.titles
      })
      this.secondChildrenList = [...secondChildrenList]

      if (!notFetch) {
        this.querySelect(target)
      }
    },

    handleFirstChildClick() {
      this.firstChildClick = false
      this.querySelect('全部')
    },

    // 二级菜单全部点击事件
    handleSecondChildClick() {
      this.secondChildClick = false
      this.querySelect(this.firstChildren)
    },

    // 二级菜单点击事件
    secondclickFilter(item) {
      this.secondChildClick = true // 打开点击标志 设置“全部”样式取消的元素样式
      this.secondChildren = item // 设置点击到
      this.querySelect(item)
    },

    // 查找二级节点的父节点
    getChildrenByName(name) {
      this.classificationsList.map((item) => {
        item.titles.map((iterator) => {
          if (iterator === name) {
            this.firstChildren = item.title
            this.secondChildren = iterator
          }
        })
      })
    },

    //
    async querySelect(value, sort = 1, page = 1) {
      const query = { value, sort, page }
      this.lastQueryParam = value
      this.clickType = sort
      const {
        data: { data }
      } = await search2search(query)
      this.contractList = data.list
      this.pagination.currentPage = data.page
      this.pagination.total = data.total
    },

    onPageChange(page) {
      this.querySelect(this.lastQueryParam, this.clickType, page)
    },

    toClassify(value, type) {
      if (type === '1') {
        this.clickFilter(value)
      } else {
        const notFetch = true
        this.getChildrenByName(value)
        this.clickFilter(this.firstChildren, notFetch)
        this.secondclickFilter(this.secondChildren)
      }
      this.querySelect(value)
    },

    fileEdit() {
      console.log('fileEdit')
    },
    fileDown() {
      console.log('fileDown')
    }
  }
}
</script>

<style scoped lang="less">
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

.category-content {
  width: 1200px;
  margin: 17px auto 25px;
  padding: 0 30px 16px;
  background: #fff;
  box-sizing: border-box;
  .nav-items {
    padding-bottom: 14px;
    border-bottom: 1px solid #ececec;
    .nav-item {
      margin-top: 20px;
      display: inline-block;
      height: 19px;
      line-height: 19px;
      font-size: 14px;
      color: #333;
      margin-right: 30px;
      text-decoration: none;
      cursor: pointer;
      &:hover {
        color: #ecb062;
      }
    }
  }
  .category-items {
    padding-bottom: 14px;
    .category-item {
      margin-top: 14px;
      display: inline-block;
      height: 17px;
      line-height: 17px;
      font-size: 13px;
      color: #333;
      margin-right: 30px;
      text-decoration: none;
      cursor: pointer;
    }
    &:hover {
      color: #ecb062;
    }
  }
}

.active {
  font-weight: 700;
  color: #ebab4b !important;
}
</style>
