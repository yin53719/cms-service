'use strict';
module.exports = app => {
  class userService extends app.Service {
    async findOfficialUser(data) {
        let userPublishType=data.userPublishType || '';
         let sql=`SELECT a.nick_name as nickName,id,a.saic_user_id as saicUserId FROM user_account as a  WHERE a.user_type in(${userPublishType},0) `
         let rows= new Array();
         try {
            rows= await this.app.mysql.query(sql);
            app.logger.info(rows);
          } catch (error) {
            app.logger.error('查询用户信息报错.....');
            app.logger.error(error);
          }finally{
            app.logger.info(sql)
          }
          return {
            data:rows
          };
    }
    async getListUser(data) {
        let articleRoleCode=data.articleRoleCode?`and ${data.articleRoleCode}`:'';
        let page=(data.page*1-1)*10 ;
        let limit=data.limit || 10;
        let startDate = data.registerStartDate?`and a.register_date >'${data.registerStartDate}' `:''; 
        let endDate = data.registerEndDate?`and a.register_date < '${data.registerEndDate}' `:''; 
        let lastLoginStartDate = data.lastLoginStartDate?`and a.last_login_date >'${data.lastLoginStartDate}' `:''; 
        let lastLoginEndDate = data.lastLoginEndDate?`and a.last_login_date < '${data.lastLoginEndDate}' `:''; 
        let sql=`SELECT a.nick_name as nickName,id,a.saic_user_id as saicUserId,b.article_role_code as articleRoleCode
                FROM user_account as a LEFT JOIN tr_block_role b ON a.saic_user_id = b.user_id
                where ${articleRoleCode} ${startDate} ${endDate} ${lastLoginStartDate} ${lastLoginEndDate}
                limit ${page},${limit}`
        let rows= new Array();
        try {
          rows= await this.app.mysql.query(sql);
          app.logger.info(rows)
          app.logger.info(sql)
          return {
              data:{
                rows:rows,
                total:100
              }
          };
         

        } catch (error) {
          app.logger.error('查询用户信息报错.....');
          app.logger.error(error);
          app.logger.info(sql)
        }
      
  }
  }
  return userService;
};

