'use strict';

module.exports = app => {
  class forumController extends app.Controller {
    async queryListBlock(ctx) {
       //查询板块列表
       const body=await ctx.service.community.forum.queryListBlock(ctx.query);
       ctx.body=body;
    }
    async queryDetailBlock(ctx){
      //查询板块明细
      const body=await ctx.service.community.forum.queryDetailBlock(ctx.query.id);
      ctx.body=body;
    }
    async queryListArticle(ctx){
      //查询板块下面帖子列表
      const body=await ctx.service.community.forum.queryListArticle(ctx.request.body);
      ctx.body=body;
    } 
    async queryDetailArticleApp(ctx){
      //查询板块下面帖子明细
      const body=await ctx.service.community.forum.queryDetailArticleApp(ctx.query);
      ctx.body=body;
    }
  }
  return forumController;
};

