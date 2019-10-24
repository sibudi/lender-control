<template>
  <section>
    <el-form :inline="true" :model="searchForm" class="toolbar" label-position="right" label-width="70px">
      <el-row>

        <el-form-item label="Nama">
          <el-input v-model="searchForm.realname" width="200"></el-input>
        </el-form-item>

        <el-form-item label="Nomor Ponsel">
          <el-input v-model="searchForm.mobile" width="200"></el-input>
        </el-form-item>

        <el-form-item label="Tanggal Pendaftaran">
          <div class="block">
            <el-date-picker
              v-model="searchForm.timeMin"
              type="date"

              :editable="false"
              placeholder="Pilih tanggal">
            </el-date-picker> ~
            <el-date-picker
              v-model="searchForm.timeMax"
              type="date"

              :editable="false"
              placeholder="Pilih tanggal">
            </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item label=" ">
          <el-button @click="search" type="primary" style="width: 170px">Cari</el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <template>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid">
        <el-table-column label="Nomor" prop="id" width="280">
        </el-table-column>
        <el-table-column label="Name" prop="realName" >
        </el-table-column>
        <el-table-column label="Nomor Ponsel" prop="mobileNumber" >
        </el-table-column>

        <el-table-column label="Waktu diubah" prop="updateTime" >
          <template slot-scope="scope">
            <span>{{getUnixTime(scope.row.updateTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="Opsi" width="130">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="click(scope.row)">Detail</el-button>
          </template>
        </el-table-column>

      </el-table>
    </template>

    <!--Pagination-->
    <el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
    </el-pagination>

  </section>


</template>

<script>
  import enums from '../../common/enum'
  import DataUtil from '../../common/dataUtil'

    export default {
        name: "UserAuthCheckList",
        data(){
          return {
            searchForm:{
              realname:'',
              mobile:'',
              timeMin:'',
              timeMax:''
            },
            orderStatusList:enums.studentLoanStatus,
            gridLoading: false,
            gridData: [],
            pageIndex: 1,
            pageSize: 10,
            dataTotal: 0,
          }
        },
        methods:{
          click(row){
            window.open('#/UserAuthDetail?&uuid='+row.id);
          },
          getOrderType(type){
            return enums.getName(type,enums.studentLoanStatus);
          },
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
              pageSize:this.pageSize}, this.searchForm,{
              timeMin:DataUtil.formatTime(this.searchForm.timeMin)||'',
              timeMax:DataUtil.formatTime(this.searchForm.timeMax)||''
            });


            this.gridLoading = true;
            this.$http.post('api-user/user/userAuthFailedListByPage',_data).then(response =>{
              this.gridLoading = false;
              //console.log(response);
              let {data} = response;
              this.gridData = data.data.content;
              this.dataTotal = data.data.totalElements;
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
// src/pages/user/UserAuthCheckList.vue