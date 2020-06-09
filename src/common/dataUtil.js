/**
 * Created by alan on 17-4-30.
 */
const DataUtil = {
    /**
     * Check mobile number format*/
    isMobile(param) {
      return /^[1][34578][0-9]{9}$/i.test(param);
    },
  
    /**
     * Check if number*/
    isNumber(param){
      return isNaN(param);
    },
  
    /**
     * Rounding off num decimal places
      * val is the number to round off, num is the number of digits to be rounded*/
    keepDecimal(val,num = 0){
      let result = Number(val).toFixed(num);
      if(result == 'NaN'){
        result = '';
      }
      return result;
    },
  
    /**
     * Format year, month and day format is format eg:yyyy-MM-dd*/
    formatTime(dateTime,format = "yyyy-MM-dd"){
      if(!dateTime) return dateTime;
      let args = {
        "M+": dateTime.getMonth() + 1,
        "d+": dateTime.getDate(),
        "h+": dateTime.getHours(),
        "m+": dateTime.getMinutes(),
        "s+": dateTime.getSeconds(),
        "q+": Math.floor((dateTime.getMonth() + 3) / 3),  //quarter
        "S": dateTime.getMilliseconds()
      };
      if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (dateTime.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var i in args) {
        let n = args[i];
        if (new RegExp("(" + i + ")").test(format))
          format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
      }
      return format;
    },
  
    /**
     * Convert unix timestamp to year, month, and day*/
    formatUnixTime(time){
      if(time == null){return '';}
      let timeStamp = new Date(time);
      return timeStamp.getFullYear() + "-"
        + ('0'+(timeStamp.getMonth() + 1)).slice(-2) + "-" + ('0'+timeStamp.getDate()).slice(-2) + " "
        + ('0'+timeStamp.getHours()).slice(-2) + ":" + ('0'+timeStamp.getMinutes()).slice(-2)+ ":" + ('0'+timeStamp.getSeconds()).slice(-2) + "";
    },
  
    formatUnixDateTime(time){
      let timeStamp = new Date(time);
      return timeStamp.getFullYear() + "-"
        + (timeStamp.getMonth() + 1) + "-" + timeStamp.getDate() + " "
        + timeStamp.getHours() + ":" + timeStamp.getMinutes();
    },
  
    /**
     * Convert json to string*/
    json2Str(param){
      return JSON.stringify(param);
    },
  
    /**
     * Convert string to json*/
    str2Json(param){
      return JSON.parse(param);
    },
  
    /**
     * localStorage*/
    setStorage(key,value){
      return localStorage.setItem(key,value);
    },
    getStorage(key){
      return localStorage.getItem(key);
    },
    clearStorage(key){
      localStorage.removeItem(key);
    },
  
    /**
     * Login user information
      * param is '' is cleared, param == undefined is the value obtained, param is passed to the object is the write value * /
    */
    userUtil(name,param){
      if(param === ''){
        return this.clearStorage(name);;
      }
      if(param){
        return this.setStorage(name,param);
      }else{
        return this.getStorage(name);
      }
    },
  
    /**
     * Session Id*/
    sid(param){
      return this.userUtil('adminSid',param);
    },
  
    /**
     * User Id*/
    id(param){
      return this.userUtil('adminId',param);
    },
  
    /**
     * */
    uuid(param){
      return this.userUtil('adminUuid',param);
    },
  
    /**
     * User login account*/
    account(param){
      return this.userUtil('adminAccout',param);
    },
  
    /**
     * Username*/
    userName(param){
      return this.userUtil('adminName',param);
    },
  
    /**
     * Save user permissions*/
    savePermission(param){
      let permission = this.json2Str(param);
      return this.userUtil('adminPermission',permission);
    },
  
    /**
     * Get user permissions*/
    getPermission(){
      return this.str2Json(this.userUtil('adminPermission'));
    },
    getPermissionSet() {
      let Obj = this.getPermission();
      let Arr = new Set();
      const getPermission = (tmpObj) => {
        for (let key in tmpObj) {
          if (tmpObj[key].permissionUrl) {
            Arr.add(tmpObj[key].permissionUrl);
          }
          if (tmpObj[key].children) {
            getPermission(tmpObj[key].children)
          }
        }
      };
      getPermission(Obj);
  
      //Pages without permissions
      Arr.add('/home');
      Arr.add('/404');
      Arr.add('/Unauthorized');
      Arr.add('/login');
      Arr.add('/UserDetail');
      Arr.add('/OrderDetail');
      Arr.add('/OrderInfoControl');

      return Arr;
    }
  };
  
  export default DataUtil;
  
  
  
  // WEBPACK FOOTER //
  // ./src/common/dataUtil.js