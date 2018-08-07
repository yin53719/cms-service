'use strict';

module.exports = app => {
  class commentService extends app.Service {
     async web(query){
       const businessId=query.businessId;
       const businessType =query.businessType;
       const limit=query.limit || 10;
       let page=(data.page*1-1)*10 ;

       const sql =`select * from tt_community_comment t where t.business_id=${businessId} and 
                   t.business_type=${businessType} 
                   LIMIT ${page},${limit}
                  `;
      
       try {
          const list= await app.mysql.query(sql)
          app.logger.info(list);
          app.logger.info(sql);
          return {
            data:list
          }
       } catch (error) {
          app.logger.error(sql);
          app.logger.error(error);
          return {}
       }
     }
  }

  return  commentService;
}