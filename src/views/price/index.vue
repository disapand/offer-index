<template>
    <div>
      <el-table
        :data="prices"
        border
        stripe
        style="width: 100%">
        <el-table-column type="index" width="70" align="center"></el-table-column>
        <el-table-column prop="name" label="项目名称"></el-table-column>
        <el-table-column prop="range" label="测量范围"></el-table-column>
        <el-table-column prop="level" label="准确度等级"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="notice" label="备注"></el-table-column>
      </el-table>
    </div>
</template>

<script>
import { getPrices } from '../../api/price'

export default {
  name: 'index',
  data () {
    return {
      prices: []
    }
  },
  created () {
    getPrices().then((res) => {
      this.prices = res.data.data
    }).catch((err) => {
      console.log('获取价格清单出错', err)
    })
  }
}
</script>

<style scoped>

</style>
