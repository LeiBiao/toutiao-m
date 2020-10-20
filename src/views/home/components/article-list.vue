<template>
  <div class="article-list">
    <!-- 下拉刷新 -->
    <van-pull-refresh
      v-model="isLoading"
      :success-text="loadingText"
      :success-duration="1500"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-item
          v-for="(article, index) in articles"
          :key="index"
          :article="article"
        />

        <!-- <van-cell
          v-for="(article, index) in articles"
          :key="index"
          :title="article.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api/article";
import ArticleItem from "@/components/article-item";
export default {
  name: "ArtileList",
  components: {
    ArticleItem,
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      articles: [], //数据列表
      loading: false, //控制加载中的loading状态
      finished: false, //控制加载结束的状态
      timestamp: null, //获取下一页时间戳
      isLoading: false, //下拉刷新的状态
      loadingText: "", //上拉刷新的提示
    };
  },
  methods: {
    async onLoad() {
      // 请求获取数据
      const { data } = await getArticles({
        channel_id: this.channel.id, //频道id
        //时间戳,相当于页码,请求最新数据使用当前最新的时间戳,下一页数据使用上一次返回的数据中的时间戳
        timestamp: this.timestamp || Date.now(),
        // 是否包含置顶,1-置顶,0-不置顶,必须写
        with_top: 1,
      });
      // console.log(data);
      // 把数据放入list数组当中
      const { results } = data.data;
      this.articles.push(...results);
      // 设置本次加载结束,他才可以判断是否加载下一次
      this.loading = false;

      //数据全部加载完成
      if (results.length) {
        // 更新获取下一页数据页码
        this.timestamp = data.data.pre_timestamp;
      } else {
        // 没有数据了,把加载设置结束,不在触发加载更多
        this.finished = true;
      }
    },
    async onRefresh() {
      //请求数据
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1,
      });
      // 往数据列表顶部追加数据
      const { results } = data.data;
      this.articles.unshift(...results);
      // 关闭刷新状态
      this.isLoading = false;
      this.loadingText = `更新了${results.length}条数据`;
    },
  },
};
</script>

<style lang="less" scoped>
.article-list {
  // position: fixed;
  //   left: 0;
  //   right: 0;
  //   top: 56px;
  margin-bottom: 50px;
  //   overflow-y: auto;
}
</style>