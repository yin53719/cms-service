'use strict';

const common = require('../../libs/common');
module.exports = app => {
  class weixinService extends app.Service {
    async index(url) {

        const appid= 'wxf7e3a717ff084e78';
        const secret = 'ef22e55e23e9795753b884219cc4103a';
        //随机数
        const noncestr = Math.random().toString(36).substr(2, 15);
        // 时间
        const timestamp =  parseInt(new Date().getTime() / 1000) + '';
        const AccToken = await common.getAccToken(appid,secret,app)
        const getticket = await common.getticket(AccToken.access_token,app)
      
        const str = 'jsapi_ticket=' + getticket.ticket + '&noncestr=' + noncestr + '&timestamp='+ timestamp +'&url=' + url;
        const signature = common.sha('sha1',str);
        return {
            signature:signature,
            appId:appid,
            timestamp:timestamp,
            nonceStr:noncestr
        };
  
       
 
  
    }
  }
  return weixinService;
};



