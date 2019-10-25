<template>
  <section>
    <el-form :inline="true" :model="searchForm" class="toolbar" label-position="right" label-width="100px">
      <el-row>
        <el-form-item label="应打款日期">
          <div class="block">
            <el-date-picker v-model="searchForm.timeMin" type="date" :picker-options="pickerOptions1" :editable="false" placeholder="选择日期"></el-date-picker> ~
            <el-date-picker v-model="searchForm.timeMax" type="date" :picker-options="pickerOptions2" :editable="false" placeholder="选择日期"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="是否打款" prop="status">
          <el-select v-model="searchForm.status" placeholder="请选择" clearable>
            <el-option v-for="item in payList" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label=" ">
          <el-button @click="search" type="primary" style="width: 120px">查询</el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <template>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid">
        <el-table-column label="应打款日期" prop="id">
          <template slot-scope="scope">
            <span>{{getUnixTime(scope.row.createTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="投资机构" prop="fromUser" ></el-table-column>
        <el-table-column label="超级投资人" prop="toUser" ></el-table-column>
        <el-table-column label="打款账户" prop="toAccount" ></el-table-column>
        <el-table-column label="应打款金额" prop="amount" ></el-table-column>
        <el-table-column label="是否打款" prop="status">
          <template slot-scope="scope">
            {{scope.row.status==1?'否':'是'}}
          </template>
        </el-table-column>
        <el-table-column label="打款备注" prop="remark" >
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="right">
              <p class="hideTooMuch">{{scope.row.remark}}</p>
              <div slot="reference">
                {{miniText(scope.row.remark)}}
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130">
          <template slot-scope="scope">
            <el-button type="text" size="small" v-if="scope.row.status==1" @click="click(scope.row)">编辑</el-button>
            <el-button type="text" size="small" v-if="scope.row.status==2" disabled>编辑</el-button>
          </template>
        </el-table-column>

      </el-table>
    </template>

    <!--分页-->
    <el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
    </el-pagination>


    <el-dialog title="编辑" :visible.sync="dialogTableVisible" width='45%'>
      <el-form :model="editForm" label-position="left" label-width="140px" ref="editForm"  :rules="editFormRule">
        <el-form-item label="是否付款" prop="dealStatus">
          <el-select v-model="editForm.dealStatus" clearable>
            <el-option v-for="item in payList" :key="item.code" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="付款日期"  prop="payTime">
             <el-date-picker v-model="editForm.payTime"  type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="备注（非必填）" prop="remark">
          <el-input v-model="editForm.remark " type="textarea" auto-complete="off" :maxlength="1000"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFormSubmit" :loading="refuseOrderLoading">提 交</el-button>
      </div>
    </el-dialog>

  </section>


</template>

<script>
  import enums from '../../common/enum'
  import DataUtil from '../../common/dataUtil'

    export default {
        data(){
         let compareDate = (time, form, txt, type) => {
            let _cp1 = time.getTime() >= Date.now()
            let _cp2 = false
            let _input = this[form][txt]
            if (_input) {
              let _time = Date.parse(new Date(_input))
              if ((type == "s" && time.getTime() > _time) || (type == "e" && time.getTime() < _time)) {
                _cp2 = true
              }
            }
            return _cp1 || _cp2
          }
          return {
            
            searchForm:{
              status:'',
              timeMin:'',
              timeMax:''
            },
            payList:[{
              code:'1',name:'否'
            },{
              code:'2',name:'是'
            }],
            gridLoading: false,
            gridData: [],
            pageIndex: 1,
            pageSize: 10,
            dataTotal: 0,
            dialogTableVisible: false,
            refuseOrderLoading: false,
            editForm:{
              payTime: new Date,
              dealStatus:"",
              remark:'',
            },
            id:'',
            editFormRule: {
              dealStatus: [{
                required: true,
                message: '请选择交易类型',
                trigger: 'change'
              }],
              payTime: [{
                required: true,
                message: '请选择付款日期',
                trigger: 'blur'
              }]
            },
            pickerOptions1:{
              disabledDate(time) {
                return compareDate(time, "searchForm", "timeMax", "s")
              }
            },
            pickerOptions2: {
              disabledDate(time) {
                return compareDate(time, "searchForm", "timeMin", "e")
              }
            }

          }
        },
        methods:{
          getUnixTime(time){
            return DataUtil.formatUnixTime(time);
          },
          miniText(text) {
            if (text.length > 30) {
              text = text.substr(0, 30) + '...';
            }
            return text;
          },
          search() {
            this.bindGrid()
          },
          pageSizeChange(val) {
            this.pageSize = val;
            this.pageIndex = 1;
            this.bindGrid()
          },
          pageIndexChange(val) {
            this.pageIndex = val;
            this.bindGrid();
          },
          click(row){
          this.dialogTableVisible = true
          this.editForm.payTime = '';
          this.editForm.dealStatus = '';
          this.$refs.editForm  && this.$refs.editForm .resetFields()
          this.id = row.id;
          },
          addFormSubmit() {
            this.$refs.editForm.validate((valid) => {
              if (valid) {
                let _data = Object.assign({}, this.editForm)
                _data.id = this.id;
                _data.payTime = DataUtil.formatTime(this.editForm.payTime)
                this.refuseOrderLoading = true

                this.$http.post("api-pay/pay/updatePayAccountHistoryByIdForBranchClear", _data).then(response => {
                  this.refuseOrderLoading = false;
                  if (0 == response.data.code) {
                    this.dialogTableVisible = false
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
          bindGrid(){
            let _data = Object.assign({
              pageNo:this.pageIndex,
              pageSize:this.pageSize}, this.searchForm,{
              timeMin:DataUtil.formatTime(this.searchForm.timeMin)||'',
              timeMax:DataUtil.formatTime(this.searchForm.timeMax)||''
            });


            this.gridLoading = true;
            this.$http.post('api-pay/pay/getBranchClearList',_data).then(response =>{
              this.gridLoading = false;
              let {data} = response;
              this.gridData = data.data.content;
              this.dataTotal = data.data.totalElements;
            })
          },
        },
      mounted(){
        // this.editForm.payTime = new Date();
        this.bindGrid();
      }
    }
</script>

<style scoped>

</style>



// WEBPACK FOOTER //
// src/pages/user/DailyClearing.vue