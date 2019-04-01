<template>
    <div>
      <el-button type="text" style="font-size: 2rem" @click="isCollapse">
        <i class="el-icon-menu"></i>
      </el-button>
    </div>
</template>

<script>
export default {
  name: 'handleHeader',
  methods: {
    isCollapse () {
      this.$store.commit('setCollapse', !this.$store.state.isCollapse)
    }
  }
}
</script>

<style scoped>

</style>
