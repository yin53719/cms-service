'use strict';

const common = require('../../libs/common');
module.exports = app => {
  class weixinService extends app.Service {
    async index(url) {

        const appid= 'wxf7e3a717ff084e78';
        const secret = 'ef22e55e23e9795753b884219cc4103a';
        //随机数
        const createNonceStr = Math.random().toString(36).substr(2, 15);
        // 时间
        const createTimeStamp =  parseInt(new Date().getTime() / 1000) + '';
        const AccToken = await common.getAccToken(appid,secret)
        const getticket = await common.getticket(AccToken.access_token)
      
        var calcSignature =  (ticket, noncestr, ts, url)=> {
            var str = 'jsapi_ticket=' + ticket + '&noncestr=' + noncestr + '&timestamp='+ ts +'&url=' + url;
            return common.sha('sha1',str);
        }
        try {
            const signature = calcSignature(getticket.ticket, createNonceStr, createTimeStamp, url);
            return {
                signature:signature,
                appId:appid,
                timestamp:createTimeStamp,
                nonceStr:createNonceStr
            };
        } catch (error) {
            app.logger.info(error)
        }
       
 
  
    }
  }
  return weixinService;
};



