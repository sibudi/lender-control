//Client Platform
const studentLoanStatus = [{
    code: "0",
    name: "Diajukan"
  }, {
    code: "1",
    name: "Ditinjau"
  }, {
    code: "2",
    name: "Berhasil"
  }, {
    code: "3",
    name: "Gagal"
  }];
  
  const sex = [{
    code:"1",
    name:"Laki-laki"
  },{
    code:"2",
    name:"Perempuan"
  }];
  
  const tradeType = [{
    code:"1",
    name:"Kredit Pembelian"
  },{
    code:"2",
    name:"Pinjaman"
  },{
    code:"3",
    name:"Biaya layanan"
  },{
    code:"4",
    name:"Pelunasan"
  },{
    code:"5",
    name:"Pengembalian Pinjaman"
  },{
    code:"6",
    name:"Pendapatan Pinjaman"
  }]
  
  const productType = [{
    code:"1",
    name:"Manajemen Keuangan"
  },{
    code:"2",
    name:"Transaksi Sekarang"
  },{
    code:"3",
    name:"Beli Jumlah Besar"
  }]
  
  const status = [{
    code:"1",
    name:"Harus dibayar"
  },{
    code:"2",
    name:"Pinjaman gagal"
  },{
    code:"3",
    name:"Untuk dicocokan"
  },{
    code:"4",
    name:"Menunggu pembayaran"
  },{
    code:"5",
    name:"Pengembalian kliring"
  },{
    code:"6",
    name:"Pemrosesan kembali"
  },{
    code:"7",
    name:"Pengembalian gagal"
  },{
    code:"8",
    name:"Pembayaran berhasil"
  },{
    code:"9",
    name:"Permohonan tidak sah"
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