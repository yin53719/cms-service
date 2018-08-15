'use strict';


module.exports = app => {
  class LoginController extends app.Controller {
    async index(ctx) {
      let username=ctx.request.body.username;
      let password=ctx.request.body.password;
      
      if(username==null){
        ctx.body={ok:false,msg:'用户名不可为空',status:401};
        return false;
      }
      if(password==null){
        ctx.body={ok:false,msg:'密码不可为空',status:401};
        return false;
      }
      const body=await ctx.service.login.index(ctx.request.body);
      ctx.body=body;
    }
    async register(ctx) {
        let username=ctx.request.body.username;
        if(username==null){
          ctx.status=401;
          ctx.body={msg:'用户名不可为空'};
          return false;
        }
        let password=ctx.request.body.password;
        if(password==null){
          ctx.body={ok:false,msg:'密码不可为空',status:401};
          return false;
        }
      const body=await ctx.service.login.register(ctx.request.body);
      ctx.body=body;
    }
    async logout(ctx) {
      ctx.body='退出成功'
    }
    async getWechatToken(ctx){
      ctx.body= 'aaR4IAeXo1bwTQp8uSefRHjrDAIBY5l3'
    }
  }
  return LoginController;
};

