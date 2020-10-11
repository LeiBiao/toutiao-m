<template>
  <div id="app">
    <h1>项目众筹-交流社区</h1>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <router-view />
  </div>
</template>

<style lang="less">
</style>
<script>
export default {
  name: "App",
};
</script>