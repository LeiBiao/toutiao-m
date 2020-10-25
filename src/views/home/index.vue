<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar">
      <!-- 搜索按钮 -->
      <van-button
        class="search-btn"
        slot="title"
        icon="search"
        type="info"
        round
        to="/search"
      >
        搜索</van-button
      >
    </van-nav-bar>
    <!-- 文章频道 -->
    <van-tabs class="tabs" v-model="active" animated sticky>
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        <!-- 文章列表组件 -->
        <article-list :channel="channel" />
      </van-tab>
      <!-- 占位避免汉堡挡住文章频道 -->
      <div slot="nav-right" class="place"></div>
      <!-- 汉堡按钮 -->
      <div class="navright" slot="nav-right">
        <van-icon name="wap-nav" @click="show = true" />
      </div>
    </van-tabs>
    <!-- 弹出层 -->
    <!-- get-container="body"挂载到body -->
    <van-popup
      v-model="show"
      position="bottom"
      closeable
      close-icon-position="top-left"
      get-container="body"
      :style="{ height: '100%' }"
    >
      <!-- 频道编辑组件 -->
      <channel-edit
        :channels="channels"
        :active="active"
        @close="show = false"
        @update-active="onUpdateActive"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from "@/api/user";
// 加载文章列表子组件
import ArticleList from "./components/article-list";
// 加载频道编辑子组件
import ChannelEdit from "./components/channel-edit";
import { mapState } from "vuex";
import { getItem } from "@/utils/storage";
export default {
  name: "HomeIndex",
  components: {
    // 注册文章列表组件
    ArticleList,
    // 注册频道编辑组件
    ChannelEdit,
  },
  data() {
    return {
      active: 0,
      // 频道列表
      channels: [],
      //编辑频道的显示状态
      show: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    this.loadChaanels();
  },
  methods: {
    async loadChaanels() {
      // 请求获取频道数据
      // const { data } = await getUserChannels();
      // this.channels = data.data.channels;
      let channels = [];
      if (this.user) {
        // 以登陆,获取线上用户的用户频道列表数据
        const { data } = await getUserChannels();
        channels = data.data.channels;
      } else {
        // 未登录,判断是否有本地存储的频道列表数据
        const localChannels = getItem("user-channels");
        //如果有本地存储的频道列表
        if (localChannels) {
          channels = localChannels;
        } else {
          // 用户未登录,且没有本地存储的频道,就请求获取默认的频道列表
          const { data } = await getUserChannels();
          channels = data.data.channels;
        }
      }
      // 把处理好的数据放到data中供模板使用
      this.channels = channels;
    },
    // 切换频道
    onUpdateActive(index) {
      this.active = index;
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    background: #53a8ff;
    border: none;
  }
  .tabs {
    /deep/.van-tabs__line {
      width: 15px;
      height: 3px;
      background: #2a92fe;
    }
  }
  .place {
    width: 33px;
    flex-shrink: 0;
  }
  .navright {
    position: fixed;
    right: 0;
    width: 33px;
    height: 43px;
    // margin-top: 10px;
    background: #fff;
    opacity: 0.9;
    .van-icon {
      font-size: 22px;
      line-height: 44px;
    }
  }
}
</style>