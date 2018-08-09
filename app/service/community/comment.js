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

          let lists = [];
          for(var i=0;i<list.length;i++){
            lists.push(lists[i].businessId)
          }
          const sql2 =`select * from tt_community_comment t where t.business_id in (${lists.join(',')}) and 
                   t.business_type=${businessType}`;
          const list2= await app.mysql.query(sql2)


          for(var i=0;i<list.length;i++){
            list[i]['level2List']=[];
            for(var j=0;j<list2.length;j++){
              list[i]['level2List'].push(list2[i]) 
            }
          }

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