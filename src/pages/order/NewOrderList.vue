<template>
  <section>
    <!--Toolbar-->
    <el-form :inline="true" :model="searchForm" class="toolbar" label-position="right" label-width="100px">
      <el-row>
        <el-form-item label="Nomor Permohonan">
          <el-input v-model="searchForm.id" width="200"></el-input>
        </el-form-item>
        <el-form-item label="Nama">
          <el-input v-model="searchForm.realName" width="200"></el-input>
        </el-form-item>
        <el-form-item label="Nomor Ponsel">
          <el-input v-model="searchForm.mobile" width="200"></el-input>
        </el-form-item>
        <el-form-item label="Status" prop="status">
          <el-select v-model="searchForm.status" placeholder="Silakan pilih" clearable>
            <el-option v-for="item in statusList" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Waktu Pembayaran">
          <div class="block">
            <el-date-picker v-model="searchForm.incomeTimeMin" type="date" :picker-options="pickerOptions1" :editable="false" placeholder="Pilih tanggal"></el-date-picker> ~
            <el-date-picker v-model="searchForm.incomeTimeMax" type="date" :picker-options="pickerOptions2" :editable="false" placeholder="Pilih tanggal"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="Waktu Peminjaman">
          <div class="block">
            <el-date-picker v-model="searchForm.bondXatchingTimeMin" type="date" :editable="false" :picker-options="pickerOptions3" placeholder="Pilih tanggal"></el-date-picker> ~
            <el-date-picker v-model="searchForm.bondXatchingTimeMax" type="date" :editable="false" :picker-options="pickerOptions4" placeholder="Pilih tanggal"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label=" ">
          <el-button @click="search" type="primary" style="width: 170px">Cari</el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <template>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid">
        <el-table-column label="Nomor Permohonan" prop="id">
        </el-table-column>
        <el-table-column label="Nama" prop="realName">
        </el-table-column>
        <el-table-column label="Status" prop="status">
          <template slot-scope="scope">
            <span>{{getOrderStatus(scope.row.status)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="Waktu Pembuatan" prop="createTime">
          <template slot-scope="scope">
            <span>{{getUnixTime(scope.row.createTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="Waktu Pembayaran" prop="buyTime">
          <template slot-scope="scope">
            <span>{{getUnixTime(scope.row.buyTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="Waktu Peminjaman" prop="bondXatchingTime">
          <template slot-scope="scope">
            <span>{{getUnixTime(scope.row.bondXatchingTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="Nominal" prop="amountBuy">
        </el-table-column>
        <el-table-column label="Jenis Produk" prop="borrowingTerm">
          <template slot-scope="scope">
            <span>{{getproductType(scope.row.borrowingTerm)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="Suku Bunga" prop="yearRateFin">
        </el-table-column>
        <el-table-column label="Tanggal Jatuh Tempo" prop="dueTime">
          <template slot-scope="scope">
            <span>{{getUnixTime(scope.row.dueTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="Opsi">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="edit(scope.row)">Lihat</el-button>
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