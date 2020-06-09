<template>
  <section>
    <!--Toolbar-->
    <el-form :inline="true" :model="searchForm" class="toolbar" label-width="auto">
<!--       <el-form-item label="Nama Pengguna">
        <el-input v-model="searchForm.usernameLike"></el-input>
      </el-form-item>
      <el-form-item label="Nama">
        <el-input v-model="searchForm.realnameLike"></el-input>
      </el-form-item>
      <el-form-item label="Nomor Ponsel">
        <el-input v-model="searchForm.mobileLike"></el-input>
      </el-form-item> -->
      <el-row>
        <el-form-item label="Nomor Ponsel">
          <el-input v-model="searchForm.mobile" style="width:217px"></el-input>
        </el-form-item>
        <el-form-item label="Nama Pengguna">
          <el-input v-model="searchForm.userName" style="width:217px"></el-input>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="Peran">
          <el-select v-model="searchForm.roleId" clearable>
            <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="searchForm.status" clearable>
            <el-option label="Aktif" :value="0"></el-option>
            <el-option label="Non-aktif " :value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="Pihak Ketiga">
          <el-select v-model="searchForm.isThird" clearable>
            <el-option label="Ya" value="0"></el-option>
            <el-option label="Tidak" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button @click="search" type="primary">Cari</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="add" type="success">Tambah</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <!--List-->
    <template>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid">
        <!-- <el-table-column prop="id" width="90" label="ID">
        </el-table-column> -->
        <el-table-column prop="username" label="Nama Pengguna" width="150">
        </el-table-column>
        <!-- <el-table-column prop="realname" label="Nama" width="100">
        </el-table-column> -->
        <el-table-column prop="mobile" label="Nomor Ponsel" width="150">
        </el-table-column>
        <el-table-column label="Peran">
          <template slot-scope="scope">
            <el-tag v-for="item in (scope.row.roles.split(','))" v-if="item" :key="item" type="primary" style="margin-right:2px;">{{ item.split('|')[1]}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="Waktu Dibuat" width="140">
          <template slot-scope="scope">
            <span>{{getUnixTime(scope.row.createTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="Status" width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status==0? 'success' : 'danger'" close-transition>{{scope.row.status==0?'Aktif':'Non-aktif '}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Pihak Ketiga" width="110">
          <template slot-scope="scope">
            <el-tag :type="scope.row.third==1? 'success' : 'danger'" close-transition>{{scope.row.third==1?'Ya':'Tidak'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Opsi" width="180">
          <template slot-scope="scope">
            <div>
              <el-button size="small" @click="edit(scope.row)">Ubah</el-button>
            </div>
            <div>
              <el-button type="danger" size="small" @click="reset(scope.row)">Setel ulang kata sandi</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!--Pagination-->
    <el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
    </el-pagination>
    <!--Add new item-->
    <el-dialog title="Tambah Pengguna" :visible.sync="addDialogVisible" v-model="addDialogVisible" :close-on-click-modal="false" size="small">
      <el-form :model="addForm" label-position="left" label-width="150px" :rules="inputRule" ref="addForm">
        <el-form-item label="Nama Pengguna" prop="username">
          <el-input v-model="addForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Nama Lengkap" prop="realname">
          <el-input v-model="addForm.realname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Nomor Ponsel" prop="mobile">
          <el-input v-model="addForm.mobile" auto-complete="off" :maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="Catatan" prop="remark">
          <el-input type="textarea" v-model="addForm.remark" auto-complete="off" :maxlength="20"></el-input>
        </el-form-item>

        <el-form-item label="Peran" prop="roleIds">
          <el-checkbox-group v-model="addForm.roleIds">
            <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">{{item.roleName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="Status" prop="status">
          <el-switch v-model="addForm.status" on-text="Aktif" off-text="Non-aktif "></el-switch>
        </el-form-item>
        <el-form-item label="Pihak Ketiga" prop="third">
          <el-switch v-model="addForm.third" on-text="Ya" off-text="Tidak"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">Batal</el-button>
        <el-button type="primary" @click="addFormSubmit" :loading="addFormLoading">Tambah</el-button>
      </div>
    </el-dialog>
    <!--Edit dialog-->
    <el-dialog title="Ubah Pengguna" :visible.sync="editDialogVisible" v-model="editDialogVisible" :close-on-click-modal="false" size="small">
      <el-form :model="editForm" label-position="left" label-width="150px" :rules="inputRule" ref="editForm">
        <el-form-item label="Nama Pengguna" prop="username">
          <el-input v-model="editForm.username" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="Nama" prop="realname">
          <el-input v-model="editForm.realname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Nomor Ponsel" prop="mobile">
          <el-input v-model="editForm.mobile" auto-complete="off" :maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="Peran" prop="roleIds">
          <el-checkbox-group v-model="editForm.roleIds">
            <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">{{item.roleName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="Status" prop="status">
          <el-switch v-model="editForm.status" on-text="Aktif" off-text="Non-aktif "></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">Batal</el-button>
        <el-button type="primary" @click="editFormSubmit" :loading="editFormLoading">Ubah</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
  import DataUtil from '../../common/dataUtil'
  export default {
    data() {
      var validateMobile = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Silakan masukan nomor ponsel'));
        } else {
          if (!DataUtil.isMobile(value)) {
            callback(new Error('Format nomor tidak benar'));
          }
          callback();
        }
      };

      return {
        roleList: [],
        searchForm: {
          userName: '',
          mobile: '',
          roleId: '',
          isThird:'',
          status:''
        },
        //Grid
        gridLoading: false,
        gridData: [],
        pageIndex: 1,
        pageSize: 10,
        dataTotal: 0,
        //Form
        addForm: {
          username: '',
          realname: '',
          remark:'',
          roleIds: [],
          status: true,
          mobile:'',
          third:''
        },
        editForm: {
          id: '',
          username: '',
          realname: '',
          roleIds: [],
          status: true,
          mobile:''
        },
        inputRule: {
          username: [{
            required: true,
            message: 'Silakan masukkan nama pengguna',
            trigger: 'blur'
          }],
          realname: [{
            required: true,
            message: 'Masukan nama',
            trigger: 'blur'
          }],
          mobile: [{
            required: true,
            message: 'Masukan nomor ponsel',
            trigger: 'blur'
          }],
          roleIds: [{
            type: 'array',
            required: true,
            message: 'Silakan pilih 1 peran',
            trigger: 'change'
          }],
          remark:[{
            required: true,
            message: 'Silakan isi catatan',
            trigger: 'blur'
          }]
        },
        //Dialog
        addDialogVisible: false,
        editDialogVisible: false,
        addFormLoading: false,
        editFormLoading: false
      }
    },
    methods: {
      getUnixTime(time){
          return DataUtil.formatUnixTime(time);
      },
      add(row) {
        this.addDialogVisible = true
        this.$refs.addForm && this.$refs.addForm.resetFields()
        this.addForm.roleIds = []
      },
      edit(row) {
        this.editDialogVisible = true
        this.editForm.id = row.id
        this.editForm.username = row.username
        this.editForm.realname = row.realname
        this.editForm.mobile = row.mobile
        this.editForm.roleIds = this.getRoleIds(row.roles.split(','))
        this.editForm.status = row.status == 1 ? false : true
      },
      reset(row) {
        this.$confirm('Anda yakin akan menyetel ulang kata sandi?', 'Konfirmasi', {
          type: 'warning'
        }).then(() => {
          let _data = {
            uuid: row.uuid
          };

          this.$http.post('api-system/system/resetSysUserPasswd', _data).then(response => {
            let {data} = response;
            if (0 == data.code) {
              this.$message({
                message: 'Kata sandi berhasil di setel ulang',
                type: 'success'
              });
            } else {
              this.$message.error(response.body.message);
            }
          }, response => {

          })
        }).catch(() => {

        })
      },
      getRoleIds(list) {
        var _arr = []
        for (let i = 0; i < list.length; i++) {
          _arr.push(list[i].split('|')[0])
        }
        return _arr
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
            _data.status = _data.status ? '0' : '1'
            _data.third = _data.third ? '0' : '1'
            _data.roleIds = _data.roleIds.join(',')
            if(_data.roleIds == 0){
              this.$message({
                message: 'Silakan pilih 1 peran',
                type: 'error'
              });
              return false;
            }

            this.addFormLoading = true

            this.$http.post("api-system/system/sysUserAdd", _data).then(response => {
              this.addFormLoading = false;
              let {data} = response;
              if (0 == data.code) {
                this.addDialogVisible = false
                this.bindGrid()
                this.$message({
                  message: 'Berhasil menambahkan pengguna',
                  type: 'success'
                });
              } else {
                this.$message.error(response.body.message);
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
            _data.status = _data.status ? '0' : '1'
            _data.roleIds = _data.roleIds.join(',')
            if(_data.roleIds == 0){
              this.$message({
                message: 'Silakan pilih 1 peran',
                type: 'error'
              });
                return false;
            }
            this.editFormLoading = true

            this.$http.post("api-system/system/sysUserEdit", _data).then(response => {
              this.editFormLoading = false;
              let {data} = response;
              if (0 == data.code) {
                this.editDialogVisible = false
                this.bindGrid()
                this.$message({
                  message: 'Berhasil mengubah pengguna',
                  type: 'success'
                });
              } else {
                this.$message.error(response.body.message);
              }
            }, response => {})

          } else {
            return false
          }
        });
      },
      search() {
        this.pageIndex = 1
        this.bindGrid()
      },
      bindRole() {
        let _data = {}
        this.$http.post('api-system/system/sysRoleList', _data).then(response => {
          let {data} = response;
          if (0 == data.code) {
            let _arr = []
            for (let i = 0; i < data.data.length; i++) {
              if (0 == data.data[i].status) {
                _arr.push(data.data[i])
              }
            }
            this.roleList = _arr
          }
        }, response => {

        });
      },
      bindGrid() {
        this.gridLoading = true
        let _data = Object.assign({}, this.searchForm)
        _data.pageNo = this.pageIndex
        _data.pageSize = this.pageSize
        this.$http.post('api-system/system/sysUserList', _data).then(response => {
          this.gridLoading = false;
          let {data} = response;
          if (0 == data.code) {
            this.dataTotal = data.data.totalElements;
            this.gridData = data.data.content;
          } else {
            this.$message.error(data.message);
          }
        }, response => {
          this.gridLoading = false
        });
      }
    },
    created: function () {
      this.bindRole()
      this.bindGrid()
    }
  }

</script>



// WEBPACK FOOTER //
// src/pages/system/Manager.vue