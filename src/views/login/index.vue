<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      title="注册 / 登录"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 表单 -->
    <!-- 关闭标红输入框 
    :show-error="false"
    :show-error-message="false"-->
    <!-- 是否在某一项校验不通过时停止校验
    :validate-first="true" -->
    <van-form
      :show-error="false"
      :show-error-message="false"
      validate-first
      ref="login-form"
      @submit="onLogin"
      @failed="onFailed"
    >
      <van-field
        v-model="user.mobile"
        icon-prefix="toutiao"
        left-icon="pad"
        center
        placeholder="请输入手机号"
        name="mobile"
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        left-icon="eye-o"
        center
        placeholder="请输入验证码"
        name="code"
        :rules="formRules.code"
      >
        <!-- finish事件	倒计时结束时触发 -->
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <!-- 通过 loading 属性设置按钮为加载状态，加载状态下默认会隐藏按钮文字 -->
          <van-button
            v-else
            class="send-btn"
            size="mini"
            round
            :loading="isSendSmsLoading"
            @click.prevent="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" type="info" block>登录</van-button>
      </div>
    </van-form>
    <p>万能验证码:246810</p>
  </div>
</template>

<script>
import { login, sendSms } from "@/api/user";
// import { Toast } from 'vant'
export default {
  name: "LoginIndex",
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: "", // 手机号
        code: "", // 验证码
      },
      formRules: {
        mobile: [
          { required: true, message: "请输入手机号" },
          { pattern: /^1\d{10}$/, message: "手机号格式错误" },
        ],
        code: [
          { required: true, message: "请输入验证码" },
          { pattern: /^\d{6}$/, message: "验证码格式错误" },
        ],
      },
      isCountDownShow: false, // 控制倒计时和发送按钮的显示状态
      isSendSmsLoading: false, // 发送验证码按钮的加载显示的状态
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLogin() {
      // Toast.loading({
      this.$toast.loading({
        message: "登录中...",
        forbidClick: true, // 禁止背景点击
        duration: 0, //值为 0 时，toast 不会消失
      });
      try {
        const { data } = await login(this.user);
        this.$toast.success("登录成功");
        // 将后端返回的用户登录状态（token等数据）放到 Vuex 容器中
        this.$store.commit("setUser", data.data);
        // 登录成功，跳转回原来页面
        // this.$router.back() // 先用这种方式，但是它不太好，有问题
        this.$router.push(this.$route.query.redirect || "/");
      } catch (err) {
        console.log(err);
        this.$toast.fail("登录失败，手机号或验证码错误");
      }
    },
    onFailed(error) {
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message, // 提示消息
          position: "top",
        });
      }
    },
    // 校验手机号码
    // codetime() {
    //   // 获取到表单组件实例
    //   this.$refs["login-form"].validate("mobile").then((data) => {
    //     console.log(data);
    //   });
    // },
    async onSendSms() {
      try {
        // validate	验证表单，支持传入name来验证单个表单项	参数name?: string   返回值	Promise
        await this.$refs["login-form"].validate("mobile");
        // 验证通过，请求发送验证码
        this.isSendSmsLoading = true; // 展示按钮的 loading 状态，防止用户多次点击触发发送行为
        await sendSms(this.user.mobile);
        // 短信发出去了，隐藏发送按钮，显示倒计时
        this.isCountDownShow = true;
      } catch (err) {
        // 不同的错误需要有不同的提示，那就需要判断了
        let message = "";
        // 429 Too Many Requests (太多请求)
        if (err && err.response && err.response.status === 429) {
          // 发送短信失败的错误提示
          message = "发送太频繁了，请稍后重试";
        } else if (err.name === "mobile") {
          // 表单验证失败的错误提示
          message = err.message;
        } else {
          // 未知错误
          message = "发送失败，请稍后重试";
        }
        // 提示用户
        this.$toast({
          message,
          position: "top",
        });
      }
      // 无论发送验证码成功还是失败，最后都要关闭发送按钮的 loading 状态
      this.isSendSmsLoading = false;
    },
  },
};
</script>

<style scoped lang="less">
.login-container {
  .send-btn {
    width: 76px;
    height: 23px;
    background-color: #ededed;
    .van-button__text {
      font-size: 11px;
      color: #666666;
    }
  }
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      background-color: #1989fa;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
}
</style>