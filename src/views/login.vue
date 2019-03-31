<template>
    <div>
      <el-row>
        <el-col :span="6" :offset="9">
          <el-card shadow="always">
            <div slot="header">
              <h1>offer-index</h1>
            </div>
            <el-form ref="loginInfo" :rules="loginInfoRules" :model="loginInfo">
              <el-form-item label="用户名" prop="account">
                <el-input
                  v-model="loginInfo.account"
                placeholder='请输入用户名'
                ></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input
                  v-model="loginInfo.password"
                  type="password"
                  :show-password=true></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" style="width: 100%; margin-top: 20px">登录</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
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
  }
}
</script>

<style scoped>

</style>
