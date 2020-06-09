<template>
  <section>
    <el-row>
      <h1 class="one-title">Langkah Pertama</h1>
      <div style="clear:both;">
        <el-col :span="12" class="grid-content">
          <div><span>Nama:</span><span>{{ loanInfoOne.userName}}</span></div>
          <div><span>Nomor Id:</span><span>{{ loanInfoOne.idCard }}</span></div>
          <div><span>Nomor Ponsel:</span><span>{{ loanInfoOne.mobileNumber }}</span></div>
          <div><span>Agama:</span><span>{{ loanInfoOne.religion }}</span></div>
          <div><span>Penghasilan Tahunan:</span><span>{{ loanInfoOne.familyYearSalary }}</span></div>
          <div><span>Jumlah Anggota Keluarga:</span><span>{{ loanInfoOne.familyMember }}</span></div>
          <!--<div><span>NPWP:</span><span>{{ loanInfoOne.npwpNo }}</span></div>-->
          <div><span>Alamat sesuai Id:</span><span>{{ loanInfoOne.idAddressRo.province + ' ' + loanInfoOne.idAddressRo.city + ' ' +
            loanInfoOne.idAddressRo.bigDirect  + ' ' + loanInfoOne.idAddressRo.smallDirect + ' ' + loanInfoOne.idAddressRo.detailed  }}</span></div>
          <div><span>Alamat saat ini:</span><span>{{ loanInfoOne.liveAddressRo.province + ' ' + loanInfoOne.liveAddressRo.city + ' '+
            loanInfoOne.liveAddressRo.bigDirect+ ' ' + loanInfoOne.liveAddressRo.smallDirect + ' ' + loanInfoOne.liveAddressRo.detailed  }}</span></div>
        </el-col>
        <!--<el-col :span="12" class="grid-content">
          <div><span>Domisili Pajak Indonesia:</span><span>{{ loanInfoOne.salaryHomeValue }}</span></div>
        </el-col>-->
        <el-col :span="12" class="grid-content">
          <div><span>Jenis Kelamin:</span><span>{{ getSex(loanInfoOne.sex) }}</span></div>
          <div><span>Usia:</span><span>{{ loanInfoOne.age }}</span></div>
          <div><span>Email:</span><span>{{ loanInfoOne.email }}</span></div>
          <div><span>Nama Bank:</span><span>{{ loanInfoOne.bankName }}</span></div>
          <div><span>Nomor Rekening:</span><span>{{ loanInfoOne.bankNo }}</span></div>
          <!--<div><span>Pendidikan:</span><span>{{ loanInfoOne.education }}</span></div>-->
          <div><span>Apakah Memiliki Cicilan?:</span><span>{{ loanAbleResult(loanInfoOne.loanAble) }}</span></div>
          <div><span>Nominal Cicilan Bulanan:</span><span>{{ loanInfoOne.loanAmount }}</span></div>
          <div><span>Kode Undangan:</span><span>{{ inviteCode }}</span></div>
          <!--<div><span>Lama Bekerja (Tahun):</span><span>{{ loanInfoOne.workTime }}</span></div>
          <div><span>Penghasilan Lainnya:</span><span>{{ loanInfoOne.otherSalaryFrom }}</span></div>-->
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
                <span class="yituInfo">Foto Kartu Id</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8" :offset="3">
            <el-card :body-style="{ padding: '0px' }">
              <!--<ml-photo-box ref='photoBox'></ml-photo-box>-->
              <div style="padding: 14px;">
                <img :src="loanInfoOne.familyCardUrl" class="imgCss" @click.stop="checkFamilyCardUrl">
                <span class="yituInfo">Foto Kartu Keluarga</span>
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
                <span class="yituInfo">Foto Kartu Pelajar</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8" :offset="3">
            <el-card :body-style="{ padding: '0px' }">
              <!--<ml-photo-box ref='photoBox'></ml-photo-box>-->
              <div style="padding: 14px;">
                <img :src="loanInfoOne.idCardInHandUrl" class="imgCss" @click.stop="checkIdCardInHandUrl">
                <span class="yituInfo">Swafoto dengan Id</span>
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
                <span class="yituInfo">Foto Kartu Mahasiswa</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-row>
    </div>
    <div class="divid-line"></div>

    <el-row>
      <h1 class="one-title">Langkah Kedua</h1>
      <div style="clear:both;">
        <el-col :span="12" class="grid-content">
          <div><span>Nama Sekolah:</span><span>{{ loanInfoTwo.schoolName}}</span></div>
          <div><span>Nomor Telepon Sekolah:</span><span>{{ loanInfoTwo.schoolMobile }}</span></div>
          <div><span>Tingkat Pendidikan:</span><span>{{ loanInfoTwo.level }}</span></div>
          <div><span>Tahun Masuk:</span><span>{{ loanInfoTwo.enterYear }}</span></div>
          <div><span>Program Studi:</span><span>{{ loanInfoTwo.subject }}</span></div>
          <div><span>Nomor Induk Siswa:</span><span>{{ loanInfoTwo.studentId }}</span></div>
          <div><span>Alamat Sekolah:</span><span>{{ loanInfoTwo.schoolAddressRo.province + ' ' + loanInfoTwo.schoolAddressRo.city + ' ' +
            loanInfoTwo.schoolAddressRo.bigDirect  + ' ' + loanInfoTwo.schoolAddressRo.smallDirect + ' ' + loanInfoTwo.schoolAddressRo.detailed  }}</span></div>
        </el-col>

        <el-col :span="12" class="grid-content">
          <div><span>Nilai Rata-rata:</span><span>{{ loanInfoTwo.averageBasePoint }}</span></div>
          <div><span>Biaya Sekolah:</span><span>{{ loanInfoTwo.schoolFee }}</span></div>
          <div><span>Durasi Biaya Sekolah:</span><span>{{ loanInfoTwo.schoolFeeTerm }}</span></div>
          <div><span>Metode Pembayaran Biaya Sekolah:</span><span>{{ loanInfoTwo.schoolFeePayWay }}</span></div>
          <div><span>Nama Bank Sekolah:</span><span>{{ loanInfoTwo.schoolFeePayBank }}</span></div>
          <!--<div><span>Tingkat Pendidikan:</span><span>{{ loanInfoTwo.education }}</span></div>-->
          <div><span>Nomor Rekening Bank Sekolah:</span><span>{{ loanInfoTwo.schoolFeePayBankNo }}</span></div>
          <div><span>Deskripsi Biaya Sekolah:</span><span>{{ loanInfoTwo.schoolFeePayDetail }}</span></div>
          <!--<div><span>Lama Bekerja (Tahun):</span><span>{{ loanInfoTwo.workTime }}</span></div>
          <div><span>Penghasilan Lainnya:</span><span>{{ loanInfoTwo.otherSalaryFrom }}</span></div>-->
        </el-col>
      </div>
    </el-row>
    <div class="divid-line"></div>

    <el-row>
      <h1 class="one-title">Langkah Ketiga</h1>
      <div style="clear:both;">
        <el-col :span="12" class="grid-content">
          <div><span>Nama Penjamin:</span><span>{{ loanInfoThree.userName}}</span></div>
          <div><span>Nomor Id Penjamin:</span><span>{{ loanInfoThree.idCardNo }}</span></div>
          <div><span>Hubungan dengan Penjamin:</span><span>{{ loanInfoThree.relationship }}</span></div>
          <div><span>NPWP Penjamin:</span><span>{{ loanInfoThree.taxCardNo }}</span></div>
          <div><span>Email Penjamin:</span><span>{{ loanInfoThree.email }}</span></div>
          <div><span>Alamat Penjamin:</span><span>{{ loanInfoThree.idAddressRo.province + ' ' + loanInfoThree.idAddressRo.city + ' ' +
            loanInfoThree.idAddressRo.bigDirect  + ' ' + loanInfoThree.idAddressRo.smallDirect + ' ' + loanInfoThree.idAddressRo.detailed  }}</span></div>
          <div><span>Alamat Penjamin saat ini:</span><span>{{ loanInfoThree.liveAddressRo.province + ' ' + loanInfoThree.liveAddressRo.city + ' ' +
            loanInfoThree.liveAddressRo.bigDirect  + ' ' + loanInfoThree.liveAddressRo.smallDirect + ' ' + loanInfoThree.liveAddressRo.detailed  }}</span></div>
        </el-col>

        <el-col :span="12" class="grid-content">
          <div><span>Nomor Ponsel:</span><span>{{ loanInfoThree.mobileNumber }}</span></div>
          <div><span>Nama Perusahaan Penhamin:</span><span>{{ loanInfoThree.companyName }}</span></div>
          <div><span>Nomor Telepon Perusahaan Penjamin:</span><span>{{ loanInfoThree.companyMobile }}</span></div>
          <div><span>Posisi Penjamin:</span><span>{{ loanInfoThree.position }}</span></div>
          <div><span>Penghasilan Bulanan Penjamin:</span><span>{{ loanInfoThree.income }}</span></div>
          <div><span>Apakah Penhamin Nasabah Doit:</span><span>{{ doitLoanResult(loanInfoThree.doitLoan) }}</span></div>
          <!--<div><span>Pendidikan:</span><span>{{ loanInfoThree.education }}</span></div>-->
          <!--<div><span>Nomor Rekening Sekolah:</span><span>{{ loanInfoThree.schoolFeePayBankNo }}</span></div>
          <div><span>Tujuan Pembayaran Uang Sekolah:</span><span>{{ loanInfoThree.schoolFeePayDetail }}</span></div>-->
          <div><span>Alamat Perusahaan Penjamin:</span><span>{{ loanInfoThree.liveCompanyAddressRo.province + ' ' + loanInfoThree.liveCompanyAddressRo.city + ' ' +
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
                  <span class="yituInfo">Foto Kartu Id</span>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8" :offset="3">
              <el-card :body-style="{ padding: '0px' }">
                <!--<ml-photo-box ref='photoBox'></ml-photo-box>-->
                <div style="padding: 14px;">
                  <img :src="loanInfoThree.payDetailUrl" class="imgCss" @click.stop="checkPayDetailUrl">
                  <span class="yituInfo">Slip Gaji</span>
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
                  <span class="yituInfo">Foto Pernyataan Penjamin</span>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8" :offset="3">
              <el-card :body-style="{ padding: '0px' }">
                <!--<ml-photo-box ref='photoBox'></ml-photo-box>-->
                <div style="padding: 14px;">
                  <img :src="loanInfoThree.aggrementInHandUrl" class="imgCss" @click.stop="checkAggrementInHandUrl">
                  <span class="yituInfo">Swafoto Penjamin dengan Surat Peryataan</span>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-row>
      </div>

    <div class="divid-line"></div>

    <div>
      <el-row>
        <h1 class="one-title">Langkah Keempat</h1>
        <div style="clear:both;">
          <el-col :span="12" class="grid-content">
            <div><span>Nama:</span><span>{{ loanInfoFour.username}}</span></div>
            <div><span>Hubungan dengan Peminjam:</span><span>{{ loanInfoFour.relationship }}</span></div>
          </el-col>

          <el-col :span="12" class="grid-content">
            <div><span>Nomor Ponsel:</span><span>{{ loanInfoFour.mobileNumber }}</span></div>
          </el-col>
        </div>
      </el-row>

    </div>

    <!--<div>
      <el-row>
        <el-button type="primary" @click="passOrder" :loading="passOrderLoading">Lolos</el-button>
        <el-button type="" @click="dialogTableVisible = true" >Tolak</el-button>
      </el-row>
    </div>-->

    <el-dialog title="Alasan Penolakan" :visible.sync="dialogTableVisible">
      <el-form :model="editForm" label-position="left" label-width="100px" :rules="editFormRule" ref="editForm">
        <el-form-item label="" prop="reason">
          <el-input v-model="editForm.reason" type="textarea" auto-complete="off" :maxlength="210"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">Batal</el-button>
        <el-button type="primary" @click="refuseOrder" :loading="refuseOrderLoading">Simpan</el-button>
      </div>
    </el-dialog>

    <!-- Picture Preview -->
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
              reason:[{required:true, message:'Silakan masukkan alasan penolakan',trigger: 'blur'}]
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
            result = 'Ada';
          }else {
            result = 'Tidak Ada'
          }
          return result;
        },
        doitLoanResult(type){
          let result = '';
          if(type == 1){
            result = 'Ada';
          }else {
            result = 'Tidak Ada'
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

  /* Title */
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
  /*Loan Information*/
  .loanDetail{
    margin: 0 30px 15px;
    width: 94%;
    max-height:250px;
  }
  /*Identify by Image*/
  .yituInfo{
    display: block;
    text-align: center;
    margin-top: 10px;
  }
  /*Credit*/
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
// src/pages/student/StudentLoanDetail.vue