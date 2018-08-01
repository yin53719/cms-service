'use strict';

const common = require('../../libs/common');

module.exports = app =>{
  class UserController extends app.Controller {
    async all(ctx) {
      let username =ctx.query.username;
      if(username==undefined){
        username=""
      }
      let page=ctx.query.page-1 || 0;
      let limit=ctx.query.limit*1 || 10;
      let spage=(page-1)*10;
      let sql=`SELECT * FROM tc_users as a  LEFT JOIN tc_roles as b ON a.roles=b.role_id WHERE a.username LIKE '%${username}%' LIMIT ${spage},${limit}`
      let rows= await this.app.mysql.query(sql);
      let sql2 = `SELECT count(username) as total FROM tc_users as a WHERE a.username LIKE '%${username}%'`;
      let total = await this.app.mysql.query(sql2);
      ctx.body={total:total[0],rows:rows};
    }
    async create(ctx) {
      const body=ctx.request.body;
      let password=common.md5('123456'+common.MD5_SUFFIX);
      let user_id=new Date().getTime();
      body['password']=password;
      body['user_id']=user_id;
      ctx.logger.info(body)
      let users = await this.app.mysql.insert('tc_users',body);
      ctx.body=users;
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
      let user_id=ctx.params.id;
      const data= await this.app.mysql.get('tc_users',{user_id:user_id});
      if(data.username=='admin'){
        ctx.state=401;
        ctx.body={msg:"管理员不可删除"};
      }else{
        const data= await this.app.mysql.delete('tc_users',{user_id:ctx.params.id});
        ctx.body=data;
      }

      
    }
  }
  return UserController;
}
