<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" class="toolbar">
      <el-form-item>
        <el-button @click="add" type="primary">添加超级投资人</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <template>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid">
        <el-table-column prop="realName" label="姓名">
        </el-table-column>
        <el-table-column prop="mobileNumber" label="手机号">
        </el-table-column>
        <el-table-column prop="bankCarkNo" label="银行卡账号">
        </el-table-column>
        <el-table-column prop="currentBalance" label="账户余额">
        </el-table-column>
        <el-table-column prop="lockedBalance" label="锁定金额">
        </el-table-column>
      </el-table>
    </template>
    <!--分页-->
<!--     <el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
    </el-pagination> -->
    <!--添加-->
    <el-dialog title="添加超级投资人" :visible.sync="addDialogVisible" v-model="addDialogVisible" :close-on-click-modal="false" size="small">
      <el-form :model="addForm" label-position="left" label-width="100px" :rules="inputRule" ref="addForm">
        <el-form-item label="手机号" prop="mobileNumber">
          <el-input v-model="addForm.mobileNumber" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="操作密码" prop="opcode">
          <el-input type="password" v-model="addForm.opcode"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFormSubmit" :loading="addFormLoading">确 认</el-button>
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
        inputRule: {
          mobileNumber: [{
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          }],
          opcode: [{
            required: true,
            message: '请输入密码',
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
                  message: '操作成功',
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