<template>
  <section>
    <el-form :inline="true" :model="searchForm" class="toolbar" label-position="right" label-width="70px">
      <el-row>

        <el-form-item label="姓名">
          <el-input v-model="searchForm.realName" width="200"></el-input>
        </el-form-item>

        <el-form-item label="手机号">
          <el-input v-model="searchForm.mobileNumber" width="200"></el-input>
        </el-form-item>

        <el-form-item label=" ">
          <el-button @click="search" type="primary" style="width: 170px">查询</el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <template>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid">
        <el-table-column label="类型" prop="businessType"></el-table-column>
        <el-table-column label="动账时间" prop="dealTime" >
<!--           <template slot-scope="scope">
            {{getUnixTime(scope.row.dealTime)}}
          </template> -->
        </el-table-column>
        <el-table-column label="金额" prop="amount" ></el-table-column>
        <el-table-column label="可用账户余额" prop="currentBanlance" ></el-table-column>
        <el-table-column label="在投账户余额" prop="investBanlance" ></el-table-column>
        <el-table-column label="锁定账户余额" prop="lockedBanlance"></el-table-column>
        <el-table-column label="备注" prop="tradeInfo"></el-table-column>
      </el-table>
    </template>

    <!--分页-->
    <el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
    </el-pagination>

  </section>


</template>

<script>
  import DataUtil from '../../common/dataUtil'

    export default {
        data(){
          return {
            searchForm:{
              realName:'',
              mobileNumber:''
            },
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
            let _data = Object.assign({
              pageNo:this.pageIndex,
              pageSize:this.pageSize}, this.searchForm,{});


            this.gridLoading = true;
            this.$http.post('api-user/user/getAccountHistoryByNameOrMobile',_data).then(response =>{
              this.gridLoading = false;
              let {data} = response;
              this.gridData = data.data.content;
              this.dataTotal = data.data.totalElements;
            })
          },
        },
      mounted(){
        // this.bindGrid();
      }
    }
</script>

<style scoped>

</style>



// WEBPACK FOOTER //
// src/pages/user/UserAccount.vue