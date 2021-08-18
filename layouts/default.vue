<template>
  <el-container class="home-container">

    <!-- 顶部区域 -->
    <el-header>
        <navHeader></navHeader>
    </el-header>

    <!-- 页面主体区域 -->
    <el-container>
      <!-- 右侧内容主体 -->
      <el-main>
        <router-view :env-select="envSelect"></router-view>
      </el-main>
      <!-- 引入content-template -->
    </el-container>

  </el-container>

</template>



<script>
  import navHeader from '../components/navHeader';

  let id = 1000;

  export default {
    components: { navHeader},

    data() {
      return {
        envSelect: ""
      }
    },
    created() {
    },
    methods: {
  }
}
</script>

<style lang="less">

  .home-container {
    height: 100vh;
  }

  .el-main {

    background-color: #fff;

  }

</style>

