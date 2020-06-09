<template>
  <section>
    <el-form :inline="true" :model="searchForm" class="toolbar" label-position="right" label-width="70px">
      <el-row>
        <el-form-item label="Nomor Ponsel">
          <el-input v-model="searchForm.mobile" ></el-input>
        </el-form-item>
        <el-form-item label="Status" prop="status">
          <el-select v-model="searchForm.pass" placeholder="Silakan pilih" clearable>
            <el-option v-for="item in authStatusList" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label=" ">
          <el-button @click="search" type="primary" style="width: 170px">Cari</el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <template>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid">
        <el-table-column label="Nama" prop="realName" >
        </el-table-column>
        <el-table-column label="Nomor Ponsel" prop="mobileNumber" >
        </el-table-column>
        <el-table-column label="Waktu Diubah" prop="updateTime" >
          <template slot-scope="scope">
            <span>{{getUnixTime(scope.row.updateTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="Status" prop="authStatus">
          <template slot-scope="scope">
            <span>{{getStatus(scope.row.authStatus)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="Catatan" prop="remark">
        </el-table-column>
        <el-table-column label="Opsi">
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
  import DataUtil from '../../common/dataUtil'

    export default {
        data(){
          return {
            searchForm:{
              pass:'',
              mobile:''
            },
            authStatusList:[{
              code:'3',
              name:'Berhasil'
            },{
              code:'4',
              name:'Gagal'
            }],
            StatusList:[{
              code:'1',
              name:"Dalam Proses"
            },{
              code:'3',
              name:'Berhasil'
            },{
              code:'4',
              name:'Gagal'
            }],
            gridLoading: false,
            gridData: [],
            pageIndex: 1,
            pageSize: 10,
            dataTotal: 0,
          }
        },
        methods:{
          getStatus(code){
            let re = '';
            this.StatusList.forEach((obj)=>{
              if(obj.code == code){
                re = obj.name;
                return;
              }
            })
            return re;
          },
          click(row){
            window.open('#/UserAuthFailDetail?&uuid='+row.id);
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
              pageSize:this.pageSize}, this.searchForm,{});
            this.gridLoading = true;
            this.$http.post('api-user/user/userAuthFailedListByPage',_data).then(response =>{
              this.gridLoading = false;
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
// src/pages/user/UserAuthCheckFail.vue