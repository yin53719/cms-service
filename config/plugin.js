'use strict';

// had enabled by egg
//框架默认开启静态资源
// exports.static = true;
exports.mysql = {
  enable: false,
  package: 'egg-mysql',
};
exports.cors = {
  enable: true,
  package: 'egg-cors',
};
exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};
exports.jwt = {
  enable: true,
  package: "egg-jwt"
};
exports.ejs = {
  enable: true,
  package: 'egg-view-ejs',
};