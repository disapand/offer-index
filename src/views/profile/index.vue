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
      <el-table-column prop="number" label="固话"></el-table-column>
      <el-table-column prop="tel" label="手机"></el-table-column>
      <el-table-column prop="updated_at" label="创建时间"></el-table-column>
      <el-table-column label="操作">
        <template slot="header">
          <el-button type="success" @click="newProfile = true">添加新账号</el-button>
        </template>
        <template slot-scope="scope">
          <el-button type="warning" v-if="scope.row.username === profile" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加新账号" :visible.sync="newProfile" center :before-close="handleClose" width="30%" @close="handleClose">
      <el-form :model="addUser" ref="addUser" :rules="profileRules">
        <el-form-item label="账号" prop="account">
          <el-input v-model="addUser.account" placeholder="请输入账号，账号为登录凭证，必须唯一"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUser.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUser.password" placeholder="请输入密码" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item label="标识" prop="sign">
          <el-input v-model="addUser.sign" placeholder="请输入标识，用于生成编号使用，必须唯一"></el-input>
        </el-form-item>
        <el-form-item label="固话" prop="number">
          <el-input v-model="addUser.number" placeholder="请输入固话"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="tel">
          <el-input v-model="addUser.tel" placeholder="请输入手机号码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="add">确定</el-button>
        <el-button type="info" @click="newProfile = false">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑账号信息" :visible.sync="editProfile" center :before-close="handleClose" width="30%" @close="handleClose">
      <el-form :model="addUser" ref="addUser" :rules="profileRules">
        <el-form-item label="账号" prop="account">
          <el-input v-model="addUser.account" placeholder="请输入账号，账号为登录凭证，必须唯一"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUser.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUser.password" placeholder="请输入密码" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item label="标识" prop="sign">
          <el-input v-model="addUser.sign" placeholder="请输入标识，用于生成编号使用，必须唯一"></el-input>
        </el-form-item>
        <el-form-item label="固话" prop="number">
          <el-input v-model="addUser.number" placeholder="请输入固话"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="tel">
          <el-input v-model="addUser.tel" placeholder="请输入手机号码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="edit">确定</el-button>
        <el-button type="info" @click="editProfile = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { profiles, register, profileDelete, getProfile, profileUpdate } from '../../api/auth'

export default {
  name: 'index',
  data () {
    return {
      profiles: [],
      editable: true,
      profile: '',
      newProfile: false,
      editProfile: false,
      addUser: {
        id: '',
        account: '',
        username: '',
        password: '',
        number: '',
        tel: '',
        sign: ''
      },
      profileRules: {
        account: [
          { required: true, trigger: 'blur', message: '请输入账号' }
        ],
        username: [
          { required: true, trigger: 'blur', message: '请输入用户名' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码' },
          { min: 6, trigger: 'blur', message: '密码强度太弱' }
        ],
        sign: [
          { required: true, trigger: 'blur', message: '请输入标记' }
        ]
      }
    }
  },
  created () {
    this.profile = this.$store.getters.getUserName
    profiles().then((res) => {
      this.profiles = res.data.data
    }).catch((err) => {
      console.log('获取用户信息失败', err)
      this.$message.error('登录超时，请重新登录')
      this.$store.dispatch('logout')
      this.$router.push({ name: 'login' })
    })
  },
  methods: {
    add () {
      this.$refs.addUser.validate((valid) => {
        if (valid) {
          register(this.addUser.account, this.addUser.password, this.addUser.username, this.addUser.sign, this.addUser.number, this.addUser.tel)
            .then((res) => {
              this.profiles.push(res.data.data)
              this.newProfile = false
              this.$message.success('创建账号成功')
            }).catch((err) => {
              console.log('创建账号出错', err)
              this.newProfile = false
              this.$message.error('账号信息有误，请重新输入')
            })
        }
      })
    },
    handleClose () {
      this.$refs.addUser.resetFields()
      this.newProfile = false
      this.editProfile = false
    },
    handleDelete (id) {
      profileDelete(id).then((res) => {
        this.$message.success('删除成功')
        profiles().then((res) => {
          this.profiles = res.data.data
        })
      }).catch((err) => {
        console.log('删除用户出错', err)
        this.$message.error('删除用户失败')
      })
    },
    handleEdit (id) {
      getProfile(id).then((res) => {
        this.addUser = res.data.data
        this.editProfile = true
      }).catch((err) => {
        console.log('获取账号详细信息失败', err)
      })
    },
    edit () {
      profileUpdate(this.addUser.id, this.addUser.account, this.addUser.password, this.addUser.username, this.addUser.sign,
        this.addUser.number, this.addUser.tel).then((res) => {
        this.$message.success('编辑账号信息成功')
        profiles().then((res) => {
          this.profiles = res.data.data
        }).catch((err) => {
          console.log('获取信息出错', err)
        })
        this.editProfile = false
      }).catch((err) => {
        console.log('编辑账号信息失败', err)
        this.$message.error('编辑信息失败，请重新尝试')
        this.editProfile = false
      })
    }
  }
}
</script>

<style scoped>

</style>
