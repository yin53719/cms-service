'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    async index(ctx, next) {

      ctx.logger.info(app.config);

      this.ctx.body = app.config;
    }
  }
  return HomeController;
}