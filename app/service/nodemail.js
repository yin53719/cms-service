'use strict';

const nodemailer = require('nodemailer');

module.exports = app => {
  class nodemaiService extends app.Service {

    async index(data) {
      let transporter = nodemailer.createTransport({
        // host: 'smtp.ethereal.email',
        service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
        port: 465, // SMTP 端口
        secureConnection: true, // 使用了 SSL
        auth: {
          user: '170474051@qq.com',
          // 这里密码不是qq密码，是你设置的smtp授权码
          pass: 'dtxfgdwqhljecabi',
        }
      });
      
      let mailOptions = {
        from: '"系统管理员" <170474051@qq.com>', // sender address
        to: data.to, // list of receivers
        subject: data.subject, // Subject line
        // 发送text或者html格式
        // text: 'Hello world?', // plain text body
        html: data.html // html body
      };
      
      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
      });
  
    }
  }
  return nodemaiService;
};



