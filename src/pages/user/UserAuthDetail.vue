<template>
  <section>
    <el-row>
      <h1 class="one-title" style="float: left;">Informasi Pelanggan</h1>

      <div style="clear:both;">
        <el-col :span="5" class="grid-content">
          <div><span>Nomor Ponsel:</span><span>{{ authData.mobileNumber }}</span></div>
          <div><span>Nama:</span><span>{{ authData.realName}}</span></div>
          <div><span>Nomor Id:</span><span>{{ authData.idCardNo }}</span></div>
          <div><span>Agama:</span><span>{{ authData.religion }}</span></div>
          <div><span>NPWP:</span><span>{{ authData.npwpNo }}</span></div>
          <div><span>Tempat Lahir:</span><span>{{ authData.birthAddressRo.birthProvince + ' ' + authData.birthAddressRo.birthCity + ' ' +
            authData.birthAddressRo.birthBigDirect  + ' ' + authData.birthAddressRo.birthSmallDirect + ' ' + authData.birthAddressRo.birthDetailed  }}</span></div>
        </el-col>
        <el-col :span="7" class="grid-content">
          <div><span>Tanggal Lahir:</span><span>{{ authData.birthDate }}</span></div>
          <div><span>Usia:</span><span>{{ authData.age }}</span></div>
          <div><span>Jenis Kelamin:</span><span>{{ authData.sex }}</span></div>
          <div><span>Penghasilan Tahunan:</span><span>{{ authData.yearSalary }}</span></div>
          <div><span>Domisili Pajak Indonesia:</span><span>{{ authData.salaryHomeValue }}</span></div>
          <div><span>Alamat Tempat Tinggal:</span><span>{{ authData.liveAddressRo.liveProvince + ' ' + authData.liveAddressRo.liveCity + ' '+
            authData.liveAddressRo.liveBigDirect+ ' ' + authData.liveAddressRo.liveSmallDirect + ' ' + authData.liveAddressRo.liveDetailed  }}</span></div>
        </el-col>
        <el-col :span="12" class="grid-content">
          <div><span>Tingkat Pendidikan:</span><span>{{ authData.education }}</span></div>
          <div><span>Pekerjaan:</span><span>{{ authData.job }}</span></div>
          <div><span>Industri:</span><span>{{ authData.workField }}</span></div>
          <div><span>Lama Bekerja (Tahun):</span><span>{{ authData.workTime }}</span></div>
          <div><span>Penghasilan Lainnya:</span><span>{{ authData.otherSalaryFrom }}</span></div>
        </el-col>
      </div>

    </el-row>

    <el-row>
      <el-button type="primary" size="small" @click="changeStatus(0)">Lolos</el-button>
      <el-button size="small" @click="changeStatus(1)">Tidak Lolos</el-button>
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