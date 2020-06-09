<template>
  <section>
    <!--Toolbar-->
    <el-form :inline="true" :model="searchForm" class="toolbar" label-position="right" label-width="100px">
      <el-row>
        <el-form-item label="Nomor Permohonan">
          <el-input v-model="searchForm.orderNo" width="200"></el-input>
        </el-form-item>
        <el-form-item label="Nomor Klaim">
          <el-input v-model="searchForm.tradeNo" width="200"></el-input>
        </el-form-item>
        <el-form-item label="Periode">
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
        <el-form-item label="Jenis Transaksi" prop="tradeType">
          <el-select v-model="searchForm.tradeType" placeholder="Silakan pilih" clearable>
            <el-option v-for="item in tradeType" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" ">
          <el-button @click="search" type="primary" style="width: 170px">Cari</el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <template>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid">
        <el-table-column label="Nomor Permohonan" prop="orderNo" width="160px">
        </el-table-column>
        <el-table-column label="Waktu Pembuatan" prop="createTime">
          <template slot-scope="scope">
            <span>{{getUnixTime(scope.row.createTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="Dana Keluar" prop="fromUserId" width="180">
        </el-table-column>
        <el-table-column label="Dana Masuk" prop="toUserId">
        </el-table-column>
        <el-table-column label="Nominal Transaksi" prop="amount">
        </el-table-column>
        <el-table-column label="Jenis Transaksi" prop="tradeType">
          <!-- <template slot-scope="scope">
            <span>{{getTradeType(scope.row.tradeType)}}</span>
          </template> -->
        </el-table-column>
        <el-table-column label="Nomor Klaim" prop="tradeNo" min-width="116">
        </el-table-column>
        <!-- <el-table-column label="Catatan" prop="remark">
        </el-table-column> -->
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
          tradeType: '',
          timeMax: '',
          timeMin: '',
          tradeNo: '',
          orderNo: ''
        },
        tradeType:enums.tradeType,
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
      getTradeType(type){
        return enums.getName(type,enums.tradeType);
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
          timeMin:DataUtil.formatTime(this.searchForm.timeMin)||'',
          timeMax:DataUtil.formatTime(this.searchForm.timeMax)||''
        });

        this.$http.post('api-pay/pay/payAccountListByPage',_data).then(response =>{
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
// src/pages/order/PayAccountList.vue