<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar" label-position="right" label-width="100px">
      <el-row>
        <el-form-item label="投资人姓名">
          <el-input v-model="searchForm.name" width="200"></el-input>
        </el-form-item>
<!--         <el-form-item label="状态" prop="status">
          <el-select v-model="searchForm.status" placeholder="请选择" clearable>
            <el-option v-for="item in statusList" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="支付渠道" prop="channel">
          <el-select v-model="searchForm.channel" placeholder="请选择" clearable>
            <el-option v-for="item in payList" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提现时间区间">
          <div class="block">
            <el-date-picker v-model="searchForm.timeMin" type="date" :picker-options="pickerOptions1" :editable="false" placeholder="选择日期"></el-date-picker> ~
            <el-date-picker v-model="searchForm.timeMax" type="date" :picker-options="pickerOptions2" :editable="false" placeholder="选择日期"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="投资人手机号">
          <el-input v-model="searchForm.mobile" width="200"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button @click="search" type="primary" style="width: 170px">查询</el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <template>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid">
        <el-table-column label="账单号" prop="tradeNo">
        </el-table-column>
        <el-table-column label="提现时间" prop="createTime">
<!--           <template slot-scope="scope">
            <span>{{getUnixTime(scope.row.createTime)}}</span>
          </template> -->
        </el-table-column>
        <el-table-column label="金额" prop="amount">
        </el-table-column>
        <el-table-column label="支付渠道" prop="paychannel">
        </el-table-column>
        <el-table-column label="投资人姓名" prop="fromUserId">
        </el-table-column>
        <el-table-column label="情况" prop="dealStatus">
        </el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="edit(scope.row)">编辑</el-button>
            <el-popover trigger="hover" placement="top">
              <p class="hideTooMuch">{{scope.row.toUserId}}</p>
              <el-button size="small" type="text" @click="" slot="reference">查看手机号</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <!--分页-->
    <el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
    </el-pagination>


        <!-- 添加备注弹框 -->
    <el-dialog title="订单情况" :visible.sync="editFormDigVisible" v-model="editFormDigVisible" :close-on-click-modal="false">
      <el-form :model="addRemarkForm" ref="addRemarkForm" label-width="70px">
        <el-form-item label="订单情况" prop="questionType">
          <el-select v-model="addRemarkForm.dealStatus" placeholder="请选择" clearable>
            <el-option v-for="item in issueTypeList" :label="item.name" :key="item.code" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="addRemarkForm.remark" :maxlength="200" :rows="4"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="" @click="editFormDigVisible = false">取 消</el-button>
        <el-button type="primary" @click.native.prevent="editFormSubmit" :loading="confirmLoading">提 交</el-button>
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
        addRemarkForm:{
          dealStatus:'',
          remark:''
        },
        id:"",
        editFormDigVisible: false,
        confirmLoading:false,
        searchForm:{
          mobile: '',
          timeMax: '',
          timeMin: '',
          name: '',
          status: '',
          channel:'',
          type:'RECHARGE'
        },
        statusList:[{
          code: '1',
          name:'提现处理中'
        },{
          code: '2',
          name:'提现成功'
        },{
          code: '3',
          name:'提现失败'
        }],
        payList:[{
          code: 'BCA',
          name:'BCA'
        },{
          code: 'BNI',
          name:'BNI'
        },{
          code: 'CIMB',
          name:'CIMB'
        }],
        issueTypeList:[{
          code: '1',
          name: '已联系',
        },{
          code: '2',
          name: '更卡，钱已回',
        },{
          code: '3',
          name: '未联系到',
        }],
        gridLoading: false,
        gridData: [],
        pageIndex: 1,
        pageSize: 10,
        dataTotal: 0,
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
      edit(row){
        this.editFormDigVisible = true;
        this.id = row.id;
      },
      getUnixTime(time){
        return DataUtil.formatUnixTime(time);
      },
      getOrderStatus(type){
        this.payList.forEach((v)=>{
          if(v.code == obj){
            re = v.name;
            return;
          }
        })
      },
      formatTime(time){
        return DataUtil.formatUnixTime(time);
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
      bindGrid(){
        let _data = Object.assign({pageNo:this.pageIndex, pageSize:this.pageSize},this.searchForm,{
          timeMin:DataUtil.formatTime(this.searchForm.timeMin)||'',
          timeMin:DataUtil.formatTime(this.searchForm.timeMin)||''
        });

        this.$http.post('api-pay/pay/payListByPage',_data).then(response =>{
          let {data} = response.data;
          this.gridData = data.content;
          this.dataTotal = data.totalElements;
        })
      },
      editFormSubmit() {
        if(!this.addRemarkForm.remark){
          this.$message.error("请填写备注");
          return false;
        }
        if(!this.addRemarkForm.dealStatus){
          this.$message.error("请选择订单情况");
          return false;
        }
        let _data = Object.assign({},this.addRemarkForm);
        _data.id = this.id;
        this.confirmLoading = true;
        this.$http.post('api-pay/pay/updatePayAccountHistoryById',_data).then(response => {
          this.confirmLoading = false;
          if(response.data.code == 0){
            this.editFormDigVisible = false;
            this.bindGrid();
          }else{
            this.$message.error(response.data.message);
          }
        },response => {this.confirmLoading = false;});
      },
    },
    mounted(){
      this.bindGrid();
    }
  }
</script>

<style scoped>

</style>




// WEBPACK FOOTER //
// src/pages/financial/DrawalFailList.vue