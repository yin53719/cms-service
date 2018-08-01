'use strict';

const common = require('../../libs/common');
module.exports = app =>{
  class RoleController extends app.Controller {
    async all(ctx) {
      let rolename =ctx.query.rolename;
      if(rolename==undefined){
        rolename=""
      }

      let sql=`SELECT * FROM tc_roles as a WHERE role_name LIKE '%${rolename}%'`
      let list= await this.app.mysql.query(sql);
      ctx.body=list;
    }
    async create(ctx) {
      const body=ctx.request.body;
      let rolename=body.rolename;

      let role_id=new Date().getTime();
      ctx.logger.info(this.ctx.req);
      let sql = `INSERT INTO tc_roles (role_name,role_id,remark)  VALUES ('${rolename}','${role_id}','${remark}')`;
      try {
          let users = await this.app.mysql.query(sql);
      } catch (error) {
          ctx.logger.error(error);
      }
      const data= await this.app.mysql.get('tc_roles',{rolename:rolename});
      ctx.body=ctx.request.body.sex
    }
    async getUsers(ctx) {
        //根据id查询
      let user_id=ctx.params.id;
      const data= await this.app.mysql.get('tc_users',{user_id:user_id});
      ctx.body=data;
    }
    async putUsers(ctx){
      const data= await this.app.mysql.update('tc_users',ctx.request.body);
      ctx.body=data;
    }
    async deleteUsers(ctx){
      const data= await this.app.mysql.delete('tc_users',{id:ctx.params.id});
      ctx.body=data;
    }
  }
  return RoleController;
}

