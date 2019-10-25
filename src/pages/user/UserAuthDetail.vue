<template>
  <section>
    <el-row>
      <h1 class="one-title" style="float: left;">客户信息</h1>

      <div style="clear:both;">
        <el-col :span="5" class="grid-content">
          <div><span>手机号:</span><span>{{ authData.mobileNumber }}</span></div>
          <div><span>姓名:</span><span>{{ authData.realName}}</span></div>
          <div><span>身份证号:</span><span>{{ authData.idCardNo }}</span></div>
          <div><span>宗教:</span><span>{{ authData.religion }}</span></div>
          <div><span>税号:</span><span>{{ authData.npwpNo }}</span></div>
          <div><span>出生地址:</span><span>{{ authData.birthAddressRo.birthProvince + ' ' + authData.birthAddressRo.birthCity + ' ' +
            authData.birthAddressRo.birthBigDirect  + ' ' + authData.birthAddressRo.birthSmallDirect + ' ' + authData.birthAddressRo.birthDetailed  }}</span></div>
        </el-col>
        <el-col :span="7" class="grid-content">
          <div><span>出生日期:</span><span>{{ authData.birthDate }}</span></div>
          <div><span>年龄:</span><span>{{ authData.age }}</span></div>
          <div><span>性别:</span><span>{{ authData.sex }}</span></div>
          <div><span>年收入:</span><span>{{ authData.yearSalary }}</span></div>
          <div><span>印尼税务居籍:</span><span>{{ authData.salaryHomeValue }}</span></div>
          <div><span>居住地址:</span><span>{{ authData.liveAddressRo.liveProvince + ' ' + authData.liveAddressRo.liveCity + ' '+
            authData.liveAddressRo.liveBigDirect+ ' ' + authData.liveAddressRo.liveSmallDirect + ' ' + authData.liveAddressRo.liveDetailed  }}</span></div>
        </el-col>
        <el-col :span="12" class="grid-content">
          <div><span>教育程度:</span><span>{{ authData.education }}</span></div>
          <div><span>工作:</span><span>{{ authData.job }}</span></div>
          <div><span>行业:</span><span>{{ authData.workField }}</span></div>
          <div><span>工作年限:</span><span>{{ authData.workTime }}</span></div>
          <div><span>其他资产来源:</span><span>{{ authData.otherSalaryFrom }}</span></div>
        </el-col>
      </div>

    </el-row>

    <el-row>
      <el-button type="primary" size="small" @click="changeStatus(0)">通过</el-button>
      <el-button size="small" @click="changeStatus(1)">不通过</el-button>
    </el-row>


  </section>
</template>

<script>
    export default {
        name: "UserAuthDetail",
        data(){
          return{
            uuid:'',
            authData:{birthAddressRo:{birthProvince:'',birthCity:'',birthBigDirect:'',birthSmallDirect:'',birthDetailed:''},
              liveAddressRo:{liveProvince:'',liveCity:'',liveBigDirect:'',liveSmallDirect:'',liveDetailed:''}}
          }
        },
      methods:{
        changeStatus(flag){
          console.log(flag);
          let _data = {};
          this.$http.post('api-user/user/checkUserAuthStatus',{userUuid:this.uuid,pass:flag}).then(response =>{
            let {data} = response;
            if(data.code == 0){
              window.close();
            }else {
              this.$message.info(data.message);
            }
          })
        },
        getInitData(){
          this.$http.post('api-user/user/userAuthCheckInfo',{userUuid:this.uuid}).then(response =>{
            //console.log(response);
            let {data} = response;
            data.data.birthAddressRo?'':this.authData.birthAddressRo = {birthProvince:'',birthCity:'',birthBigDirect:'',birthSmallDirect:'',birthDetailed:''};
            data.data.liveAddressRo?'':this.authData.liveAddressRo = {liveProvince:'',liveCity:'',liveBigDirect:'',liveSmallDirect:'',liveDetailed:''};
            this.authData = data.data;
          });
        }
      },
      mounted(){
        this.uuid = this.$route.query['uuid']||'';
        this.getInitData();
      }
    }
</script>

<style scoped>
  .one-title{
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 7px;
  }
  .subtitle{
    font-size: 13px;
    color: #888;
  }
  .el-row {
    margin: 15px 30px;
  }
  .grid-content {
    line-height: 28px;
  }
  .el-col span{
    margin-right: 10px;
  }
  .box-card .el-button{
    margin-right: 5px;
  }

  .divid-line{
    height: 10px;
    background: #f1f2f7;
  }
</style>



// WEBPACK FOOTER //
// src/pages/user/UserAuthDetail.vue