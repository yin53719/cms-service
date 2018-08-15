'use strict';


module.exports = app => {
  class newsController extends app.Controller {
    async queryListNews(ctx) {
      //资讯查询
      if(ctx.query.id){
        //const body=await app.service.community.news.queryListNewsOne(ctx.query.id);
        const body=await app.model.News.findOne({_id:ctx.query.id});

        ctx.body={
          data:body
        };
      }else{
        let data = ctx.request.body;
        let title=data.title || '';
        let page=(data.page*1-1)*10 ;
        let limit=data.limit || 10;
        let userId = data.userId?`and a.user_id =${data.userId} `:''; 
        let startDate = data.startDate?`and a.start_date >'${data.startDate}' `:''; 
        let endDate = data.endDate?`and a.end_date < '${data.endDate}' `:''; 
        let status = data.status?`and a.status =${data.status} `:''; 
        let isShow = data.isShow?`and a.is_show =${data.isShow} `:''; 
        //const body=await ctx.service.community.news.queryListNews(ctx.request.body);
        const body=await app.model.News.find({title:{$regex:title}}).skip(page).limit(limit);
        app.logger.info(body);
        ctx.body={
          data:{
            rows:body
          }
        };
      }
      
     
    }
    async insertNews(ctx) {
      //资讯新增
      if(ctx.request.body.createDate){
        //const body=await ctx.service.community.news.updateNews(ctx.request.body);
        const body=await app.model.News.update(ctx.request.body);
        ctx.body=body;
      }else{
        //const body=await ctx.service.community.news.insertNews(ctx.request.body);
        const body=await app.model.News.create(ctx.request.body);
        ctx.body=body;
      }
     
   }
  }
  return newsController;
};

