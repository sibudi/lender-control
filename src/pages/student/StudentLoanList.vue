<template>
  <section>
    <!--Toolbar-->
    <el-form :inline="true" :model="searchForm" class="toolbar" label-position="right" label-width="70px">
      <el-row>
        <el-form-item label="Nomor Permohonan">
          <el-input v-model="searchForm.id" width="200"></el-input>
        </el-form-item>
        <el-form-item label="Nama">
          <el-input v-model="searchForm.realName" width="200"></el-input>
        </el-form-item>
        <el-form-item label="Status" prop="status">
          <el-select v-model="searchForm.status" placeholder="Silakan pilih" clearable>
            <el-option v-for="item in orderStatusList" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Nominal">
          <el-input v-model="searchForm.amountApply" width="200"></el-input>
        </el-form-item>
        <el-form-item label="Durasi">
          <el-input v-model="searchForm.term" width="200"></el-input>
        </el-form-item>

        <el-form-item label="Waktu Pendaftaran">
          <div class="block">
            <el-date-picker
              v-model="searchForm.createTimeMin"
              type="date"

              :editable="false"
              placeholder="Pilih tanggal">
            </el-date-picker> ~
            <el-date-picker
              v-model="searchForm.createTimeMax"
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
    <!--List-->   <!--:picker-options="pickerOptions1"  :picker-options="pickerOptions2"  -->


    <template>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid">
        <el-table-column label="Nomor Permohonan" prop="id" width="280">
        </el-table-column>
        <el-table-column label="Nama" prop="realName" width="180">
        </el-table-column>
        <!--<el-table-column label="Nomor Ponsel" prop="mobileNumber" width="130">
        </el-table-column>-->
        <el-table-column label="Pesan Ulang" prop="isAgain">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isAgain==1? 'success' : 'danger'" close-transition>{{scope.row.isAgain==1?'Ya':'Tidak'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Status" prop="status">
          <template slot-scope="scope">
            <span>{{getOrderType(scope.row.status)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="Nominal" prop="amountApply">
        </el-table-column>
        <el-table-column label="Durasi" prop="term">
        </el-table-column>

        <el-table-column label="Waktu Pembuatan" prop="createTime" min-width="116">
          <template slot-scope="scope">
            <span>{{getUnixTime(scope.row.createTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="Opsi" width="100">
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
        //Status
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