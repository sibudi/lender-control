<template>
  <section>
    <!--Toolbar-->
    <el-form :inline="true" class="toolbar">
      <el-form-item>
        <el-button @click="add" type="primary">Tambah Pendana</el-button>
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
        <el-table-column label="Action">
          <template slot-scope="scope">
            <div>
              <el-button type="primary" size="small" @click="topup(scope.row)">Topup</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!--Pagination-->
<!--     <el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
    </el-pagination> -->
    <!--Add new item-->
    <el-dialog title="Tambah Pendana" :visible.sync="addDialogVisible" v-model="addDialogVisible" :close-on-click-modal="false" size="small">
      <el-form :model="addForm" label-position="left" label-width="125px" :rules="inputRule" ref="addForm">
        <el-form-item label="Nomor Ponsel" prop="mobileNumber">
          <el-input v-model="addForm.mobileNumber" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Kata Sandi" prop="opcode">
          <el-input type="password" v-model="addForm.opcode"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">Batal</el-button>
        <el-button type="primary" @click="addFormSubmit" :loading="addFormLoading">Tambah</el-button>
      </div>
    </el-dialog>
    <!--topup dialog-->
    <el-dialog title="Tambah Saldo" :visible.sync="editDialogVisible" v-model="editDialogVisible" :close-on-click-modal="false" size="small">
      <el-form :model="editForm" label-position="left" label-width="125px" :rules="inputRule" ref="editForm">
        <el-form-item label="Nomor Ponsel" prop="mobileNumber">
          <el-input v-model="editForm.mobileNumber" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="Nominal" prop="amount">
          <el-input v-model="editForm.amount" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">Batal</el-button>
        <el-button type="primary" @click="editFormSubmit" :loading="editFormLoading">Tambah Saldo</el-button>
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
        pageIndex: 1,
        pageSize: 10,
        dataTotal: 0,
        //Form
        addForm: {
          mobileNumber: '',
          opcode: ''
        },
        editForm: {
          mobileNumber: '',
          amount: ''
        },
        inputRule: {
          mobileNumber: [{
            required: true,
            message: 'Masukan Nomor Ponsel',
            trigger: 'blur'
          }],
          amount: [{
            required: true,
            message: 'Masukan nominal yang akan ditambahkan',
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
        editDialogVisible: false,
        addFormLoading: false,
        editFormLoading:false
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
      topup(row) {
        this.editDialogVisible = true
        this.editForm.userUuid = row.id
        this.editForm.mobileNumber = row.mobileNumber
        this.editForm.amount = row.amount
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

            this.addFormLoading = true

            this.$http.post("api-user/users/addSuperInvestor", _data).then(response => {
              this.addFormLoading = false;
              if (0 == response.data.code) {
                this.addDialogVisible = false
                this.bindGrid()
                this.$message({
                  message: 'Berhasil menambah Pendana',
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
      editFormSubmit() {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            let _data = Object.assign({}, this.editForm)

            this.editFormLoading = true

            this.$http.post("api-user/user/addUserCurrentBlance", _data).then(response => {
              this.editFormLoading = false;
              if (0 == response.data.code) {
                this.editDialogVisible = false
                this.bindGrid()
                this.$message({
                  message: 'Berhasil menambah saldo',
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



// WEBPACK FOOTER //
// src/pages/user/SuperAccountMark.vue