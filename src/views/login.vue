<template>
    <div style="margin-top: 150px">
      <el-row>
        <el-col :span="6" :offset="9">
          <el-card shadow="always">
            <div slot="header">
              <h1>在线报价系统</h1>
            </div>
            <el-form ref="loginInfo" :rules="loginInfoRules" :model="loginInfo">
              <el-form-item label="用户名" prop="account">
                <el-input
                  v-model="loginInfo.account"
                  prefix-icon="el-icon-info"
                  placeholder='请输入用户名'
                  ref="account"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input
                  v-model="loginInfo.password"
                  type="password"
                  placeholder='请输入密码'
                  prefix-icon="el-icon-news"
                  @keyup.enter.native = "login"
                  :show-password=true></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" style="width: 100%; margin-top: 20px" @click="login">登录</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import { login, profile } from '../api/auth'

export default {
  name: 'login',
  data () {
    return {
      loginInfo: {
        account: '',
        password: ''
      },
      loginInfoRules: {
        account: [
          { required: true, trigger: 'blur', message: '请输入账号' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginInfo.validate(valid => {
        if (valid) {
          login(this.loginInfo.account, this.loginInfo.password).then((res) => {
            profile().then((res) => {
              this.$store.commit('setUserName', res.data.data.username)
              this.$router.push({ name: 'home' })
            }).catch((err) => {
              console.log('获取用户信息出错', err)
              this.$store.dispatch('logout')
              this.$message.error('账号或密码错误，请重新登陆')
              this.$refs.loginInfo.resetFields()
              this.$refs.account.focus()
            })
          }).catch((err) => {
            console.log('登陆异常', err)
            this.$alert('账号或密码错误')
            this.$refs.loginInfo.resetFields()
            this.$refs.account.focus()
          })
        } else {
          alert('222')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
