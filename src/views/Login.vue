<template>
  <div class="login-container">
    <el-card class="login-card">
      <div slot="header" class="login-header">
        <h2>用户登录</h2>
      </div>
      <el-form
        :model="form"
        :rules="rules"
        ref="loginForm"
        @submit.native.prevent="handleSubmit"
        label-width="0px"
        class="login-form"
      >
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            class="login-button"
            @click="handleSubmit"
            :loading="loading"
            style="width: 100%"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>

import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

// 方式1：直接导入具体 API
import { loginAPI } from '@/api/auth';



export default {
  name: 'Login',
  data() {
    return {
      loading: false,
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码至少6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {



    handleSubmit() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          this.loading = true;

            // 调用封装好的 API
            const res = await loginAPI(this.form)
            
            // 假设后端返回 { token, userInfo }
            localStorage.setItem('token', res.data)
            
            
            // 跳转
            const redirect = this.$route.query.redirect || '/currentHot'
            this.$router.push(redirect)

            this.$message.success('登录成功！')


        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
}

.login-card {
  width: 400px;
  max-width: 90%;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.login-header {
  text-align: center;
  margin-bottom: 20px;
}

.login-form {
  padding: 20px 40px;
}

.login-button {
  margin-top: 10px;
}
</style>