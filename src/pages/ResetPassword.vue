/**
* Created by alan on 17-5-1.
*/
<template>
  <section>
    <div class="bg">
      <el-form
        :model="resetForm"
        ref="resetForm"
        label-position="left"
        label-width="0px"
        class="login_form"
        :rules="resetRule"
      >
        <h3 class="login_logo"></h3>

        <el-form-item prop="oldPassword">
          <el-input
            type="password"
            v-model="resetForm.oldPassword"
            auto-complete="off"
            placeholder="Password Lama"
            @keyup.enter.native="submit"
          ></el-input>
        </el-form-item>
        <el-form-item prop="newPassword">
          <el-input
            type="password"
            v-model="resetForm.newPassword"
            auto-complete="off"
            placeholder="Password Baru"
            @keyup.enter.native="submit"
          ></el-input>
        </el-form-item>
        <el-form-item prop="newPasswordConfirm">
          <el-input
            type="password"
            v-model="resetForm.newPasswordConfirm"
            auto-complete="off"
            placeholder="Konfirm Password Baru"
            @keyup.enter.native="submit"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" style="width:100%" :loading="logining" @click="submit">Masuk</el-button>
        </el-form-item>
      </el-form>
      <!--<ml-change-password ref="changePassword" changeType="1" :username="resetForm.username"></ml-change-password>-->
    </div>
  </section>
</template>
<script>
import DataUtil from "../common/dataUtil";
//import mlChangePassword from '../components/_changePassword.vue'
export default {
  data() {
    return {
      resetForm: {
        password: "",
        newPassword: "",
        newPasswordConfirm: ""
      },
      resetRule: {
        oldPassword: [
          { required: true, message: "" },
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback("Old Password Wajib diisi");
              } else {
                  callback();
                
              }
            },
            trigger: ["change", "blur"]
          }
        ],
        newPassword: [
          { required: true, message: "" },
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback("Password Baru wajib diisi");
              } else {
                var uniquePass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/.test(
                  value
                );
                if (!uniquePass) {
                  return callback(
                    "Password mengandung 8-15 karakter, terdiri huruf besar & kecil, dan digit"
                  );
                } else {
                  callback();
                }
              }
            },
            trigger: ["change", "blur"]
          }
        ],
        newPasswordConfirm: [
          { required: true, message: "" },
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback("Konfirmasi Password Wajib diisi");
              } else {
                if (value != this.resetForm.newPassword) {
                  return callback(
                    "Konfirmasi New Password harus sama dengan New Password"
                  );
                } else {
                  callback();
                }
              }
            },
            trigger: ["change", "blur"]
          }
        ]
      },
      logining: false
    };
  },
  methods: {
    submit() {
      this.logining=true
      this.$refs.resetForm.validate(valid => {
        
        if (!valid) {
           this.logining=false
          for (let i in this.resetForm) {
            var uniquePass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/.test(
              this.resetForm[i]
            );
            if (i == "oldPassword"||i == "newPassword") {
              if (!this.resetForm[i]) {
                this.$message.warning(`${i}  wajib diisi`);
                return;
              } else if (!uniquePass) {
                this.$message.warning(
                  "Password mengandung 8-15 karakter, terdiri huruf besar & kecil, dan digit"
                );
                return;
              }
            } else if (i == "newPasswordConfirm") {
              if (!this.resetForm[i]) {
                this.$message.warning(`${i}  wajib diisi`);
                return;
              } else if (this.resetForm[i] !== this.resetForm.newPassword) {
                this.$message.warning(
                  "Konfirmasi New Password harus sama dengan New Password"
                );
                return;
              }
            }
          }
        } else {
          let _data = {
            oldPassword: this.resetForm.oldPassword,
            newPassword: this.resetForm.newPassword
          };
           this.$http.post("api-system/system/editSysUserPassword", _data).then(
            response => {
              let { data } = response;
              this.logining = false;
              if (0 == data.code) {
                this.$router.push("/login");
                this.$message('Reset Password berhasil');
              } else if (10211 == data.code) {
                this.resetForm.password = "";
              } else {
                this.$message.error(data.message);
              }
            },
            response => {
              this.logining = false;
            }
          );
        }
         
      });
    }
    // pageInit() {
    // if (DataUtil.account()) {
    //   this.resetForm.username = DataUtil.account();
    // }
    // }
  },
  mounted() {
   
  },
  components: {
    //mlChangePassword
  }
};
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
  box-shadow: rgba(0, 0, 0, 0.117647) 0px 2px 4px 0px,
    rgba(0, 0, 0, 0.0392157) 0px 0px 6px 0px;
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
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: url("../assets/img/bg.png");
  background-repeat: no-repeat;
  overflow: hidden;
}
</style>

// WEBPACK FOOTER //
// src/pages/Login.vue