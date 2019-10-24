/**
 * Created by alan on 17-4-30.
 */
import Login from '../pages/Login.vue'
import Main from '../pages/Main.vue'

const routes = [{
  path:'/login',
  component:Login
},{
  name:'管理后台',
  path:'/',
  redirect:'/home',
  component:Main,
  children:[{
    name:'首页',
    path:'/home',
    component:resolve => require(['../pages/Home.vue'], resolve),
  },{
    name: '权限列表',
    path: '/Permission',
    component:resolve => require(['../pages/system/Permission.vue'], resolve)
  },{
    name: '角色管理',
    path: '/Role',
    component:resolve => require(['../pages/system/Role.vue'], resolve)
  },{
    name:'用户管理',
    path:'Manager',
    component:resolve => require(['../pages/system/Manager.vue'], resolve)
  },{
    name:'获取验证码',
    path:'getsmscode',
    component:resolve => require(['../pages/system/GetSmsCode.vue'], resolve)
  },{
    name:'超级投资人管理',
    path:'/SuperAccountManage',
    component:resolve => require(['../pages/system/SuperAccountManage.vue'], resolve),
  },{
    name:'理财记录查询',
    path:'/OrderList',
    component:resolve => require(['../pages/order/OrderList.vue'], resolve),
  },{
    name:'理财记录（普投&超投）',
    path:'/NewOrderList',
    component:resolve => require(['../pages/order/NewOrderList.vue'], resolve),
  },{
    name:'理财资金&债权关系',
    path:'/OrderDetail',
    component:resolve => require(['../pages/order/OrderDetail.vue'], resolve),
  },{
    name:'理财资金流水查询',
    path:'/PayAccountList',
    component:resolve => require(['../pages/order/PayAccountList.vue'], resolve),
  },{
    name:'订单查询',
    path:'/OrderAllList',
    component:resolve => require(['../pages/order/OrderAllList.vue'], resolve),
  },{
    name:'债权详情',
    path:'/DebtDetail',
    component:resolve => require(['../pages/order/DebtDetail.vue'], resolve),
  },{
    name:'账户查询',
    path:'/UserAccount',
    component:resolve => require(['../pages/user/UserAccount.vue'], resolve),
  },{
    name:'实名认证列表',
    path:'/UserAuthCheckList',
    component:resolve => require(['../pages/user/UserAuthCheckList.vue'], resolve),
  },{
    name:'实名认证详情',
    path:'/UserAuthDetail',
    component:resolve => require(['../pages/user/UserAuthDetail.vue'], resolve),  //
  },{
    name:'实名认证（不成功）',
    path:'/UserAuthCheckFail',
    component:resolve => require(['../pages/user/UserAuthCheckFail.vue'], resolve),
  },{
    name:'实名认证（不成功）详情',
    path:'/UserAuthFailDetail',
    component:resolve => require(['../pages/user/UserAuthFailDetail.vue'], resolve),
  },{
    name:'机构投资者账户',
    path:'/AccountList',
    component:resolve => require(['../pages/user/AccountList.vue'], resolve),  //
  },{
    name:'超级投资人标记',
    path:'/SuperAccountMark',
    component:resolve => require(['../pages/user/SuperAccountMark.vue'], resolve),  //
  },{
    name:'实名认证列表0',
    path:'/UserAuthCheckList',
    component:resolve => require(['../pages/user/UserAuthCheckList.vue'], resolve),
  },{
    name:'每日机构放款清分',
    path:'/dailyclear',
    component:resolve => require(['../pages/user/DailyClearing.vue'], resolve),
  },{
    name:'学生申请详情页',
    path:'/StudentLoanDetail',
    component:resolve => require(['../pages/student/StudentLoanDetail.vue'], resolve),
  },{
    name:'学生申请审核详情页',
    path:'/StudentLoanDetailCheck',
    component:resolve => require(['../pages/student/StudentLoanDetailCheck.vue'], resolve),
  },{
    name:'学生申请列表',
    path:'/StudentLoanList',
    component:resolve => require(['../pages/student/StudentLoanList.vue'], resolve),
  },{
    name:'待审核学生申请列表',
    path:'/StudentLoanCheckList',
    component:resolve => require(['../pages/student/StudentLoanCheckList.vue'], resolve),
  },{
    name:'充值列表',
    path:'/RechargeList',
    component:resolve => require(['../pages/financial/RechargeList.vue'], resolve),
  },{
    name:'提现列表',
    path:'/WithdrawalList',
    component:resolve => require(['../pages/financial/WithdrawalList.vue'], resolve),
  },{
    name:'提现失败列表',
    path:'/DrawalFailList',
    component:resolve => require(['../pages/financial/DrawalFailList.vue'], resolve),
  },{
    name:'超级投资人资产管理',
    path:'/SuperAccManage',
    component:resolve => require(['../pages/financial/SuperManage.vue'], resolve),
  },{
    name:'机构账户资产管理',
    path:'/UserAccManage',
    component:resolve => require(['../pages/financial/UserAccManage.vue'], resolve),
  }]
},{
  path:'/404',
  component:resolve => require(['../pages/404.vue'], resolve)
},{
  path:'*',
  redirect:{path:'/404'}
}];

export default routes





// WEBPACK FOOTER //
// ./src/common/router.js