<template>
  <section>
    <!--Toolbar-->
    <el-form :inline="true" :model="searchForm" class="toolbar" label-position="right" label-width="100px">
      <el-row>
        <el-form-item label="Nama Pendana">
          <el-input v-model="searchForm.name" width="200"></el-input>
        </el-form-item>
<!--         <el-form-item label="Status" prop="status">
          <el-select v-model="searchForm.status" placeholder="Silakan pilih" clearable>
            <el-option v-for="item in statusList" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="Kanal Pembayaran" prop="channel">
          <el-select v-model="searchForm.channel" placeholder="Silakan pilih" clearable>
            <el-option v-for="item in payList" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Periode Penarikan">
          <div class="block">
            <el-date-picker v-model="searchForm.timeMin" type="date" :picker-options="pickerOptions1" :editable="false" placeholder="Pilih tanggal"></el-date-picker> ~
            <el-date-picker v-model="searchForm.timeMax" type="date" :picker-options="pickerOptions2" :editable="false" placeholder="Pilih tanggal"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="Nomor Ponsel Pemberi Pinjamam">
          <el-input v-model="searchForm.mobile" width="200"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button @click="search" type="primary" style="width: 170px">Cari</el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <template>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid">
        <el-table-column label="Nomor Akun" prop="tradeNo">
        </el-table-column>
        <el-table-column label="Waktu Penarikan" prop="createTime">
<!--           <template slot-scope="scope">
            <span>{{getUnixTime(scope.row.createTime)}}</span>
          </template> -->
        </el-table-column>
        <el-table-column label="Nominal" prop="amount">
        </el-table-column>
        <el-table-column label="Kanal Pembayaran" prop="paychannel">
        </el-table-column>
        <el-table-column label="Nama Pendana" prop="fromUserId">
        </el-table-column>
        <el-table-column label="Status" prop="dealStatus">
        </el-table-column>
        <el-table-column label="Catatan" prop="remark"></el-table-column>
        <el-table-column label="Opsi">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="edit(scope.row)">Ubah</el-button>
            <el-popover trigger="hover" placement="top">
              <p class="hideTooMuch">{{scope.row.toUserId}}</p>
              <el-button size="small" type="text" @click="" slot="reference">Lihat Nomor</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <!--Pagination-->
    <el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
    </el-pagination>


        <!-- Dialog -->
    <el-dialog title="Status Permohonan" :visible.sync="editFormDigVisible" v-model="editFormDigVisible" :close-on-click-modal="false">
      <el-form :model="addRemarkForm" ref="addRemarkForm" label-width="70px">
        <el-form-item label="Status Permohonan" prop="questionType">
          <el-select v-model="addRemarkForm.dealStatus" placeholder="Silakan pilih" clearable>
            <el-option v-for="item in issueTypeList" :label="item.name" :key="item.code" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Catatan" prop="remark">
          <el-input type="textarea" v-model="addRemarkForm.remark" :maxlength="200" :rows="4"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="" @click="editFormDigVisible = false">Batal</el-button>
        <el-button type="primary" @click.native.prevent="editFormSubmit" :loading="confirmLoading">Simpan</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import enums from '../../common/enum'
  import DataUtil from '../../common/dataUtil'

  export default {
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
        addRemarkForm:{
          dealStatus:'',
          remark:''
        },
        id:"",
        editFormDigVisible: false,
        confirmLoading:false,
        searchForm:{
          mobile: '',
          timeMax: '',
          timeMin: '',
          name: '',
          status: '',
          channel:'',
          type:'RECHARGE'
        },
        statusList:[{
          code: '1',
          name:'Dalam Proses'
        },{
          code: '2',
          name:'Sukses'
        },{
          code: '3',
          name:'Gagal'
        }],
        payList:[{
          code: 'BCA',
          name:'BCA'
        },{
          code: 'BNI',
          name:'BNI'
        },{
          code: 'CIMB',
          name:'CIMB'
        }],
        issueTypeList:[{
          code: '1',
          name: 'Dihubungi',
        },{
          code: '2',
          name: 'Kartu Berubah，Dana dikembalikan',
        },{
          code: '3',
          name: 'Tidak Dihubungi',
        }],
        gridLoading: false,
        gridData: [],
        pageIndex: 1,
        pageSize: 10,
        dataTotal: 0,
        pickerOptions1:{
          disabledDate(time) {
            return compareDate(time, "searchForm", "timeMax", "s")
          }
        },
        pickerOptions2: {
          disabledDate(time) {
            return compareDate(time, "searchForm", "timeMin", "e")
          }
        }
      }
    },
    methods:{
      edit(row){
        this.editFormDigVisible = true;
        this.id = row.id;
      },
      getUnixTime(time){
        return DataUtil.formatUnixTime(time);
      },
      getOrderStatus(type){
        this.payList.forEach((v)=>{
          if(v.code == obj){
            re = v.name;
            return;
          }
        })
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
          timeMin:DataUtil.formatTime(this.searchForm.timeMin)||''
        });

        this.$http.post('api-pay/pay/payListByPage',_data).then(response =>{
          let {data} = response.data;
          this.gridData = data.content;
          this.dataTotal = data.totalElements;
        })
      },
      editFormSubmit() {
        if(!this.addRemarkForm.remark){
          this.$message.error("Silakan isi catatan");
          return false;
        }
        if(!this.addRemarkForm.dealStatus){
          this.$message.error("Silakan pilih status pesanan");
          return false;
        }
        let _data = Object.assign({},this.addRemarkForm);
        _data.id = this.id;
        this.confirmLoading = true;
        this.$http.post('api-pay/pay/updatePayAccountHistoryById',_data).then(response => {
          this.confirmLoading = false;
          if(response.data.code == 0){
            this.editFormDigVisible = false;
            this.bindGrid();
          }else{
            this.$message.error(response.data.message);
          }
        },response => {this.confirmLoading = false;});
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
// src/pages/financial/DrawalFailList.vue