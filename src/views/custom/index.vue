<template>
    <div>
      <el-row style="margin: 15px 0">
        <el-col :span="10">
          <el-input
            placeholder="请输入单位名称"
            prefix-icon="el-icon-search"
            clearable
            @keyup.enter.native="handleSearch"
            @clear="handleClear"
            v-model="query">
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="customs"
        border
        stripe
        style="width: 100%">
        <el-table-column label="序号" type="index" width="70" align="center"></el-table-column>
        <el-table-column label="姓名" width="100" prop="name"></el-table-column>
        <el-table-column label="电话" width="160" prop="number"></el-table-column>
        <el-table-column label="单位" prop="company"></el-table-column>
        <el-table-column label="地址" prop="addr"></el-table-column>
        <el-table-column label="邮箱" prop="email" width="250"></el-table-column>
        <el-table-column label="备注" prop="notice"></el-table-column>
        <el-table-column label="操作">
          <template slot="header">
            <el-button type="success" @click="addCustom = true">新增</el-button>
          </template>
          <template slot-scope="scope">
            <el-button type="warning" @click="edit(scope.row.id)">编辑</el-button>
            <el-button type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="新增客户" center width="30%" :visible.sync="addCustom">
        <el-form ref="addItem" :model="addItem" :rules="addItemRules">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="addItem.name" placeholder="请输入客户联系人姓名" autofocus></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="number">
            <el-input v-model="addItem.number" placeholder="请输入客户联系人电话"></el-input>
          </el-form-item>
          <el-form-item label="单位" prop="company">
            <el-input v-model="addItem.company" placeholder="请输入客户单位"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="addr">
            <el-input v-model="addItem.addr" placeholder="请输入客户单位地址"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" prop="email">
            <el-input v-model="addItem.email" placeholder="请输入客户电子邮箱"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="notice">
            <el-input v-model="addItem.notice" placeholder="请输入备注"></el-input>
          </el-form-item>
          <el-form-item style="margin-left: 50%; transform: translateX(-50%)">
            <el-button type="success" style="width: 45%" @click="newCustom">确定</el-button>
            <el-button type="warning" style="width: 45%" @click="addCustom = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <el-dialog title="编辑客户信息" center width="30%" :visible.sync="editCustom">
        <el-form ref="editItem" :model="editItem" :rules="addItemRules">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="editItem.name" placeholder="请输入客户联系人姓名" autofocus></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="number">
            <el-input v-model="editItem.number" placeholder="请输入客户联系人电话"></el-input>
          </el-form-item>
          <el-form-item label="单位" prop="company">
            <el-input v-model="editItem.company" placeholder="请输入客户单位"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="addr">
            <el-input v-model="editItem.addr" placeholder="请输入客户单位地址"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" prop="email">
            <el-input v-model="editItem.email" placeholder="请输入客户电子邮箱"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="notice">
            <el-input v-model="editItem.notice" placeholder="请输入备注"></el-input>
          </el-form-item>
          <el-form-item style="margin-left: 50%; transform: translateX(-50%)">
            <el-button type="success" style="width: 45%" @click="handleEdit">确定</el-button>
            <el-button type="warning" style="width: 45%" @click="editCustom = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <el-pagination
        style="margin-top: 20px"
        :total="pagination.total"
        :page-size="pagination.pageSize"
        :current-page.sync="pagination.currentPage"
        @current-change="handleChangePage"
        background>
      </el-pagination>
    </div>
</template>

<script>
import { deleteCustom, getCustoms, newCustom, getCustomsPagination, getCustom, updateCustom, getCustomsByNameOrCompany } from '../../api/custom'

