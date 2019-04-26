<template>
<div>
  <div class="float-button toolbar">
    <el-button type="success" @click="addItem = true" style="display: block">添加条目</el-button>
    <el-button type="warning" @click="addTransform" style="display: block; margin-left: 0; margin-top: 10px">添加交通费</el-button>
    <el-button type="info" @click="getDiscount" style="display: block; margin-left: 0; margin-top: 10px">折扣&nbsp;{{ discount * 100 + '%' }}</el-button>
    <el-button type="primary" @click="getPDF(contact.company)" style="display: block; margin-left: 0; margin-top: 10px">导出PDF</el-button>
    <el-upload
      style="display: block; margin-left: 0; margin-top: 10px"
      action="http://offer.test/api/uploadPaperList"
      :headers="{ Authorization: this.$store.getters.getToken }"
      :on-error="handleUploadError"
      :on-success="handleUploadSuccess"
      :show-file-list=false>
      <el-button>点击上传</el-button>
    </el-upload>
  </div>
  <div class="paper">
    <el-row>
      <el-col :span="3">
        <img :src="ly" alt="" style="width: 120px;">
      </el-col>
      <el-col :span="15" style="text-align: center">
        <h1>陕西力源仪器设备检测有限公司<br />仪器设备报价单</h1>
      </el-col>
      <el-col :span="6">
        <img :src="pt" alt="" style="width: 120px">
        <img :src="fw" alt="" style="width: 120px; float: right">
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" style="padding-left: 15px">编号：{{ this.paperId }}</el-col>
      <el-col :span="12" style="text-align: right;padding-right: 15px">报价时间：{{ this.paperTime }}</el-col>
    </el-row>
    <el-row style="display: flex;">
      <el-col :span="12" class="bordered-cell">报价人：{{ profile.username }}</el-col>
      <el-col :span="3" class="bordered-text-center">联系人</el-col>
      <el-col :span="9" class="bordered-text-center">
        <el-autocomplete v-model="contact.name"
                         :fetch-suggestions="handleGetCustoms"
                         :trigger-on-focus="false"
                         style="width: 100%"
                         @select="selectCustomItem"
                         clearable>
          <template slot-scope="{ item }">
            <div class="name">{{ item.name }} || {{ item.company }}</div>
          </template>
        </el-autocomplete>
      </el-col>
    </el-row>
    <el-row style="display: flex;">
      <el-col :span="12" class="bordered-cell">单位：陕西力源仪器设备检测有限公司</el-col>
      <el-col :span="3" class="bordered-text-center">单位</el-col>
      <el-col :span="9" class="bordered-text-center">
        <el-autocomplete v-model="contact.company"
                         :fetch-suggestions="handleGetCustoms"
                         :trigger-on-focus="false"
                         style="width: 100%"
                         @select="selectCustomItem"
                         clearable>
          <template slot-scope="{ item }">
            <div>{{ item.company }} || {{ item.name }}</div>
          </template>
        </el-autocomplete>
      </el-col>
    </el-row>
    <el-row style="display: flex;">
      <el-col :span="12" class="bordered-cell">地址：西安市航天产业基地神舟四路工业二路建工科技创业基地</el-col>
      <el-col :span="3" class="bordered-text-center">地址</el-col>
      <el-col :span="9" class="bordered-text-center">
        <el-input v-model="contact.addr"></el-input>
      </el-col>
    </el-row>
    <el-row style="display: flex;">
      <el-col :span="12" class="bordered-cell">电话：{{ profile.number }}</el-col>
      <el-col :span="3" class="bordered-text-center">电话</el-col>
      <el-col :span="9" class="bordered-text-center">
        <el-input v-model="contact.number"></el-input>
      </el-col>
    </el-row>
    <el-row style="display: flex;">
      <el-col :span="12" class="bordered-cell">手机：{{ profile.tel }}</el-col>
      <el-col :span="3" class="bordered-text-center">邮箱</el-col>
      <el-col :span="9" class="bordered-text-center">
        <el-input v-model="contact.email"></el-input>
      </el-col>
    </el-row>
    <el-row style="display: flex;">
      <el-col :span="12" class="bordered-cell">邮箱：1316917381@qq.com</el-col>
      <el-col :span="3" class="bordered-text-center">备注</el-col>
      <el-col :span="9" class="bordered-text-center">
        <el-input v-model="contact.notice"></el-input>
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
    <el-row style="display: flex" v-for="(paper, index) in paperList" :key="index">
      <el-col :span="1" class="bordered-text-center">{{ index + 1 }}</el-col>
      <el-col :span="8" class="bordered-text-center">
        <el-input v-model="paper.name" clearable @clear="handleDeleteItem(index)"></el-input>
      </el-col>
      <el-col :span="4" class="bordered-text-center">
        <el-input v-model="paper.type"></el-input>
      </el-col>
      <el-col :span="2" class="bordered-text-center">
        <el-input v-model="paper.number"></el-input>
      </el-col>
      <el-col :span="2" class="bordered-text-center">
        <el-input v-model="paper.price"></el-input>
      </el-col>
      <el-col :span="2" class="bordered-text-center">
        <el-input v-model="paper.total"></el-input>
      </el-col>
      <el-col :span="5" class="bordered-text-center">
        <el-input v-model="paper.notice"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="13" class="bordered-text-center">交通费</el-col>
      <el-col :span="11" class="bordered-text-center">{{ transformPrice }}元</el-col>
    </el-row>
    <el-row>
      <el-col :span="13" class="bordered-text-center">合计金额（含税）</el-col>
      <el-col :span="11" class="bordered-text-center">{{ getShouldPay }}元<span v-if="discount !== 1">【{{ discount }}折】</span></el-col>
    </el-row>
    <el-row>
      <el-col :span="13" class="bordered-text-center">合计金额（大写）</el-col>
      <el-col :span="11" class="bordered-text-center">{{ getBig }}</el-col>
    </el-row>

    <el-dialog title="添加报价" :visible.sync="addItem" center width="30%">
      <el-form :model="paperListItem" ref="paperListItem" :rules="paperListItemRules">
        <el-form-item label="仪器/设备名称" prop="name">
          <el-autocomplete v-model="paperListItem.name"
                           ref="name"
                           :fetch-suggestions="handleQuery"
                           @select="handleSelect"
                           style="width: 100%"
                           clearable
                           autofocus
                           :trigger-on-focus="false">
            <template slot-scope="{ item }">
              <div>{{ item.name }} || {{ item.level }} || {{ item.range }}</div>
            </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="型号规格" prop="type">
          <el-input v-model="paperListItem.type" clearable></el-input>
        </el-form-item>
        <el-form-item label="数量（台）" prop="number" style="width: 48%; display: inline-block">
          <el-input v-model.number="paperListItem.number" clearable @keyup.enter.native="handleAddItem"></el-input>
        </el-form-item>
        <el-form-item label="单价（元）" prop="price" style="width: 48%; display: inline-block;margin-left: 4%;">
          <el-input v-model="paperListItem.price" clearable @keyup.enter.native="handleAddItem"></el-input>
        </el-form-item>
        <el-form-item label="合计（元）" prop="total">
          <el-input v-model="paperListItem.total" clearable></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="notice">
          <el-input v-model="paperListItem.notice" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="handleAddItem">添加第&nbsp;{{ paperList.length + 1 }}&nbsp;条</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</div>
