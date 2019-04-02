<template>
  <div>
    <el-table
      :data="profile"
      style="width: 100%">
      <el-table-column prop="account" label="账号"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="sign" label="标识"></el-table-column>
      <el-table-column prop="updated_at" label="创建时间"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { profiles } from '../../api/auth'

export default {
  name: 'index',
  data () {
    return {
      profile: []
    }
  },
  created () {
    profiles().catch((res) => {
      console.log('获取用户信息', res.data)
      this.profile = res.data.data
    }).then((err) => {
      console.log('获取用户信息失败', err)
    })
  }
}
</script>

<style scoped>

</style>