export default {
  name: 'index',
  data () {
    return {
      customs: [],
      addCustom: false,
      editCustom: false,
      addItem: {
        name: '',
        number: '',
        company: '',
        addr: '',
        email: '',
        notice: ''
      },
      editItem: {
        name: '',
        number: '',
        company: '',
        addr: '',
        email: '',
        notice: ''
      },
      addItemRules: {
        name: [
          { required: true, trigger: 'blur', message: '请输入客户姓名' }
        ],
        number: [
          { required: true, trigger: 'blur', message: '请输入客户电话' }
        ],
        company: [
          { required: true, trigger: 'blur', message: '请输入客户单位' }
        ],
        addr: [
          { required: true, trigger: 'blur', message: '请输入客户单位地址' }
        ],
        email: [
          { type: 'email', trigger: 'blur', message: '请输入正确的邮箱' }
        ]
      },
      pagination: {
        total: 0,
        currentPage: 1,
        pageSize: 0
      },
      query: '',
      isQuery: false
    }
  },
  created () {
    this.isQuery = false
    getCustoms().then((res) => {
      this.pagination.total = res.data.meta.total
      this.pagination.pageSize = res.data.meta.per_page
      this.pagination.currentPage = res.data.meta.current_page
      this.customs = res.data.data
    }).catch((err) => {
      console.log('获取客户信息出错', err)
    })
  },
  methods: {
    newCustom () {
      this.$refs.addItem.validate((valid) => {
        if (valid) {
          newCustom(this.addItem).then((res) => {
            this.$message.success('添加成功')
            this.customs.push(res.data.data)
            this.addCustom = false
            this.$refs.addItem.resetFields()
          }).catch((err) => {
            console.log('添加客户信息出错', err)
            this.$message.error('添加信息出错')
          })
        }
      })
    },
    handleDelete (id) {
      deleteCustom(id).then((res) => {
        this.$message.success('删除成功')
        getCustomsPagination(this.pagination.currentPage).then((res) => {
          this.customs = res.data.data
        }).catch((err) => {
          console.log('删除客户信息出错', err)
          this.$message.error('删除信息出错')
        })
      })
    },
    edit (id) {
      getCustom(id).then((res) => {
        this.editItem = res.data.data
        this.editCustom = true
      })
    },
    handleEdit () {
      updateCustom(this.editItem.id, this.editItem).then((res) => {
        this.$refs.editItem.resetFields()
        this.$message.success('更新信息成功')
        this.editCustom = false
        getCustomsPagination(this.pagination.currentPage).then((res) => {
          this.customs = res.data.data
        })
      }).catch((err) => {
        console.log('更新用户信息出错', err)
        this.$message.error('更新信息出错')
      })
    },
    handleChangePage () {
      if (this.isQuery) {
        getCustomsByNameOrCompany(this.query, this.pagination.currentPage).then((res) => {
          this.customs = res.data.data
        }).catch((err) => {
          console.log('查询客户信息失败', err)
        })
      } else {
        getCustomsPagination(this.pagination.currentPage).then((res) => {
          this.customs = res.data.data
        }).catch((err) => {
          console.log('换页失败', err)
        })
      }
    },
    handleSearch () {
      if (this.query === '') {
        this.isQuery = false
        getCustoms().then((res) => {
          this.pagination.total = res.data.meta.total
          this.pagination.pageSize = res.data.meta.per_page
          this.pagination.currentPage = res.data.meta.current_page
          this.customs = res.data.data
        }).catch((err) => {
          console.log('获取客户信息出错', err)
        })
      } else {
        this.isQuery = true
        getCustomsByNameOrCompany(this.query).then((res) => {
          this.pagination.total = res.data.meta.total
          this.pagination.pageSize = res.data.meta.per_page
          this.pagination.currentPage = res.data.meta.current_page
          this.customs = res.data.data
        }).catch((err) => {
          console.log('查询客户信息失败', err)
        })
      }
    },
    handleClear () {
      this.isQuery = false
      getCustoms().then((res) => {
        this.pagination.total = res.data.meta.total
        this.pagination.pageSize = res.data.meta.per_page
        this.pagination.currentPage = res.data.meta.current_page
        this.customs = res.data.data
      }).catch((err) => {
        console.log('获取客户信息出错', err)
      })
    }
  }
}
</script>

<style scoped>

</style>
