<template>
  <div class="signin">
    <div class="app-info">
      <img src="../../assets/image/logo.jpg" class="app-logo">
      <div class="app-name">TODOLIST</div>
    </div>
    <div class="signin-box">
      <el-form class="demo-ruleForm signin-form" label-width="4rem">
        <el-form-item label="用户名">
          <el-input placeholder="请输入用户名" v-model="username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" placeholder="请输入密码" v-model="password" @keyup.enter.native="signin"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="signin" type="primary" class="signin-button" size="medium" :plain="true">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
const HOST = 'http://127.0.0.1:8678';

export default {
  name: 'signin',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    signin() {
      console.log('signin');
      this.postUserInfo();
    },
    postUserInfo() {
      return new Promise((resolve, reject) => {
        axios.post(`${HOST}/user/signin`, {username: this.username, password: this.password}).then(res => {
          resolve(res.data);
          console.log(res);
          if (!res.data.success) {
            this.$message.error(res.data);
            return;
          }

          this.$message({
            message: '登录成功',
            type: 'success'
          });
          window.localStorage.setItem('isSignin', true);
          this.$router.push({ name: 'Main' });
        });
      });
    }
  }
}
</script>
<style>
  .signin {
    width: 50%;
    margin-left: 25%;
  }
  .app-info {
    width: 100%;
    height: 15rem;
    text-align: center;
  }
  .app-logo {
    width: 10rem;
    height: 10rem;
    border: 1px solid transparent;
    border-radius: 5rem;
  }
  .app-name {
    width: 100%;
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    font-size: 2rem;
    color: #409EFF;
  }
  .signin-box {
    width: 80%;
    margin-left: 10%;
  }
  .signin-form {
    width: 100%;
  }
  .signin-button {
    width: 100%;
  }
</style>
