'use strict';

module.exports = app => {
  class auditManagementController extends app.Controller {
    async getAuditInfoList(ctx) {
       //查询列表
       const body=await ctx.service.community.auditManagement.getAuditInfoList(ctx.request.body);
       ctx.body=body;
    }
    async getAuditTypeList(ctx){
      //查询板块明细
      const body=await ctx.service.community.auditManagement.getAuditTypeList(ctx.query.id);
      ctx.body=body;
    }
    async queryListArticle(ctx){
      //查询板块下面帖子列表
      const body=await ctx.service.community.forum.queryListArticle(ctx.request.body);
      ctx.body=body;
    } 
  }
  return auditManagementController;
};
