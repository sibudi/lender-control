<template>
  <section>
    <!--Toolbar-->
    <el-form :inline="true" class="toolbar">
      <el-form-item>
        <el-button @click="add" type="success">Tambah Peran</el-button>
      </el-form-item>
    </el-form>
    <!--List-->
    <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid">
      <el-table-column type="index" width="80">
      </el-table-column>
      <el-table-column prop="roleName" label="Nama" width="250px">
      </el-table-column>
      <el-table-column label="Catatan">
        <template slot-scope="scope">
          <el-tooltip effect="dark" placement="bottom-start">
            <div slot="content">
              <p style='max-width:500px;'>{{scope.row.remark}}</p>
            </div>
            <span>{{sortRemark(scope.row.remark)}}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="Status" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status==1 ? 'danger' : 'success'" close-transition>{{scope.row.status==1?'Non-aktif':'Aktif'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Opsi" width="100">
        <template slot-scope="scope">
          <el-button size="small" @click="edit(scope.row)">Ubah</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--Add new item-->
    <el-dialog title="Tambah Peran" :visible.sync="addDialogVisible" v-model="addDialogVisible" :close-on-click-modal="false" size="small">
      <el-form :model="addForm" label-position="left" label-width="100px" :rules="inputRule" ref="addForm">
        <el-form-item label="Nama" prop="roleName">
          <el-input v-model="addForm.roleName" auto-complete="off" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="Catatan" prop="remark">
          <el-input type="textarea" :autosize="{minRows: 2,maxRows: 4}" v-model="addForm.remark" :maxlength="200"></el-input>
        </el-form-item>
        <el-form-item label="Akses" prop="permissionObj">
          <template v-for="(item,index) in addForm.permissionObj">
            <el-checkbox :label="item.id" :indeterminate="addForm.permissionObj[index].indeterminate" v-model="addForm.permissionObj[index].isCheck"
              @change="checkAllChange">{{item.permissionName}}</el-checkbox>
            <el-checkbox-group v-model="addForm.permissionObj[index].checkedList" @change="checkItemChange" style="margin-left:20px;">
              <el-checkbox v-for="(child,i) in item.children" :key="child.id" :label="child.id">{{child.permissionName}}</el-checkbox>
            </el-checkbox-group>
          </template>
        </el-form-item>
        <el-form-item label="Status" prop="status">
          <el-switch v-model="addForm.status" on-text="Aktif" off-text="Non-aktif"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">Batal</el-button>
        <el-button type="primary" @click="addFormSubmit" :loading="addFormLoading">Tambah</el-button>
      </div>
    </el-dialog>
    <!--Edit dialog-->
    <el-dialog title="Ubah Peran" :visible.sync="editDialogVisible" v-model="editDialogVisible" :close-on-click-modal="false" size="small">
      <el-form :model="editForm" label-position="left" label-width="100px" :rules="inputRule" v-loading="editFormInit" ref="editForm">
        <el-form-item label="Nama" prop="roleName">
          <el-input v-model="editForm.roleName" auto-complete="off" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="Catatan" prop="remark">
          <el-input type="textarea" :autosize="{minRows: 2,maxRows: 4}" v-model="editForm.remark" :maxlength="200"></el-input>
        </el-form-item>
        <el-form-item label="Akses" prop="permissionObj">
          <template v-for="(item,index) in editForm.permissionObj">
            <el-checkbox :label="item.id" :indeterminate="editForm.permissionObj[index].indeterminate" v-model="editForm.permissionObj[index].isCheck"
              @change="checkAllChange2">{{item.permissionName}}</el-checkbox>
            <el-checkbox-group v-model="editForm.permissionObj[index].checkedList" @change="checkItemChange2" style="margin-left:20px;">
              <el-checkbox v-for="(child,i) in item.children" :key="child.id" :label="child.id">{{child.permissionName}}</el-checkbox>
            </el-checkbox-group>
          </template>
        </el-form-item>
        <el-form-item label="Status" prop="status">
          <el-switch v-model="editForm.status" on-text="Aktif" off-text="Non-aktif"></el-switch>
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
  export default {
    data() {
      let checkPermission = (rule, value, callback) => {
        let _arr = this.getPermissionIds(value)
        if (_arr.length == 0) {
          callback(new Error('Silakan pilih akses'))
        }
        callback()
      }
      return {
        permissionListInit: false,
        permissionList: [],
        //Grid
        gridLoading: false,
        gridData: [],
        //Form
        addForm: {
          roleName: '',
          remark: '',
          permissionObj: [],
          status: true
        },
        editForm: {
          id: '',
          roleName: '',
          remark: '',
          permissionObj: [],
          status: true
        },
        inputRule: {
          roleName: [{
            required: true,
            message: 'Silakan masukkan nama peran',
            trigger: 'blur'
          }],
          permissionObj: [{
            validator: checkPermission,
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
        editFormLoading: false,
        editFormInit: false
      }
    },
    methods: {
      sortRemark(str) {
        if (str.length > 20) {
          str = str.substring(0, 20) + "..."
        }
        return str
      },
      add() {
        this.addDialogVisible = true
        this.$refs.addForm && this.$refs.addForm.resetFields()
        if (this.permissionListInit) {
          this.addPermissionObjInit()
        } else {
          this.getPermission(() => {
            this.addPermissionObjInit()
          })
        }
      },
      edit(row) {
        this.editDialogVisible = true
        this.editFormInit = true
        let _data = {
          id: row.id
        }
        this.$http.post('api-system/system/rolePermissionCheckList', _data).then(response => {
          let {data} = response;
          if (0 == data.code) {
            this.editFormInit = false
            this.editForm.id = row.id
            this.editForm.roleName = row.roleName
            this.editForm.remark = row.remark
            this.editForm.status = row.status == 1 ? false : true
            this.editPermissionObjInit(data.data)
          } else {
            this.$message.error(data.message);
          }
        }, response => {});
      },
      checkAllChange(event) {
        this.checkAllChangeFn(event, "addForm")
      },
      checkAllChange2(event) {
        this.checkAllChangeFn(event, "editForm")
      },
      checkItemChange(value) {
        this.checkItemChangeFn(value, "addForm")
      },
      checkItemChange2(value) {
        this.checkItemChangeFn(value, "editForm")
      },
      checkAllChangeFn(event, form) {
        for (let i = 0; i < this[form].permissionObj.length; i++) {
          let item = this[form].permissionObj[i]
          if (item.id == event.target.value) {
            item.indeterminate = false
            item.checkedList = event.target.checked ? (() => {
              let _arr = []
              for (let i = 0; i < item.children.length; i++) {
                _arr.push(item.children[i].id)
              }
              return _arr
            })() : []
          }
        }
      },
      checkItemChangeFn(value, form) {
        for (let i = 0; i < this[form].permissionObj.length; i++) {
          let item = this[form].permissionObj[i]
          if (item.checkedList.length == item.children.length) {
            item.isCheck = true
            item.indeterminate = false
          } else if (item.checkedList.length == 0) {
            item.isCheck = false
            item.indeterminate = false
          } else {
            item.isCheck = true
            item.indeterminate = true
          }
        }
      },
      getPermissionIds(obj) {
        let _arr = []
        for (let i = 0; i < obj.length; i++) {
          let item = obj[i]
          if (item.isCheck) {
            _arr.push(item.id)
            _arr = _arr.concat(item.checkedList)
          }
        }
        return _arr
      },
      addFormSubmit() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            let _data = {
              roleName: this.addForm.roleName,
              remark: this.addForm.remark,
              permissionIds: this.getPermissionIds(this.addForm.permissionObj).join(','),
              status: this.addForm.status ? '0' : '1'
            }
            this.addFormLoading = true

            this.$http.post("api-system/system/sysRoleAdd", _data).then(response => {
              let {data} = response;
              this.addFormLoading = false
              if (0 == data.code) {
                this.addDialogVisible = false
                this.bindGrid()
                this.$message({
                  message: 'Berhasil menambahkan peran',
                  type: 'success'
                });
              } else {
                this.$message.error(data.message);
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
            let _data = {
              id: this.editForm.id,
              roleName: this.editForm.roleName,
              remark: this.editForm.remark,
              permissionIds: this.getPermissionIds(this.editForm.permissionObj).join(','),
              status: this.editForm.status ? '0' : '1'
            }
            this.editFormLoading = true

            this.$http.post("api-system/system/sysRoleEdit", _data).then(response => {
              this.editFormLoading = false
              let {data} = response;
              if (0 == data.code) {
                this.editDialogVisible = false
                this.bindGrid()
                this.$message({
                  message: 'Berhasil mengubah peran',
                  type: 'success'
                });
              } else {
                this.$message.error(data.message);
              }
            }, response => {
              this.editFormLoading = false
            })

          } else {
            return false
          }
        });
      },
      getPermission(fn) {
        let _data = {}
        this.$http.post('api-system/system/permissionList', _data).then(response => {
          let {data} = response;
          if (0 == data.code) {
            this.permissionList = data.data
            this.permissionListInit = true
            fn && fn()
          }
        }, response => {

        });
      },
      bindGrid() {
        this.gridLoading = true
        let _data = {}
        this.$http.post('api-system/system/sysRoleList', _data).then(response => {
          this.gridLoading = false;
          let {data} = response;
          if (0 == data.code) {
            //this.dataTotal = response.body.result.recordsTotal
            this.gridData = data.data
          } else {
            this.$message.error(data.message);
          }
        }, response => {
          this.gridLoading = false
        });
      },
      addPermissionObjInit() {
        let _temp = []
        for (let i = 0; i < this.permissionList.length; i++) {
          _temp.push(Object.assign({
            checkedList: [],
            isCheck: false,
            indeterminate: false
          }, this.permissionList[i]))
        }
        this.addForm.permissionObj = _temp
      },
      editPermissionObjInit(list) {
        let _temp = []
        for (let i = 0; i < list.length; i++) {
          _temp.push(Object.assign(_getTempObj(list[i]), list[i]))
        }

        function _getTempObj(list) {
          if (list.isCheck == false) {
            return {
              checkedList: [],
              indeterminate: false
            }
          } else {
            let _arr = []
            for (let i = 0; i < list.children.length; i++) {
              if (list.children[i].isCheck) {
                _arr.push(list.children[i].id)
              }
            }
            return {
              checkedList: _arr,
              indeterminate: _arr.length == list.children.length ? false : true
            }
          }
        }
        this.editForm.permissionObj = _temp
      }
    },
    mounted: function () {
      this.bindGrid()
    }
  }

</script>



// WEBPACK FOOTER //
// src/pages/system/Role.vue