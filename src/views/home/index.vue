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
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from "@/api/user";
// 加载文章列表子组件
import ArticleList from "./components/article-list";
export default {
  name: "HomeIndex",
  components: {
    // 注册文章列表组件
    ArticleList,
  },
  data() {
    return {
      active: 0,
      // 频道列表
      channels: [],
    };
  },
  created() {
    this.loadChaanels();
  },
  methods: {
    async loadChaanels() {
      // 请求获取频道数据
      const { data } = await getUserChannels();
      // console.log(data);
      this.channels = data.data.channels;
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
}
</style>