'use strict';

const Service = require('egg').Service;
const md5 = require('js-md5')
const { ERROR, SUCCESS, } = require('../util/util');

class UserService extends Service {
  async create(user) {
    const {ctx, } = this;
    const { username, password } = ctx.request.body;
    try {
      if (!username || !password) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: `数据不完整，收到的数据为: ${JSON.stringify(ctx.request.body)}`,
        });
      }
      const md5Passwd = md5(password)
      user = Object.assign(ctx.request.body, {
        password: md5Passwd,
      });
      const userDB = await ctx.model.User.findOne({
        where: {
          username: username,
        },
      });
      if (!userDB) {
        const res = await this.ctx.model.User.create(user);
        ctx.status = 201;
        return Object.assign(SUCCESS, {
          data: res,
        });
      }
      ctx.status = 406;
      return Object.assign(ERROR, {
        msg: '用户名已存在！',
      });

    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }

  async del(id) {
    const {
      ctx,
    } = this;
    try {
      const user = await ctx.model.User.findByPk(id);
      if (!user) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: '用户不存在！',
        });
      }
      user.destroy();
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: user,
      });

    } catch (error) {
      console.log(222, error)
      ctx.throw(500);
    }
  }

  async update({ id, user }) {
    const {
      ctx,
    } = this;
    try {
      const userDB = await ctx.model.User.findByPk(id);
      if (!userDB) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: '用户不存在！',
        });
      }
      const md5Passwd = md5(user.password)
      user = Object.assign(user, {
        password: md5Passwd,
      });
      const res = await userDB.update(user);
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: res,
      });

    } catch (error) {
      ctx.throw(500);
    }
  }

  async login({ username, password }) {
    const {
      ctx,
    } = this;
    try {
      const user = await ctx.model.User.findOne({
        where: {
          username: username.toString()
        },
      });
      if (!user) {
        return Object.assign(ERROR, {
          msg: '找不到用户！',
        });
      }
      if (md5(password) === user.password) {
        ctx.status = 200;
        const hash = md5.hex(password)
        ctx.cookies.set('token', hash, {
          httpOnly: false,
          signed: false,
          maxAge: 3600 * 1000,
          path: '/',
        });
        ctx.cookies.set('user_id', user.id, {
          httpOnly: false,
          signed: false,
          maxAge: 3600 * 1000,
          path: '/',
        });

        const token = ctx.helper.getToken(user.username);
       
        let dataObj = Object.assign(SUCCESS, {
          data: Object.assign(user, {
            password: '',
          }),
        })
        dataObj.token = token
        return dataObj;
      }
      return Object.assign(ERROR, {
        msg: '密码错误！',
      });


    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }

  async find(id) {
    const {
      ctx,
    } = this;
    try {
      const user = await ctx.model.User.findByPk(id, {
        include: [{
          model: ctx.model.Authority,
          attributes: [ 'id', 'name' ],
        }],
      });
      if (!user) {
        ctx.status = 401;
        return Object.assign(ERROR, {
          msg: '找不到用户！',
        });
      }
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: user,
      });

    } catch (error) {
      throw (500);
    }
  }
}

module.exports = UserService;
