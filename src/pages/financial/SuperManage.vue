<template>
  <section>
    <!--List-->
    <template>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid">
        <el-table-column prop="realName" label="Nama">
        </el-table-column>
        <el-table-column prop="bankCode" label="Kode Bank">
        </el-table-column>
        <el-table-column prop="lockedBalance" label="Saldo Terkunci">
        </el-table-column>
        <el-table-column prop="currentBalance" label="Saldo">
        </el-table-column>
        <el-table-column label="Opsi">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.row)">Ubah</el-button>
            <el-button type="text" size="small" @click="handleDetail(scope.row)">Catatan</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!--Pagination-->
<!--     <el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
    </el-pagination> -->
    <!--Add new item-->
    <el-dialog title="Ubah" :visible.sync="addDialogVisible" v-model="addDialogVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-position="left" label-width="140px" ref="addForm" :rules="inputRule">
        <el-form-item label="Jenis Transaksi"  prop="businessType">
          <el-select v-model="addForm.businessType" clearable @change="handleChange">
            <el-option v-for="item in passList" :key="item.code" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Nominal Transaksi" prop="amount">
          <el-input v-model="addForm.amount " type="number"><template slot="prepend">Rp</template></el-input>
        </el-form-item>
        <el-form-item label="Catatan" prop="tradeInfo">
          <el-input v-model="addForm.tradeInfo" type="textarea" auto-complete="off"  :maxlength="1000"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">Batal</el-button>
        <el-button type="primary" @click="addFormSubmit" :loading="addFormLoading">Tambah</el-button>
      </div>
    </el-dialog>

    <!-- Record Details -->
    <el-dialog title="Tambah Manual" :visible.sync="dialogTableVisible" width="85%" :close-on-click-modal="false">
      <el-table :data="dialogData"  v-loading="diagridLoading">
        <el-table-column property="dealTime" label="Waktu Transaksi"></el-table-column>
        <el-table-column property="amount" label="Nominal Transaksis"></el-table-column>
        <el-table-column property="businessType" label="Jenis Transaksi"></el-table-column>
        <el-table-column property="lastBanlance" label="Saldo Terakhir"></el-table-column>
        <el-table-column property="currentBanlance" label="Saldo Akhir"></el-table-column>
        <el-table-column property="createUser" label="Operator"></el-table-column>
        <el-table-column property="tradeInfo" label="Catatan">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="right">
              <p class="hideTooMuch">{{scope.row.tradeInfo}}</p>
              <div slot="reference">
                {{miniText(scope.row.tradeInfo)}}
              </div>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-pagination class="" @size-change="diapageSizeChange" @current-change="diapageIndexChange" :current-page="diapageIndex" :page-size="diapageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="diadataTotal">
        </el-pagination>
      </div>
    </el-dialog>
  </section>
</template>
<script>
  import DataUtil from '../../common/dataUtil'
  export default {
    data() {
      return {
        //Grid
        gridLoading: false,
        gridData: [],

        //Form
        addForm: {
          amount:'',
          businessType: '',
          tradeInfo: ''
        },
        inputRule: {
          businessType: [{
            required: true,
            message: 'Silakan pilih jenis transaksi',
            trigger: 'change'
          }],
          amount: [{
            required: true,
            message: 'Silakan masukan nominal transaksi',
            trigger: 'blur'
          }],
          tradeInfo: [{
            required: true,
            message: 'Silakan masukan catatan',
            trigger: 'blur'
          }]
        },
        //Dialog
        addDialogVisible: false,
        addFormLoading: false,
        passList:[{
          code:'Isi ulang',
          name:'Isi Ulang'
        },{
          code:'Penarikan Berhasil',
          name:'Penarikan'
        }],

        dialogTableVisible: false,
        diagridLoading: false,
        dialogData:[],
        diapageIndex: 1,
        diapageSize: 10,
        diadataTotal: 0,
        userUuid: ''
      }
    },
    methods: {
      miniText(text) {
        if (text.length > 30) {
          text = text.substr(0, 30) + '...';
        }
        return text;
      },
      handleChange(){},
      getUnixTime(time){
          return DataUtil.formatUnixTime(time);
      },
      handleDetail(row){
        this.dialogTableVisible = true;
        this.userUuid = row.id;
        this.bindDiaGrid();
      },
      handleEdit(row) {
        this.addDialogVisible = true
        this.$refs.addForm && this.$refs.addForm.resetFields()
        this.userUuid = row.id;
      },
      diapageSizeChange(val) {
        this.diapageSize = val
        this.diapageIndex = 1
        this.bindGrid()
      },
      diapageIndexChange(val) {
        this.diapageIndex = val
        this.bindGrid()
      },
      addFormSubmit() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            let _data = Object.assign({}, this.addForm)
            _data.userUuid = this.userUuid;
            this.addFormLoading = true

            this.$http.post("api-user/user/addUserCurrentBlanceSession", _data).then(response => {
              this.addFormLoading = false;
              if (0 == response.data.code) {
                this.addDialogVisible = false
                this.bindGrid()
                this.$message({
                  message: 'Sukses',
                  type: 'success'
                });
              } else {
                this.$message.error(response.data.message);
              }
            }, response => {})

          } else {
            return false
          }
        });
      },
      bindDiaGrid() {
        this.diagridLoading = true
        let _data = {};
        _data.pageNo = this.diapageIndex
        _data.pageSize = this.diapageSize
        _data.type = 'Isi ulang#Penarikan Berhasil',
        _data.userUuid = this.userUuid;
        this.$http.post('api-user/user/getAccountHistoryByType', _data).then(response => {
          this.diagridLoading = false;
          let {data} = response;
          if (0 == data.code) {
            this.diadataTotal = data.data.totalElements;
            this.dialogData = data.data.content;
          } else {
            this.$message.error(data.message);
          }
        }, response => {
          this.diagridLoading = false
        });
      },
      bindGrid() {
        this.gridLoading = true
        let _data = {};
        _data.pageNo = this.pageIndex
        _data.pageSize = this.pageSize
        _data.userType = 3
        this.$http.post('api-user/user/getOrganAccount', _data).then(response => {
          this.gridLoading = false;
          let {data} = response;
          if (0 == data.code) {
            this.dataTotal = data.data.recordsTotal;
            this.gridData = data.data;
          } else {
            this.$message.error(data.message);
          }
        }, response => {
          this.gridLoading = false
        });
      }
    },
    created: function () {
      this.bindGrid()
    }
  }

</script>
<style scoped>
  .hideTooMuch {
    max-width: 300px;
    word-wrap: break-word;
  }
</style>



// WEBPACK FOOTER //
// src/pages/financial/SuperManage.vue