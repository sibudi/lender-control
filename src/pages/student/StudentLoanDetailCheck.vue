<template>
  <section>
    <el-row>
      <h1 class="one-title">第一步详情</h1>
      <div style="clear:both;">
        <el-col :span="12" class="grid-content">
          <div><span>姓名:</span><span>{{ loanInfoOne.userName}}</span></div>
          <div><span>身份证号:</span><span>{{ loanInfoOne.idCard }}</span></div>
          <div><span>手机号:</span><span>{{ loanInfoOne.mobileNumber }}</span></div>
          <div><span>宗教:</span><span>{{ loanInfoOne.religion }}</span></div>
          <div><span>家庭年收入:</span><span>{{ loanInfoOne.familyYearSalary }}</span></div>
          <div><span>家庭成员数量:</span><span>{{ loanInfoOne.familyMember }}</span></div>
          <!--<div><span>税号:</span><span>{{ loanInfoOne.npwpNo }}</span></div>-->
          <div><span>身份证地址:</span><span>{{ loanInfoOne.idAddressRo.province + ' ' + loanInfoOne.idAddressRo.city + ' ' +
            loanInfoOne.idAddressRo.bigDirect  + ' ' + loanInfoOne.idAddressRo.smallDirect + ' ' + loanInfoOne.idAddressRo.detailed  }}</span></div>
          <div><span>现居住地址:</span><span>{{ loanInfoOne.liveAddressRo.province + ' ' + loanInfoOne.liveAddressRo.city + ' '+
            loanInfoOne.liveAddressRo.bigDirect+ ' ' + loanInfoOne.liveAddressRo.smallDirect + ' ' + loanInfoOne.liveAddressRo.detailed  }}</span></div>
        </el-col>
        <!--<el-col :span="12" class="grid-content">
          <div><span>印尼税务居籍:</span><span>{{ loanInfoOne.salaryHomeValue }}</span></div>
        </el-col>-->
        <el-col :span="12" class="grid-content">
          <div><span>性别:</span><span>{{ getSex(loanInfoOne.sex) }}</span></div>
          <div><span>年龄:</span><span>{{ loanInfoOne.age }}</span></div>
          <div><span>邮箱:</span><span>{{ loanInfoOne.email }}</span></div>
          <div><span>银行名称:</span><span>{{ loanInfoOne.bankName }}</span></div>
          <div><span>银行卡号:</span><span>{{ loanInfoOne.bankNo }}</span></div>
          <!--<div><span>教育程度:</span><span>{{ loanInfoOne.education }}</span></div>-->
          <div><span>是否有分期贷款:</span><span>{{ loanAbleResult(loanInfoOne.loanAble) }}</span></div>
          <div><span>每月分期付款金额:</span><span>{{ loanInfoOne.loanAmount }}</span></div>
          <div><span>邀请码:</span><span>{{ inviteCode }}</span></div>
          <!--<div><span>工作年限:</span><span>{{ loanInfoOne.workTime }}</span></div>
          <div><span>其他资产来源:</span><span>{{ loanInfoOne.otherSalaryFrom }}</span></div>-->
        </el-col>
      </div>
    </el-row>

    <div>
      <el-row>
        <el-row style="margin-bottom: 20px;">
          <el-col :span="8">
            <el-card :body-style="{ padding: '0px' }">
              <ml-photo-box refs='photoBox'></ml-photo-box>
              <div style="padding: 14px;">
                <img :src="loanInfoOne.idCardUrl" class="imgCss" @click.stop="checkIdCardUrl">
                <span class="yituInfo">身份证照片</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8" :offset="3">
            <el-card :body-style="{ padding: '0px' }">
              <!--<ml-photo-box ref='photoBox'></ml-photo-box>-->
              <div style="padding: 14px;">
                <img :src="loanInfoOne.familyCardUrl" class="imgCss" @click.stop="checkFamilyCardUrl">
                <span class="yituInfo">家庭卡照片</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-row>

      <el-row>
        <el-row style="margin-bottom: 20px;">
          <el-col :span="8">
            <el-card :body-style="{ padding: '0px' }">
              <!--<ml-photo-box ref='photoBox'></ml-photo-box>-->
              <div style="padding: 14px;">
                <img :src="loanInfoOne.studentCardUrl" class="imgCss" @click.stop="checkStudentCardUrl">
                <span class="yituInfo">学生证照片</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8" :offset="3">
            <el-card :body-style="{ padding: '0px' }">
              <!--<ml-photo-box ref='photoBox'></ml-photo-box>-->
              <div style="padding: 14px;">
                <img :src="loanInfoOne.idCardInHandUrl" class="imgCss" @click.stop="checkIdCardInHandUrl">
                <span class="yituInfo">手持身份证自拍照</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-row>

      <el-row>
        <el-row style="margin-bottom: 20px;">
          <el-col :span="8">
            <el-card :body-style="{ padding: '0px' }">
              <!--<ml-photo-box ref='photoBox'></ml-photo-box>-->
              <div style="padding: 14px;">
                <img :src="loanInfoOne.collageStudentUrl" class="imgCss" @click.stop="checkCollageStudentUrl">
                <span class="yituInfo">大学学生证明照片</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-row>
    </div>
    <div class="divid-line"></div>

    <el-row>
      <h1 class="one-title">第二步详情</h1>
      <div style="clear:both;">
        <el-col :span="12" class="grid-content">
          <div><span>学校名称:</span><span>{{ loanInfoTwo.schoolName}}</span></div>
          <div><span>学校电话:</span><span>{{ loanInfoTwo.schoolMobile }}</span></div>
          <div><span>教育程度:</span><span>{{ loanInfoTwo.level }}</span></div>
          <div><span>入学年份:</span><span>{{ loanInfoTwo.enterYear }}</span></div>
          <div><span>学院和专业:</span><span>{{ loanInfoTwo.subject }}</span></div>
          <div><span>学号:</span><span>{{ loanInfoTwo.studentId }}</span></div>
          <div><span>学生学校地址:</span><span>{{ loanInfoTwo.schoolAddressRo.province + ' ' + loanInfoTwo.schoolAddressRo.city + ' ' +
            loanInfoTwo.schoolAddressRo.bigDirect  + ' ' + loanInfoTwo.schoolAddressRo.smallDirect + ' ' + loanInfoTwo.schoolAddressRo.detailed  }}</span></div>
        </el-col>

        <el-col :span="12" class="grid-content">
          <div><span>平均基点:</span><span>{{ loanInfoTwo.averageBasePoint }}</span></div>
          <div><span>学费:</span><span>{{ loanInfoTwo.schoolFee }}</span></div>
          <div><span>学费支付期:</span><span>{{ loanInfoTwo.schoolFeeTerm }}</span></div>
          <div><span>学费支付方式:</span><span>{{ loanInfoTwo.schoolFeePayWay }}</span></div>
          <div><span>支付学费银行名称:</span><span>{{ loanInfoTwo.schoolFeePayBank }}</span></div>
          <!--<div><span>教育程度:</span><span>{{ loanInfoTwo.education }}</span></div>-->
          <div><span>支付学费银行卡号:</span><span>{{ loanInfoTwo.schoolFeePayBankNo }}</span></div>
          <div><span>学费支付描述详情:</span><span>{{ loanInfoTwo.schoolFeePayDetail }}</span></div>
          <!--<div><span>工作年限:</span><span>{{ loanInfoTwo.workTime }}</span></div>
          <div><span>其他资产来源:</span><span>{{ loanInfoTwo.otherSalaryFrom }}</span></div>-->
        </el-col>
      </div>
    </el-row>
    <div class="divid-line"></div>

    <el-row>
      <h1 class="one-title">第三步详情</h1>
      <div style="clear:both;">
        <el-col :span="12" class="grid-content">
          <div><span>担保人姓名:</span><span>{{ loanInfoThree.userName}}</span></div>
          <div><span>担保人身份证号:</span><span>{{ loanInfoThree.idCardNo }}</span></div>
          <div><span>担保人与借款人关系:</span><span>{{ loanInfoThree.relationship }}</span></div>
          <div><span>担保人税卡号:</span><span>{{ loanInfoThree.taxCardNo }}</span></div>
          <div><span>担保人邮箱:</span><span>{{ loanInfoThree.email }}</span></div>
          <div><span>担保人身份证地址:</span><span>{{ loanInfoThree.idAddressRo.province + ' ' + loanInfoThree.idAddressRo.city + ' ' +
            loanInfoThree.idAddressRo.bigDirect  + ' ' + loanInfoThree.idAddressRo.smallDirect + ' ' + loanInfoThree.idAddressRo.detailed  }}</span></div>
          <div><span>担保人现居地地址:</span><span>{{ loanInfoThree.liveAddressRo.province + ' ' + loanInfoThree.liveAddressRo.city + ' ' +
            loanInfoThree.liveAddressRo.bigDirect  + ' ' + loanInfoThree.liveAddressRo.smallDirect + ' ' + loanInfoThree.liveAddressRo.detailed  }}</span></div>
        </el-col>

        <el-col :span="12" class="grid-content">
          <div><span>担保人手机号:</span><span>{{ loanInfoThree.mobileNumber }}</span></div>
          <div><span>担保人公司名称:</span><span>{{ loanInfoThree.companyName }}</span></div>
          <div><span>担保人公司联系方式:</span><span>{{ loanInfoThree.companyMobile }}</span></div>
          <div><span>职位:</span><span>{{ loanInfoThree.position }}</span></div>
          <div><span>担保人月收入:</span><span>{{ loanInfoThree.income }}</span></div>
          <div><span>是否在doit借过款:</span><span>{{ loanInfoThree.doitLoan }}</span></div>
          <!--<div><span>教育程度:</span><span>{{ loanInfoThree.education }}</span></div>-->
          <!--<div><span>支付学费银行卡号:</span><span>{{ loanInfoThree.schoolFeePayBankNo }}</span></div>
          <div><span>学费支付描述详情:</span><span>{{ loanInfoThree.schoolFeePayDetail }}</span></div>-->
          <div><span>担保人公司地址:</span><span>{{ loanInfoThree.liveCompanyAddressRo.province + ' ' + loanInfoThree.liveCompanyAddressRo.city + ' ' +
            loanInfoThree.liveCompanyAddressRo.bigDirect  + ' ' + loanInfoThree.liveCompanyAddressRo.smallDirect + ' ' + loanInfoThree.liveCompanyAddressRo.detailed  }}</span></div>
        </el-col>
      </div>

    </el-row>

    <div>
      <el-row>
        <el-row style="margin-bottom: 20px;">
          <el-col :span="8">
            <el-card :body-style="{ padding: '0px' }">
              <!--<ml-photo-box ref='photoBox'></ml-photo-box>-->
              <div style="padding: 14px;">
                <img :src="loanInfoThree.idCardUrl" class="imgCss" @click.stop="checkIdCardUrlThree">
                <span class="yituInfo">身份证照片</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8" :offset="3">
            <el-card :body-style="{ padding: '0px' }">
              <!--<ml-photo-box ref='photoBox'></ml-photo-box>-->
              <div style="padding: 14px;">
                <img :src="loanInfoThree.payDetailUrl" class="imgCss" @click.stop="checkPayDetailUrl">
                <span class="yituInfo">工资单</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-row>

      <el-row>
        <el-row style="margin-bottom: 20px;">
          <el-col :span="8">
            <el-card :body-style="{ padding: '0px' }">
              <!--<ml-photo-box ref='photoBox'></ml-photo-box>-->
              <div style="padding: 14px;">
                <img :src="loanInfoThree.aggrementUrl" class="imgCss" @click.stop="checkAggrementUrl">
                <span class="yituInfo">担保人声明照片</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8" :offset="3">
            <el-card :body-style="{ padding: '0px' }">
              <!--<ml-photo-box ref='photoBox'></ml-photo-box>-->
              <div style="padding: 14px;">
                <img :src="loanInfoThree.aggrementInHandUrl" class="imgCss" @click.stop="checkAggrementInHandUrl">
                <span class="yituInfo">担保人持有声明照片</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-row>
    </div>

    <div class="divid-line"></div>

    <div>
      <el-row>
        <h1 class="one-title">第四步详情</h1>
        <div style="clear:both;">
          <el-col :span="12" class="grid-content">
            <div><span>姓名:</span><span>{{ loanInfoFour.username}}</span></div>
            <div><span>与借款人关系:</span><span>{{ loanInfoFour.relationship }}</span></div>
          </el-col>

          <el-col :span="12" class="grid-content">
            <div><span>手机号码:</span><span>{{ loanInfoFour.mobileNumber }}</span></div>
          </el-col>
        </div>
      </el-row>

    </div>

    <div>
      <el-row>
        <el-button type="primary" @click="passOrder" :loading="passOrderLoading">通过</el-button>
        <el-button type="" @click="dialogTableVisible = true" >拒绝</el-button>
      </el-row>
    </div>

    <el-dialog title="拒绝原因" :visible.sync="dialogTableVisible">
      <el-form :model="editForm" label-position="left" label-width="100px" :rules="editFormRule" ref="editForm">
        <el-form-item label="" prop="reason">
          <el-input v-model="editForm.reason" type="textarea" auto-complete="off" :maxlength="210"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="refuseOrder" :loading="refuseOrderLoading">提 交</el-button>
      </div>
    </el-dialog>

    <!-- 图片预览 -->
    <el-dialog :visible.sync="dialogVisible" size="full" class="photo_box">
      <img width="95%" :src="dialogImageUrl" alt="" style="margin-left: 2.5%;">
    </el-dialog>

  </section>

