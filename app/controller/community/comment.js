'use strict';

module.exports = app => {
  class commentController extends app.Controller {
     async web(ctx){
        //查询pc端评论列表
        const body=await ctx.service.community.comment.web(ctx.query);
        ctx.body=body;
     }
  }

  return  commentController;
}