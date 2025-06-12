<template>
  <div class="login-page">
    <el-card class="box-cad">
      <h1 class="title">喵ZK音乐管理系统</h1>
      <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"/>
        </el-form-item>

        <el-form-item label="密码" prop="password" >
          <el-input v-model="form.password" type="password" placeholder="请输入密码">
          </el-input>
        </el-form-item>

        <el-form-item v-if="!isLogin" label="确认密码" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" type="password" placeholder="请再次输入密码"/>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">
            {{ isLogin ? '登录' : '注册' }}
          </el-button>
          <el-button type="text" @click="ChangeMode">
            {{ isLogin ? '没有账号？注册' : '已有账号？登录' }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {ElMessage} from 'element-plus'

export default {
  name: 'LoginPage',
  data() {
    return {
      isLogin: true,
      form: {
        username: '',
        password: '',
        confirmPassword: ''
      },
      rules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
        confirmPassword: [
          {
            required: true,
            message: '请确认密码',
            trigger: 'blur'
          },
        ]
      }
    }
  },
  methods: {
    ChangeMode() {
      this.isLogin = !this.isLogin
      this.form.username = ''
      this.form.password = ''
      this.form.confirmPassword = ''
    },
    onSubmit() {
      this.$axios.post("/user/login", {"username": this.form.username, "password": this.form.password})
          .then((res) => {
            res = res.data;
            if (res.code == 200) {
              localStorage.setItem("token", res.token)
              if (this.isLogin) {
                ElMessage.success(`欢迎回来，${this.form.username}！`)
              } else {
                ElMessage.success(`注册成功，欢迎你，${this.form.username}！`)
              }
              this.$router.push("/home");
            } else {
              this.$message.error(res.msg)
            }
          })
    }
  }
}
</script>


<style scoped>
.login-page {
  width: 40%;
  height: 40%;
  margin: 100px auto;
  background-color: rgba(255, 255, 255, 0.3); /* 半透明白色背景 */
  border-radius: 10px; /* 可选：圆角 */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* 可选：阴影提升可视性 */
  padding: 20px; /* 内边距以避免内容贴边 */
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
}
el-form-item{
  flex-direction: row;
  justify-items:center;
  align-items: center;
}
</style>
