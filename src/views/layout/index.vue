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
        <transition name="el-zoom-in-center">
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

export default {
  name: 'index',
  components: {
    Sidebar,
    handleHeader
  }
}
</script>

<style scoped>

</style>
