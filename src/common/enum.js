//客户端平台
const studentLoanStatus = [{
  code: "0",
  name: "待提交"
}, {
  code: "1",
  name: "待审核"
}, {
  code: "2",
  name: "审核通过"
}, {
  code: "3",
  name: "审核不通过"
}];

const sex = [{
  code:"1",
  name:"男"
},{
  code:"2",
  name:"女"
}];

const tradeType = [{
  code:"1",
  name:"购买债权"
},{
  code:"2",
  name:"放款"
},{
  code:"3",
  name:"前置服务费收入"
},{
  code:"4",
  name:"还款"
},{
  code:"5",
  name:"投资回款"
},{
  code:"6",
  name:"回款收入"
}]

const productType = [{
  code:"1",
  name:"散标"
},{
  code:"2",
  name:"活期"
},{
  code:"3",
  name:"理财"
}]

const status = [{
  code:"1",
  name:"待支付"
},{
  code:"2",
  name:"投资失败"
},{
  code:"3",
  name:"待匹配"
},{
  code:"4",
  name:"待回款"
},{
  code:"5",
  name:"回款清分中"
},{
  code:"6",
  name:"回款处理中"
},{
  code:"7",
  name:"回款失败"
},{
  code:"8",
  name:"回款成功"
},{
  code:"9",
  name:"失效订单"
}]

const getName = (code, list) =>{
  let re = '';
  list.forEach((obj)=>{
    if(obj.code == code){
      re = obj.name;
      return;
    }
  })
  return re;
};

export default {studentLoanStatus,getName,sex,tradeType,productType,status}



// WEBPACK FOOTER //
// ./src/common/enum.js