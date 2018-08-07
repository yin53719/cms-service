'use strict';
const common = require('../../../libs/common');
module.exports = app => {
  class newsService extends app.Service {
    async queryListNews(data) {
        let title=data.title || '';
        let page=(data.page*1-1)*10 ;
        let limit=data.limit || 10;
        let userId = data.userId?`and a.user_id =${data.userId} `:''; 
        let startDate = data.startDate?`and a.start_date >'${data.startDate}' `:''; 
        let endDate = data.endDate?`and a.end_date < '${data.endDate}' `:''; 
        let status = data.status?`and a.status =${data.status} `:''; 
        let isShow = data.isShow?`and a.is_show =${data.isShow} `:''; 
            

        
  
    }
    async queryListNewsOne(id){
        let data = await app.mysql.get('tt_community_news',{id,id});
        return {
            data:{
                id:data.id,
                userId:data.user_id,
                title:data.title,
                newsSummary:data.news_summary,
                content:data.content,
                titleImage:data.title_image,
                contentType:data.content_type,
                isShow:data.is_show,
                isFullpush:data.is_fullpush,
                sort:data.sort
                
            }
        }
    }
    async insertNews(data){
        let pdata={
            title:data.title,
            user_id:data.userId,
            news_summary:data.newsSummary,
            title_image:data.titleImage,
            content:data.content,
            status:data.status,
            content_type:data.contentType,
            is_fullpush:data.isFullpush,
            is_show:data.isShow,
            sort:data.sort
        }
        if(data.status==1004){
            pdata.release_date=new Date();
        }
        let res = await app.mysql.insert('tt_community_news',pdata)
       return res;
        

    }
    async updateNews(data){
        let pdata={
            id:data.id,
            title:data.title,
            user_id:data.userId,
            news_summary:data.newsSummary,
            title_image:data.titleImage,
            content:data.content,
            status:data.status,
            content_type:data.contentType,
            is_fullpush:data.isFullpush,
            is_show:data.isShow,
            sort:data.sort
        }
        if(data.status==1004){
            pdata.release_date=new Date();
        }
        let res = await app.mysql.update('tt_community_news',pdata)
       return res;
    }
  }
  return newsService;
};

