<template>
  <div class="my-container">
    <!-- 头部 -->
    <van-cell-group v-if="user" class="header-bg">
      <van-cell center class="base-info" :border="false">
        <van-image
          solt="icon"
          class="image"
          round
          width="50"
          height="50"
          fit="cover"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <span class="name" solt="title">昵称</span>
        <van-button slot="right-icon" round size="small" class="about"
          >编辑资料</van-button
        >
      </van-cell>
      <!-- 头部-宫格 -->
      <van-grid class="heaer-grid" :border="false">
        <van-grid-item class="heaer-grid-item">
          <span slot="icon">123</span>
          <span slot="text">头条</span>
        </van-grid-item>
        <van-grid-item class="heaer-grid-item">
          <span slot="icon">123</span>
          <span slot="text">关注</span>
        </van-grid-item>
        <van-grid-item class="heaer-grid-item">
          <span slot="icon">123</span>
          <span slot="text">粉丝</span>
        </van-grid-item>
        <van-grid-item class="heaer-grid-item">
          <span slot="icon">123</span>
          <span slot="text">获赞</span>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <div v-else class="not-login">
      <img @click="$router.push('/login')" src="./nologin.png" />
      <div>登录/注册</div>
    </div>
    <!-- 历史\收藏 -->
    <van-grid class="hos-grid mb-4" :column-num="2">
      <van-grid-item
        class="start"
        icon-prefix="toutiao"
        icon="favorite"
        text="收藏"
      />
      <van-grid-item class="clock" icon="clock-o" text="历史" />
    </van-grid>
    <!-- 导航 -->
    <van-cell title="消息通知" is-link to="" />
    <van-cell class="mb-4" title="我的助手" is-link to="" />
    <van-cell v-if="user" class="exit" title="退出登录" />
    <!-- 注销按钮 -->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MyIndex",
  data() {
    return {};
  },
  computed: {
    // 用户信息
    ...mapState(["user"]),
  },
};
</script>

<style lang="less">
.my-container {
  .not-login {
    box-sizing: border-box;
    text-align: center;
    background: url("./background.png") no-repeat;
    background-size: cover;
    height: 180px;
    // padding-top: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 80px;
      height: 80px;
    }
    div {
      font-size: 18px;
      margin-top: 10px;
      color: #fff;
    }
  }
  .header-bg {
    background: url("./background.png") no-repeat;
    background-size: cover;
    .base-info {
      height: 115px;
      box-sizing: border-box;
      padding-top: 38px;
      padding-bottom: 11px;
      background-color: unset;

      .image {
        vertical-align: middle;
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        box-sizing: border-box;
      }
      .name {
        margin-left: 11px;
        color: #fff;
        font-size: 15px;
      }
      .about {
        height: 18px;
        font-size: 10px;
        color: #666;
      }
    }
    .heaer-grid {
      height: 70px;
      .heaer-grid-item {
        color: #fff;
        font-size: 14px;
      }
    }

    .van-grid-item__content {
      background: unset;
      // display: inline;
    }
  }
  .hos-grid {
    .start {
      .toutiao-favorite:before {
        font-size: 28px;
      }
      .van-grid-item__icon {
        color: #eb5253;
      }
    }
    .clock {
      .toutiao-favorite:before {
        font-size: 28px;
      }
      .van-grid-item__icon {
        color: #ff9f19;
      }
    }
  }
  .exit {
    text-align: center;
    color: #e36e62;
  }
  .mb-4 {
    margin-bottom: 4px;
  }
}
</style>