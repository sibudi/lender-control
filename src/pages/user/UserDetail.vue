
<template>
  <div class="form_con">
    <div class="form_tit">
      Informasi Identitas
      <div v-if="!formEditProfile" class="edit_label" @click="doEditProfileToggle('edit')">Edit</div>
      <div v-else class="cancel_label" @click="doEditProfileToggle('cancel')">Cancel</div>
    </div>
    <div class="form_body">
      <el-form ref="detail" :model="detail" label-width="200px" class="form_main">
        <el-form-item
          label="Nama Lengkap"
          prop="realName"
          :rules="[{ required: true, message: 'Nama lengkap'}]"
        >
          <el-input
            :disabled="!formEditProfile"
            v-model="detail.realName"
            maxlength="32"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="Nama Perusahaan">
          <el-input
            :disabled="!formEditProfile"
            v-model="detail.companyName"
            maxlength="32"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="Nomor Identitas"
          prop="idCardNo"
          :rules="[{ required: true, message: '',min:16,max:16,message:'Kartu Identitas Tidak Valid'}]"
        >
          <el-input :disabled="!formEditProfile" v-model="detail.idCardNo" maxlength="16"></el-input>
        </el-form-item>

        <el-form-item
          label="Tempat Lahir"
          prop="birthAddressRo"
          :rules="[{ required: true, message: ''}]"
        >
          <el-cascader
            :disabled="!formEditProfile"
            :options="birthAddressOptions"
            v-model="detail.birthAddressRo"
            class="form_item_wd form_select"
            @active-item-change="getBirthAddressList"
          ></el-cascader>
        </el-form-item>

        <!-- 出生日期		 -->
        <el-form-item
          label="Tanggal Lahir"
          prop="birthDate"
          :rules="[
					{
						validator: (rule, value, callback) => {
					if (!value) {
						return callback('Tanggal Lahir wajib diisi');
					} else{
						var _date = value.split('-')
						var _dob = new Date (_date[0],_date[1]-1,_date[2]);
						var diff_ms = Date.now() - _dob.getTime();
						var age_dt = new Date(diff_ms).getUTCFullYear() - 1970; 
						this.detail.age = age_dt
						if(age_dt<17)
						{
							return callback('Harus berusia diatas 17 tahun');
						} else{
							callback()
						}
					}
				}, trigger: 'change' }]"
        >
          <el-date-picker
            :disabled="!formEditProfile"
            v-model="detail.birthDate"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            class="form_item_wd form_select"
          ></el-date-picker>
        </el-form-item>
        <!-- 年龄 -->
        <el-form-item
          label="Umur"
          prop="age"
          :rules="[{ required: true, message: ''}, 
					{
						validator: (rule, value, callback) => {
					if (!value) {
						return callback('Age is required');
					} else if  (value < 17) {
							callback('Harus berusia diatas 17 tahun');
						} else {
							callback();
						}
				}, trigger: 'blur' }]"
        >
          <el-input disabled v-model="detail.age" maxlength="3"></el-input>
        </el-form-item>
        <!-- 性别-->
        <el-form-item label="Jenis Kelamin" prop="sex" :rules="[{ required: true, message: ''}]">
          <el-select
            v-model="detail.sex"
            class="form_item_wd form_select"
            :disabled="!formEditProfile"
          >
            <el-option
              v-for="item in sexList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 受教育程度 -->

        <el-form-item label="Pendidikan" prop="education" :rules="[{ required: true, message: ''}]">
          <el-select
            v-model="detail.education"
            class="form_item_wd form_select"
            :disabled="!formEditProfile"
          >
            <el-option
              v-for="item in authenticationLists['_education']"
              :key="item.value"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Pekerjaan" prop="job" :rules="[{ required: true, message: ''}]">
          <el-select
            v-model="detail.job"
            class="form_item_wd form_select"
            :disabled="!formEditProfile"
          >
            <el-option
              v-for="item in authenticationLists['_position']"
              :key="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Industri" prop="workField" :rules="[{ required: true, message: ''}]">
          <el-select
            v-model="detail.workField"
            class="form_item_wd form_select"
            :disabled="!formEditProfile"
          >
            <el-option
              v-for="item in authenticationLists['_industry']"
              :key="item.value"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Alamat" prop="liveAddressRo" :rules="[{ required: true, message: ''}]">
          <el-cascader
            :options="livingAddressOptions"
            v-model="detail.liveAddressRo"
            class="form_item_wd form_select"
            :disabled="!formEditProfile"
            @active-item-change="getLiveAddressList"
          ></el-cascader>
        </el-form-item>
        <!-- 详细地址 -->
        <el-form-item
          label="Alamat Rinci"
          prop="liveDetailed"
          :rules="[{ required: true, message: ''}]"
        >
          <el-input :disabled="!formEditProfile" v-model="detail.liveDetailed" maxlength="50"></el-input>
        </el-form-item>
        <!-- 宗教 -->
        <el-form-item label="Agama" prop="religion" :rules="[{ required: true, message: ''}]">
          <el-select
            v-model="detail.religion"
            class="form_item_wd form_select"
            :disabled="!formEditProfile"
          >
            <el-option
              v-for="item in authenticationLists['_religion']"
              :key="item.value"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- npwpNo -->
        <el-form-item
          label="No. NPWP"
          prop="npwpNo"
          :rules="[{ required: true, message: ''},{min:15,max:15,message:'NPWP Tidak Valid'}]"
        >
          <el-input :disabled="!formEditProfile" v-model="detail.npwpNo" maxlength="15"></el-input>
        </el-form-item>
        <!-- 年收入 -->

        <el-form-item
          label="Pendapatan Tahunan"
          prop="yearSalary"
          :rules="[{ required: true, message: ''}]"
        >
          <el-select
            v-model="detail.yearSalary"
            class="form_item_wd form_select"
            :disabled="!formEditProfile"
          >
            <el-option v-for="item in yearMoney" :key="item.value" :value="item.label"></el-option>
          </el-select>
        </el-form-item>
        <!-- 税务所登记 -->
        <!-- <el-form-item label=""  prop="salaryHomeValue" 
				:rules="[	{
						validator: (rule, value, callback) => {
					if (!value) {
						return callback('Wajib diisi');
					}	else {
							callback();
						}
				}, trigger: ['blur','change'] }]"
				 style="text-align:left;">
					<el-switch	class="switchStyle"	v-model="detail.salaryHomeValue"	:active-value="1" :inactive-value="0" active-color="#2AD2C8" 	inactive-color="#eee"></el-switch>
					Domisili pajak Indonesia
        </el-form-item>-->
        <el-form-item label="Asuransi" prop="isinsurance" style="text-align:left;">
          <el-switch
            :disabled="!formEditProfile"
            class="switchStyle"
            v-model="detail.isinsurance"
            :active-value="1"
            :inactive-value="0"
            active-color="#2AD2C8"
            inactive-color="#eee"
          >Asuransi</el-switch>Asuransi
        </el-form-item>

        <el-form-item
          label="Lama Bekerja"
          prop="workTime"
          :rules="[{ required: true, message: ''}]"
        >
          <el-select
            v-model="detail.workTime"
            class="form_item_wd form_select"
            :disabled="!formEditProfile"
          >
            <el-option v-for="item in workFieldList" :key="item.value" :value="item.label"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="Sumber Aset Lainnya"
          prop="otherSalaryFrom"
          :rules="[{ required: true, message: ''}]"
        >
          <el-checkbox-group
            text-color="#b44029"
            fill="#b44029"
            v-model="detail.otherSalaryFrom"
            style="text-align:left;"
            :disabled="!formEditProfile"
          >
            <el-checkbox label="Dari warisan" name="otherSalaryFrom"></el-checkbox>
            <el-checkbox label="Dari hadiah" name="otherSalaryFrom"></el-checkbox>
            <el-checkbox label="Dari aset" name="otherSalaryFrom"></el-checkbox>
            <el-checkbox label="Lain-lain" name="otherSalaryFrom"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item
          label="Foto KTP"
          prop="idCardImage"
          :rules="[
						{
						validator: (rule, value, callback) => {
							if (!this.detail.idCardImage) {
								 callback('wajib isi UP');
							}	else {
									callback();
							}
						}, 
						trigger: ['blur','change'] 
					}
					]"
        >
          <img
            v-bind:src="process.env.SHOW_IMAGE+'?path='+detail.idCardImage+'&sessionId='+sessionId"
            style="max-width:350px;height:auto;"
          />
          <div class="uploadImg" style="text-align:left;">
            <el-upload
              :action="URL_UPLOAD_KTP"
              :limit="1"
              :data="upload_ktp"
              :on-success="handleAvatarSuccess"
              :on-preview="handlePictureCardPreview"
              :show-file-list="false"
              :disabled="!formEditProfile"
            >
              <el-button size="small" type="primary" :disabled="!formEditProfile">
                <i class="el-icon-upload"></i>Unggah file
              </el-button>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item
          label="Surat Kuasa"
          prop="suratKuasaImage"
          :rules="[
							{
							validator: (rule, value, callback) => {
								if (!this.detail.suratKuasaImage) {
										callback('wajib isi UP');
								}	else {
										callback();
								}
							}, 
							trigger: ['blur','change'] 
						}
						]"
        >
          <a
            :href="process.env.DOWNLOAD_ATTACHMENT+'?path='+detail.suratKuasaImage+'&sessionId='+sessionId"
            target="_blank"
          >
            {{detail.suratKuasaImage?
            detail.suratKuasaImage.split('/')[detail.suratKuasaImage.split('/').length-1]
            :''}}
          </a>
          <div class="uploadImg" style="text-align:left;">
            <el-upload
              accept=".doc, .docx, application/pdf"
              :action="URL_UPLOAD_SK"
              :limit="1"
              :data="upload_sk"
              :on-success="handleAvatarSuccess2"
              :on-preview="handlePictureCardPreview2"
              :show-file-list="false"
            >
              <el-button size="small" type="primary" :disabled="!formEditProfile">
                <i class="el-icon-upload"></i>Unggah file
              </el-button>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item v-if="formEditProfile">
          <el-button type="primary" @click="onSubmit" class="form_sub_btn">Save</el-button>
          <el-button
            type="danger"
            @click="doEditProfileToggle('cancel')"
            class="form_sub_btn"
          >Cancel</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="form_tit">
      Informasi Bank
      <div v-if="!formEditBank" class="edit_label" @click="doEditBankToggle('edit')">Edit</div>
      <div v-else class="cancel_label" @click="doEditBankToggle('cancel')">Cancel</div>
    </div>
    <div class="form_body">
      <el-form ref="bankDetail" :model="bankDetail" label-width="200px" class="form_main">
        <el-form-item
          label="Kartu Bank"
          prop="bankName"
          :rules="[{ required: true, message: 'Kartu Bank wajib di isi'}]"
        >
          <el-select
            v-model="bankDetail.bankName"
            class="form_item_wd form_select"
            :disabled="!formEditBank"
          >
            <el-option v-for="item in bankList" :key="item.bankCode" :value="item.bankCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="Nomor Rekening"
          prop="bankCardNo"
          :rules="[{ required: true, message: 'Nomro Rekening Wajib diisi'}]"
        >
          <el-input
            :disabled="!formEditBank"
            v-model="bankDetail.bankCardNo"
            maxlength="32"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="formEditBank">
          <el-button type="primary" @click="onSubmitBank" class="form_sub_btn">Save</el-button>
          <el-button type="danger" @click="doEditBankToggle('cancel')" class="form_sub_btn">Cancel</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="form_tit">Action</div>
    <div class="form_body">
      <el-row>
        <el-col :span="24">
          <div class="grid-content">
            <div v-if="detail.authStatus==1 || detail.authStatus == 5 ">
              <el-button type="primary" size="small" @click="activate">Aktif</el-button>
            </div>
            <div v-else>
              <el-button type="danger" size="small" @click="deactivate">Non Aktif</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-dialog
        title="Activate User"
        :visible.sync="activateDialogVisible"
        v-model="activateDialogVisible"
        :close-on-click-modal="false"
        size="small"
      >
        <!-- Apakah anda akan mengaktifkan user {{detail.realName}} dengan username {{detail.userName}} -->
        Pastikan Anda telah melakukan KYC dan melakukan kontak dengan lender ini sebelum mengaktifkan akun ini. Anda yakin?
        <div slot="footer" class="dialog-footer">
          <el-button @click="activateDialogVisible= false; ">Batal</el-button>
          <el-button
            type="primary"
            @click="activateDialogSubmit(detail.id)"
            :loading="activateDialogLoading"
          >Aktif</el-button>
        </div>
      </el-dialog>

      <el-dialog
        title="Deactivate User"
        :visible.sync="deactivateDialogVisible"
        v-model="deactivateDialogVisible"
        :close-on-click-modal="false"
        size="small"
      >
        Apakah Anda ingin menonaktifkan akun ini?
        <!-- Apakah anda akan mengaktifkan user {{detail.realName}} dengan username {{detail.userName}} -->
        <div slot="footer" class="dialog-footer">
          <el-button @click="deactivateDialogVisible= false; ">Batal</el-button>
          <el-button
            type="danger"
            @click="deactivateDialogSubmit(detail.id)"
            :loading="deactivateDialogLoading"
          >Non Aktif</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import DataUtil from "../../common/dataUtil";
