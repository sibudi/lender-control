<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar" label-position="right" label-width="100px">
      <el-row>
        <el-form-item label="投资人姓名">
          <el-input v-model="searchForm.userName" width="200"></el-input>
        </el-form-item>
        <el-form-item label="订单状态" prop="">
          <el-select v-model="searchForm.status" placeholder="请选择" clearable>
            <el-option v-for="item in statusList" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支付状态" prop="">
          <el-select v-model="searchForm.payStatus" placeholder="请选择" clearable>
            <el-option v-for="item in payList" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
<!--         <el-form-item label="支付渠道" prop="status">
          <el-select v-model="searchForm.status" placeholder="请选择" clearable>
            <el-option v-for="item in statusList" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="支付时间区间">
          <div class="block">
            <el-date-picker v-model="searchForm.startTime" type="date" :picker-options="pickerOptions1" :editable="false" placeholder="选择日期"></el-date-picker> ~
            <el-date-picker v-model="searchForm.endTime" type="date" :picker-options="pickerOptions2" :editable="false" placeholder="选择日期"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="投资人手机号">
          <el-input v-model="searchForm.mobile"  width="200"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button @click="search" type="primary" style="width: 140px">查询</el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <template>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid">
        <el-table-column label="订单编号" prop="id">
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="订单金额" prop="applyBuy">
        </el-table-column>
        <el-table-column label="订单状态">
          <template slot-scope="scope">
            <span>{{getOrderStatus(scope.row.status)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="需充值金额" prop="chargeBuy">
        </el-table-column>
        <el-table-column label="支付时间" prop="buyTime">
        </el-table-column>
        <el-table-column label="支付状态">
        <template slot-scope="scope">
          <span>{{getPayStatus(scope.row.status)}}</span>
        </template>
        </el-table-column>
        <el-table-column label="投资人姓名" prop="userName">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="edit(scope.row)">查看债权</el-button>
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
          userName: '',
          mobile: '',
           startTime: '',
          endTime: '',
          payStatus:"",
          status:"",
          isAdmin: true
        },
        payList:[{code:'1',name:'待支付'},{code:'2',name:'支付成功'},{code:'3',name:'支付失败'}],
        statusList:[{code:'1',name:'投资处理中'},{code:'2',name:'投资失败'},{code:'3',name:'投资成功'},{code:'9',name:'订单失效'}],
        gridLoading: false,
        gridData: [],
        pageIndex: 1,
        pageSize: 10,
        dataTotal: 0,
        pickerOptions1:{
          disabledDate(time) {
            return compareDate(time, "searchForm", "endTime", "s")
          }
        },
        pickerOptions2: {
          disabledDate(time) {
            return compareDate(time, "searchForm", "startTime", "e")
          }
        }
      }
    },
    methods:{
      edit(row){
        this.$router.push('/DebtDetail');
        localStorage.setItem('Adminrights', JSON.stringify(row));
      },
      getUnixTime(time){
        return DataUtil.formatUnixTime(time);
      },
      getproductType(type){
        return enums.getName(type,enums.productType);
      },
    getOrderStatus(status){
      // let list = [{code:'1',name:'投资处理中'},{code:'2',name:'投资失败'},{code:'3',name:'投资成功'},{code:'9',name:'订单失效'}];
      let re = '';
      this.statusList.forEach(v=>{if(v.code == status){re = v.name;return;}})
      return re;
    },
    getPayStatus(status){
      let list = [{code:'1',name:'待支付'},{code:'2',name:'支付成功'},{code:'3',name:'支付成功'},{code:'9',name:'支付失败'}];
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
        let _data = Object.assign({pageNo:this.pageIndex, pageSize:this.pageSize},this.searchForm,{
           startTime:DataUtil.formatTime(this.searchForm. startTime)||'',
          endTime:DataUtil.formatTime(this.searchForm.endTime)||''
        });

        this.$http.post('api-order/order/selectUsrOrderList ',_data).then(response =>{
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
// src/pages/order/OrderAllList.vue