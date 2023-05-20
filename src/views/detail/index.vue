<template>
  <div class="app-container">
    <cus-header :show-top-search="true" />
    <main class="flex justify">
      <div class="detail-content flex">
        <div class="left-side">
          <div class="ih-left-recommend">
            <div class="title">TOP下载榜</div>
            <div
              v-for="(item, index) in recommend"
              :key="index"
              class="context-contract-common flex align"
            >
              <img src="@/assets/word_icon.png" alt="" />
              <span class="cursor" @click="getContractDetails(item.id)">{{ item.title }}</span>
              <img v-if="item.isHot" src="@/assets/hot.png" alt="" />
            </div>
          </div>
        </div>

        <div class="mid-side">
          <el-carousel height="30px" direction="vertical" :autoplay="true">
            <el-carousel-item v-for="item in carousel" :key="item">
              <div class="user-buy-info">{{ item }}</div>
            </el-carousel-item>
          </el-carousel>

          <div class="detail-content-header flex align">
            <img src="@/assets/word_icon_1x.png" alt="" />
            {{ info.title }}
          </div>
          <div class="detail-content-list flex column align">
            <img v-for="(img, index) in info.images" :key="index" :src="imagePrefix + img" alt="" />
            <div class="read-end">
              <!-- <div v-if="showMore" class="read-end-content">
                <span @click="showMore = !showMore">点击加载更多</span>剩余13页未读
              </div>
               v-if="!showMore" -->
              <div class="read-end-content">
                试读结束，剩余{{ info.remaining_pages }}页未读，<span @click="showMore = !showMore"
                  >请下载后查阅</span
                >
              </div>
            </div>
          </div>
          <div class="ad">
            <img src="@/assets/ad.png" alt="" />
          </div>
          <div class="detail-content-bottom">
            <div class="file-desc">
              本文档为【{{
                info.title
              }}】，请使用软件OFFICE或WPS软件打开。作品中的文字与图均可以修改和编辑，图片更改请在作品中右键图片并更换，文字修改请直接点击文字进行修改，也可以新增和删除文档中的内容。
            </div>
            <div class="copyrightNotice">
              [版权声明]
              本站所有资料由用户提供并上传，若内容存在侵权，请联系客服，我们尽快处理。资料中的图片、字体、音乐等需版权方额外授权，请谨慎使用。网站中党政主题相关内容(国旗、国徽、党徽)仅限个人学习分享使用，禁止广告使用和商用。
            </div>
          </div>
          <div class="detail-bottom flex align justify-between">
            <div class="detail-left flex align">
              <img class="mr-10" src="@/assets/word_icon_2x.png" alt="" />
              <div class="goods-info">
                <div class="goods-info-top">{{ info.title }}</div>
                <div class="goods-text">{{ info.page }}页</div>
              </div>
            </div>
            <div class="detail-right">
              <div class="btn-box flex">
                <div class="contract-btn cursor btn-common" @click.stop="fileEdit">定制合同</div>
                <div class="download cursor btn-common" @click.stop="fileDown">立即下载</div>
              </div>
              <div class="tip">定制合同专业人士为你量身定制合同协议</div>
            </div>
          </div>
        </div>

        <div class="right-side">
          <img src="@/assets/adLogo.png" alt="" />
          <div class="preview-contract">
            <div class="preview-contract-title">相关文档</div>
            <div
              v-for="(item, index) in correlation"
              :key="index"
              class="preview-contract-common flex cursor"
              @click="getContractDetails(item.id)"
            >
              <div class="common-left">
                <img :src="imagePrefix + item.image" alt="" />
                <span class="img-page-num">{{ item.page }}页</span>
              </div>
              <div class="common-right f1">
                <div class="title-info">{{ item.title }}</div>
                <div class="label-all">
                  <div class="item-label">{{ item.cate_title }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <cus-footer />
    <fix-right />
  </div>
</template>

<script>
import cusHeader from '@/components/header'
import cusFooter from '@/components/footer'
import fixRight from '@/components/fixRight'
import { detailInfo } from '@/api/api'
export default {
  name: 'Search',
  components: { cusHeader, cusFooter, fixRight },
  data() {
    return {
      imagePrefix: 'http://www.97284.com/',
      carousel: [], //随机tip
      correlation: [], // 相关列表
      recommend: [], // 推荐
      info: {}, // 合同详情
      showMore: true
    }
  },
  mounted() {
    this.getContractDetails(this.$route.query.id)
  },
  methods: {
    async getContractDetails(id) {
      this.recommend = []
      this.correlation = []
      let {
        data: { data }
      } = await detailInfo({ goods_id: id })
      this.info = data.info
      this.correlation = data.correlation
      data.recommend.forEach((item, index) => {
        if (index < 5) item.isHot = true
        else item.isHot = false
        this.recommend.push(item)
      })
      this.getRandomTip(data.info.title)
    },

    getRandomTip(contractName) {
      for (let index = 0; index < 11; index++) {
        const randomMin = Math.floor(Math.random() * 21) + 1 // 在1到20之间生成一个随机数
        const tailNumber = String(Math.floor(Math.random() * 10000)).padStart(4, '0') // 如果需要，在数字前面添加零以生成三位数
        const randomString = `${randomMin}分钟前，手机尾号为 ${tailNumber} 的用户下载了《${contractName}》`

        this.carousel.push(randomString)
      }
    },

    fileEdit() {
      // TODO 弹窗
      console.log('fileEdit')
    },
    fileDown() {
      console.log('fileDown')
    }
  }
}
</script>

<style scoped lang="less">
main {
  .detail-content {
    width: 1450px;
    margin-top: 16px;

    .left-side {
      width: 250px;
      .ih-left-recommend {
        background-color: #fff;
        border-radius: 2px;
        overflow: hidden;
        margin-bottom: 12px;
        .title {
          color: #333;
          font-size: 15px;
          background: linear-gradient(180deg, #fff3dd, #fff);
          border-radius: 2px 2px 0 0;
          display: flex;
          padding: 10px;
          border-left: 4px solid #ebab4b;
        }

        .context-contract-common {
          height: 40px;
          padding: 0 12px;
          &:hover {
            background: #f5f5f5;
          }
          img:nth-child(1) {
            width: 16px;
            height: 16px;
          }
          img:nth-child(3) {
            width: 30px;
            height: 14px;
          }
          span {
            padding: 0 10px;
          }
        }
      }
    }
    .mid-side {
      width: 870px;
      margin: 0 12px;

      .user-buy-info {
        height: 30px;
        line-height: 30px;
        color: #754e19;
        font-size: 12px;
        padding-left: 18px;
        background: #fef8f2;
      }

      .detail-content-header {
        img {
          width: 26px;
          height: 26px;
          margin-right: 5px;
        }
        height: 74px;
        align-items: center;
        background-color: #fff;
        padding: 0 20px;
      }

      .detail-content-list {
        position: relative;
        overflow: hidden;
        font-size: 16px;
        color: #666;

        img {
          width: 870px;
        }
        .read-end {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          text-align: center;
          padding-bottom: 100px;
          background-color: #fff;
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 320px;
          background: linear-gradient(
            180deg,
            hsla(0, 0%, 100%, 0),
            hsla(0, 0%, 100%, 0.95) 50%,
            hsla(0, 0%, 100%, 0.95)
          );
        }
        .read-end-content > span {
          color: #ebab4b;
          cursor: pointer;
        }
      }

      .ad {
        height: 137px;
      }
      .detail-content-bottom {
        background-color: #fff;
        padding: 16px 20px;
        font-size: 13px;
        line-height: 18px;
        color: #999;

        .copyrightNotice {
          text-align: justify;
        }
      }

      .detail-bottom {
        position: sticky;
        bottom: 0px;
        margin-bottom: 20px;
        height: 106px;
        background-color: #fff;
        padding: 0 30px;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;

        // position: relative;
        // position: fixed;
        // bottom: 0;
        // z-index: 8;

        .goods-info-top {
          line-height: 20px;
          font-size: 20px;
          color: #333;
        }
        .goods-text {
          font-size: 13px;
          color: #999;
          margin-top: 10px;
        }

        .btn-common {
          width: 139px;
          height: 46px;
          line-height: 46px;
          text-align: center;
          border-radius: 23px;
        }
        .contract-btn {
          background: #fff;
          border: 1px solid #ebab4b;
          color: #ebab4b;
          margin-right: 14px;
        }
        .download {
          background: #ebab4b;
          color: #fff;
        }
        .tip {
          color: #666;
          font-size: 12px;
          text-align: right;
          margin-top: 5px;
        }
      }
    }

    .right-side {
      width: 316px;

      .preview-contract {
        padding-top: 15px;
        background: #fff;

        .preview-contract-title {
          margin: 0 18px 0 22px;
          padding-bottom: 13px;
          border-bottom: 1px solid #ddd;
        }

        .preview-contract-common {
          padding: 14px 18px 14px 22px;

          &:hover {
            box-shadow: rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px,
              rgba(17, 17, 26, 0.1) 0px 24px 80px;
            border-radius: 10px;
          }
          .common-left {
            width: 80px;
            height: 109px;
            margin-right: 14px;
            position: relative;
            box-sizing: border-box;
            overflow: hidden;
            border: 1px solid #f0f0f0;
            img {
              width: 100%;
              height: 100%;
              &:hover {
                animation: heartBeat;
                animation-duration: 1s;
              }
            }

            .img-page-num {
              position: absolute;
              right: 0;
              bottom: 0;
              width: 37px;
              height: 16px;
              line-height: 16px;
              font-size: 12px;
              text-align: center;
              color: #fff;
              background: #000;
              border-radius: 2px 0 0 0;
              opacity: 0.5;
            }
          }

          .common-right {
            .title-info {
              width: 182px;
              height: 36px;
              line-height: 18px;
              font-size: 14px;
              color: #000;
              word-break: break-all;
              margin-bottom: 8px;
              margin-top: 7px;
              padding-top: 4px;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }

            .label-all {
              height: 50px;
              overflow: hidden;
              .item-label {
                display: inline-block;
                height: 22px;
                line-height: 22px;
                padding: 0 8px;
                color: #333;
                background: #f2f2f2;
                border-radius: 4px;
                margin-right: 8px;
                margin-bottom: 8px;
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
