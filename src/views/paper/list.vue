<template>
    <div>
      <el-table
        :data="papers"
        border
        stripe
        style="width: 100%">
        <el-table-column type="index" width="70" align="center"></el-table-column>
        <el-table-column label="报价单编号" prop="paperId"></el-table-column>
        <el-table-column label="报价单位" prop="custom.company"></el-table-column>
        <el-table-column label="联系人" prop="custom.name"></el-table-column>
        <el-table-column label="电话" prop="custom.number"></el-table-column>
        <el-table-column label="合计金额(元)" prop="shouldPay"></el-table-column>
        <el-table-column label="报价人" prop="user.username" v-if="this.$store.getters.getUserName === '管理员'"></el-table-column>
        <el-table-column label="报价时间" prop="paperTime"></el-table-column>
        <el-table-column label="操作" width="210">
            <template slot-scope="scope">
              <el-button type="warning" @click="handleShow(scope.row.id)">查看详情</el-button>
              <el-button type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
import { papers } from '../../api/paper'

export default {
  name: 'list',
  data () {
    return {
      papers: []
    }
  },
  created () {
    papers().then((res) => {
      this.papers = res.data.data
    }).catch((err) => {
      console.log('获取报价单列表出错', err)
      this.$message.error('报价单列表获取出错，请检查网络环境')
    })
  },
  methods: {
    handleShow (id) {
      this.$router.push({ name: 'detail', params: { id: id } })
    }
  }
}
</script>

<style scoped>

</style>
