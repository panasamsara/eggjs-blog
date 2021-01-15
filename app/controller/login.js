'use strict';

const Controller = require('egg').Controller;


class LoginController extends Controller {
  // 登录
  async login() {
    const { ctx, app } = this;
    const data = ctx.request.body;
    // const token = app.jwt.sign({
    //   nickname: data.nickname,
    // }, app.config.jwt.secret);
    const token = ctx.helper.getToken({nickname: data.nickname});
    ctx.body = { code: 1, token: token };
  }
  // 验证token，请求时在header配置 Authorization=`Bearer ${token}`
  // 特别注意：token不能直接发送，要在前面加上Bearer字符串和一个空格
  async index() {
    const { ctx } = this;
    console.log(ctx.state.user);
    ctx.body = { code: 1, msg: '验证成功', data: ctx.state };
  }
}

module.exports = LoginController;