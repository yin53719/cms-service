const crypto = require('crypto');
const xml2js = require('xml2js');
const xmlParser = new xml2js.Parser({ explicitArray: false, ignoreAttrs: true });
const xmlBuilder = new xml2js.Builder();


// 测试用的key后面可以去掉
const getAuth = function(opt) {

  opt = opt || {};

  const secretId = opt.secretId;
  const secretKey = opt.secretKey;

  let method = opt.method || 'get';
  method = method.toLowerCase();
  const pathname = opt.pathname || '/';
  const queryParams = opt.params || '';
  const headers = opt.headers || '';

  const getObjectKeys = function(obj) {
    const list = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        list.push(key);
      }
    }
    return list.sort();
  };

  const obj2str = function(obj) {
    let i,
      key,
      val;
    const list = [];
    const keyList = Object.keys(obj);
    for (i = 0; i < keyList.length; i++) {
      key = keyList[i];
      val = obj[key] || '';
      key = key.toLowerCase();
      key = encodeURIComponent(key);
      list.push(key + '=' + encodeURIComponent(val));
    }
    return list.join('&');
  };

  // 签名有效起止时间
  const now = parseInt(new Date().getTime() / 1000) - 1;
  let expired = now; // now + ';' + (now + 60) + ''; // 签名过期时间为当前 + 3600s

  if (opt.expires) {
    expired += (opt.expires * 1);
  } else {
    expired += 3600;
  }

  // 要用到的 Authorization 参数列表
  const qSignAlgorithm = 'sha1';
  const qAk = secretId;
  const qSignTime = now + ';' + expired;
  const qKeyTime = now + ';' + expired;
  const qHeaderList = getObjectKeys(headers).join(';').toLowerCase();
  const qUrlParamList = getObjectKeys(queryParams).join(';').toLowerCase();

  // 签名算法说明文档：https://www.qcloud.com/document/product/436/7778
  // 步骤一：计算 SignKey
  const signKey = crypto.createHmac('sha1', secretKey).update(qKeyTime).digest('hex');// CryptoJS.HmacSHA1(qKeyTime, secretKey).toString();

  // 新增修改，formatString 添加 encodeURIComponent

  // pathname = encodeURIComponent(pathname);


  // 步骤二：构成 FormatString
  let formatString = [ method, pathname, obj2str(queryParams), obj2str(headers), '' ].join('\n');

  formatString = new Buffer(formatString, 'utf8');

  // 步骤三：计算 StringToSign
  const sha1Algo = crypto.createHash('sha1');
  sha1Algo.update(formatString);
  const res = sha1Algo.digest('hex');
  const stringToSign = [ 'sha1', qSignTime, res, '' ].join('\n');

  // 步骤四：计算 Signature
  const qSignature = crypto.createHmac('sha1', signKey).update(stringToSign).digest('hex');// CryptoJS.HmacSHA1(stringToSign, signKey).toString();

  // 步骤五：构造 Authorization
  const authorization = [
    'q-sign-algorithm=' + qSignAlgorithm,
    'q-ak=' + qAk,
    'q-sign-time=' + qSignTime,
    'q-key-time=' + qKeyTime,
    'q-header-list=' + qHeaderList,
    'q-url-param-list=' + qUrlParamList,
    'q-signature=' + qSignature,
  ].join('&');

  return authorization;

};


// XML格式转json
const xml2json = function(bodyStr) {
  let d = {};
  xmlParser.parseString(bodyStr, function(err, result) {
    d = result;
  });

  return d;
};

const json2xml = function(json) {
  const xml = xmlBuilder.buildObject(json);
  return xml;
};

const md5 = function(str, encoding) {
  const md5 = crypto.createHash('md5');
  md5.update(str);
  encoding = encoding || 'hex';
  return md5.digest(encoding);
};


// 用于清除值为 undefine 或者 null 的属性
const clearKey = function(obj) {
  const retObj = {};
  for (const key in obj) {
    if (obj[key]) {
      retObj[key] = obj[key];
    }
  }

  return retObj;
};


const getFileSHA = function(readStream, callback) {
  const SHA = crypto.createHash('sha1');

  readStream.on('data', function(chunk) {
    SHA.update(chunk);
  });

  readStream.on('error', function(err) {
    callback(err);
  });

  readStream.on('end', function() {
    const hash = SHA.digest('hex');

    callback(null, hash);
  });
};

const util = {
  getAuth,
  xml2json,
  json2xml,
  md5,
  clearKey,
  getFileSHA,
};


module.exports = util;
