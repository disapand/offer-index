<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style scoped lang="scss">
  .size {
    width: 100%;
    height: 100%;
  }

  html, body {
    @extend .size;
    padding: 0;
    margin: 0;
  }

  #app {
    @extend .size
  }
</style>
