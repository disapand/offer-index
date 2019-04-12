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
        <el-table-column label="操作">
          <template slot="header">
            <el-button type="success" @click="newPrice = true">添加新项目</el-button>
          </template>
          <template slot-scope="scope">
            <el-button type="warning" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="添加新项目" center :visible.sync="newPrice" width="30%">
        <el-form :model="priceData" ref="priceData" :rules="priceRules">
          <el-form-item label="项目名称" prop="name">
            <el-input placeholder="请输入项目名称" autofocus v-model="priceData.name"></el-input>
          </el-form-item>
          <el-form-item label="准确度等级" prop="level">
            <el-input placeholder="请输入准确度等级" v-model="priceData.level"></el-input>
          </el-form-item>
          <el-form-item label="测量范围" prop="range">
            <el-input placeholder="请输入测量范围" v-model="priceData.range"></el-input>
          </el-form-item>
          <el-form-item label="价格" prop="price">
            <el-input placeholder="请输入价格" v-model.number="priceData.price"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="notice" v-model="priceData.notice">
            <el-input placeholder="备注"></el-input>
          </el-form-item>
          <el-form-item style="margin-left: 50%; transform: translateX(-50%)">
            <el-button type="success" style="width: 45%" @click="handleAdd">确定</el-button>
            <el-button type="warning" @click="newPrice = false" style="width: 45%">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <el-dialog title="编辑项目" center :visible.sync="editPrice" width="30%">
        <el-form :model="priceEditData" ref="priceEditData" :rules="priceRules">
          <el-form-item label="项目名称" prop="name">
            <el-input placeholder="请输入项目名称" v-model="priceEditData.name"></el-input>
          </el-form-item>
          <el-form-item label="准确度等级" prop="level">
            <el-input placeholder="请输入准确度等级" v-model="priceEditData.level"></el-input>
          </el-form-item>
          <el-form-item label="测量范围" prop="range">
            <el-input placeholder="请输入测量范围" v-model="priceEditData.range"></el-input>
          </el-form-item>
          <el-form-item label="价格" prop="price">
            <el-input placeholder="请输入价格" v-model.number="priceEditData.price"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="notice" v-model="priceEditData.notice">
            <el-input placeholder="备注"></el-input>
          </el-form-item>
          <el-form-item style="margin-left: 50%; transform: translateX(-50%)">
            <el-button type="success" style="width: 45%" @click="edit">确定</el-button>
            <el-button type="warning" @click="editPrice = false" style="width: 45%">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <el-pagination
        style="margin-top: 20px"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        :current-page.sync="pagination.currentPage"
        @current-change="handleChangePage"
        background></el-pagination>
    </div>
</template>

<script>
import { getPrices, deletePrice, addPrice, getPrice, editPrice, getPricesPagination } from '../../api/price'

export default {
  name: 'index',
  data () {
    return {
      prices: [],
      newPrice: false,
      editPrice: false,
      pagination: {
        pageSize: 0,
        total: 0,
        currentPage: 0
      },
      priceData: {
        name: '',
        level: '--',
        range: '--',
        price: 0,
        notice: ''
      },
      priceEditData: {
        name: '',
        level: '--',
        range: '--',
        price: 0,
        notice: ''
      },
      priceRules: {
        name: [
          { required: true, trigger: 'blur', message: '请输入项目名称' }
        ],
        price: [
          { required: true, trigger: 'blur', message: '请输入价格' },
          { type: 'number', trigger: 'blur', message: '价格只能是数字' }
        ]
      }
    }
  },
  created () {
    getPrices().then((res) => {
      this.prices = res.data.data
      this.pagination.currentPage = res.data.meta.current_page
      this.pagination.total = res.data.meta.total
      this.pagination.pageSize = res.data.meta.to
      console.log('获取价目表', res.data)
    }).catch((err) => {
      console.log('获取价格清单出错', err)
      this.$store.dispatch('logout')
      this.$message.error('登录超时，请重新登录')
      this.$router.push({ name: 'login' })
    })
  },
  methods: {
    handleDelete (id) {
      deletePrice(id).then((res) => {
        getPrices().then((res) => {
          this.prices = res.data.data
          this.$message.success('删除成功')
        }).catch((err) => {
          console.log('更新价目表失败', err)
        })
      }).catch((err) => {
        console.log('删除价目失败', err)
        this.$message.error('删除失败')
      })
    },
    handleAdd () {
      addPrice(this.priceData.name, this.priceData.level, this.priceData.range, this.priceData.price, this.priceData.notice).then((res) => {
        this.prices.push(res.data.data)
        this.newPrice = false
        this.$message.success('添加成功')
        this.$refs.priceData.resetFields()
      }).catch((err) => {
        console.log('添加价目失败', err)
        this.$message.error('添加失败')
        this.newPrice = false
      })
    },
    handleEdit (id) {
      this.editPrice = true
      getPrice(id).then((res) => {
        this.priceEditData = res.data.data
      }).catch((err) => {
        console.log('获取项目失败', err)
      })
    },
    edit () {
      editPrice(this.priceEditData.id, this.priceEditData.name, this.priceEditData.level,
        this.priceEditData.range, this.priceEditData.price, this.priceEditData.notice).then((res) => {
        this.$message.success('编辑成功')
        this.$refs.priceEditData.resetFields()
        getPricesPagination(this.pagination.currentPage).then((res) => {
          this.prices = res.data.data
        })
        this.editPrice = false
      }).catch((err) => {
        console.log('编辑出错', err)
        this.$message.error('编辑信息出错')
        this.editPrice = false
      })
    },
    handleChangePage () {
      getPricesPagination(this.pagination.currentPage).then((res) => {
        this.prices = res.data.data
        console.log(res.data)
      }).catch((err) => {
        console.log('换页失败', err)
      })
    }
  }
}
</script>

<style scoped>

</style>
