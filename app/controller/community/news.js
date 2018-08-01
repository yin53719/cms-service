'use strict';


module.exports = app => {
  class newsController extends app.Controller {
    async queryListNews(ctx) {
      //资讯查询
      if(ctx.query.id){
        const body=await ctx.service.community.news.queryListNewsOne(ctx.query.id);
        ctx.body=body;
      }else{
        const body=await ctx.service.community.news.queryListNews(ctx.request.body);
        ctx.body=body;
      }
      
     
    }
    async insertNews(ctx) {
      //资讯新增
      if(ctx.request.body.id){
        const body=await ctx.service.community.news.updateNews(ctx.request.body);
        ctx.body=body;
      }else{
        const body=await ctx.service.community.news.insertNews(ctx.request.body);
        ctx.body=body;
      }
     
   }
  }
  return newsController;
};

