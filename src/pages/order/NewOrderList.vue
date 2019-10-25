<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar" label-position="right" label-width="100px">
      <el-row>
        <el-form-item label="订单号">
          <el-input v-model="searchForm.id" width="200"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="searchForm.realName" width="200"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="searchForm.mobile" width="200"></el-input>
        </el-form-item>
        <el-form-item label="订单状态" prop="status">
          <el-select v-model="searchForm.status" placeholder="请选择" clearable>
            <el-option v-for="item in statusList" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支付时间">
          <div class="block">
            <el-date-picker v-model="searchForm.incomeTimeMin" type="date" :picker-options="pickerOptions1" :editable="false" placeholder="选择日期"></el-date-picker> ~
            <el-date-picker v-model="searchForm.incomeTimeMax" type="date" :picker-options="pickerOptions2" :editable="false" placeholder="选择日期"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="债匹时间">
          <div class="block">
            <el-date-picker v-model="searchForm.bondXatchingTimeMin" type="date" :editable="false" :picker-options="pickerOptions3" placeholder="选择日期"></el-date-picker> ~
            <el-date-picker v-model="searchForm.bondXatchingTimeMax" type="date" :editable="false" :picker-options="pickerOptions4" placeholder="选择日期"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label=" ">
          <el-button @click="search" type="primary" style="width: 170px">查询</el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <template>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid">
        <el-table-column label="订单号" prop="id">
        </el-table-column>
        <el-table-column label="姓名" prop="realName">
        </el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <span>{{getOrderStatus(scope.row.status)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="下单时间" prop="createTime">
          <template slot-scope="scope">
            <span>{{getUnixTime(scope.row.createTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="支付时间" prop="buyTime">
          <template slot-scope="scope">
            <span>{{getUnixTime(scope.row.buyTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="债匹时间" prop="bondXatchingTime">
          <template slot-scope="scope">
            <span>{{getUnixTime(scope.row.bondXatchingTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="金额" prop="amountBuy">
        </el-table-column>
        <el-table-column label="产品类型" prop="borrowingTerm">
          <template slot-scope="scope">
            <span>{{getproductType(scope.row.borrowingTerm)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="利率" prop="yearRateFin">
        </el-table-column>
        <el-table-column label="到期日" prop="dueTime">
          <template slot-scope="scope">
            <span>{{getUnixTime(scope.row.dueTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="edit(scope.row)">查看</el-button>
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
        let compareDate = (time, form, txt, type) => {
          let _cp1 = time.getTime() >= Date.now()
          let _cp2 = false
          let _input = this[form][txt]
          if (_input) {
            let _time = Date.parse(new Date(_input))
            if ((type == "s" && time.getTime() > _time) || (type == "e" && time.getTime() < _time)) {
              _cp2 = true
            }
          }
          return _cp1 || _cp2
        }
      return {
        searchForm:{
          id: '',
          mobile: '',
          incomeTimeMin: '',
          incomeTimeMax: '',
          bondXatchingTimeMin: '',
          bondXatchingTimeMax: '',
          realName: '',
          status: ''
        },
        statusList:enums.status,
        gridLoading: false,
        gridData: [],
        pageIndex: 1,
        pageSize: 10,
        dataTotal: 0,
        pickerOptions1:{
          disabledDate(time) {
            return compareDate(time, "searchForm", "incomeTimeMax", "s")
          }
        },
        pickerOptions2: {
          disabledDate(time) {
            return compareDate(time, "searchForm", "incomeTimeMin", "e")
          }
        },
        pickerOptions3:{
          disabledDate(time) {
            return compareDate(time, "searchForm", "bondXatchingTimeMax", "s")
          }
        },
        pickerOptions4: {
          disabledDate(time) {
            return compareDate(time, "searchForm", "bondXatchingTimeMin", "e")
          }
        },
      }
    },
    methods:{
      getUnixTime(time){
        return DataUtil.formatUnixTime(time);
      },
      getproductType(type){
        return enums.getName(type,enums.productType);
      },
      getOrderStatus(type){
        return enums.getName(type,enums.status);
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
          incomeTimeMin:DataUtil.formatTime(this.searchForm.incomeTimeMin)||'',
          incomeTimeMax:DataUtil.formatTime(this.searchForm.incomeTimeMax)||'',
          bondXatchingTimeMin:DataUtil.formatTime(this.searchForm.bondXatchingTimeMin)||'',
          bondXatchingTimeMax:DataUtil.formatTime(this.searchForm.bondXatchingTimeMax)||''
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
// src/pages/order/NewOrderList.vue