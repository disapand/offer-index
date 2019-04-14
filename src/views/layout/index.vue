<template>
<div style="height: 100%;">
  <el-container style="height: 100%;">
    <el-aside style="width: 220px;">
      <Sidebar></Sidebar>
    </el-aside>
    <el-container>
      <el-header>
        <handleHeader></handleHeader>
      </el-header>
      <el-main>
        <transition name="el-zoom-in-top">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</div>
</template>

<script>
import Sidebar from './sideBar'
import handleHeader from './handleHeader'
import { profile } from '../../api/auth'

export default {
  name: 'index',
  components: {
    Sidebar,
    handleHeader
  },
  created () {
    if (this.$store.getters.getUserName === 'null') {
      profile().then((res) => {
        this.$store.commit('setUserName', res.data.data.username)
      }).catch((err) => {
        console.log('重新加载登陆账号信息出错', err)
        this.$message.error('获取账号信息失败，请重新登陆')
        this.$store.dispatch('logout')
        this.$router.push({ name: 'login' })
      })
    }
  }
}
</script>

<style scoped>

</style>
