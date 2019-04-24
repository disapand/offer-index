<template>
<div>
  <div class="float-button toolbar">
    <el-button type="info" @click="back"> <<< 返回列表 </el-button>
    <el-button type="primary" @click="getPDF(paper.custom.company)" style="display: block; margin-left: 0; margin-top: 10px">导出PDF</el-button>
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
      <el-col :span="12" style="padding-left: 15px">编号：{{ paper.paperId }}</el-col>
      <el-col :span="12" style="text-align: right;padding-right: 15px">报价时间：{{ paper.paperTime }}</el-col>
    </el-row>
    <el-row style="display: flex;">
      <el-col :span="12" class="bordered-cell">报价人：{{ paper.user.username }}</el-col>
      <el-col :span="3" class="bordered-text-center">联系人</el-col>
      <el-col :span="9" class="bordered-text-center">{{ paper.custom.name }}</el-col>
    </el-row>
    <el-row style="display: flex;">
      <el-col :span="12" class="bordered-cell">单位：陕西力源仪器设备检测有限公司</el-col>
      <el-col :span="3" class="bordered-text-center">单位</el-col>
      <el-col :span="9" class="bordered-text-center">{{ paper.custom.company }}</el-col>
    </el-row>
    <el-row style="display: flex;">
      <el-col :span="12" class="bordered-cell">地址：西安市航天产业基地神舟四路工业二路建工科技创业基地</el-col>
      <el-col :span="3" class="bordered-text-center">地址</el-col>
      <el-col :span="9" class="bordered-text-center">{{ paper.custom.addr }}</el-col>
    </el-row>
    <el-row style="display: flex;">
      <el-col :span="12" class="bordered-cell">电话：{{ paper.user.number }}</el-col>
      <el-col :span="3" class="bordered-text-center">电话</el-col>
      <el-col :span="9" class="bordered-text-center">{{ paper.custom.number }}</el-col>
    </el-row>
    <el-row style="display: flex;">
      <el-col :span="12" class="bordered-cell">手机：{{ paper.user.tel }}</el-col>
      <el-col :span="3" class="bordered-text-center">邮箱</el-col>
      <el-col :span="9" class="bordered-text-center">{{ paper.custom.email }}</el-col>
    </el-row>
    <el-row style="display: flex;">
      <el-col :span="12" class="bordered-cell">邮箱：1316917381@qq.com</el-col>
      <el-col :span="3" class="bordered-text-center">备注</el-col>
      <el-col :span="9" class="bordered-text-center">{{ paper.custom.notice }}</el-col>
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
    <el-row style="display: flex" v-for="(item, index) in paper.paperList" :key="index">
      <el-col :span="1" class="bordered-text-center">{{ index + 1 }}</el-col>
      <el-col :span="8" class="bordered-text-center">{{ item.name }}</el-col>
      <el-col :span="4" class="bordered-text-center">{{ item.type }}</el-col>
      <el-col :span="2" class="bordered-text-center">{{ item.number }}</el-col>
      <el-col :span="2" class="bordered-text-center">{{ item.price }}</el-col>
      <el-col :span="2" class="bordered-text-center">{{ item.total }}</el-col>
      <el-col :span="5" class="bordered-text-center">{{ item.notice }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="13" class="bordered-text-center">交通费</el-col>
      <el-col :span="11" class="bordered-text-center">{{ paper.transformPrice }}元</el-col>
    </el-row>
    <el-row>
      <el-col :span="13" class="bordered-text-center">合计金额（含税）</el-col>
      <el-col :span="11" class="bordered-text-center">{{ paper.shouldPay }}元<span v-if="parseInt(paper.discount) !== 1">【{{ paper.discount }}折】</span></el-col>
    </el-row>
    <el-row>
      <el-col :span="13" class="bordered-text-center">合计金额（大写）</el-col>
      <el-col :span="11" class="bordered-text-center">壹拾贰万叁仟肆佰伍拾陆</el-col>
    </el-row>
  </div>
</div>
</template>

<script>
import { pdf } from '../../handle/htmlToPdf'
import { paper } from '../../api/paper'
import { getPaper } from '../../api/paper'
import fw from '../../assets/fw.jpg'
import pt from '../../assets/pt.jpg'
import ly from '../../assets/ly.png'

export default {
  name: 'detail',
  data () {
    return {
      fw: fw,
      pt: pt,
      ly: ly,
      paper: {}
    }
  },
  created () {
    getPaper(this.$route.params.id).then((res) => {
      this.paper = res.data.data
      console.log(this.paper)
    }).catch((err) => {
      console.log('获取报价单详情出错', err)
    })
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    getPDF (title) {
      pdf(title)
      this.$message.success('PDF生成成功')
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
  padding: 15px 25px;
  margin: 10px 0 20px 0;
}
.toolbar {
  position: fixed;
  top: 65px;
  z-index: 9;
}
</style>
