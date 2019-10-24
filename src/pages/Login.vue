/**
* Created by alan on 17-5-1.
*/
<template>
  <section>
    <div class="bg">
      <el-form :model="loginForm" :rules="loginRule" ref="loginForm" label-position="left" label-width="0px" class="login_form">
        <h3 class="login_logo"></h3>
        <!-- <strong class="login_title">Lender Control</strong> -->
        <el-form-item prop="username">
          <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="Nama Akun" @keyup.enter.native="submit"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="Kata Sandi" @keyup.enter.native="submit"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked" checked>Ingat Nama Pengguna</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" :loading="logining" @click="submit">Masuk</el-button>
        </el-form-item>
      </el-form>
      <!--<ml-change-password ref="changePassword" changeType="1" :username="loginForm.username"></ml-change-password>-->
    </div>
  </section>
</template>
<script>
  import DataUtil from '../common/dataUtil'
  //import mlChangePassword from '../components/_changePassword.vue'
  export default {
    data() {
      return {
        loginForm: {
          username: '',
          password: ''
        },
        loginRule: {
          username: [{
            required: true,
            message: 'Masukan Nama Akun',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: 'Masukan Kata Sandi',
            trigger: 'blur'
          }]
        },
        checked: true,
        logining: false
      };
    },
    methods: {
      submit() {
        this.$refs.loginForm.validate((valid) => {
          if (valid && !this.logining) {
            let _data = {
              username: this.loginForm.username,
              password: this.loginForm.password
            }
            this.logining = true
            this.$http.post('api-system/system/userLogin', _data).then(response => {
              let {data} = response
              this.logining = false
              if (0 == data.code && data.data) {
                DataUtil.sid(data.data.sessionId)
                DataUtil.id(data.data.userId)
                DataUtil.uuid(data.data.userId)
                DataUtil.userName(data.data.username)
                if (this.checked) {
                  DataUtil.account(data.data.username)
                } else {
                  DataUtil.account('')
                }
                this.$router.push('/home')
              } else if (10211 == data.code) {
                this.loginForm.password = ''
                //this.$refs['changePassword'].show()
              } else {
                this.$message.error(data.message)
              }
            }, response => {
              this.logining = false
            })
          } else {
            return false;
          }
        });
      },
      pageInit() {
        if (DataUtil.account()) {
          this.loginForm.username = DataUtil.account()
        }
      }
    },
    mounted: function () {
      this.pageInit()
    },
    components: {
      //mlChangePassword
    }
  }

</script>
<style scoped>
  .login_form {
    width: 360px;
    margin: 10% auto;
    padding: 20px;
    border-top: 0;
    background: #fff;
    color: #666;
    border-radius: 2px;
    box-shadow: rgba(0, 0, 0, 0.117647) 0px 2px 4px 0px, rgba(0, 0, 0, 0.0392157) 0px 0px 6px 0px;
  }

  .login_logo {
    width: 100%;
    height: 50px;
    margin: 10px auto 20px auto;
    background: url("../assets/img/logodoit.png") center no-repeat;
    background-size: contain;
  }
  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url("../assets/img/bg.png");
    background-repeat: no-repeat;
    background-size: 100%, 100%;
    overflow: hidden;
   }
</style>



// WEBPACK FOOTER //
// src/pages/Login.vue