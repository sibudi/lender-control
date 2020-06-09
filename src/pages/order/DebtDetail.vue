<template>
  <section>
    <div class='title'>
      <div>Nomor Permohonan：{{rights.id}}</div>
      <div>Waktu Pembuatan{{rights.createTime}}</div>
    </div>
    <template>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid">
        <el-table-column label="Nomor Klaim" prop="creditorNo">
        </el-table-column>
        <el-table-column label="Jumlah Investasi" prop="amountBuy">
        </el-table-column>
<!--         <el-table-column label="Status Pembelian" prop="status">
          <template slot-scope="scope">
            <span>{{getOrderStatus(scope.row.status)}}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="Jumlah Kredit" prop="amountApply">
        </el-table-column>
        <el-table-column label="Status Hutang">
          <template slot-scope="scope">
            <span>{{getOrderStatus(scope.row.status)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="Nama Peminjam" prop="realName">
        </el-table-column>
        <el-table-column label="Nomor Id Peminjam" prop="idCardNo">
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
        rights:{},
        statusList:enums.status,
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
      getproductType(type){
        return enums.getName(type,enums.productType);
      },
    getOrderStatus(status){
      let list = [
      {code: '1', name: 'Tawaran'}, 
      {code: '2', name: 'Dikunci'}, 
      {code: '3', name: 'Lengkap'}, 
      {code: '4 ', name:'Dalam Pinjaman'}, 
      {code:' 5 ', name:'Pinjaman Gagal'},
      {code: '6', name: 'Pengiriman Berhasil'},
      {code: '7', name: 'Pengiriman Kliring Berhasil'},
      {code: '8', name: 'Peminjaman Berhasil'},
      {code : '9', name: 'Pelunasan dalam Proses'},
      {code: '10', name: 'Dilunasi'},
      {code: '11', name: 'Pelunasan Terlambat'}, 
      {code: '12', name: 'Pelunasan Kliring Berhasil'}, 
      {code: '13', name: 'Dilunasi' }];
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
        let _data = {
          orderNo: this.uuid};

        this.$http.post('api-order/order/selectOrderDetail',_data).then(response =>{
          let {data} = response.data;
          this.gridData = data.content;
          this.dataTotal = data.totalElements;
        })
      },
    },
    mounted(){
      this.rights = JSON.parse(localStorage.getItem('Adminrights'));
      this.uuid = this.rights.id;
      this.bindGrid();
    }
  }
</script>

<style scoped>
.title{
  display: flex;
  justify-content: space-between;
  padding: 20px 30px 15px;
  background: #fafafa;
  color: #666;
  font-size: 15px;
  border-bottom: 1px solid #f0f0f0;
}
</style>




// WEBPACK FOOTER //
// src/pages/order/DebtDetail.vue