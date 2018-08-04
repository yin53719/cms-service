'use strict';
module.exports = app => {
  class forumService extends app.Service {

    async queryListBlock() {
        let sql =`SELECT t.id id,t.block_name blockName FROM tt_community_block t`;
        let rows= await this.app.mysql.query(sql);
        return {
           data:{
               rows:rows
           }
        }
    }
    async queryDetailBlock(id){
        let rows= await this.app.mysql.get('tt_community_block',{id:id});
        return {
           data:{
               rows:rows
           }
        }
    }
    async queryListArticle(data){
        let name = data.name?`and (u.name LIKE '%${name}%' or u.nick_name like '%${name}%')`:'';
        let title = data.title || '';
        let page=data.page-1 || 0 ;
        let limit=data.limit || 10;
        let blockId = data.blockId ?`and t.block_id=${data.blockId}`: '';
        let publishStatus = data.publishStatus?`and t.publish_status=${data.publishStatus}` :''
        let publishDate = data.startDate?`and t.publish_date > '${data.startDate}' and t.publish_date < '${data.endDate}'`:'';
        let superStatus = data.superStatus?`and t.super_status=${data.superStatus}`:'';
        let topStatus = data.topStatus?`and t.top_status=${data.topStatus}`:'';

        let sql =`SELECT t.id id,t.title title,t.user_id userId,t.publish_date publishDate,
                 u.name name,t.last_reply_date lastReplyDate,t.browse_number browseNumber,
                 t.comment_number commentNumber,t.praise_number praiseNumber,t.top_status topStatus,
                 t.super_status  superStatus,t.publish_status  publishStatus  
                 FROM tt_community_article t
                 LEFT JOIN user_account u ON t.user_id=u.saic_user_id 
                 WHERE t.title LIKE '%${title}%'  ${name}
                 ${blockId} ${publishDate} ${superStatus}${topStatus} ${publishStatus} LIMIT ${page},${limit}`
        let rows =[];
        try {
            rows= await this.app.mysql.query(sql);
            app.logger.info(rows);
        } catch (error) {
            app.logger.error(error)
        }finally{
            app.logger.info(sql)
        }
        let sql2 = `SELECT count(0) as total FROM tt_community_article as t 
                    LEFT JOIN user_account as u ON t.user_id=u.saic_user_id 
                    WHERE t.title LIKE '%${title}%' ${name} 
                    ${blockId} ${publishStatus} ${superStatus}${topStatus} `;
        let total =[];
        try {
            total= await this.app.mysql.query(sql2);
        } catch (error) {
            app.logger.error(error)
        }finally{
            app.logger.info(sql2)
        }
        return {
            data:{
                rows:rows,
                total:total[0].total
            }
            
        };
    }
    async queryDetailArticleApp(query){

        let data  = await app.mysql.get('tt_community_article',{id:query.id});


       return {
           data:data
       }
    }
  }
  return forumService;
};

