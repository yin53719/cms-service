'use strict';

const common = require('../../libs/common');
module.exports = app =>{
  class MenusController extends app.Controller {
    async index(ctx) {
      var token =ctx.header.authorization;
      var decoded =app.jwt.verify(token.slice(7), app.config.jwt.secret);
      //预留用户多个角色
      const userInfo =await app.mysql.get('tc_users',{user_id:decoded.user_id});

      let role_id=userInfo.roles;    
      let menusList = await app.mysql.select('tc_menus')
      if(userInfo.username=='admin'){
        const array = await app.service.menu.getMenus(menusList);
        ctx.body=array;
      }else{
        let sql2=`SELECT * FROM  tc_role_fun a LEFT JOIN tc_menus as b ON a.menu_id = b.menu_id  WHERE a.role_id=${role_id}`;
        let newList = await app.mysql.query(sql2)
        let lb=newList.length;
        let array=[];
        if(lb>0){
           array = await app.service.menu.getMenus(menusList);
        }
        ctx.body=array;
      }
      
    }
    async all(ctx) {
      
      let menusList = await app.mysql.select('tc_menus_copy')
        const array = await app.service.menu.getMenus(menusList);
        ctx.body=array;
      
      
    }
    async role(ctx) {
      //预留用户多个角色
      let role_id=ctx.params.role_id;
      
      //查出所有的
      let sql=`SELECT * FROM  tc_menus`;
      let menusList = await app.mysql.query(sql)
      let list = await app.service.menu.getMenus(menusList);
      // menusList
      let sql2=`SELECT a.menu_id FROM  tc_role_fun as a  WHERE a.role_id=${role_id}`;
      let menusList_ok = await app.mysql.query(sql2)
      ctx.body={defaultChecked:menusList_ok,list:list};
    }
    async add(ctx) {
      let role_id=ctx.params.role_id;
      var menus=ctx.request.body.menus;
      var ls=menus.length;
      
      
      //删除原有菜单
      await app.mysql.delete('tc_role_fun',{role_id:role_id});
      if(ls>0){
        var list='';
        for(var i=0;i<ls;i++){
            list +=`,(${menus[i].menu_id},${role_id},'${menus[i].menu_name}')`
        }
        list=list.slice(1);
        const sql=`INSERT INTO tc_role_fun (menu_id,role_id,menu_name) VALUE ${list}`;
        let request = await app.mysql.query(sql)
        ctx.body=request;
      }else{
        ctx.body={msg:'操作成功'}
      }
      
    }
  }
  return MenusController;
}
