'use strict';

module.exports = app => {
  class commentService extends app.Service {
     async web(query){
       const businessId=query.businessId;
       const businessType =query.businessType;
       const limit=query.limit;
       const page =query.page-1;

       const sql =`select * from tt_community_comment t where t.business_id=${businessId} and 
                   t.business_type=${businessType} 
                   LIMIT ${page},${limit}
                  `;
       const list= await app.mysql.query(sql)
       return {
         data:list
       }

     }
  }

  return  commentService;
}