</template>

<script>
import { getPricesByName } from '../../api/price'
import { getCustomsByNameOrCompany } from '../../api/custom'
import { profile } from '../../api/auth'
import { smallToBig } from '../../handle/handle'
import { pdf } from '../../handle/htmlToPdf'
import signUrl from '../../assets/sign.png'
import { paper } from '../../api/paper'
import fw from '../../assets/fw.jpg'
import pt from '../../assets/pt.jpg'
import ly from '../../assets/ly.png'

export default {
  name: 'index',
  data () {
    return {
      fw: fw,
      pt: pt,
      ly: ly,
      profile: {},
      paperList: [],
      paperListItem: {},
      paperListItemRules: {
        name: [
          { required: true, trigger: 'blur', message: '请输入仪器/设备名称' }
        ],
        number: [
          { required: true, trigger: 'blur', message: '请输入数量' },
          { type: 'number', trigger: 'blur', message: '数量必须为数字' }
        ],
        price: [
          { required: true, trigger: 'blur', message: '请输入价格' }
        ]
      },
      addItem: false,
      contact: {
        name: '',
        company: '',
        addr: '',
        number: '',
        email: '',
        notice: ''
      },
      paperTime: '',
      paperId: '',
      transformPrice: 0,
      shouldPay: 0,
      discount: 1,
      signUrl: signUrl
    }
  },
  created () {
    let myDate = new Date()
    profile().then((res) => {
      this.profile = res.data.data
      this.paperTime = myDate.toLocaleString('chinese', { hour12: false })
      this.paperId = 'SXLY' + this.profile.sign + myDate.getFullYear() + (myDate.getMonth() + 1) +
        myDate.getDate() + myDate.getTime().toString().substr(5)
    })
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
      this.paperListItem = item
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
    },
    handleAddItem () {
      this.$refs.paperListItem.validate((valid) => {
        if (valid) {
          this.paperList.push(this.paperListItem)
          this.paperListItem = {}
          this.$refs.name.focus()
        }
      })
    },
    handleDeleteItem (index) {
      this.paperList.splice(index, 1)
    },
    addTransform () {
      this.$prompt('交通费', '提示', {
        confirmButtonText: '确定',
        cancelButtonClass: '取消',
        inputType: 'number'
      }).then(({ value }) => {
        this.transformPrice = value
      })
    },
    getDiscount () {
      this.$prompt('折扣', '提示', {
        confirmButtonText: '确定',
        cancelButtonClass: '取消',
        inputType: 'number'
      }).then(({ value }) => {
        this.discount = value / 10
      })
    },
    getPDF (title) {
      if (!this.contact.company || this.paperList.length === 0) {
        this.$alert('请输入完整的内容', '内容异常')
        return false
      } else {
        paper(this.$data).then((res) => {
          console.log(res)
          this.contact = []
          this.paperList = []
          this.$message.success('PDF生成成功')
          pdf(title)
        }).catch((err) => {
          console.log('保存出错', err)
        })
      }
    },
    handleUploadError (err) {
      console.log('上传文件出错', err)
      this.$message.error('上传出错，请检查文件内容再试')
    },
    handleUploadSuccess (res) {
      this.$message.success('上传成功')
      console.log('上传成功', res)
    }
  },
  computed: {
    getTotal () {
      let total = this.paperListItem.number * this.paperListItem.price
      return isNaN(total) ? 0 : total
    },
    getBig () {
      return smallToBig(this.shouldPay)
    },
    getShouldPay () {
      if (this.paperList.length === 0) {
        this.shouldPay = this.transformPrice * this.discount
        return this.shouldPay
      } else {
        let tmp = 0
        for (let i = 0; i < this.paperList.length; i++) {
          tmp += parseInt(this.paperList[i].total)
        }
        this.shouldPay = (tmp + parseInt(this.transformPrice)) * this.discount
        return this.shouldPay
      }
    }

  },
  watch: {
    getTotal (total) {
      this.paperListItem.total = total
    }
  }
}
</script>

<style scoped lang="scss">
.paper {
  width: 70%;
  margin: 0 auto;
  line-height: 2em;
  padding: 50px;
}

.bordered-cell {
  border: black solid 1px;
  vertical-align: middle;
  padding-left: 15px;
}

.bordered-text-center {
  border: black solid 1px;
  text-align: center;
}

.float-button {
  background: #eee;
  padding: 15px 25px;
  margin: 10px 0 20px 0;
}
.toolbar {
  position: fixed;
  top: 65px;
  z-index: 9;
}
</style>
