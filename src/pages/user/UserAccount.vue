<template>
  <section>
    <el-form :inline="true" :model="searchForm" class="toolbar" label-position="right" label-width="200px">
      <el-row>
        <el-form-item label="Nomor Ponsel">
          <el-input v-model="searchForm.mobileNumber" width="217px"></el-input>
        </el-form-item>
        <el-form-item label="Nama Lengkap">
          <el-input v-model="searchForm.realName" width="217px"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label=" ">
          <el-button @click="search" type="primary" >Cari</el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <template>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid" style="width: 100%">
        <el-table-column label="Jenis Transaksi" prop="businessType"></el-table-column>
        <el-table-column label="Waktu" prop="dealTime" width="200px">
          <template slot-scope="scope">
            {{scope.row.dealTime}}
          </template>
        </el-table-column>
        <el-table-column label="Nominal" prop="amount" width="90px"></el-table-column>
        <el-table-column label="Saldo" prop="currentBanlance" width="90px"></el-table-column>
        <el-table-column label="Saldo;Investasi" prop="investBanlance" width="90px" :render-header="renderMultilineHeader"></el-table-column>
        <el-table-column label="Saldo;Terkunci" prop="lockedBanlance" width="90px" :render-header="renderMultilineHeader"></el-table-column>
        <!-- <el-table-column label="Catatan" prop="tradeInfo"></el-table-column> -->
      </el-table>
    </template>

    <!--Pagination-->
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
            return DataUtil.formatUnixTime(Date(time));
          },
          renderMultilineHeader(h, { column, $index }) {
            return h('div', {
              style: {
                lineHeight: 1.7
              }
            }, [
              h('span', column.label.split(';')[0]),
              h('br'),
              h('span', column.label.split(';')[1]),
            ])
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