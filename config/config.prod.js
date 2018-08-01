'use strict';
var path = require('path');
module.exports = appInfo => {
  const config = {};
  config.mongoose={
    clients: {
      back: {
        url: 'mongodb://tests:yin53719.@10.105.92.125:1000/test',
        options: {},
      },
    }
  }

  config.mysql={
    client: {
      host: '10.105.92.125',
      port: '10010',
      user: 'yinzc',
      password: 'Yinzc53719.',
      database: 'testdb1',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  }
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1527326420443_4189';
  // add your config here
  config.middleware = [];

  return config;
};