// import Config from "../../common/config";
import authenticationLists from "../../assets/json/authenticationLists.json";
export default {
  data() {
    return {
      detail: { otherSalaryFrom: [] },
      prevDetail: { otherSalaryFrom: [] },
      bankDetail: {},
      prevBankDetail: {},
      //Grid
      gridLoading: false,
      gridData: [],
      pageIndex: 1,
      pageSize: 10,
      dataTotal: 0,
      status: 1,
      formEditProfile: false,
      formEditBank: false,
      upload_ktp: { fileType: "img", sessionId: "" },
      upload_sk: { fileType: "surat_kuasa", sessionId: "" },
      //Form
      activateDialog: {},
      deactivateDialog: {
        mobileNumber: "",
        amount: ""
      },
      bankList: [
        {
          id: 1,
          bankCode: "BCA" //银行code
        },
        {
          id: 2,
          bankCode: "BNI" //银行code
        },
        {
          id: 3,
          bankCode: "CIMB" //银行code
        }
      ],
      sexList: [
        {
          value: "1",
          label: "Laki-laki"
        },
        {
          value: "2",
          label: "Perempuan"
        }
      ],
      workFieldList: [
        {
          value: "0",
          label: "Kurang dari 1 tahun"
        },
        {
          value: "1",
          label: "1 tahun"
        },
        {
          value: "2",
          label: "2 tahun"
        },
        {
          value: "3",
          label: "3 tahun"
        },
        {
          value: "4",
          label: "4 tahun"
        },
        {
          value: "5",
          label: "5 tahun"
        },
        {
          value: "6",
          label: "6 tahun"
        },
        {
          value: "7",
          label: "7 tahun"
        },
        {
          value: "8",
          label: "Diatas 7 tahun"
        }
      ],
      yearMoney: [
        {
          value: "0",
          label: "Di bawah 100 juta"
        },
        {
          value: "1",
          label: "100-250 juta"
        },
        {
          value: "2",
          label: "251-500 juta"
        },
        {
          value: "3",
          label: "501 juta-2 miliar"
        },
        {
          value: "4",
          label: "2 miliar-10 miliar"
        },
        {
          value: "5",
          label: "Di atas 10miliar"
        }
      ],
      inputRule: {
        mobileNumber: [
          {
            required: true,
            message: "Masukan Nomor Ponsel",
            trigger: "blur"
          }
        ],
        amount: [
          {
            required: true,
            message: "Masukan nominal yang akan ditambahkan",
            trigger: "blur"
          }
        ],
        opcode: [
          {
            required: true,
            message: "Masukan Kata Sandi",
            trigger: "blur"
          }
        ]
      },
      authenticationLists: {},
      birthAddressOptions: [],
      livingAddressOptions: [],

      livingfatherArr: [],
      livingfatherCode: "",
      livingfatherIndex: [],

      fatherArr: [],
      fatherCode: "",
      fatherIndex: [],
      //Dialog
      activateDialogVisible: false,
      deactivateDialogVisible: false,
      ktpDialogVisible: false,
      ktpDialogUrl: "",
      skDialogVisible: false,
      skDialogUrl: "",
      editDialogVisible: false,
      activateDialogLoading: false,
      deactivateDialogLoading: false,
      editFormLoading: false,
      userId: this.$route.params.id,
      sessionId: DataUtil.sid()
    };
  },
  methods: {
    onSubmit() {
      this.$refs.detail.validate(valid => {
        if (!valid) {
          for (let i in this.detail) {
            if (
              this.detail[i] ||
              !this.detail.birthAddressRo[1] ||
              !this.detail.liveAddressRo[1] ||
              (i == "isInsurance" && !this.detail[i]) ||
              (i == "companyName" && !this.detail[i]) ||
              (i == "bankCardName" && !this.detail[i]) ||
              (i == "bankCardNo" && !this.detail[i]) ||
              (i == "bankName" && !this.detail[i])
            ) {
            } else {
              this.$message({
                type: "warning",
                message: `${i} tidak boleh kosong`
              });
              return;
            }
          }
          if (
            isNaN(this.detail.idCardNo.toString()) ||
            this.detail.idCardNo.toString().length < 16
          ) {
            this.$message({
              type: "error",
              message: "Kartu Identitas Tidak Valid"
            });
            return;
          }

          if (
            isNaN(this.detail.npwpNo.toString()) ||
            this.detail.npwpNo.toString().length < 15
          ) {
            this.$message({
              type: "error",
              message: "NPWP Tidak Valid"
            });
            return;
          }

          if (isNaN(this.detail.age.toString())) {
            this.$message({
              type: "error",
              message: "Umur Tidak Valid"
            });
            return;
          }
        } else {
          let _data = Object.assign({}, this.detail),
            birth = {},
            lives = {};
          _data.salaryHomeValue = 0;
          birth.birthProvince = _data.birthAddressRo[0];
          birth.birthCity = _data.birthAddressRo[1];
          lives.liveProvince = _data.liveAddressRo[0];
          lives.liveCity = _data.liveAddressRo[1];
          lives.liveDetailed = _data.liveDetailed;
          _data.liveAddressRo = lives;
          _data.birthAddressRo = birth;
          _data.mobileNumber = this.detail.mobileNumber;
          _data.otherSalaryFrom = _data.otherSalaryFrom.join(",");
          _data.userId = _data.id;
          _data.isInsurance = _data.isinsurance;
          this.$http
            .post("api-user/user/userAdvanceVerifyEditControl", _data)
            .then(re => {
              if (0 == re.data.code) {
                this.$message({
                  message: "Berhasil Mengedit Data",
                  type: "success"
                });
                this.formEditProfile = false;
                this.bindDetail();
              } else {
                this.$message.error(re.data.message);
              }
            })
            .catch(re => {
              console.log(re);
            });
          // /api-user/ersu / userAdvanceVerifyEdit;
          // this.fullscreenLoading = this.$loading({lock: true,text: 'Loading',spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'});
          // this.submitPerInfo(_data,_data1);
        }
      });
    },
    onSubmitBank() {
      this.$refs.bankDetail.validate(valid => {
        if (!valid) {
          for (let i in this.bankDetail) {
            if (!this.bankDetail[i]) {
              this.$message({
                type: "warning",
                message: `${i} tidak boleh kosong`
              });
              return;
            }
          }
          if (isNaN(this.bankDetail.bankCardNo.toString())) {
            this.$message({
              type: "error",
              message: "No Rekening Tidak Valid"
            });
            return;
          }
        } else {
          //bankName> bankCode
          //bankCardNo> bankNumberNo
          var _data = {};
          _data.bankCode = this.bankDetail.bankName;
          _data.bankNumberNo = this.bankDetail.bankCardNo;
          _data.bankHolderName = this.detail.realName;
          _data.payPwd =
            this.bankDetail && this.bankDetail.payPwd
              ? this.bankDetail.payPwd
              : "pp";
          _data.userId = this.detail.id;
          this.$http
            .post("/api-user/user/updateUserBankInfoControl", _data)
            .then(re => {
              if (re.data.code == 0) {
                this.$message({
                  message: "Berhasil Mengedit Data Bank",
                  type: "success"
                });
                this.formEditBank = false;
                this.bindDetail();
              } else if (re.data.code == 5027 || re.data.code == 5029) {
                this.$message.error(re.data.message);
              } else {
                this.$message.error(re.data.message);
              }
            })
            .catch(re => {
              console.log(re);
              setTimeout(() => {
                this.fullscreenLoading.close();
              }, 1000);
            });
        }
      });
    },
    handlePictureCardPreview(file) {
      this.ktpDialogUrl = file.url;
      this.ktpDialogVisible = true;
    },
    handleAvatarSuccess(response, file) {
      if (response.code == 0) {
        this.detail.idCardImage = response.data["filePath"];
      }
    },
    handlePictureCardPreview2(file) {
      this.skDialogUrl = file.url;
      this.skDialogVisible = true;
    },
    handleAvatarSuccess2(response, file) {
      if (response.code == 0) {
        this.detail.suratKuasaImage = response.data["filePath"];
      }
    },
    getLiveAddressList(e) {
      let _this = this;
      // _this.searchForm.liveAddressRo = ['', '']
      // 找到当前点击的code
      for (let x in _this.livingAddressOptions) {
        _this.livingAddressOptions[x].children = [];
      }

      for (let f in _this.livingfatherArr) {
        if (_this.livingfatherArr[f].value == e[0]) {
          _this.livingfatherCode = _this.livingfatherArr[f].values;
          _this.livingfatherIndex[0] = f;
        }
      }
      // 获取第二级list
      _this.getAddressList(3, _this.livingfatherCode).then(function(e) {
        for (let f in e) {
          e[f].children = "";
        }
        _this.livingAddressOptions[_this.livingfatherIndex[0]].children = e;
        // _this.livingfatherArr=e;
      });
      return;
    },
    getBirthAddressList(e) {
      let _this = this;
      // _this.searchForm.birthAddressRo = ['', '']
      for (let x in _this.birthAddressOptions) {
        _this.birthAddressOptions[x].children = [];
      }
      for (let f in _this.fatherArr) {
        if (_this.fatherArr[f].value == e[0]) {
          _this.fatherCode = _this.fatherArr[f].values;
          _this.fatherIndex[0] = f;
        }
      }
      // 获取第二级list
      _this.getAddressList(3, _this.fatherCode).then(function(e) {
        for (let f in e) {
          e[f].children = "";
        }
        _this.birthAddressOptions[_this.fatherIndex[0]].children = e;
      });
      return;
    },

    doEditBankToggle(params) {
      let _this = this;
      if (params == "cancel") {
        var tempData = JSON.stringify(this.prevBankDetail);
        this.bankDetail = JSON.parse(tempData);
      }

      this.formEditBank = !this.formEditBank;
    },
    doEditProfileToggle(params) {
      let _this = this;
      if (params == "cancel") {
        for (let x in _this.birthAddressOptions) {
          _this.birthAddressOptions[x].children = [];
        }
        for (let f in _this.fatherArr) {
          if (_this.fatherArr[f].value == this.prevDetail.birthProvince) {
            _this.fatherCode = _this.fatherArr[f].values;
            _this.fatherIndex[0] = f;
          }
        }
        _this.getAddressList(3, _this.fatherCode).then(function(e) {
          for (let f in e) {
            e[f].children = "";
          }
          _this.birthAddressOptions[_this.fatherIndex[0]].children = e;
        });

        for (let x in _this.livingAddressOptions) {
          _this.livingAddressOptions[x].children = [];
        }

        for (let f in _this.livingfatherArr) {
          if (_this.livingfatherArr[f].value == this.prevDetail.liveProvince) {
            _this.livingfatherCode = _this.livingfatherArr[f].values;
            _this.livingfatherIndex[0] = f;
          }
        }
        _this.getAddressList(3, _this.livingfatherCode).then(function(e) {
          for (let f in e) {
            e[f].children = "";
          }
          _this.livingAddressOptions[_this.livingfatherIndex[0]].children = e;
        });

        var tempData = JSON.stringify(this.prevDetail);
        this.detail = JSON.parse(tempData);
      }

      this.formEditProfile = !this.formEditProfile;
    },
    getUnixTime(time) {
      return DataUtil.formatUnixTime(time);
    },
    add(row) {
      this.addDialogVisible = true;
      this.$refs.addForm && this.$refs.addForm.resetFields();
    },
    activate(row) {
      this.activateDialogVisible = true;
    },
    deactivate(row) {
      this.deactivateDialogVisible = true;
    },
    topup(row) {
      this.editDialogVisible = true;
      this.editForm.userUuid = row.id;
      this.editForm.mobileNumber = row.mobileNumber;
      this.editForm.amount = row.amount;
    },
    pageSizeChange(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.bindDetail();
    },
    pageIndexChange(val) {
      this.pageIndex = val;
      this.bindDetail();
    },
    activateDialogSubmit(uuid) {
      this.activateDialogLoading = true;
      var _data = { userId: uuid };
      this.$http.post("api-user/user/activate", _data).then(
        response => {
          this.activateDialogLoading = false;
          if (0 == response.data.code) {
            this.activateDialogVisible = false;
            this.bindDetail();
            this.$message({
              message: "Berhasil Activate User",
              type: "success"
            });
          } else {
            this.$message.error(response.data.message);
          }
        },
        response => {}
      );
    },
    deactivateDialogSubmit(uuid) {
      this.deactivateDialogLoading = true;
      var _data = { userId: uuid };
      this.$http.post("api-user/user/deactivate", _data).then(
        response => {
          this.deactivateDialogLoading = false;
          if (0 == response.data.code) {
            this.deactivateDialogVisible = false;
            this.bindDetail();
            this.$message({
              message: "Berhasil Deactiavte User",
              type: "success"
            });
          } else {
            this.$message.error(response.data.message);
          }
        },
        response => {}
      );
      console.log(row);
    },
    addFormSubmit() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          let _data = Object.assign({}, this.addForm);

          this.addFormLoading = true;

          this.$http.post("api-user/users/addSuperInvestor", _data).then(
            response => {
              this.addFormLoading = false;
              if (0 == response.data.code) {
                this.addDialogVisible = false;
                this.bindDetail();
                this.$message({
                  message: "Berhasil menambah Pendana",
                  type: "success"
                });
              } else {
                this.$message.error(response.data.message);
              }
            },
            response => {}
          );
        } else {
          return false;
        }
      });
    },
    editFormSubmit() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          let _data = Object.assign({}, this.editForm);

          this.editFormLoading = true;

          this.$http.post("api-user/user/addUserCurrentBlance", _data).then(
            response => {
              this.editFormLoading = false;
              if (0 == response.data.code) {
                this.editDialogVisible = false;
                this.bindDetail();
                this.$message({
                  message: "Berhasil menambah saldo",
                  type: "success"
                });
              } else {
                this.$message.error(response.data.message);
              }
            },
            response => {}
          );
        } else {
          return false;
        }
      });
    },
    getAddressList(h, g) {
      let _this = this;
      var p = new Promise(function(resolve, reject) {
        _this.$http
          .post("/api-system/system/getSysDict", {
            distLevel: h,
            parentCode: g
          })
          .then(function(response) {
            let re = [],
              res = response.data.data;
            res.forEach(i => {
              let obj = {};
              obj["values"] = i.distCode;
              obj["value"] = i.distName;
              obj["label"] = i.distName;
              obj["children"] = [];
              re.push(obj);
            });
            resolve(re);
          })
          .catch(function(re) {
            console.log(re);
          });
      });
      return p;
    },
    changeRule(e) {
      let data = [];
      for (var i in e) {
        let a = {};
        a.value = e[i].id;
        a.label = e[i].dicItemName;
        a.children = {};
        data.push(a);
      }
      return data;
    },
    bindDetail() {
      this.gridLoading = true;
      // let _data = {};
      // _data.pageNo = this.pageIndex;
      // _data.pageSize = this.pageSize;
      // _data.userType = 3;
      this.URL_UPLOAD_KTP = process.env.UPLOAD_IMAGE;
      this.URL_UPLOAD_SK = process.env.UPLOAD_FILE;
      this.upload_ktp["sessionId"] = this.sessionId;
      this.upload_sk["sessionId"] = this.sessionId;

      for (let e in authenticationLists) {
        this.authenticationLists[e] = this.changeRule(authenticationLists[e]);
      }

      let _this = this;
      _this.getAddressList(2, 1).then(function(value) {
        var _temp = JSON.stringify(value);
        _this.fatherArr = JSON.parse(_temp);
        _this.livingfatherArr = JSON.parse(_temp);
        _this.birthAddressOptions = JSON.parse(_temp);
        _this.livingAddressOptions = JSON.parse(_temp);
      });
      this.$http
        .post("api-user/user/userBasicInfoView", {
          userId: this.userId
        })
        .then(
          response => {
            this.gridLoading = false;
            let { data } = response;
            if (0 == data.code) {
              var _tempData = JSON.parse(JSON.stringify(data.data));
              _tempData.birthAddressRo = [];
              _tempData.birthAddressRo.push(data.data.birthProvince);
              _tempData.birthAddressRo.push(data.data.birthCity);
              _tempData.liveAddressRo = [];
              _tempData.liveAddressRo.push(data.data.liveProvince);
              _tempData.liveAddressRo.push(data.data.liveCity);
              _tempData.otherSalaryFrom = [];
              _tempData.sex = data.data.sex.toString();
              data.data.otherSalaryFrom.includes(",")
                ? data.data.otherSalaryFrom.split(",").map((res, index) => {
                    _tempData.otherSalaryFrom.push(res);
                  })
                : _tempData.otherSalaryFrom.push(data.data.otherSalaryFrom);
              //cascader birth address
              for (let x in _this.birthAddressOptions) {
                _this.birthAddressOptions[x].children = [];
              }
              for (let f in _this.fatherArr) {
                if (_this.fatherArr[f].value == data.data.birthProvince) {
                  _this.fatherCode = _this.fatherArr[f].values;
                  _this.fatherIndex[0] = f;
                }
              }
              _this.getAddressList(3, _this.fatherCode).then(function(e) {
                for (let f in e) {
                  e[f].children = "";
                }
                _this.birthAddressOptions[_this.fatherIndex[0]].children = e;
              });
              // close cascader birthaddress
              //cascader liveaddress
              for (let x in _this.livingAddressOptions) {
                _this.livingAddressOptions[x].children = [];
              }

              for (let f in _this.livingfatherArr) {
                if (_this.livingfatherArr[f].value == data.data.liveProvince) {
                  _this.livingfatherCode = _this.livingfatherArr[f].values;
                  _this.livingfatherIndex[0] = f;
                }
              }
              _this.getAddressList(3, _this.livingfatherCode).then(function(e) {
                for (let f in e) {
                  e[f].children = "";
                }
                _this.livingAddressOptions[
                  _this.livingfatherIndex[0]
                ].children = e;
              });
              //close cascader liveaddress
              var _tempBankData = JSON.parse(JSON.stringify(_tempData));
              var _bankData = {};
              _bankData.bankName = _tempBankData.bankName;
              _bankData.bankCardNo = _tempBankData.bankCardNo;
              _bankData = JSON.stringify(_bankData);
              _tempData = JSON.stringify(_tempData);

              this.detail = JSON.parse(_tempData);
              this.prevDetail = JSON.parse(_tempData);
              this.bankDetail = JSON.parse(_bankData);
              this.prevBankDetail = JSON.parse(_bankData);
            } else {
              this.detail = data && data.data;
              this.$message.error(data.message);
            }
          },
          response => {
            this.gridLoading = false;
          }
        );
    }
  },
  created: function() {
    this.bindDetail();
  },
  updated() {
    // console.log(this.detail.sex)
    // console.log(this.detail);
    // console.log(this.detail.otherSalaryFrom)
    // console.log(this.fatherArr)
    // console.log(this.fatherCode)
    // console.log(this.fatherIndex)
  }
};
</script>
<style >
.edit_label {
  float: right;
  margin-right: 10px;
  cursor: pointer;
  color: blue;
}
.cancel_label {
  float: right;
  margin-right: 10px;
  cursor: pointer;
  color: red;
}
.form_con {
  width: 100%;
  background: rgba(255, 255, 255, 1);
  padding: 10px;
}
.form_tit {
  height: 50px;
  padding-left: 16px;
  line-height: 50px;
  background: rgba(239, 243, 245, 1);
  border: 1px solid rgba(212, 219, 225, 1);
  margin: 20px auto 20px;
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(18, 45, 75, 1);
  text-align: left;
}
.form_body {
  padding-left: 10px;
  padding-right: 10px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>



// WEBPACK FOOTER //
// src/pages/user/SuperAccountMark.vue