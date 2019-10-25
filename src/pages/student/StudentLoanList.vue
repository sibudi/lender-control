<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar" label-position="right" label-width="70px">
      <el-row>
        <el-form-item label="订单编号">
          <el-input v-model="searchForm.id" width="200"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="searchForm.realName" width="200"></el-input>
        </el-form-item>
        <el-form-item label="订单状态" prop="status">
          <el-select v-model="searchForm.status" placeholder="请选择" clearable>
            <el-option v-for="item in orderStatusList" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请金额">
          <el-input v-model="searchForm.amountApply" width="200"></el-input>
        </el-form-item>
        <el-form-item label="申请期限">
          <el-input v-model="searchForm.term" width="200"></el-input>
        </el-form-item>

        <el-form-item label="注册日期">
          <div class="block">
            <el-date-picker
              v-model="searchForm.createTimeMin"
              type="date"

              :editable="false"
              placeholder="选择日期">
            </el-date-picker> ~
            <el-date-picker
              v-model="searchForm.createTimeMax"
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
    <!--列表-->   <!--:picker-options="pickerOptions1"  :picker-options="pickerOptions2"  -->


    <template>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid">
        <el-table-column label="订单编号" prop="id" width="280">
        </el-table-column>
        <el-table-column label="姓名" prop="realName" width="180">
        </el-table-column>
        <!--<el-table-column label="手机号" prop="mobileNumber" width="130">
        </el-table-column>-->
        <el-table-column label="复借订单" prop="isAgain">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isAgain==1? 'success' : 'danger'" close-transition>{{scope.row.isAgain==1?'是':'否'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="订单状态" prop="status">
          <template slot-scope="scope">
            <span>{{getOrderType(scope.row.status)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请金额" prop="amountApply">
        </el-table-column>
        <el-table-column label="申请期限" prop="term">
        </el-table-column>

        <el-table-column label="申请时间" prop="createTime" min-width="116">
          <template slot-scope="scope">
            <span>{{getUnixTime(scope.row.createTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="click(scope.row)">查看详情</el-button>
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
          id:'',
          realName:'',
          userName:'',
          status:'',
          term: '',
          amountApply:'',
          createTimeMin:'',
          createTimeMax:''
        },
        //订单状态
        //isAgainOrder:enums.isAgainOrder,
        //orderStatus:enums.orderPro,
        orderStatusList:enums.studentLoanStatus,
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
      click(row){
        window.open('#/StudentLoanDetail?&uuid='+row.id + '&inviteCode=' + row.inviteCode);
      },
      getOrderType(type){
        return enums.getName(type,enums.studentLoanStatus);
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
          createTimeMin:DataUtil.formatTime(this.searchForm.createTimeMin)||'',
          createTimeMax:DataUtil.formatTime(this.searchForm.createTimeMax)||''
        });

        this.$http.post('api-user/user/studentLoanQueryForPage',_data).then(response =>{
          let {data} = response.data;
          this.gridData = data.content;
          this.dataTotal = data.totalElements;
        })
      },
      /*compareDate(time, form, txt, type){
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
      }*/
    },
    mounted(){
      this.bindGrid();
    }
  }
</script>

<style scoped>

</style>




// WEBPACK FOOTER //
// src/pages/student/StudentLoanList.vue