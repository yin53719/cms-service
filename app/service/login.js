'use strict';
const common = require('../../libs/common');
module.exports = app => {
  class loginService extends app.Service {

    async index(data) {
        let username=data.username;
        let password=data.password;
        
        let body={};
        password=common.md5(password+common.MD5_SUFFIX);
  
        let result = await this.app.mysql.get('tc_users',{username:username}); 
        if(!result || result==null){
          body={ok:false,msg:'此用户不存在',status:401};
        }else{
          if (result.password!=password) {
              body={msg:'密码不正确',status:401};
          }else {
              const token = app.jwt.sign({ user_id: result.user_id }, app.config.jwt.secret,{ expiresIn: 30 * 60*1000 });
              result['token']=token;
              result['roles']=['admin'];
              body=result;
          }
        }

        return body;
  
    }

    async register(data) {
        let body={};
        let username=data.username;
        let password=data.password;
    
        let result = await this.app.mysql.get('tc_users',{username:username});
        if(result.username){
    
           body={ok:false,msg:'用户名已存在',status:401};
        }else{
           password=common.md5(password+common.MD5_SUFFIX);
           await this.app.mysql.insert('tc_users',{username:username,password:password});
           body={ok:true,msg:'注册成功'};
        }

        return body
    }
  }
  return loginService;
};

