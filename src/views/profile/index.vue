<template>
  <div>
    <el-table
      :data="profiles"
      border
      stripe
      style="width: 100%">
      <el-table-column type="index" width="70" align="center"></el-table-column>
      <el-table-column prop="account" label="账号"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="sign" label="标识"></el-table-column>
      <el-table-column prop="updated_at" label="创建时间"></el-table-column>
      <el-table-column label="操作">
        <template slot="header" slot-scope="scope">
          <el-button type="success" size="mini" @click="newProfile = true">添加新账号</el-button>
        </template>
        <template slot-scope="scope">
          <el-button type="warning" v-if="scope.row.username === profile">编辑</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加新账号" :visible.sync="newProfile" center>

    </el-dialog>
  </div>
</template>

<script>
import { profiles } from '../../api/auth'

export default {
  name: 'index',
  data () {
    return {
      profiles: [],
      editable: true,
      profile: '',
      newProfile: false
    }
  },
  created () {
    this.profile = this.$store.getters.getUserName
    profiles().then((res) => {
      console.log('获取用户信息', res.data)
      this.profiles = res.data.data
    }).catch((err) => {
      console.log('获取用户信息失败', err)
    })
  }
}
</script>

<style scoped>

</style>
