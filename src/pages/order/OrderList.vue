<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar" label-position="right" label-width="100px">
      <el-row>
        <el-form-item label="理财订单号">
          <el-input v-model="searchForm.id" width="200"></el-input>
        </el-form-item>
        <el-form-item label="理财人手机号">
          <el-input v-model="searchForm.mobile" width="200"></el-input>
        </el-form-item>
        <el-form-item label="购买时间区间">
          <div class="block">
            <el-date-picker
              v-model="searchForm.buyTimeMin"
              type="date"
              :editable="false"
              placeholder="选择日期">
            </el-date-picker> ~
            <el-date-picker
              v-model="searchForm.buyTimeMax"
              type="date"
              :editable="false"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="产品类型" prop="productType">
          <el-select v-model="searchForm.productType" placeholder="请选择" clearable>
            <el-option v-for="item in productType" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年化收益率" prop="yearRateFin">
          <el-input v-model="searchForm.yearRateFin" width="200"></el-input>
        </el-form-item>
        <el-form-item label="交易类型" prop="tradeType">
          <el-select v-model="searchForm.tradeType" placeholder="请选择" clearable>
            <el-option v-for="item in tradeType" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="到期时间区间">
          <div class="block">
            <el-date-picker
              v-model="searchForm.dueTimeMin"
              type="date"
              :editable="false"
              placeholder="选择日期">
            </el-date-picker> ~
            <el-date-picker
              v-model="searchForm.dueTimeMax"
              type="date"
              :editable="false"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label=" ">
          <el-button @click="search" type="primary" style="width: 170px">查询</el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <template>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid">
        <el-table-column label="订单编号" prop="id">
        </el-table-column>
        <el-table-column label="手机号" prop="mobile">
        </el-table-column>
        <el-table-column label="购买金额" prop="amountBuy">
        </el-table-column>
        <el-table-column label="购买时间" prop="buyTime">
          <template slot-scope="scope">
            <span>{{getUnixTime(scope.row.buyTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="购买产品类型" prop="productType">
          <template slot-scope="scope">
            <span>{{getproductType(scope.row.productType)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="年化收益率" prop="yearRateFin">
        </el-table-column>
        <el-table-column label="到期日" prop="dueTime">
          <template slot-scope="scope">
            <span>{{getUnixTime(scope.row.dueTime)}}</span>
          </template>
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
        //sex: enums.sex,
        searchForm:{
          id: '',
          mobile: '',
          dueTimeMin: '',
          dueTimeMax: '',
          buyTimeMin: '',
          buyTimeMax: '',
          yearRateFin: '',
          productType: '',
          tradeType: ''
        },
        tradeType:enums.tradeType,
        productType: enums.productType,
        gridLoading: false,
        gridData: [],
        pageIndex: 1,
        pageSize: 10,
        dataTotal: 0,
        /*pickerOptions1: {
          disabledDate(time) {
            return this.compareDate(time, "searchForm", "createTimeMax", "s")
          }
        },
        pickerOptions2: {
          disabledDate(time) {
            return this.compareDate(time, "searchForm", "createTimeMin", "e")
          }
        }*/
      }
    },
    methods:{
      getUnixTime(time){
        return DataUtil.formatUnixTime(time);
      },
      getproductType(type){
        return enums.getName(type,enums.productType);
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
        let _data = Object.assign({pageNo:this.pageIndex, pageSize:this.pageSize},this.searchForm,{
          buyTimeMin:DataUtil.formatTime(this.searchForm.buyTimeMin)||'',
          buyTimeMax:DataUtil.formatTime(this.searchForm.buyTimeMax)||'',
          dueTimeMin:DataUtil.formatTime(this.searchForm.dueTimeMin)||'',
          dueTimeMax:DataUtil.formatTime(this.searchForm.dueTimeMax)||''
        });

        this.$http.post('api-order/order/orderListByPage',_data).then(response =>{
          let {data} = response.data;
          this.gridData = data.content;
          this.dataTotal = data.totalElements;
        })
      },
    },
    mounted(){
      this.bindGrid();
    }
  }
</script>

<style scoped>

</style>




// WEBPACK FOOTER //
// src/pages/order/OrderList.vue