<template>
  <section>
    <el-row>
      <h1 class="one-title">Informasi Pengguna</h1>
      <div style="clear:both;">
        <el-col :span="8" class="grid-content">
          <div><span>Nomor Ponsel:</span><span>{{ authData.mobileNumber }}</span></div>
          <div><span>Nama:</span><span>{{ authData.realName}}</span></div>
          <div><span>Nomor Id:</span><span>{{ authData.idCardNo }}</span></div>
          <div><span>Agama:</span><span>{{ authData.religion }}</span></div>
          <div><span>NPWP:</span><span>{{ authData.npwpNo }}</span></div>
          <div><span>Tempat Lahir:</span><span>{{ authData.birthAddressRo.birthProvince + ' ' + authData.birthAddressRo.birthCity + ' ' +
            authData.birthAddressRo.birthBigDirect  + ' ' + authData.birthAddressRo.birthSmallDirect + ' ' + authData.birthAddressRo.birthDetailed  }}</span></div>
        </el-col>
        <el-col :span="8" class="grid-content">
          <div><span>Tanggal Lahir:</span><span>{{ authData.birthDate }}</span></div>
          <div><span>Usia:</span><span>{{ authData.age }}</span></div>
          <div><span>Jenis Kelamin:</span><span>{{ authData.sex }}</span></div>
          <div><span>Penghasilan Tahunan:</span><span>{{ authData.yearSalary }}</span></div>
          <div><span>Domisili Pajak Indonesia:</span><span>{{ authData.salaryHomeValue }}</span></div>
          <div><span>Alamat Tempat Tinggal:</span><span>{{ authData.liveAddressRo.liveProvince + ' ' + authData.liveAddressRo.liveCity + ' '+
            authData.liveAddressRo.liveBigDirect+ ' ' + authData.liveAddressRo.liveSmallDirect + ' ' + authData.liveAddressRo.liveDetailed  }}</span></div>
        </el-col>
        <el-col :span="6" class="grid-content">
          <div><span>Tingkat Pendidikan:</span><span>{{ authData.education }}</span></div>
          <div><span>Pekerjaan:</span><span>{{ authData.job }}</span></div>
          <div><span>Industri:</span><span>{{ authData.workField }}</span></div>
          <div><span>Lama Bekerja (Tahun):</span><span>{{ authData.workTime }}</span></div>
          <div><span>Penghasilan Lainnya:</span><span>{{ authData.otherSalaryFrom }}</span></div>
        </el-col>
      </div>
    </el-row>

    <div>
      <el-row style="margin-bottom: 20px;">
        <el-col :span="8">
          <el-card :body-style="{ padding: '0px' }">
            <ml-photo-box refs='photoBox'></ml-photo-box>
            <div style="padding: 14px;">
              <img :src="idCardImage" class="imgCss" @click.stop="checkIdCardUrl">
              <span class="yituInfo">Foto Kartu Id</span>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-row>
        <el-button type="primary" @click="operate">Opsi</el-button>
      </el-row>
    </div>

    <el-dialog title="Ubah" :visible.sync="dialogTableVisible" width='35%'>
      <el-form :model="editForm" label-position="left" label-width="140px" ref="editForm">
        <el-form-item label="Hasil Pengolahan">
          <el-select v-model="editForm.pass" clearable @change="handleChange">
            <el-option v-for="item in passList" :key="item.code" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Alasan Kegagalan" v-if="showFailReason">
          <el-select v-model="editForm.cause" clearable>
            <el-option v-for="item in authStatusList" :key="item.id" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Catatan" prop="remark">
          <el-input v-model="editForm.remark " type="textarea" auto-complete="off" :maxlength="210"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">Batal</el-button>
        <el-button type="primary" @click="refuseOrder" :loading="refuseOrderLoading">Ubah</el-button>
      </div>
    </el-dialog>

    <!-- Picture Preview -->
    <el-dialog :visible.sync="dialogVisible" size="full" class="photo_box">
      <img width="95%" :src="idCardImage" alt="" style="margin-left: 2.5%;">
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
        authData:{birthAddressRo:{birthProvince:'',birthCity:'',birthBigDirect:'',birthSmallDirect:'',birthDetailed:''},
              liveAddressRo:{liveProvince:'',liveCity:'',liveBigDirect:'',liveSmallDirect:'',liveDetailed:''}},
        uuid:'',
        dialogTableVisible:false,
        passList:[{
          code:'0',
          name:'Berhasil'
        },{
          code:'1',
          name:'Gagal'
        }],
        authStatusList:[{
          code:'1',
          name:'Nama Salah'
        },{
          code:'2',
          name:'Nomor Id Salah'
        },{
          code:'3',
          name:'Foto tidak jelas'
        }],
        editForm:{
          pass:'',
          cause:"",
          remark:'',
        },
        showFailReason:false,
        refuseOrderLoading:false,
        dialogVisible:false,
        idCardImage:'',
        dialogImageUrl:''
      }
    },
      methods:{
        checkIdCardUrl(){
          this.picturePreview(this.idCardImage);
        },
        operate(){
          this.dialogTableVisible = true;
        },
        handleChange(e){
          if(e=='0'){
            this.showFailReason = false;
          }else{
            this.showFailReason = true;
          }
        },
        refuseOrder(){
          
          if(!this.editForm.pass){
            this.$message({type:'warning',message:'Silakan masukkan hasil pemrosesan'});
            return;
          }else if(this.editForm.pass=='1' && !this.editForm.cause){
            this.$message({type:'warning',message:'Silakan masukkan alasan penolakan'});
            return;
          }
          let _data = Object.assign({}, this.editForm);
          _data.userUuid = this.uuid;
          this.$http.post('api-user/user/checkUserAuthStatus',_data).then(response =>{
            let {data} = response;
            if(data.code == 0){
              this.$message.info('Berhasil menolak permohonan');
              setTimeout(function(){window.close()},1000);
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
            this.idCardImage = Config.imageUrl + data.data.idCardImage;
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
// src/pages/user/UserAuthFailDetail.vue