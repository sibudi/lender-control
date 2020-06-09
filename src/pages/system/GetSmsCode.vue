<template>
  <div id="getUserLastSmsCode">
  <el-form ref="form" :model="form" :inline="true" label-width="120px" class="demo-form-inline">
    <el-form-item label="Nomor Ponsel">
      <el-input v-model="form.mobileNumber" placeholder=""></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="bindGrid">Cari</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="tableData" style="width: 100%" v-loading="gridLoading">
      <el-table-column prop="mobile" label="Nomor Ponsel"></el-table-column>
      <el-table-column prop="smsCode" label="Kode SMS"></el-table-column>
      <el-table-column prop="createTime" label="Waktu Dikirim">
        <template slot-scope="scope">
            <span>{{getUnixTime(scope.row.createTime)}}</span>
          </template>
      </el-table-column>
  </el-table>
  </div>
</template>
<script>
  import DataUtil from '../../common/dataUtil'
  export default {
    data() {
      return {
        gridLoading: false,
        tableData: [],
        form: {
          mobileNumber: ''
        }
      }
    },
    methods: {
      getUnixTime(time){
        return DataUtil.formatUnixTime(time);
      },
      bindGrid() {
        let _data = Object.assign({},this.form);
        this.gridLoading = true;
        this.tableData =[];
        this.$http.post('api-system/system/getUserLastSmsCode', _data).then(response => {
          this.gridLoading = false;
          if (0 == response.data.code) {
            if(response.data.data){
              this.tableData.push(response.data.data);
            }else {
              this.tableData = [];
            }
          } else {
            this.$message.error(response.body.message);
          }
        }, response => {

        });
      }
    },
    mounted() {

    }
  }
</script>
<style>
  #getUserLastSmsCode {
    margin-top: 20px;
  }
</style>


// WEBPACK FOOTER //
// src/pages/system/GetSmsCode.vue