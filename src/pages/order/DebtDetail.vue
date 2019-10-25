<template>
  <section>
    <div class='title'>
      <div>订单号：{{rights.id}}</div>
      <div>生成时间：{{rights.createTime}}</div>
    </div>
    <template>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid">
        <el-table-column label="债权编号" prop="creditorNo">
        </el-table-column>
        <el-table-column label="投资金额" prop="amountBuy">
        </el-table-column>
<!--         <el-table-column label="购买状态" prop="status">
          <template slot-scope="scope">
            <span>{{getOrderStatus(scope.row.status)}}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="债权金额" prop="amountApply">
        </el-table-column>
        <el-table-column label="债权状态">
          <template slot-scope="scope">
            <span>{{getOrderStatus(scope.row.status)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="借款人姓名" prop="realName">
        </el-table-column>
        <el-table-column label="借款人身份证号" prop="idCardNo">
        </el-table-column>
      </el-table>
    </template>

    <!--分页-->
    <el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
    </el-pagination>
  </section>
</template>

<script>
  import enums from '../../common/enum'
  import DataUtil from '../../common/dataUtil'

  export default {
    name: "StudentLoanList",
    data(){
      return {
        rights:{},
        statusList:enums.status,
        gridLoading: false,
        gridData: [],
        pageIndex: 1,
        pageSize: 10,
        dataTotal: 0,
      }
    },
    methods:{
      getUnixTime(time){
        return DataUtil.formatUnixTime(time);
      },
      getproductType(type){
        return enums.getName(type,enums.productType);
      },
    getOrderStatus(status){
      let list = [
      {code:'1',name:'投标中'},{code:'2',name:'锁定中'},{code:'3',name:'满标'},{code:'4',name:'放款中'},{code:'5',name:'放款失败'}
      ,{code:'6',name:'放款成功'},{code:'7',name:'放款清分成功'},{code:'8',name:'放款成功'},{code:'9',name:'还款处理中'},{code:'10',name:'已还款'}
      ,{code:'11',name:'逾期已还款'},{code:'12',name:'还款清分成功'},{code:'13',name:'已还款'}];
      let re = '';
      list.forEach(v=>{if(v.code == status){re = v.name;return;}})
      return re;
    },
      formatTime(time){
        return DataUtil.formatUnixTime(time);
      },
      search() {
        this.bindGrid()
      },
      pageSizeChange(val) {
        this.pageSize = val;
        this.pageIndex = 1;
        this.bindGrid()
      },
      pageIndexChange(val) {
        this.pageIndex = val;
        this.bindGrid();
      },
      bindGrid(){
        let _data = {
          orderNo: this.uuid};

        this.$http.post('api-order/order/selectOrderDetail',_data).then(response =>{
          let {data} = response.data;
          this.gridData = data.content;
          this.dataTotal = data.totalElements;
        })
      },
    },
    mounted(){
      this.rights = JSON.parse(localStorage.getItem('Adminrights'));
      this.uuid = this.rights.id;
      this.bindGrid();
    }
  }
</script>

<style scoped>
.title{
  display: flex;
  justify-content: space-between;
  padding: 20px 30px 15px;
  background: #fafafa;
  color: #666;
  font-size: 15px;
  border-bottom: 1px solid #f0f0f0;
}
</style>




// WEBPACK FOOTER //
// src/pages/order/DebtDetail.vue