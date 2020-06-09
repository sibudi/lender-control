<template>
  <section>
    <!--Toolbar-->
    <el-form :inline="true" class="toolbar">
      <el-form-item>
        <el-button @click="add" type="primary">Tambah Pendana Lembaga</el-button>
      </el-form-item>
    </el-form>
    <!--List-->
    <template>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid">
        <el-table-column prop="realName" label="Nama">
        </el-table-column>
        <el-table-column prop="mobileNumber" label="Nomor Ponsel">
        </el-table-column>
        <el-table-column prop="bankCarkNo" label="Nomor Rekening">
        </el-table-column>
        <el-table-column prop="currentBalance" label="Saldo">
        </el-table-column>
        <el-table-column prop="lockedBalance" label="Saldo Terkunci">
        </el-table-column>

      </el-table>
    </template>
    <!--Pagination-->
<!--     <el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
    </el-pagination> -->
    <!--Add-->
    <el-dialog title="Tambah Pendana Lembaga" :visible.sync="addDialogVisible" v-model="addDialogVisible" :close-on-click-modal="false" size="small">
      <el-form :model="addForm" label-position="left" label-width="120px" :rules="inputRule" ref="addForm">
        <el-form-item label="Nomor Ponsel" prop="mobileNumber">
          <el-input v-model="addForm.mobileNumber" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Nama Lembaga" prop="companyName">
          <el-input v-model="addForm.companyName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Kode Bank" prop="bankCode">
          <el-select v-model="addForm.bankCode">
            <el-option v-for="item in bankList" :key="item.bankCode" :value="item.bankCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Nomor Rekening" prop="bankNumberNo">
          <el-input v-model="addForm.bankNumberNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Izinkan Kunci Saldo">
          <el-switch v-model="addForm.withholding " active-color="#13ce66"></el-switch>
        </el-form-item>
        <el-form-item label="Kata Sandi" prop="opcode">
          <el-input  type="password" v-model="addForm.opcode" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">Batalkan</el-button>
        <el-button type="primary" @click="addFormSubmit" :loading="addFormLoading">Tambah</el-button>
      </div>
    </el-dialog>

        <!--Add new item-->
<!--     <el-dialog title="Isi Ulang" :visible.sync="addDialogVisible1" v-model="addDialogVisible1" :close-on-click-modal="false" size="small">
      <el-form :model="addForm" label-position="left" label-width="120px" :rules="inputRule" ref="addForm">
        <el-form-item label="Nama Akun" prop="mobile">
          <el-input v-model="addForm.mobile" auto-complete="off" :maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="Nomor Ponsel" prop="mobile">
          <el-input v-model="addForm.mobile" auto-complete="off" :maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="Kata Sandi" prop="realname">
          <el-input v-model="addForm.realname" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible1 = false">Batal</el-button>
        <el-button type="primary" @click="addFormSubmit" :loading="addFormLoading">Isi Ulang</el-button>
      </div>
    </el-dialog> -->
  </section>
</template>
<script>
  import DataUtil from '../../common/dataUtil'
  export default {
    data() {
      return {
        bankList: [{
          "id": 1,
          "bankCode": "BCA",
        },{
          "id": 2,
          "bankCode": "BNI",
        },{
          "id": 3,
          "bankCode": "CIMB",
        },{
          "id": 4,
          "bankCode": "BRI",
        }],
        addDialogVisible1: false,
        //Grid
        gridLoading: false,
        gridData: [],
        pageIndex: 1,
        pageSize: 10,
        dataTotal: 0,
        //Form
        addForm: {
          mobileNumber: '',
          companyName: '',
          bankCode: '',
          bankNumberNo: '',
          opcode: '',
          withholding :'0'
        },
        inputRule: {
          mobileNumber: [{
            required: true,
            message: 'Masukan Nomor Ponsel',
            trigger: 'blur'
          }],
          companyName: [{
            required: true,
            message: 'Masukan Nama Lembaga',
            trigger: 'blur'
          }],
         bankCode: [{
            required: true,
            message: 'Masukan Kode Bank',
            trigger: 'change'
          }],
          bankNumberNo: [{
            required: true,
            message: 'Masukan Nomor Rekening',
            trigger: 'blur'
          }],
          opcode: [{
            required: true,
            message: 'Masukan Kata Sandi',
            trigger: 'blur'
          }]
        },
        //Dialog
        addDialogVisible: false,
        addFormLoading: false
      }
    },
    methods: {
      getUnixTime(time){
          return DataUtil.formatUnixTime(time);
      },
      add(row) {
        this.addDialogVisible = true
        this.$refs.addForm && this.$refs.addForm.resetFields()
      },
      charge(row) {
        this.addDialogVisible1 = true
      },
      pageSizeChange(val) {
        this.pageSize = val
        this.pageIndex = 1
        this.bindGrid()
      },
      pageIndexChange(val) {
        this.pageIndex = val
        this.bindGrid()
      },
      addFormSubmit() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            let _data = Object.assign({}, this.addForm)
            if(this.addForm.withholding){
              _data.withholding = 1;
            }else{
              _data.withholding = 0;
            }
            this.addFormLoading = true

            this.$http.post("api-user/users/addCompanyPendana", _data).then(response => {
              this.addFormLoading = false;
              if (0 == response.data.code) {
                this.addDialogVisible = false
                this.bindGrid()
                this.$message({
                  message: 'Berhasil menambahkan perusahaan Pendana',
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
      bindGrid() {
        this.gridLoading = true
        let _data = {}
        _data.pageNo = this.pageIndex
        _data.pageSize = this.pageSize
        _data.userType = 4;
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



// WEBPACK FOOTER //
// src/pages/user/AccountList.vue