const fs = require('fs');
const path = require('path');

// TODO
// 查看您对应的appid相关信息并填充
// TODO

exports.APPID = '1251334980';
exports.SECRET_ID = 'AKIDnUgiZEZw3zkJgtvxjKjvvjLl06309Rq7';
exports.SECRET_KEY = 'SlsmUzIPK3NbeU7btzsZ5OVQ8eya1GJA';

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../', 'package.json')));
const ua = function() {
  return 'cos-node-sdk-' + pkg.version;
};

// 签名的有效时间
exports.EXPIRED_SECONDS = 60;

exports.recvTimeout = 30000;
exports.USER_AGENT = ua;

// timeout单位秒
exports.setAppInfo = function(appid, secretId, secretKey, timeout) {
  var timeout = timeout || 30;
  module.exports.APPID = appid;
  module.exports.SECRET_ID = secretId;
  module.exports.SECRET_KEY = secretKey;
  module.exports.recvTimeout = timeout * 1000;
};
