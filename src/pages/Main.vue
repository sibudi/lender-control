/**
* Created by alan on 17-5-1.
*/
<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col :span="20" class="logo">
        <img src="../assets/img/logodoit.png" /> <span>Lender Management System</span>
      </el-col>
      <el-col :span="4" class="userinfo">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link userinfo-inner"><img src="../assets/img/avatar.png"/> {{userName}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-show="false">Pesan Saya</el-dropdown-item>
            <!--<el-dropdown-item @click.native="changePassword">Ubah Kata Sandi</el-dropdown-item>-->
            <el-dropdown-item divided @click.native="logout">Keluar</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>
    <el-col :span="24" class="main">
      <aside>
        <el-menu :default-active="$route.path" theme="dark" unique-opened router>
          <template v-for="(item,index) in menuList ">
            <el-submenu v-if="item.children && item.children.length" :key="index+''" :index="item.id">
              <template slot="title"><i class="el-icon-menu"></i>{{item.permissionName}}</template>
              <el-menu-item v-for="(node,i) in item.children" :key="node.permissionUrl" :index="node.permissionUrl">
                <i :key="i" class="el-icon-document"></i>{{node.permissionName}} </el-menu-item>
            </el-submenu>
            <el-menu-item v-else :key="item.permissionUrl"><i class="el-icon-document"></i>{{item.permissionName}}</el-menu-item>
          </template>
        </el-menu>
      </aside>
      <section class="content-container">
        <el-col :span="24" class="breadcrumb-container">
          <strong class="title">{{$route.name}}</strong>
          <el-breadcrumb separator="/" class="breadcrumb-inner">
            <el-breadcrumb-item v-for="item in $route.matched" :key="item.name">
              {{ item.name }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="24" class="content-wrapper">
          <transition>
            <router-view></router-view>
          </transition>
        </el-col>
      </section>
      <!--<ml-change-password ref="changePassword" changeType="2" :uuid="userUuid"></ml-change-password>-->
      <!--<ml-message></ml-message>-->
    </el-col>
  </el-row>
</template>
<script>
  import DataUtil from '../common/dataUtil'
  //import mlChangePassword from '../components/_changePassword.vue'
  //import mlMessage from '../components/Message.vue'
  export default {
    data() {
      return {
        userName: '',
        userUuid:DataUtil.uuid(),
        menuList: [
        ]
      }
    },
    methods: {
      changePassword() {
        //this.$refs.changePassword.show()
      },
      //Logout
      logout() {
        this.$confirm('Apakah Anda yakin akan keluar?', 'Pemberitahuan', {}).then(() => {
          DataUtil.sid('')
          this.$router.push('/login')
        }).catch(() => {

        });
      },
      pageInit() {
        this.userName = DataUtil.userName()
        //this.userUuid = DataUtil.uuid()
      },
      getMenuList() {
        var postData = {
          id: DataUtil.id()
        }
        this.$http.post('api-system/system/permissionTreeByUserId', postData).then(response => {
          let {data} = response;

          this.menuList = data.data;
          DataUtil.savePermission(data.data);     /*Safe permission to localStorage*/
        })
      }
    },
    mounted() {
      this.pageInit()
      this.getMenuList()
    },
    components: {
      //mlChangePassword,
      //mlMessage
    }
  }

</script>
<style scoped>
  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
  }

  .header {
    height: 60px;
    line-height: 60px;
    background: #1F2D3D;
    color: #c0ccda;
  }

  .logo {
    font-size: 15px;
  }

  .logo img {
    width: 40px;
    float: left;
    margin: 10px 10px 10px 18px;
  }

  .userinfo {
    text-align: right;
    padding-right: 35px;
  }

  .userinfo-inner {
    color: #c0ccda;
    cursor: pointer;
  }

  .userinfo-inner img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin: 10px 0px 10px 10px;
    float: right;
  }

  .main {
    background: #324057;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
  }

  .main aside {
    width: 270px; /* Adjust according to side menu width */
    overflow-y: auto;
    overflow: auto;
    height: 100%;
  }

  .main ul {
    margin-bottom: 50px;
  }
  .el-submenu [class^=fa] {
    vertical-align: baseline;
    margin-right: 5px;
  }
  .el-menu-item [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }
  .content-container {
    background: #f1f2f7;
    position: absolute;
    right: 0px;
    top: 0px;
    bottom: 0px;
    left: 270px; /* Adjust according to side menu width */
    overflow-y: scroll;
    padding: 20px;
  }

  .breadcrumb-container {
    margin-bottom: 15px;
  }

  .title {
    width: 200px;
    float: left;
    color: #475669;
  }

  .breadcrumb-inner {
    float: right;
  }

  .content-wrapper {
    background-color: #fff;
    box-sizing: border-box;
  }

</style>



// WEBPACK FOOTER //
// src/pages/Main.vue