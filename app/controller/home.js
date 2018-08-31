'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    async index(ctx) {

       ctx.body = '服务正常启动';
    }
    async weixin(ctx){

      const url = ctx.request.body.url;
      const  data = await ctx.service.weixin.index(url)
      ctx.body = data;
      
    }
  }
  return HomeController;
}