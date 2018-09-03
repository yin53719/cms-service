'use strict';

const common = require('../../libs/common');
module.exports = app => {
  class weixinService extends app.Service {
    async index(url) {

        const appId= 'wxf7e3a717ff084e78';
        const secret = 'ef22e55e23e9795753b884219cc4103a';
        let data='';
        try {
            data= await app.model.Weixin.find({appId:appId})
            app.logger.info(data);
            app.logger.info('=====================');
        } catch (error) {
            app.logger.info(error);
        }
        const expires_in = parseInt(new Date().getTime())-7200*1000;
        
        if(data.length>0 && data[0].expires_in >= expires_in){
            return {
                signature:data[0].signature,
                appId:data[0].appId,
                timestamp:data[0].timestamp,
                nonceStr:data[0].nonceStr
            };
        }else{
            const AccToken = await common.getAccToken(appId,secret,app)
            const getticket = await common.getticket(AccToken.access_token,app)
            //随机数
            const nonceStr = Math.random().toString(36).substr(2, 15);
            // 时间
            const timestamp =  parseInt(new Date().getTime() / 1000) + '';
            const str = 'jsapi_ticket=' + getticket.ticket + '&noncestr=' + nonceStr + '&timestamp='+ timestamp +'&url=' + url;
            const signature = common.sha('sha1',str);
            const obj={
                        signature:signature,
                        appId:appId,
                        timestamp:timestamp,
                        nonceStr:nonceStr
                    }
            let newObj=obj;
                newObj.expires_in=parseInt(new Date().getTime());
            await app.model.Weixin.create(newObj)
            return obj;
        }
        
        
  
       
 
  
    }
  }
  return weixinService;
};



