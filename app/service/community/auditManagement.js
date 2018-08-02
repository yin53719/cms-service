'use strict';
module.exports = app => {
  class auditManagementService extends app.Service {
    async getAuditInfoList(data){
        let name = data.name?`and (u.name LIKE '%${data.name}%' or u.nick_name like '%${data.name}%')`:'';
        let releaseType=''
        if(data.releaseType){
            if(data.releaseType=='10070'){
                releaseType = `and t.business_type=1007 and t.level=0`;
            }else if(data.releaseType=='10071'){
                releaseType = `and t.business_type=1007 and t.level=1`;
            }else if(data.releaseType=='10072'){
                releaseType = `and t.business_type=1007 and t.level=2`;
            }else if(data.releaseType=='10041'){
                releaseType = `and t.business_type=1004 and t.level=1`;
            }else if(data.releaseType=='10042'){
                releaseType = `and t.business_type=1004 and t.level=2`;
            }
        }
        
        
        let page=data.page-1 || 0 ;
        let limit=data.limit || 10;
        let businessType = data.businessType ?`and t.business_type = ${data.businessType}`: '';
        let status = data.status?`and t.status = ${data.status}`:'';
        let audit_time = data.auditStartDate?`and t.audit_start_date > '${data.auditStartDate}' and t.audit_end_date < '${data.auditEndDate}'`:'';
        let create_time = data.startDate?`and t.create_time > '${data.startDate}' and t.create_time < '${data.endDate}'`:'';
        let sql =`SELECT
                    t.id id,
                    t.business_id businessId,
                    t.business_type businessType,
                    t.content,
                    t.create_time createTime,
                    t.STATUS status,
                    t.user_id,
                    t.audit_time auditTime,
                    t.audit_user_id auditUserId,
                    t.remark,
                    t.LEVEL level,
                    t.source,
                CASE
                    
                    WHEN u.nick_name = '' THEN
                    INSERT ( u.NAME, 4, 4, '****' ) 
                    ELSE
                    u.nick_name 
                END AS name 
                FROM
                    (
                    SELECT
                        tca.id id,
                        tca.id business_id,
                        1007 business_type,
                        tca.title content,
                        tca.create_date create_time,
                        tca.check_status STATUS,
                        tca.user_id user_id,
                        tca.audit_time audit_time,
                        tca.audit_user_id audit_user_id,
                        tca.remark,
                        0 LEVEL,
                        0 source 
                    FROM
                        tt_community_article tca UNION ALL
                    SELECT
                        tcc.id id,
                        tcc.business_id business_id,
                        tcc.business_type business_type,
                        tcc.comment_content content,
                        tcc.create_date create_time,
                        tcc.STATUS STATUS,
                        tcc.saic_user_id user_id,
                        tcc.audit_time audit_time,
                        tcc.audit_user_id audit_user_id,
                        tcc.remark,
                        tcc.LEVEL LEVEL,
                        tcc.user_type source
                    FROM
                        tt_community_comment tcc 
                    ) AS t
                LEFT JOIN user_account u ON t.user_id = u.saic_user_id
                WHERE 1=1 ${name} ${releaseType} ${businessType} ${status} ${audit_time} ${create_time}
                order by t.STATUS ASC,t.audit_time desc,t.create_time DESC
                LIMIT ${page},${limit}`
        let rows =[];
        try {
            rows= await this.app.mysql.query(sql);
        } catch (error) {
            app.logger.error(error)
        }finally{
            app.logger.info(sql)
        }
        let sql2 = `SELECT
                      count(0) as total
                    FROM
                        (
                        SELECT
                            tca.id id,
                            tca.id business_id,
                            1007 business_type,
                            tca.title content,
                            tca.create_date create_time,
                            tca.check_status STATUS,
                            tca.user_id user_id,
                            tca.audit_time audit_time,
                            tca.audit_user_id audit_user_id,
                            tca.remark,
                            0 LEVEL,
                            0 source 
                        FROM
                            tt_community_article tca UNION ALL
                        SELECT
                            tcc.id id,
                            tcc.business_id business_id,
                            tcc.business_type business_type,
                            tcc.comment_content content,
                            tcc.create_date create_time,
                            tcc.STATUS STATUS,
                            tcc.saic_user_id user_id,
                            tcc.audit_time audit_time,
                            tcc.audit_user_id audit_user_id,
                            tcc.remark,
                            tcc.LEVEL LEVEL,
                            tcc.user_type source
                        FROM
                            tt_community_comment tcc 
                        ) AS t
                        LEFT JOIN user_account u ON t.user_id = u.saic_user_id
                        WHERE 1=1 ${name} ${releaseType} ${businessType} ${status} ${audit_time} ${create_time}
                    `;
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
    async getAuditTypeList(){
        
    }
  }
  return auditManagementService;
};

