'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    async index(ctx, next) {
      this.ctx.body = '服务正常启动';
    }
  }
  return HomeController;
}