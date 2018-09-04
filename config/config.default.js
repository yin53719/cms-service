'use strict';
var path = require('path');
module.exports = appInfo => {
  const config = {
    cluster: {
      listen: {
        port: 5000,
        hostname: '127.0.0.1',
      }
    },
    jwt:{
      secret: "123456"
    },
    logger: {
      consoleLevel: 'INFO'
    },
    security: {
      xframe:{
        enable:false,
      },
      csrf:{
        enable:false,
      }
    },
    //默认配置
    // static:{
    //   prefix: '/public/',
    //   dir:path.join(appInfo.baseDir, 'app/public')
    // },
    cors:{
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    }
  };
  config.view = {
    mapping: {
      '.ejs': 'ejs',
    },
  };
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1527326420443_4189';
  // add your config here
  config.middleware = [];

  return config;
};
