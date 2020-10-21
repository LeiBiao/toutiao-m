<template>
  <div class="channel-edit">
    <van-cell center :border="false">
      <div slot="title" class="title">我的频道</div>
      <van-button
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完 成" : "编 辑" }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        :class="{ active: index === active }"
        :icon="isEdit && index !== 0 ? 'clear' : ''"
        v-for="(channels, index) in channels"
        :key="index"
        :text="channels.name"
        @click="channelsClick(channels, index)"
      />
    </van-grid>
    <van-cell center :border="false">
      <div slot="title" class="title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        @click="onAdd(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannel, delUserChannel } from "@/api/channel";
import { mapState } from "vuex";
import { setItem } from "@/utils/storage";
export default {
  // 组件名称
  name: "ChannelEdit",
  // 组件参数 接收来自父组件的数据
  props: {
    // 我的频道的数据
    channels: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      //所有频道数据列表
      allChannels: [],
      //控制编辑显示状态
      isEdit: false,
    };
  },
  // 计算属性
  computed: {
    ...mapState(["user"]),
    recommendChannels() {
      // 所有频道-我的频道=剩下的推荐频道

      // const arr = [];
      // // 遍历所有频道
      // this.allChannels.forEach((channel) => {
      //   let flag = false;
      //   for (let i = 0; i < this.channels.length; i++) {
      //     if (this.channels[i].id === channel.id) {
      //       // 所有频道中的频道项属于用户频道
      //       flag = true;
      //       break;
      //     }
      //   }
      //   if (!flag) {
      //     arr.push(channel);
      //   }
      // });
      // return arr;

      // 过滤数据,根据方法返回的布尔值true来收集数据
      // channel 推荐频道项
      return this.allChannels.filter((channel) => {
        // 判断channel是否属于用户频道
        return !this.channels.find((userChannels) => {
          return userChannels.id === channel.id;
        });
      });
    },
  },
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    async loadAllChannels() {
      const { data } = await getAllChannels();
      this.allChannels = data.data.channels;
    },
    async onAdd(channel) {
      this.channels.push(channel);
      // 数据持久化
      if (this.user) {
        // 登陆后,数据存储到服务器
        await addUserChannel({
          channels: [{ id: channel.id, seq: this.channels.length }],
        });
      } else {
        // 未登录,数据存储到本地
        setItem("user-channels", this.channels);
      }
    },
    channelsClick(channels, index) {
      // 编辑状态,删除频道
      if (this.isEdit && index !== 0) {
        this.deleteChannels(channels, index);
      }
      //非编辑状态, 切换频道
      else {
        this.switchChannels(index);
      }
    },
    async deleteChannels(channels, index) {
      //如果删除的是当前频道之前的频道,当前的频道索引就会-1,但是原来的active没变,就需要更新active
      if (index <= this.active) {
        this.$emit("update-active", this.active - 1);
      }
      this.channels.splice(index, 1);

      // 数据持久化
      if (this.user) {
        // 登陆后,数据存储到服务器
        await delUserChannel(channels.id);
      } else {
        // 未登录,数据存储到本地
        setItem("user-channels", this.channels);
      }
    },
    switchChannels(index) {
      // 子组件向父组件传参
      // 切换频道
      this.$emit("update-active", index);
      // 关闭弹出层
      this.$emit("close");
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
    this.loadAllChannels();
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

<style scoped lang="less">
.channel-edit {
  padding-top: 54px;
  .title {
    font-style: 16px;
    color: #333;
  }
  .grid-item {
    width: 80px;
    height: 43px;
    position: relative;
    /deep/ .van-grid-item__content {
      background: #f4f5f6;
      .van-grid-item__text {
        font-size: 14px;
        color: #222;
        margin-top: 0;
      }
    }
    /deep/.van-grid-item__icon {
      position: absolute;
      top: -6px;
      right: -6px;
      font-size: 14px;
      color: #292c35;
    }
  }
  .active {
    /deep/.van-grid-item__text {
      color: blue !important;
    }
  }
}
</style>
