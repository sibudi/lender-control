<template>
  <section>
    <!--Toolbar-->
    <el-form :inline="true" :model="searchForm" class="toolbar" label-position="right" label-width="200px">
      <el-row>
        <el-form-item label="Nomor Ponsel Pendana">
          <el-input v-model="searchForm.mobile"  style="width:217px"></el-input>
        </el-form-item>
        <el-form-item label="Status Permohonan" prop="">
          <el-select v-model="searchForm.status" placeholder="Silakan pilih" clearable>
            <el-option v-for="item in statusList" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="Nama Pendana">
          <el-input v-model="searchForm.userName" style="width:217px"></el-input>
        </el-form-item>
        <!-- <el-form-item label="Status Pembayaran" prop="">
          <el-select v-model="searchForm.payStatus" placeholder="Silakan pilih" clearable>
            <el-option v-for="item in payList" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item> -->
      </el-row>
      <el-row>
        <el-form-item label="Periode Pembayaran">
          <div class="block">
            <el-date-picker v-model="searchForm.startTime" type="date" :picker-options="pickerOptions1" :editable="false" placeholder="Pilih tanggal"></el-date-picker> ~
            <el-date-picker v-model="searchForm.endTime" type="date" :picker-options="pickerOptions2" :editable="false" placeholder="Pilih tanggal"></el-date-picker>
          </div>
        </el-form-item>
      </el-row>
      <el-row> 
        <el-form-item label=" ">
          <el-button @click="search" type="primary" style="width: 140px">Cari</el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <template>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid">
        <el-table-column label="Nomor;Permohonan" prop="id" width="130" :render-header="renderMultilineHeader">
        </el-table-column>
        <el-table-column label="Waktu;Pembuatan" prop="createTime" width="100px" :render-header="renderMultilineHeader"></el-table-column>
        <el-table-column label="Nama;Pendana" prop="userName" :render-header="renderMultilineHeader">
        </el-table-column>
        <el-table-column label="Jumlah" prop="applyBuy" width="90px">
        </el-table-column>
        <el-table-column label="Status;Permohonan" :render-header="renderMultilineHeader">
          <template slot-scope="scope">
            <span>{{getOrderStatus(scope.row.status)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="Nominal;Isi Ulang" prop="chargeBuy" width="90px" :render-header="renderMultilineHeader">
        </el-table-column>
        <el-table-column label="Waktu;Pembayaran" prop="buyTime" width="100px" :render-header="renderMultilineHeader">
        </el-table-column>
        <!-- <el-table-column label="Status;Pembayaran" :render-header="renderMultilineHeader">
        <template slot-scope="scope">
          <span>{{getPayStatus(scope.row.status)}}</span>
        </template>
        </el-table-column> -->
        <el-table-column label="Opsi">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="edit(scope.row)">Lihat Klaim</el-button>
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
          userName: '',
          mobile: '',
           startTime: '',
          endTime: '',
          payStatus:"",
          status:"",
          isAdmin: true
        },
        payList:[{code:'1',name:'Tertunda'},{code:'2',name:'Berhasil'},{code:'3',name:'Gagal'}],
        statusList:[{code:'1',name:'Dalam Proses'},{code:'2',name:'Gagal'},{code:'3',name:'Sukses'},{code:'9',name:'Tidak Valid'}],
        gridLoading: false,
        gridData: [],
        pageIndex: 1,
        pageSize: 10,
        dataTotal: 0,
        pickerOptions1:{
          disabledDate(time) {
            return compareDate(time, "searchForm", "endTime", "s")
          }
        },
        pickerOptions2: {
          disabledDate(time) {
            return compareDate(time, "searchForm", "startTime", "e")
          }
        }
      }
    },
    methods:{
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
      edit(row){
        this.$router.push('/DebtDetail');
        localStorage.setItem('Adminrights', JSON.stringify(row));
      },
      getUnixTime(time){
        return DataUtil.formatUnixTime(time);
      },
      getproductType(type){
        return enums.getName(type,enums.productType);
      },
    getOrderStatus(status){
      // let list = [{code:'1',name:'Dalam Proses'},{code:'2',name:'Gagal'},{code:'3',name:'Berhasil'},{code:'9',name:'Permohonan Tidak Sah'}];
      let re = '';
      this.statusList.forEach(v=>{if(v.code == status){re = v.name;return;}})
      return re;
    },
    getPayStatus(status){
      let list = [{code:'1',name:'Tertunda'},{code:'2',name:'Berhasil'},{code:'3',name:'Gagal'},{code:'9',name:'Tidak Sah'}];
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
        let _data = Object.assign({pageNo:this.pageIndex, pageSize:this.pageSize},this.searchForm,{
           startTime:DataUtil.formatTime(this.searchForm. startTime)||'',
          endTime:DataUtil.formatTime(this.searchForm.endTime)||''
        });

        this.$http.post('api-order/order/selectUsrOrderList ',_data).then(response =>{
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
// src/pages/order/OrderAllList.vue