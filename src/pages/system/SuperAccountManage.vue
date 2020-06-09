<template>
    <section>
      <span style="color:red">Development Incomplete</span>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid">
        <el-table-column type="index" width="80">
        </el-table-column>
        <el-table-column label="IDPengguna" prop="id" width="310">
        </el-table-column>
        <el-table-column label="NamaPengguna" prop="realName" >
        </el-table-column>


        <!-- <el-table-column label="Opsi" width="130">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="click(scope.row)">Detail</el-button>
          </template> -->
        <!-- </el-table-column> -->

      </el-table>

      <el-dialog title="Tambah Nominal" :visible.sync="dialogTableVisible">
        <el-form :model="editForm" label-position="left" label-width="100px" :rules="editFormRule" ref="editForm">
          <el-form-item label="Kata Sandi" prop="password">
            <el-input v-model="editForm.password" auto-complete="off" :maxlength="26"></el-input>
          </el-form-item>
          <el-form-item label="Nominal" prop="amount">
            <el-input v-model="editForm.amount" auto-complete="off" :maxlength="30"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">Batal</el-button>
          <el-button type="primary" @click="addValue" :loading="addValueLoading">Tambah</el-button>
        </div>
      </el-dialog>

    </section>
</template>

<script>
    export default {
        name: "SuperAccountManage",
      data(){
        return {
          gridData:[],
          gridLoading:false,
          addValueLoading:false,
          dialogTableVisible:false,
          editForm:{
            password:'',
            userUuid:'',
            amount:''
          },
          editFormRule:{
            password:[{required:true, message:'Silakan masukkan kata sandi',trigger: 'blur'}],
            amount:[{required:true, message:'Silakan masukkan nominal',trigger: 'blur'}]
          }
        }
      },
      methods:{
          userList(){
            this.$http.post('api-user/user/userListByType',{userType:1}).then(response =>{    //Search Super Investor
              this.gridLoading = false;
              //console.log(response);
              let {data} = response;
              this.gridData = [...data.data];
            })
          },
          click(data){
            this.dialogTableVisible = true;
            this.editForm.userUuid = data.id;
          },
          addValue(){
            this.$refs['editForm'].validate((valid) =>{
              if(valid){
                let _data = Object.assign({}, this.editForm);
                this.addValueLoading = true;
                this.$http.post('api-user/user/superUserAccountAdd', _data).then(response =>{
                  this.addValueLoading = false;
                  let {data} = response;
                  this.$message.info(data.message);
                  if(data.code == 0){
                    this.dialogTableVisible = false;
                  }
                })
              }else {
                return false;
              }
            });
          }
      },
      mounted(){
          this.userList();
      }
    }
</script>

<style scoped>

</style>



// WEBPACK FOOTER //
// src/pages/system/SuperAccountManage.vue