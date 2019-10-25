<template>
  <section class="orderBox">
    <!--客户信息-->
    <template>
      <el-row>
        <h1 class="one-title">订单详情</h1>
        <el-col :span="8" class="grid-content">
          <div><span>订单号:</span><span></span></div>
          <div><span>下单时间:</span><span></span></div>
          <div><span>债匹时间:</span><span></span></div>
        </el-col>
        <el-col :span="8" class="grid-content">
          <div><span>订单金额:</span><span></span></div>
          <div><span>生效时间:</span><span></span></div>
          <div><span>到期时间:</span><span></span></div>
        </el-col>
        <el-col :span="8" class="grid-content">
          <div><span>姓名:</span><span></span></div>
          <div><span>产品类型:</span><span></span></div>
        </el-col>
      </el-row>
      <div class="divid-line"></div>
    </template>

  

    <!-- 历史订单 -->
    <template>
      <el-row>
        <div class="flex aic">
          <h1 class="one-title">债匹关系</h1>
          <div class="f1">债权包11111111111111111号，债权包金额：1860000</div>
          <div class="exports_cel">导出EXCEL</div>
        </div>
        <el-table :data="historyData" v-loading="historyLoading" max-height="300">
          <el-table-column prop="orderNo" label="投资人姓名"></el-table-column>
          <el-table-column prop="status" label="订单号"></el-table-column>
          <el-table-column prop="amountApply" label="投资金额"></el-table-column>
          <el-table-column prop="borrowingTerm" label="占比"></el-table-column>
          <el-table-column prop="orderNo" label="借款人姓名"></el-table-column>
          <el-table-column prop="status" label="债权编号"></el-table-column>
          <el-table-column prop="amountApply" label="借款金额"></el-table-column>
          <el-table-column prop="borrowingTerm" label="借款占比"></el-table-column>
          <el-table-column prop="orderNo" label="借款状态"></el-table-column>
          <el-table-column prop="status" label="匹配时间"></el-table-column>
          <el-table-column prop="amountApply" label="应回款时间"></el-table-column>
          <el-table-column prop="borrowingTerm" label="实回款时间"></el-table-column>
        </el-table>
      </el-row>
      <div class="divid-line"></div>
    </template>

    <template>


    </template>

  </section>
</template>
<script>
  import enums from '../../common/enum'
  import DataUtil from '../../common/dataUtil'
  import Config from '../../common/config'
  export default {
    data () {
      let compareDate = (time) => {
        let _time = time.setDate(time.getDate()+1);
        return time.getTime() <= Date.now();
      }
      return {
        
      }
    },
    methods: {
    
    },
    mounted: function () {
      // this.orderId = this.$route.query['id'];
    }
  }
</script>
<style>
    /* 标题 */
    .main-title{
      font-size: 22px;
      margin-top: -15px;
      margin-bottom: 15px;
    }
  .one-title{
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 7px;
  }
  .two-title{
    font-size: 13px;
    color: #888;
    margin: 10px 0
  }
  .subtitle{
    font-size: 13px;
    color: #888;
  }
  .orderBox .el-row {
    margin: 15px 30px;
  }
  .orderBox .el-col span{
    margin-right: 10px;
  }
    .orderBox .el-button span,.orderBox .el-tag span{
      margin-right: 0;
    }
  .orderBox .box-card .el-button{
    margin-right: 5px;
  }
  .orderBox .grid-content {
    line-height: 28px;
  }

  .divid-line{
    height: 10px;
    background: #f1f2f7;
  }

.flex{
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    margin-bottom: 7px;
}
.aic{
  align-items: center;
}
.flex .one-title{
  margin-bottom: 0;
  margin-right: 30px;
}
.f1 {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.exports_cel{
  color: #409EFF;
}
</style>



// WEBPACK FOOTER //
// src/pages/order/OrderDetail.vue