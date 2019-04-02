<template>
    <div>
      <el-button type="text" style="font-size: 2rem" @click="isCollapse">
        <i class="el-icon-menu"></i>
      </el-button>
      <el-button type="primary" @click="logout" style="float:right">退出</el-button>
    </div>
</template>

<script>
export default {
  name: 'handleHeader',
  methods: {
    isCollapse () {
      this.$store.commit('setCollapse', !this.$store.state.isCollapse)
    },
    logout () {
      this.$store.dispatch('logout')
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style scoped>

</style>
