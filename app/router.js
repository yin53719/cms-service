'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  app.get('/','home.index');
  app.get('/api/wx/wxsdk','home.weixin');
  app.post('/api/login','login.index');//登录
  app.post('/api/register','login.register');//注册
  app.get('/api/logout','login.logout');//注册
  //用户
  app.get('/api/users',app.jwt ,'users.all');//获取全部用户
  app.post('/api/users',app.jwt, 'users.create');//新增用户
  app.get('/api/users/:id',app.jwt, 'users.getUsers');//根据id查询
  app.put('/api/users',app.jwt,'users.putUsers');//根据id查询
  app.delete('/api/users/:id',app.jwt, 'users.deleteUsers');//根据id查询

  //角色
  app.get('/api/roles',app.jwt, 'roles.all');//获取全部用户

  //获取用户菜单
  app.get('/api/menus',app.jwt,'menus.index');//获取用户菜单
  app.get('/api/menus/all',app.jwt,'menus.all');//获取用户菜单
  app.get('/api/menus/roles/:role_id',app.jwt,'menus.role');//获取用户菜单
  app.put('/api/menus/roles/:role_id',app.jwt,'menus.add');//更新菜单
  //上传图片
  app.post('/api/upload','upload.index');
  app.get('/api/cmyManage/sys/ue/upload','uploadUe.index');
  app.post('/api/upload/ue','uploadUe.image');
  app.post('/api/cmyManage/sys/uploadFile','uploadUe.image');
  app.post('/api/cmyManage/sys/ue/upload','uploadUe.image');

  app.get('/api/getWechatToken','login.getWechatToken');
  
  
  //论坛路由
  require('./router/forum')(app);
  //资讯路由
  require('./router/news')(app);
  //官方发布号以及用户
  require('./router/user')(app);
  //官方发布号以及用户
  require('./router/auditManagement')(app);

  app.get('/api/community/comment/web/queryCommentList','community.comment.web');
  


  
};
