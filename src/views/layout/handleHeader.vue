<template>
    <div>
      <el-button type="primary" @click="logout" style="float:right;margin: 10px">退出</el-button>
    </div>
</template>

<script>
export default {
  name: 'handleHeader',
  methods: {
    logout () {
      this.$message.info('退出成功')
      this.$store.dispatch('logout')
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style scoped>

</style>
