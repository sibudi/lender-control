<template>
  <section>
    <!--Toolbar-->
    <!--List-->
    <template>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid">
        <el-table-column prop="realName" label="Nama">
           <template slot-scope="scope">
              <a v-bind:href="'/#/user/'+scope.row.id" target="_blank">
               {{scope.row.realName}} 
             </a>
           </template>
        </el-table-column>
        <el-table-column prop="mobileNumber" label="Nomor Ponsel"></el-table-column>
        <el-table-column prop="bankCardNo" label="Nomor Rekening"></el-table-column>
        <el-table-column prop="status" label="Status">
          <template slot-scope="scope">
            <!-- <div v-if="!scope.row.authStatus">Non Active</div> -->
            <div v-if="scope.row.authStatus==1">Applied</div>
            <div v-else-if="scope.row.authStatus==2">Active</div>
            <div v-else-if="scope.row.authStatus==5">Non Active</div>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="Signup Date">
           <template slot-scope="scope">
             {{new Date(scope.row.createTime).toLocaleDateString('id-ID')}}
           </template>
        </el-table-column>
        <el-table-column label="Action">
          <template slot-scope="scope">
            <div v-if="!scope.row.authStatus  ">
            </div>
            <div v-else-if="scope.row.authStatus==1 || scope.row.authStatus == 5 ">
              <el-button type="primary" size="small" @click="activate(scope.row)">Aktif</el-button>
            </div>
            <div v-else>
              <el-button type="danger" size="small" @click="deactivate(scope.row)">Non Aktif</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!--Pagination-->
    <!--     <el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
    </el-pagination>-->
    <!--Add new item-->
    <el-dialog
      title="Activate User"
      :visible.sync="activateDialogVisible"
      v-model="activateDialogVisible"
      :close-on-click-modal="false"
      size="small"
    >
      <!-- Apakah anda akan mengaktifkan user {{activateDialog.realName}} dengan username {{activateDialog.userName}} -->
     Pastikan Anda telah melakukan KYC dan melakukan kontak dengan lender ini sebelum mengaktifkan akun ini. Anda yakin?
      <div slot="footer" class="dialog-footer">
        <el-button @click="activateDialogVisible= false; ">Batal</el-button>
        <el-button
          type="primary"
          @click="activateDialogSubmit(activateDialog.userUuid)"
          :loading="activateDialogLoading"
        >Aktif</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="Deactivate User"
      :visible.sync="deactivateDialogVisible"
      v-model="deactivateDialogVisible"
      :close-on-click-modal="false"
      size="small"
    >
      <!-- Apakah anda akan mengaktifkan user {{deactivateDialog.realName}} dengan username {{deactivateDialog.userName}} -->
      Apakah Anda ingin menonaktifkan akun ini?
      <div slot="footer" class="dialog-footer">
        <el-button @click="deactivateDialogVisible= false; ">Batal</el-button>
        <el-button
          type="danger"
          @click="deactivateDialogSubmit(deactivateDialog.userUuid)"
          :loading="deactivateDialogLoading"
        >Non Aktif</el-button>
      </div>
    </el-dialog>
    <!--topup dialog-->
    <!-- <el-dialog title="Tambah Saldo" :visible.sync="editDialogVisible" v-model="editDialogVisible" :close-on-click-modal="false" size="small">
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
    </el-dialog>-->
  </section>
