<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!-- 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <form action="/">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch(searchText)"
        @cancel="$router.back()"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result
      v-if="isResultShow"
      :search-text="searchText"
    ></search-result>
    <!-- 搜索联想 -->
    <search-sugges
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    ></search-sugges>
    <!-- 搜索历史 -->
    <search-history
      v-else
      :search-histories="searchHistories"
      @search="onSearch"
      @updata-histories="searchHistories = $event"
    ></search-history>
  </div>
</template>

<script>
import SearchSugges from "./components/search-suggestion";
import SearchHistory from "./components/search-history";
import SearchResult from "./components/search-result";
import { setItem, getItem } from "@/utils/storage";
// import { getSearchHistories } from "@/api/search";
import { mapState } from "vuex";
export default {
  // 组件名称
  name: "SearchIndex",
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {
    SearchSugges,
    SearchHistory,
    SearchResult,
  },
  // 组件状态值
  data() {
    return {
      searchText: "", //搜索输入框的内容
      isResultShow: false, //控制搜索结果的显示状态
      searchHistories: [], //搜索历史数据
    };
  },
  // 计算属性
  computed: {
    ...mapState(["user"]),
  },
  // 侦听器
  watch: {
    // 监听历史记录变化,存储到本地
    searchHistories() {
      setItem("search-histories", this.searchHistories);
    },
  },
  // 组件方法
  methods: {
    onSearch(searchText) {
      this.searchText = searchText;
      /**
       *  把最新的搜索历史记录放到顶部,并且删除重复项
       */
      const index = this.searchHistories.indexOf(searchText);
      if (index != -1) {
        // 找到重复项删除
        this.searchHistories.splice(index, 1);
      }
      //  把最新的搜索历史记录放到顶部
      this.searchHistories.unshift(searchText);

      //未登录的状态下,将历史记录存储在本地
      // setItem("search-histories", this.searchHistories);
      // 搜索的时候将搜索状态打开
      this.isResultShow = true;
    },
    async loadSearchHistories() {
      // 让后端返回的历史记录和本地记录合并
      // 本地历史记录
      const searchHistories = getItem("search-histories") || [];
      // if (this.user) {
      //   // 如果已经登录,获取线上数据
      //   const { data } = await getSearchHistories();
      //   // 去重
      //   searchHistories = [
      //     ...new Set([...searchHistories, ...data.data.keywords]),
      //   ];
      // }

      this.searchHistories = searchHistories;
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
    this.loadSearchHistories();
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

<style scoped>
</style>
