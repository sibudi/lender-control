<template>
  <section class="orderBox">
    <!--Customer Information-->
    <template>
      <el-row>
        <h1 class="one-title">Detail Permohonan</h1>
        <el-col :span="8" class="grid-content">
          <div><span>Nomor Permohonan:</span><span></span></div>
          <div><span>Waktu Pembuatan:</span><span></span></div>
          <div><span>Waktu Peminjaman:</span><span></span></div>
        </el-col>
        <el-col :span="8" class="grid-content">
          <div><span>Nominal Permohonan:</span><span></span></div>
          <div><span>Waktu Efektif:</span><span></span></div>
          <div><span>Waktu Kadaluwarsa:</span><span></span></div>
        </el-col>
        <el-col :span="8" class="grid-content">
          <div><span>Nama:</span><span></span></div>
          <div><span>Jenis Produk:</span><span></span></div>
        </el-col>
      </el-row>
      <div class="divid-line"></div>
    </template>

  

    <!-- Order History -->
    <template>
      <el-row>
        <div class="flex aic">
          <h1 class="one-title">Kontrak Kerja</h1>
          <div class="f1">Paket Hutang 11111111111111111，Jumlah Paket Hutang：1860000</div>
          <div class="exports_cel">Ekspor Excel</div>
        </div>
        <el-table :data="historyData" v-loading="historyLoading" max-height="300">
          <el-table-column prop="orderNo" label="Nama Pendana"></el-table-column>
          <el-table-column prop="status" label=""></el-table-column>
          <el-table-column prop="amountApply" label="Nominal"></el-table-column>
          <el-table-column prop="borrowingTerm" label="Proporsi"></el-table-column>

          <el-table-column prop="orderNo" label="Nama Peminjam"></el-table-column>
          <el-table-column prop="status" label="Nomor Klaim"></el-table-column>
          <el-table-column prop="amountApply" label="Jumlah Pinjaman"></el-table-column>
          <el-table-column prop="borrowingTerm" label="Rasio Pinjaman"></el-table-column>
          
          <el-table-column prop="orderNo" label="Status Pinjaman"></el-table-column>
          <el-table-column prop="status" label="Waktu Pencocokan"></el-table-column>
          <el-table-column prop="amountApply" label="Waktu Pembayaran"></el-table-column>
          <el-table-column prop="borrowingTerm" label="Waktu Pembayaran Aktual"></el-table-column>
        </el-table>
      </el-row>
      <div class="divid-line"></div>
    </template>

    <template>


    </template>

  </section>
</template>
<script>
  import enums from '../../common/enum'
  import DataUtil from '../../common/dataUtil'
  // import Config from '../../common/config'
  export default {
    data () {
      let compareDate = (time) => {
        let _time = time.setDate(time.getDate()+1);
        return time.getTime() <= Date.now();
      }
      return {
        
      }
    },
    methods: {
    
    },
    mounted: function () {
      // this.orderId = this.$route.query['id'];
    }
  }
</script>
<style>
    /* Title */
    .main-title{
      font-size: 22px;
      margin-top: -15px;
      margin-bottom: 15px;
    }
  .one-title{
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 7px;
  }
  .two-title{
    font-size: 13px;
    color: #888;
    margin: 10px 0
  }
  .subtitle{
    font-size: 13px;
    color: #888;
  }
  .orderBox .el-row {
    margin: 15px 30px;
  }
  .orderBox .el-col span{
    margin-right: 10px;
  }
    .orderBox .el-button span,.orderBox .el-tag span{
      margin-right: 0;
    }
  .orderBox .box-card .el-button{
    margin-right: 5px;
  }
  .orderBox .grid-content {
    line-height: 28px;
  }

  .divid-line{
    height: 10px;
    background: #f1f2f7;
  }

.flex{
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    margin-bottom: 7px;
}
.aic{
  align-items: center;
}
.flex .one-title{
  margin-bottom: 0;
  margin-right: 30px;
}
.f1 {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.exports_cel{
  color: #409EFF;
}
</style>



// WEBPACK FOOTER //
// src/pages/order/OrderDetail.vue