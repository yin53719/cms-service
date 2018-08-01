'use strict';
const path=require('path');
const fs=require('fs');
const common = require('../../libs/common');
const uploadFile = require('../../libs/upload');
const delFile  = require('../../libs/delFile');
const qqfilecos = require('../../libs/qqfilecos');
module.exports = app =>{
  class MenusController extends app.Controller {
    async index(ctx) {
      // 上传文件请求处理
      var result = { success: false,size:500 }
      let serverFilePath = path.join( __dirname, '../static/upload');
      // 上传文件事件
      result = await uploadFile( ctx,{
          path:serverFilePath
      });
      let src='https://cdn.yinzhongchang.cn/'+result.name;
      result.url=src;
      result.data=src;
      result.files={
          file:src
      }
      //要上传文件的本地路径
      let filePath = `${serverFilePath}/${result.name}`;
      let fileSize = fs.statSync(filePath).size;
      result.size= Math.ceil(fileSize/1024);
      let filename = result.name;
      await qqfilecos(filename,filePath,fileSize);
         fs.unlink(filePath,(err)=>{
          if (err) throw err;
         })
      ctx.body=result;
      
    }
  }
  return MenusController;
}
