const crypto = require('crypto');
const fs = require('fs');
const axios = require('axios')
module.exports = {
  MD5_SUFFIX: 'FDSW$t34tregt5tO&$(#RHuyoyiUYE*&OI$HRLuy87odlfh是个风格热腾腾)',
  md5: str => {
    const obj = crypto.createHash('md5');

    obj.update(str);

    return obj.digest('hex');
  },
  sha: (type,str) => {
    const obj = crypto.createHash(type);

    obj.update(str);

    return obj.digest('hex');
  },
  checkLogin: ctx => {
    if (!ctx.session.admin_id) {
     	return true;
    }
     	return false;

  },
  getFileSize: filePath => {
    return new Promise((resolve, reject) => {
      let size = null;
      fs.stat(filePath, (err, stats) => {
        size = stats.size;
        console.log(filePath);
        resolve(size);
      });
    });
  },
  formatDateAll(value){
        if(value == null || value == ''){
            return '';
        }
        var d = new Date(value*1);
        var year = d.getFullYear();
        var months = d.getMonth() + 1;
        var month=months <10 ? '0' + months : '' + months;
        var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
        var hh=d.getHours()
        var mm=d.getMinutes()
        let ss=d.getSeconds()
         return year+ '-' + month + '-' + day +' ' + hh +':' + mm +':' + ss;
  },
  getUrlparms(url, key) {
    const localhost_url = url.split('?')[1];
    if (!localhost_url) {
      return false;
    }
    const str_data = localhost_url.split('&');
    const obj = {};

    for (let i = 0; i < str_data.length; i++) {
      const list = str_data[i].split('=');
      const k = list[0];
      const value = list[1];
      obj[k] = value;
    }
    const data = obj[key];
    return data;
  },
  getAccToken(appid,secret){
    return new Promise((resolve, reject) => {
      axios.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+ appid +'&secret='+secret).then((res)=>{
        resolve(res.data);
       }).catch((res)=>{
          reject(res)
       })
    });
  },
  getticket(access_token){
    return new Promise((resolve, reject) => {
      axios.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='+access_token+'&type=jsapi').then((res)=>{
        resolve(res.data);
       }).catch((res)=>{
        reject(res)
       })
    });
  }
};