</template>
<script>
import DataUtil from "../../common/dataUtil";
// import Config from "../../common/config";
export default {
  data() {
    return {
      //Grid
      gridLoading: false,
      gridData: [],
      pageIndex: 1,
      pageSize: 10,
      dataTotal: 0,
      status: 1,
      //Form
      activateDialog: {},
      deactivateDialog: {
        mobileNumber: "",
        amount: ""
      },
      inputRule: {
        mobileNumber: [
          {
            required: true,
            message: "Masukan Nomor Ponsel",
            trigger: "blur"
          }
        ],
        amount: [
          {
            required: true,
            message: "Masukan nominal yang akan ditambahkan",
            trigger: "blur"
          }
        ],
        opcode: [
          {
            required: true,
            message: "Masukan Kata Sandi",
            trigger: "blur"
          }
        ]
      },
      //Dialog
      activateDialogVisible: false,
      deactivateDialogVisible: false,
      editDialogVisible: false,
      activateDialogLoading: false,
      deactivateDialogLoading: false,
      editFormLoading: false
    };
  },
  methods: {
    getUnixTime(time) {
      return DataUtil.formatUnixTime(time);
    },
    add(row) {
      this.addDialogVisible = true;
      this.$refs.addForm && this.$refs.addForm.resetFields();
    },
    activate(row) {
      this.activateDialogVisible = true;
      this.activateDialog.userUuid = row.id;
      this.activateDialog.realName = row.realName;
      this.activateDialog.userName = row.userName;
    },
    deactivate(row) {
      this.deactivateDialogVisible = true;
      this.deactivateDialog.userUuid = row.id;
      this.deactivateDialog.realName = row.realName;
      this.deactivateDialog.userName = row.userName;
    },
    topup(row) {
      this.editDialogVisible = true;
      this.editForm.userUuid = row.id;
      this.editForm.mobileNumber = row.mobileNumber;
      this.editForm.amount = row.amount;
    },
    pageSizeChange(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.bindGrid();
    },
    pageIndexChange(val) {
      this.pageIndex = val;
      this.bindGrid();
    },
    activateDialogSubmit(uuid) {
      this.activateDialogLoading = true;
      var _data = { userId: uuid };
      this.$http.post("api-user/user/activate", _data).then(
        response => {
          this.activateDialogLoading = false;
          if (0 == response.data.code) {
            this.activateDialogVisible = false;
            this.bindGrid();
            this.$message({
              message: "Berhasil Activate User",
              type: "success"
            });
          } else {
            this.$message.error(response.data.message);
          }
        },
        response => {}
      );
      console.log(row);
    },
    deactivateDialogSubmit(uuid) {
      this.deactivateDialogLoading = true;
      var _data = { userId: uuid };
      this.$http.post("api-user/user/deactivate", _data).then(
        response => {
          this.deactivateDialogLoading = false;
          if (0 == response.data.code) {
            this.deactivateDialogVisible = false;
            this.bindGrid();
            this.$message({
              message: "Berhasil Deactiavte User",
              type: "success"
            });
          } else {
            this.$message.error(response.data.message);
          }
        },
        response => {}
      );
      console.log(row);
    },
    addFormSubmit() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          let _data = Object.assign({}, this.addForm);

          this.addFormLoading = true;

          this.$http.post("api-user/users/addSuperInvestor", _data).then(
            response => {
              this.addFormLoading = false;
              if (0 == response.data.code) {
                this.addDialogVisible = false;
                this.bindGrid();
                this.$message({
                  message: "Berhasil menambah Pendana",
                  type: "success"
                });
              } else {
                this.$message.error(response.data.message);
              }
            },
            response => {}
          );
        } else {
          return false;
        }
      });
    },
    editFormSubmit() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          let _data = Object.assign({}, this.editForm);

          this.editFormLoading = true;

          this.$http.post("api-user/user/addUserCurrentBlance", _data).then(
            response => {
              this.editFormLoading = false;
              if (0 == response.data.code) {
                this.editDialogVisible = false;
                this.bindGrid();
                this.$message({
                  message: "Berhasil menambah saldo",
                  type: "success"
                });
              } else {
                this.$message.error(response.data.message);
              }
            },
            response => {}
          );
        } else {
          return false;
        }
      });
    },
    bindGrid() {
      this.gridLoading = true;
      let _data = {};
      _data.pageNo = this.pageIndex;
      _data.pageSize = this.pageSize;
      _data.userType = 3;
      this.$http.post('api-user/user/allUsers',{}).then(response => {
        this.gridLoading = false;
        let {data} = response;
        if (0 == data.code) {
          this.dataTotal = data.data.length;
          this.gridData = data.data;
        } else {
          this.$message.error(data.message);
        }
      }, response => {
        this.gridLoading = false
      });
    }
  },
  created: function() {
    this.bindGrid();
  }
};
</script>



// WEBPACK FOOTER //
// src/pages/user/SuperAccountMark.vue