<template>
  <div class="article container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar" left-arrow @click-left="$router.back()" />
    <!-- 文章标题 -->
    <h1 class="title">
      {{ article.title }}
    </h1>
    <!-- 作者栏 -->
    <van-cell class="user-info" center>
      <div class="name" slot="title">{{ article.aut_name }}</div>
      <van-image
        class="avatar"
        slot="icon"
        fit="cover"
        round
        :src="article.aut_photo"
      >
      </van-image>
      <div class="pubdate" slot="label">{{ article.pubdate }}</div>
      <van-button
        class="btn"
        :type="article.is_followed ? 'default' : 'info'"
        round
        size="small"
        :icon="article.is_followed ? '' : 'plus'"
        >{{ article.is_followed ? "已关注" : "关注" }}</van-button
      >
    </van-cell>
    <div
      class="markdown-body"
      v-html="article.content"
      ref="article-content"
    ></div>
  </div>
</template>

<script>
import "./github-markdown.css";
import { getArticleById } from "@/api/article";
import { ImagePreview } from "vant";

export default {
  // 组件名称
  name: "ArticleIndex",
  // 组件参数 接收来自父组件的数据
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true,
    },
  },
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      article: {}, //文章数据对象
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    async loadArticle() {
      const { data } = await getArticleById(this.articleId);
      this.article = data.data;

      this.$nextTick(() => {
        this.handlePerviewImage();
      });
    },
    handlePerviewImage() {
      // 获取文章内容DOM
      const articleContent = this.$refs["article-content"];
      // 获取所有的img标签
      const imgs = articleContent.querySelectorAll("img");
      const imgPaths = []; //预览图片路径列表
      imgs.forEach((img, index) => {
        imgPaths.push(img.src);
        img.onclick = function () {
          ImagePreview({
            images: imgPaths,
            startPosition: index,
          });
        };
      });
    },
  },
  // 以下是生命周期钩子
  /**
   * 在实例初始化之后，组件属性计算之前，如data属性等
   */
  beforeCreate() {},
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {
    this.loadArticle();
  },
  /**
   * 在挂载开始之前被调用：相关的 render 函数首次被调用。
   */
  beforeMount() {},
  /**
   * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
   * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
   */
  mounted() {},
  /**
   * 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。
   * 你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
   */
  beforeUpdate() {},
  /**
   * 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
   * 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。
   */
  updated() {},
  /**
   * keep-alive 组件激活时调用。 仅针对keep-alive 组件有效
   */
  activated() {},
  /**
   * keep-alive 组件停用时调用。 仅针对keep-alive 组件有效
   */
  deactivated() {},
  /**
   * 实例销毁之前调用。在这一步，实例仍然完全可用。
   */
  beforeDestroy() {},
  /**
   * Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，
   * 所有的事件监听器会被移除，所有的子实例也会被销毁。
   */
  destroyed() {},
};
</script> 

<style lang="less" scoped>
.title {
  font-size: 20px;
  color: #3a3a3a;
  padding: 14px;
  background: #fff;
  margin: 0;
}
.user-info {
  .avatar {
    width: 35px;
    height: 35px;
    margin-right: 8px;
  }
  .name {
    font-style: 12px;
    color: #333;
  }
  .pubdate {
    font-style: 12px;
    color: #b4b4b4;
  }
  .btn {
    width: 75px;
    height: 29;
  }
  .markdown-body {
    padding: 14px;
    background: #fff;
  }
}
</style>
