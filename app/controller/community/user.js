'use strict';


module.exports = app => {
  class newsController extends app.Controller {
    async findOfficialUser(ctx) {
       //查询官方发布号
       const body=await ctx.service.community.user.findOfficialUser(ctx.query);
      ctx.body=body;
    }
    async getListUser(ctx) {
      //查询官方发布号
      const body=await ctx.service.community.user.getListUser(ctx.request.body);
     ctx.body=body;
   }
  }
  return newsController;
};