</template>

<script>
  import mlPhotoBox from '../../components/_photoBox.vue'
  import enums from '../../common/enum'
  import DataUtil from '../../common/dataUtil'
  import Config from '../../common/config'
  export default {
    components: {
      mlPhotoBox
    },
    name: "StudentLoanDetail",
    data(){
      return{
        uuid:'',
        loanInfoOne:{idAddressRo:{},liveAddressRo:{}},
        loanInfoTwo:{schoolAddressRo:{}},
        loanInfoThree:{},
        loanInfoFour:{},
        dialogTableVisible:false,
        editForm:{},
        editFormRule:{
          reason:[{required:true, message:'请输入拒绝原因',trigger: 'blur'}]
        },
        passOrderLoading:false,
        refuseOrderLoading:false,
        dialogVisible:false,
        dialogImageUrl:'',
        inviteCode:''
      }
    },
    methods:{
      loanAbleResult(type){
        let result = '';
        if(type == 1){
          result = '有';
        }else {
          result = '无'
        }
        return result;
      },
      doitLoanResult(type){
        let result = '';
        if(type == 1){
          result = '是';
        }else {
          result = '否'
        }
        return result;
      },
      checkIdCardUrl(){
        console.log(this.loanInfoOne.idCardUrl);
        this.picturePreview(this.loanInfoOne.idCardUrl);
      },
      checkFamilyCardUrl(){
        this.picturePreview(this.loanInfoOne.familyCardUrl);
      },
      checkStudentCardUrl(){
        this.picturePreview(this.loanInfoOne.studentCardUrl);
      },
      checkIdCardInHandUrl(){
        this.picturePreview(this.loanInfoOne.idCardInHandUrl);
      },
      checkCollageStudentUrl(){
        this.picturePreview(this.loanInfoOne.collageStudentUrl);
      },
      checkIdCardUrlThree(){
        this.picturePreview(this.loanInfoThree.idCardUrl);
      },
      checkPayDetailUrl(){
        this.picturePreview(this.loanInfoThree.payDetailUrl);
      },
      checkAggrementUrl(){
        this.picturePreview(this.loanInfoThree.aggrementUrl);
      },
      checkAggrementInHandUrl(){
        this.picturePreview(this.loanInfoThree.aggrementInHandUrl);
      },
      picturePreview(imgUrl){
        this.dialogImageUrl = imgUrl;
        this.dialogVisible = true;
      },
      getSex(type){
        return enums.getName(type,enums.sex);
      },
      stepOneInfo(){
        this.$http.post('api-user/user/studentStepOneInfoSys',{uuid:this.uuid}).then(response =>{
          let {data} = response;
          if(data.code == 0 && data.data){
            this.loanInfoOne = data.data;
            this.loanInfoOne.idCardUrl = Config.imageUrl + data.data.idCardUrl || "";
            this.loanInfoOne.familyCardUrl = Config.imageUrl + data.data.familyCardUrl || "";
            this.loanInfoOne.studentCardUrl = Config.imageUrl + data.data.studentCardUrl || "";
            this.loanInfoOne.idCardInHandUrl = Config.imageUrl + data.data.idCardInHandUrl || "";
            this.loanInfoOne.collageStudentUrl = Config.imageUrl + data.data.collageStudentUrl || "";
          }

        });
      },
      stepTwoInfo(){
        this.$http.post('api-user/user/studentStepTwoInfoSys',{uuid:this.uuid}).then(response =>{
          let {data} = response;
          if(data.code == 0 && data.data){
            this.loanInfoTwo = data.data;
          }
        });
      },
      stepThreeInfo(){
        this.$http.post('api-user/user/studentStepThreeInfoSys',{uuid:this.uuid}).then(response =>{
          let {data} = response;
          if(data.code == 0 && data.data){
            this.loanInfoThree = data.data;
            this.loanInfoThree.idCardUrl = Config.imageUrl + data.data.idCardUrl || "";
            this.loanInfoThree.payDetailUrl = Config.imageUrl + data.data.payDetailUrl || "";
            this.loanInfoThree.aggrementUrl = Config.imageUrl + data.data.aggrementUrl || "";
            this.loanInfoThree.aggrementInHandUrl = Config.imageUrl + data.data.aggrementInHandUrl || "";
          }
        });
      },
      stepFourInfo(){
        this.$http.post('api-user/user/studentStepFourInfoSys',{uuid:this.uuid}).then(response =>{
          let {data} = response;
          if(data.code == 0 && data.data){
            this.loanInfoFour = data.data;
          }
        });
      },
      refuseOrder(){
        this.changeOrder(1);
      },
      passOrder(){
        this.changeOrder(0);
      },
      changeOrder(flag){
        let canIUser = true;
        let _data = {pass:flag,reason:'',username:DataUtil.userName(),id:this.uuid};
        if(flag == 1){
          this.$refs['editForm'].validate((valid) =>{
            if(valid){
              _data.reason = this.editForm.reason;
            }else {
              canIUser = false;
            }
          })
        }

        if(!canIUser){
          return false;
        }

        if(flag == 1){
          this.refuseOrderLoading = true;
        }else {
          this.passOrderLoading = true;
        }
        this.$http.post('api-user/user/checkStudentLoan',_data).then(response =>{
          this.refuseOrderLoading = false;
          this.passOrderLoading = false;
          let {data} = response;
          if(data.code == 0){
            window.close();
          }else {
            this.$message.info(data.message);
          }
        })
      }
    },
    mounted(){
      this.uuid = this.$route.query['uuid']||'';
      this.inviteCode = this.$route.query['inviteCode']||'';
      this.stepOneInfo();
      this.stepTwoInfo();
      this.stepThreeInfo();
      this.stepFourInfo();
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

  /* 标题 */
  .main-title{
    font-size: 22px;
    margin-top: -15px;
    margin-bottom: 15px;
  }
  .one-title{
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 7px;
  }
  .two-title{
    font-size: 13px;
    color: #888;
    margin: 10px 0
  }
  .subtitle{
    font-size: 13px;
    color: #888;
  }
  .orderBox .el-row {
    margin: 15px 30px;
  }
  .orderBox .el-col span{
    margin-right: 10px;
  }
  .orderBox .el-button span,.orderBox .el-tag span{
    margin-right: 0;
  }
  .orderBox .box-card .el-button{
    margin-right: 5px;
  }
  .orderBox .grid-content {
    line-height: 28px;
  }

  .divid-line{
    height: 10px;
    background: #f1f2f7;
  }
  /*借款信息*/
  .loanDetail{
    margin: 0 30px 15px;
    width: 94%;
    max-height:250px;
  }
  /*依图识别*/
  .yituInfo{
    display: block;
    text-align: center;
    margin-top: 10px;
  }
  /*征信*/
  .orderBox .box-card{
    height: 225px;
  }
  .JXLBox{
    border: 1px solid #ccc;
    padding: 10px
  }
  .JXLBox div{
    padding: 5px;
  }
  .imgCss{
    display:block;
    width: 100%;
    height: 250px;
  }
  .orderBox .el-table .info-row {
    background: #e2f0e4;
  }

  .orderBox .el-table .red-row{
    background: #F33;
  }
  .redInfo{
    color: #F33;
  }

  .line-height .el-col{
    margin-bottom: 10px;
  }
</style>



// WEBPACK FOOTER //
// src/pages/student/StudentLoanDetailCheck.vue