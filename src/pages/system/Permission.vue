<template>
  <section>
    <!--Toolbar-->
    <el-form :inline="true" class="toolbar">
      <el-form-item>
        <el-button @click="addRoot" type="success">Tambah Akses</el-button>
      </el-form-item>
    </el-form>
    <!--List-->
    <el-tree :data="treeData" :props="defaultProps" node-key="id" v-loading="treeLoading" default-expand-all :expand-on-click-node="false"
      :render-content="renderContent"  ref="tree">
    </el-tree>
    <!--Add new item-->
    <el-dialog title="Tambah Akses" :visible.sync="addDialogVisible" v-model="addDialogVisible" :close-on-click-modal="false" size="tiny">
      <el-form :model="addForm" label-position="left" label-width="80px" :rules="inputRule" ref="addForm">
        <el-form-item label="Kode" prop="permissionCode">
          <el-input v-model="addForm.permissionCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Nama" prop="permissionName">
          <el-input v-model="addForm.permissionName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="URL" prop="permissionUrl">
          <el-input v-model="addForm.permissionUrl" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">Batal</el-button>
        <el-button type="primary" @click="addFormSubmit" :loading="addFormLoading">Tambah</el-button>
      </div>
    </el-dialog>
    <!--Edit dialog-->
    <el-dialog title="Ubah Akses" :visible.sync="editDialogVisible" :close-on-click-modal="false" size="tiny">
      <el-form :model="editForm" label-position="left" label-width="80px" :rules="inputRule" ref="editForm">
        <el-form-item label="Kode" prop="permissionCode">
          <el-input v-model="editForm.permissionCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Nama" prop="permissionName">
          <el-input v-model="editForm.permissionName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="URL" prop="permissionUrl">
          <el-input v-model="editForm.permissionUrl" auto-complete="off"></el-input>
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
      return {
        //Grid
        treeLoading: false,
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'permissionName'
        },
        //Form
        addForm: {
          permissionCode: '',
          permissionName: '',
          permissionUrl: '/',
          parentId: '0'
        },
        editForm: {
          id: '',
          permissionCode: '',
          permissionName: '',
          permissionUrl: '/',
        },
        inputRule: {
          permissionCode: [{
            required: true,
            message: 'Silakan masukkan kode',
            trigger: 'blur'
          }],
          permissionName: [{
            required: true,
            message: 'Silakan masukkan nama',
            trigger: 'blur'
          }],
          permissionUrl: [{
            required: true,
            message: 'Silakan masukkan URL',
            trigger: 'blur'
          }]
        },
        //Tree
        addDialogVisible: false,
        editDialogVisible: false,
        addFormLoading: false,
        editFormLoading: false
      }
    },
    methods: {
      addRoot() {
        this.addDialogVisible = true
        this.$refs.addForm && this.$refs.addForm.resetFields()
        this.addForm.parentId = '0'
      },
      addNode(parent) {
        this.addDialogVisible = true
        this.$refs.addForm && this.$refs.addForm.resetFields()
        this.addForm.parentId = parent.id
      },
      edit(row) {
        this.editDialogVisible = true
        this.editForm.id = row.id
        this.editForm.permissionCode = row.permissionCode
        this.editForm.permissionName = row.permissionName
        this.editForm.permissionUrl = row.permissionUrl
      },
      del(row) {
        this.$confirm('Anda yakin akan menghapus akses?', 'Konfirmasi', {
          type: 'warning'
        }).then(() => {
          let _data = {
            id: row.id
          }
          this.$http.post('api-system/system/deletePermission', _data).then(
            response => {
              let {data} = response;
              if (0 == data.code) {
                this.bindTree()
                this.$message({
                  message: 'Berhasil menghapus akses',
                  type: 'success'
                });
              } else {

              }
            }, response => {});
        }).catch(() => {

        })
      },
      addFormSubmit() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            let _data = Object.assign({}, this.addForm)
            this.addFormLoading = true

            this.$http.post('api-system/system/permissionItemAdd', _data).then(response => {
              this.addFormLoading = false;
              let {data} = response;
              if (0 == data.code) {
                this.addDialogVisible = false
                this.bindTree()
                this.$message({
                  message: 'Berhasil menambahkan akses',
                  type: 'success'
                });
              } else {
                this.$message.error(data.message);
              }
            }, response => {
              this.addFormLoading = false
            });

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

            this.$http.post('api-system/system/permissionItemEdit', _data).then(response => {
              this.editFormLoading = false;
              let {data} = response;
              if (0== data.code) {
                this.editDialogVisible = false
                this.bindTree()
                this.$message({
                  message: 'Berhasil mengubah akses',
                  type: 'success'
                });
              } else {
                this.$message.error(data.message);
              }
            }, response => {
              this.editFormLoading = false
            });

          } else {
            return false
          }
        });
      },
      renderContent(h, {
        node,
        data,
        store
      }) {
       return (
        <span style="width:100%"><span><span>{data.permissionName} ({data.permissionUrl})</span></span><span style = "float: right; margin-right: 20px">
        <el-button disabled={node.level!=1} type="success" size = "mini" style="padding:5px" on-click = {() => this.addNode(data)} >Tambah</el-button>
        <el-button size = "mini" style="padding:5px" on-click = {() => this.edit(data)} >Ubah</el-button>
        <el-button disabled={data.children&&data.children.length>0} type="danger" size = "mini" style="display:none;padding:5px" on-click = {() => this.del(data)} >Hapus</el-button>
        </span></span>
        )
      },
      bindTree() {
        this.treeLoading = true
        let _data = {}
        this.$http.post('api-system/system/permissionList', _data).then(response => {
          this.treeLoading = false;
          let {data} = response;
          if (0 == data.code ) {
            this.treeData = data.data
          } else {
            this.$message.error(data.message)
          }
        }, response => {
          this.treeLoading = false
        })

      }
    },
    created: function () {
      this.bindTree();
    }
  }

</script>



// WEBPACK FOOTER //
// src/pages/system/Permission.vue