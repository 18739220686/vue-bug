<template>
  <el-row>

    <div class="header-logo">
      <img src="" alt="">
      <span>Buggist后台管理</span>
    </div>

    <!-- 顶部导航 -->

    <div class="grid-content bg-purple"></div>
    <el-menu mode="horizontal" >
      <el-menu-item index="1" @click="home">接口管理</el-menu-item>
      <el-menu-item index="2" @click="dashboard">数据统计</el-menu-item>
      <!-- <el-menu-item index="3">报告管理</el-menu-item> -->
    </el-menu>

    <!-- 环境设置 -->

    <el-select clearable placeholder="环境配置" v-model="envSelect" value-key="id">
      <el-option v-for="item in envList"
                 :key="item.id"
                 :label="item.name"
                 :value="item.id">
      </el-option>
      <!-- 添加环境 -->
      <el-button class="el-icon-s-tools" type="success" plain>添加环境</el-button>
    </el-select>

    <!-- 渲染环境数据  -->
    <env-setting></env-setting>
    <el-button type="text" @click="logout">退出</el-button>
  </el-row>
</template>

<script>
  import EnvSetting from "./envSetting";
  import service from '../utils/axios.js';

  export default {
    name: 'navHeader',
    //  引入的组件
    components: {EnvSetting},
    data() {
      // 绑定页面的元素
      return {
        envSelect: '',
        envList: []
      }
    },
    created() {
      // 页面初始化时的动作
      this.getEnvList()

    },

    watch: {
      envSelect(val) {
        this.$emit('get-env', `${val}`);
      },
    },

    //  绑定页面元素的动作
    methods: {
      logout() {
        //清空token
        window.sessionStorage.clear()
        this.$router.push("/login/login")
      },

      home() {
        this.$router.push({path: '/HOME/home'})
      },

      dashboard() {
        this.$router.push({path: '/dashboard/dashboard'})
      },

      async getEnvList() {
        const {data} = await service.get("/env", {params: this.queryInfo});
        if (data.code !== 200) {
          this.$message.error('获取失败');
          return;
        }
        this.envList = data?.data?.items || [];
      }
    }
  }


</script>


<style lang="less">

  .el-header {
    background-color: #35495E;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    // 居中
    align-items: center;
    color: #F5F5F5;
    font-size: 10px;

    > div {
      display: flex;
      align-items: center;
    }
  }

  .header-logo {
    span {
      margin-left: 30px;
    }
  }

  .el-menu {
    background-color: #35495E;
    font-size: 10px;
    text-align: center;
  }

  .el-main {
    background-color: #fdfdfd;
  }


</style>
