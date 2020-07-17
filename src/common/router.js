/**
 * Created by alan on 17-4-30.
 */
import Login from '../pages/Login.vue'
import Main from '../pages/Main.vue'
import ResetPassword from '../pages/ResetPassword.vue'

const routes = [{
  path: '/login',
  component: Login
}, {
  path: '/reset-password',
  component: ResetPassword
},

{
  name: 'Lender Control',
  path: '/',
  redirect: '/home',
  component: Main,
  children: [{
    name: 'Beranda',
    path: '/home',
    component: resolve => require(['../pages/Home.vue'], resolve),
  },
  {
    name: 'Manajemen Akses',
    path: '/Permission',
    component: resolve => require(['../pages/system/Permission.vue'], resolve)
  }, {
    name: 'Manajemen Peran',
    path: '/Role',
    component: resolve => require(['../pages/system/Role.vue'], resolve)
  }, {
    name: 'Manajemen Pengguna',
    path: 'Manager',
    component: resolve => require(['../pages/system/Manager.vue'], resolve)
  }, {
    name: 'Kode SMS Terakhir',
    path: 'getsmscode',
    component: resolve => require(['../pages/system/GetSmsCode.vue'], resolve)
  }, {
    name: 'Manajemen Pendanaan',
    path: '/SuperAccountManage',
    component: resolve => require(['../pages/system/SuperAccountManage.vue'], resolve),
  }, {
    name: 'Daftar Permohonan',
    path: '/OrderList',
    component: resolve => require(['../pages/order/OrderList.vue'], resolve),
  }, {
    name: 'Daftar Permohonan Baru',
    path: '/NewOrderList',
    component: resolve => require(['../pages/order/NewOrderList.vue'], resolve),
  }, {
    name: 'Rincian Permohonan',
    path: '/OrderDetail',
    component: resolve => require(['../pages/order/OrderDetail.vue'], resolve),
  }, {
    name: 'Daftar Pembayaran',
    path: '/PayAccountList',
    component: resolve => require(['../pages/order/PayAccountList.vue'], resolve),
  }, {
    name: 'Daftar Semua Permohonan',
    path: '/OrderAllList',
    component: resolve => require(['../pages/order/OrderAllList.vue'], resolve),
  }, {
    name: 'Rincian Hutang',
    path: '/DebtDetail',
    component: resolve => require(['../pages/order/DebtDetail.vue'], resolve),
  }, {
    name: 'Akun Pengguna',
    path: '/UserAccount',
    component: resolve => require(['../pages/user/UserAccount.vue'], resolve),
  }, {
    name: 'Daftar Otentikasi',
    path: '/UserAuthCheckList',
    component: resolve => require(['../pages/user/UserAuthCheckList.vue'], resolve),
  }, {
    name: 'Rincian Otentikasi',
    path: '/UserAuthDetail',
    component: resolve => require(['../pages/user/UserAuthDetail.vue'], resolve),  //
  }, {
    name: 'Daftar Otentikasi (Gagal)',
    path: '/UserAuthCheckFail',
    component: resolve => require(['../pages/user/UserAuthCheckFail.vue'], resolve),
  }, {
    name: 'Rincian Otentikasi (Gagal)',
    path: '/UserAuthFailDetail',
    component: resolve => require(['../pages/user/UserAuthFailDetail.vue'], resolve),
  }, {
    name: 'Akun Pendana Lembaga',
    path: '/AccountList ',
    component: resolve => require(['../pages/user/AccountList.vue'], resolve),  //
  }, {
    name: 'Manajemen Pendana',
    path: '/SuperAccountMark',
    component: resolve => require(['../pages/user/SuperAccountMark.vue'], resolve),  //
  }, {
    name: 'Manajemen Akun Activate',
    path: '/UserActivate',
    component: resolve => require(['../pages/user/UserActivate.vue'], resolve),  //
  }, {
    name: 'User Detail',
    path: '/user/:id',
    component: resolve => require(['../pages/user/UserDetail.vue'], resolve),  //
  },
  {
    name: 'Daftar Periksa Otentikasi',
    path: '/UserAuthCheckList',
    component: resolve => require(['../pages/user/UserAuthCheckList.vue'], resolve),
  }, {
    name: 'Kliring Pinjaman Agen Harian',
    path: '/dailyclear',
    component: resolve => require(['../pages/user/DailyClearing.vue'], resolve),
  }, {
    name: 'Rincian Pinjaman Pelajar',
    path: '/StudentLoanDetail',
    component: resolve => require(['../pages/student/StudentLoanDetail.vue'], resolve),
  }, {
    name: 'Rincian Ulasan Pinjaman Pelajar',
    path: '/StudentLoanDetailCheck',
    component: resolve => require(['../pages/student/StudentLoanDetailCheck.vue'], resolve),
  }, {
    name: 'Daftar Pinjaman Pelajar',
    path: '/StudentLoanList',
    component: resolve => require(['../pages/student/StudentLoanList.vue'], resolve),
  }, {
    name: 'Daftar Pinjaman Pelajar Tertunda',
    path: '/StudentLoanCheckList',
    component: resolve => require(['../pages/student/StudentLoanCheckList.vue'], resolve),
  }, {
    name: 'Daftar Biaya',
    path: '/RechargeList',
    component: resolve => require(['../pages/financial/RechargeList.vue'], resolve),
  }, {
    name: 'Daftar Penarikan',
    path: '/WithdrawalList',
    component: resolve => require(['../pages/financial/WithdrawalList.vue'], resolve),
  }, {
    name: 'Daftar Penarikan (Gagal)',
    path: '/DrawalFailList',
    component: resolve => require(['../pages/financial/DrawalFailList.vue'], resolve),
  }, {
    name: 'Manajemen Aset Pendana',
    path: '/SuperAccManage',
    component: resolve => require(['../pages/financial/SuperManage.vue'], resolve),
  }, {
    name: 'Manajemen Aset Lembaga',
    path: '/UserAccManage',
    component: resolve => require(['../pages/financial/UserAccManage.vue'], resolve),
  }, {
    name: 'Halaman Tidak Ditemukan',
    path: '/404',
    component: resolve => require(['../pages/404.vue'], resolve),
  }, {
    name: 'Tidak Ada Akses',
    path: '/Unauthorized',
    component: resolve => require(['../pages/Unauthorized.vue'], resolve),
  }
  ]
}, {
  path: '/404',
  component: resolve => require(['../pages/404.vue'], resolve)
}, {
  path: '*',
  redirect: { path: '/404' }
}];

export default routes





// WEBPACK FOOTER //
// ./src/common/router.js