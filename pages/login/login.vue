<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../../assets/logo.png" alt="">
      </div>
      <!-- 登录表单区域 -->
      <el-form
        label-width="0px"
        class="login_form"
        :rules="loginFormRules"
        :model="loginForm"
        ref="loginFormRef"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <!--          <el-input v-model="loginForm.password" prefix-icon="el-icon-lock"></el-input>-->
          <el-input placeholder="请输入密码" v-model="loginForm.password" show-password></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

  import service from "../../utils/axios";

  export default {
    name: "login",
    data() {
      return {
        //登录表单的数据校验绑定对象
        loginForm: {
          username: "陈梦月",
          password: "123456",
        },

        //表单的验证规则对象
        loginFormRules: {
          //验证用户名是否合法
          username: [
            {required: true, message: "请输入用户名", trigger: "blur"},
            {min: 3, max: 10, message: "用户名输入规则:3-10位", trigger: "blur"},

          ],
          //验证密码是否合法
          password: [
            {required: true, message: "请输入密码", trigger: "blur"},
            {min: 6, max: 10, message: "密码输入规则:6-10位", trigger: "blur"},
          ]
        }
      }
    },

    methods: {

      //点击重置按钮，重置表单
      resetLoginForm() {
        // console.log(this);
        this.$refs.loginFormRef.resetFields();
      },
      login() {
        this.$refs.loginFormRef.validate(async vaild => {
          if (!vaild) return;
          const {data: res} = await service.post("/login", this.loginForm);
          if (res.code !== 200) return this.$message.error("登录失败");
          this.$message.success("登录成功");
          console.log(res)
          //保存token
          window.sessionStorage.setItem('token', res.data.token);
          //跳转首页
          this.$router.push({
            path: '/HOME/home',
          });
        })
      }
    }
  };
</script>

<style lang="less" scoped>
  .login_container {
    background-color: #35495E;
    height: 100vh;
  }

  .login_box {
    width: 450px;
    height: 300px;
    background-color: #F5F5F5;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eeeeee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #dddddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eeeeee;
    }
  }

  .btns {
    display: flex;
    justify-content: flex-end;
  }

  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20%;
    box-sizing: border-box;
  }

</style>
