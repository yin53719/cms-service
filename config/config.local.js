'use strict';
var path = require('path');
module.exports = appInfo => {
  const config = {};
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1527326420443_4189';
  // add your config here
  config.middleware = [];
  config.mongoose={
    clients: {
      back: {
        url: 'mongodb://tests:yin53719.@118.25.66.58:1000/test',
        options: {},
      },
    }
  }
  config.logger = {
    consoleLevel: 'DEBUG',
  }

  config.mysql={
    // database configuration
    client: {
      // host:'118.25.66.58',
      host: '58.248.224.12',
       port:'30143',
      //port: '10010',

      // username
      user:'root',
      //user: 'yinzc',
       password:'123456',
     // password: 'Yinzc53719.',
      // database
      database: 'bbs_community',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  }

  return config;
};
