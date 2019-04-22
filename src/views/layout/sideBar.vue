<template>
<div style="height: 100%;">
  <el-menu
    style="height: 100%;"
    :collapse=isCollapse
    mode="vertical"
    :router=true
    :unique-opened=true
    default-active="list"
    background-color="#333"
    text-color="#fff">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-time"></i>
        <span>报价单</span>
      </template>
      <el-menu-item index="paper">
        <i class="el-icon-plus"></i>
        <span>报价</span>
      </el-menu-item>
      <el-menu-item index="list">
        <i class="el-icon-view"></i>
        <span>报价单查询</span>
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="customs">
      <i class="el-icon-service"></i>
      <span>客户信息管理</span>
    </el-menu-item>
    <el-menu-item index="price">
      <i class="el-icon-tickets"></i>
      <span>价格表管理</span>
    </el-menu-item>
    <el-menu-item index="profiles" v-if="this.$store.getters.getUserName === '管理员'">
      <i class="el-icon-setting"></i>
      <span>账号设置</span>
    </el-menu-item>
  </el-menu>
</div>
</template>

<script>
export default {
  name: 'sideBar',
  data () {
    return {
      isCollapse: this.$store.state.isCollapse
    }
  }
}
</script>

<style scoped>

</style>
