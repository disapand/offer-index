<template>
<div class="paper">
  <el-row>
    <el-col :span="3"></el-col>
    <el-col :span="18" :offset="3" style="text-align: center">
      <h1>陕西力源仪器设备检测有限公司<br />仪器设备报价单</h1>
    </el-col>
    <el-col :span="3"></el-col>
  </el-row>
  <el-row>
    <el-col :span="12">编号：SXLY896907622031</el-col>
    <el-col :span="12" style="text-align: right;">报价时间：2019/04/11</el-col>
  </el-row>
  <el-row style="display: flex;">
    <el-col :span="12" class="bordered-cell">报价人：赵领超</el-col>
    <el-col :span="3" class="bordered-text-center">联系人</el-col>
    <el-col :span="9" class="bordered-text-center">
      <el-autocomplete v-model="contact.name"
                       placeholder="联系人姓名"
                       :fetch-suggestions="handleGetCustoms"
                       :trigger-on-focus="false"
                       style="width: 100%"
                       @select="selectCustomItem"
                       clearable>
        <template slot-scope="{ item }">
          <div class="name">{{ item.name }}</div>
        </template>
      </el-autocomplete>
    </el-col>
  </el-row>
  <el-row style="display: flex;">
    <el-col :span="12" class="bordered-cell">单位：陕西力源仪器设备检测有限公司</el-col>
    <el-col :span="3" class="bordered-text-center">单位</el-col>
    <el-col :span="9" class="bordered-text-center">
      <el-autocomplete v-model="contact.company"
                       placeholder="单位名称"
                       :fetch-suggestions="handleGetCustoms"
                       :trigger-on-focus="false"
                       style="width: 100%"
                       @select="selectCustomItem"
                       clearable>
        <template slot-scope="{ item }">
          <div class="company">{{ item.company }}</div>
        </template>
      </el-autocomplete>
    </el-col>
  </el-row>
  <el-row style="display: flex;">
    <el-col :span="12" class="bordered-cell">地址：西安市航天产业基地神舟四路工业二路建工科技创业基地</el-col>
    <el-col :span="3" class="bordered-text-center">地址</el-col>
    <el-col :span="9" class="bordered-text-center">
      <el-input v-model="contact.addr" placeholder="单位地址"></el-input>
    </el-col>
  </el-row>
  <el-row style="display: flex;">
    <el-col :span="12" class="bordered-cell">电话：029-89690762</el-col>
    <el-col :span="3" class="bordered-text-center">电话</el-col>
    <el-col :span="9" class="bordered-text-center">
      <el-input v-model="contact.number" placeholder="联系电话"></el-input>
    </el-col>
  </el-row>
  <el-row style="display: flex;">
    <el-col :span="12" class="bordered-cell">手机：13110445979</el-col>
    <el-col :span="3" class="bordered-text-center">邮箱</el-col>
    <el-col :span="9" class="bordered-text-center">
      <el-input v-model="contact.email" placeholder="联系人邮箱"></el-input>
    </el-col>
  </el-row>
  <el-row style="display: flex;">
    <el-col :span="12" class="bordered-cell">邮箱：1316917381@qq.com</el-col>
    <el-col :span="3" class="bordered-text-center">备注</el-col>
    <el-col :span="9" class="bordered-text-center">
      <el-input v-model="contact.notice" placeholder="备注信息"></el-input>
    </el-col>
  </el-row>
  <el-row style="display: flex;">
    <el-col :span="3" class="bordered-cell">收款信息</el-col>
    <el-col :span="9" class="bordered-cell">陕西力源仪器设备检测有限公司<br />开户行：工商银行西安民乐园支行<br />账号：3700162409200124735</el-col>
    <el-col :span="3" class="bordered-text-center">备注</el-col>
    <el-col :span="9" class="bordered-cell">
      <ol style="margin: 0;">
        <li>此报价单有效期为30天，过期自动作废。</li>
        <li>此报价单价格为预算价，实际费用以最后实际检定为主。</li>
        <li>客户同意报价请及时回复，确认后方可安排检定。</li>
        <li>检定完成后七个工作日内出具证书。</li>
        <li>其余事项由双方共同协商决定。</li>
      </ol>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="1" class="bordered-text-center"><strong>序号</strong></el-col>
    <el-col :span="8" class="bordered-text-center"><strong>仪器设备名称</strong></el-col>
    <el-col :span="4" class="bordered-text-center"><strong>型号规格</strong></el-col>
    <el-col :span="2" class="bordered-text-center"><strong>数量（台）</strong></el-col>
    <el-col :span="2" class="bordered-text-center"><strong>单价（元）</strong></el-col>
    <el-col :span="2" class="bordered-text-center"><strong>合计（元）</strong></el-col>
    <el-col :span="5" class="bordered-text-center"><strong>备注</strong></el-col>
  </el-row>
  <el-row style="display: flex">
    <el-col :span="1" class="bordered-text-center">{{ paperListIndex }}</el-col>
    <el-col :span="8" class="bordered-text-center">
      <el-autocomplete v-model="paperList.name"
                       :fetch-suggestions="handleQuery"
                       @select="handleSelect"
                       style="width: 100%"
                       clearable
                       :trigger-on-focus="false">
        <template slot-scope="{ item }">
          <div class="name">{{ item.name }}</div>
        </template>
      </el-autocomplete>
    </el-col>
    <el-col :span="4" class="bordered-text-center">
      <el-input v-model="paperList.type"></el-input>
    </el-col>
    <el-col :span="2" class="bordered-text-center">
      <el-input v-model="paperList.number"></el-input>
    </el-col>
    <el-col :span="2" class="bordered-text-center">
      <el-input v-model="paperList.price"></el-input>
    </el-col>
    <el-col :span="2" class="bordered-text-center">
      <el-input v-model="getTotal"></el-input>
    </el-col>
    <el-col :span="5" class="bordered-text-center">
      <el-input v-model="paperList.notice"></el-input>
    </el-col>
  </el-row>
</div>
</template>

<script>
import { getPricesByName } from '../../api/price'
import { getCustomsByNameOrCompany } from '../../api/custom'

export default {
  name: 'index',
  data () {
    return {
      paperListIndex: 1,
      paperList: {
        name: '',
        type: '',
        price: '',
        number: '',
        total: '',
        notice: ''
      },
      contact: {
        name: '',
        company: '',
        addr: '',
        number: '',
        email: '',
        notice: ''
      }
    }
  },
  methods: {
    handleQuery (queryString, callback) {
      getPricesByName(queryString).then((res) => {
        callback(res.data.data)
      }).catch((err) => {
        console.log('远程获取价目信息出错', err)
      })
    },
    handleSelect (item) {
      this.paperList = item
    },
    handleGetCustoms (queryString, callback) {
      getCustomsByNameOrCompany(queryString).then((res) => {
        callback(res.data.data)
      }).catch((err) => {
        console.log('远程获取用户信息出错', err)
      })
    },
    selectCustomItem (item) {
      this.contact = item
    }
  },
  computed: {
    getTotal: function () {
      return this.paperList.price * this.paperList.number
    }
  },
  watch: {
    paperList: function () {
      this.total = this.number * this.price
    }
  }
}
</script>

<style scoped>
.paper {
  border: black 1px solid;
  width: 70%;
  margin: 0 auto;
  line-height: 2em;
}

.bordered-cell {
  border: black solid 1px;
  vertical-align: middle;
}

.bordered-text-center {
  border: black solid 1px;
  text-align: center;
}
</style>
